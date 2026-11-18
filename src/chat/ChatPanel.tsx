import { type FormEvent, type RefObject, useEffect, useId, useRef, useState } from "react";
import { BackIcon, MoreIcon, PaperclipIcon, PersonIcon, PopoutIcon, SendIcon, ZendeskMark } from "./ChatParts";
import type { Agent, Message } from "./types";
import { useDialog } from "./useDialog";

export type PanelLayout = "panel" | "sheet" | "fullscreen";

type ChatPanelProps = {
  id: string;
  layout: PanelLayout;
  agents: Agent[];
  messages: Message[];
  isAgentTyping: boolean;
  initialTopic?: string;
  bottomOffset: number;
  onSendMessage: (text: string, topic?: string) => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

/**
 * The open chat. "panel" is the 380x560 desktop window, "sheet" is the tablet bottom sheet,
 * and "fullscreen" is the phone view. Loaded lazily by ChatLauncher.
 */
export default function ChatPanel({
  id,
  layout,
  messages,
  isAgentTyping,
  initialTopic,
  bottomOffset,
  onSendMessage,
  onClose,
  returnFocusRef,
}: ChatPanelProps) {
  const startedAt = useRef(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sentTopicRef = useRef(false);
  const [draft, setDraft] = useState("");
  const nameId = useId();
  const inputId = useId();

  useDialog({ containerRef, onClose, returnFocusRef, lockScroll: layout !== "panel" });

  // Runs after useDialog's focus call, so the composer ends up focused.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // A topic picked on the strip is sent as the first message, once.
  useEffect(() => {
    if (!initialTopic || sentTopicRef.current) return;
    sentTopicRef.current = true;
    onSendMessage(initialTopic, initialTopic);
  }, [initialTopic, onSendMessage]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages.length, isAgentTyping]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSendMessage(text);
    setDraft("");
  }

  const style = layout === "panel" ? { bottom: `calc(100px + env(safe-area-inset-bottom) + ${bottomOffset}px)` } : undefined;
  const startedLabel = formatStarted(startedAt.current);

  return (
    <div
      aria-labelledby={nameId}
      aria-modal="true"
      className={`cl-panel cl-panel--${layout}`}
      id={id}
      ref={containerRef}
      role="dialog"
      style={style}
    >
      <header className="cl-panel__header">
        <button aria-label="Close chat" className="cl-panel__tool" onClick={onClose} type="button">
          <BackIcon />
        </button>
        <span aria-hidden="true" className="cl-panel__face">
          <PersonIcon />
        </span>
        <strong className="cl-panel__title" id={nameId}>
          {startedLabel}
        </strong>
        <span aria-hidden="true" className="cl-panel__tool">
          <PopoutIcon />
        </span>
        <span aria-hidden="true" className="cl-panel__tool">
          <MoreIcon />
        </span>
      </header>

      <div aria-live="polite" aria-relevant="additions" className="cl-panel__list" ref={listRef}>
        <p className="cl-panel__notice">
          This chat is recorded using a cloud service and is subject to the terms of our{" "}
          <a href="https://www.outfox.energy/" rel="noreferrer" target="_blank">
            Privacy Notice
          </a>
          .
        </p>
        <p className="cl-panel__clock">{formatClock(startedAt.current)}</p>

        <article className="cl-turn cl-turn--agent">
          <p className="cl-turn__who">Outfox Energy</p>
          <div className="cl-turn__row">
            <span aria-hidden="true" className="cl-panel__face cl-panel__face--sm">
              <PersonIcon />
            </span>
            <p className="cl-bubble">Hey there, how can I help you today?</p>
          </div>
          <p className="cl-turn__when">Just now</p>
        </article>

        {messages.map((message) => (
          <article className={`cl-turn cl-turn--${message.author}`} key={message.id}>
            {message.author === "agent" && <p className="cl-turn__who">Outfox Energy</p>}
            <div className="cl-turn__row">
              {message.author === "agent" && (
                <span aria-hidden="true" className="cl-panel__face cl-panel__face--sm">
                  <PersonIcon />
                </span>
              )}
              <p className={`cl-bubble ${message.author === "customer" ? "cl-bubble--mine" : ""}`}>{message.text}</p>
            </div>
            <p className="cl-turn__when">Just now</p>
          </article>
        ))}
        {isAgentTyping && <p className="cl-typing">Outfox Energy is typing…</p>}
      </div>

      <form className="cl-panel__composer" onSubmit={handleSubmit}>
        <div className="cl-composer">
          <span aria-hidden="true" className="cl-composer__clip">
            <PaperclipIcon />
          </span>
          <label className="cl-sr" htmlFor={inputId}>
            Type a message
          </label>
          <input
            autoComplete="off"
            className="cl-input"
            enterKeyHint="send"
            id={inputId}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type a message"
            ref={inputRef}
            type="text"
            value={draft}
          />
          {draft.trim() && (
            <button aria-label="Send message" className="cl-send" type="submit">
              <SendIcon />
            </button>
          )}
        </div>
        <p className="cl-built">
          <ZendeskMark /> Built with Zendesk
        </p>
      </form>
    </div>
  );
}

function formatStarted(date: Date) {
  const month = date.toLocaleString("en-GB", { month: "short" });
  return `Started ${date.getDate()} ${month} at ${formatClock(date)}`;
}

function formatClock(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
