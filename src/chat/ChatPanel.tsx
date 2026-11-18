import { type FormEvent, type RefObject, useEffect, useId, useRef, useState } from "react";
import { AgentAvatars, CloseIcon, SendIcon } from "./ChatParts";
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
  agents,
  messages,
  isAgentTyping,
  initialTopic,
  bottomOffset,
  onSendMessage,
  onClose,
  returnFocusRef,
}: ChatPanelProps) {
  const lead = agents[0];
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

  return (
    <div
      aria-labelledby={nameId}
      aria-modal="true"
      className={`cl-glass cl-panel cl-panel--${layout}`}
      id={id}
      ref={containerRef}
      role="dialog"
      style={style}
    >
      <header className="cl-panel__header">
        <AgentAvatars agents={[lead]} size={40} />
        <div className="cl-panel__who">
          <strong id={nameId}>{lead.name}</strong>
          <small>Real person · Outfox team</small>
        </div>
        <button aria-label="Close chat" className="cl-icon-btn" onClick={onClose} type="button">
          <CloseIcon />
        </button>
      </header>

      <div aria-live="polite" aria-relevant="additions" className="cl-panel__list" ref={listRef}>
        <p className="cl-bubble cl-bubble--agent">
          Hi, I’m {lead.name}, a real person on the Outfox team. How can I help you today?
        </p>
        {messages.map((message) => (
          <p className={`cl-msg cl-msg--${message.author}`} key={message.id}>
            {message.text}
          </p>
        ))}
        {isAgentTyping && <p className="cl-typing">{lead.name} is typing…</p>}
      </div>

      <form className="cl-panel__composer" onSubmit={handleSubmit}>
        <label className="cl-sr" htmlFor={inputId}>
          Type your message
        </label>
        <input
          autoComplete="off"
          className="cl-input"
          enterKeyHint="send"
          id={inputId}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type your message…"
          ref={inputRef}
          type="text"
          value={draft}
        />
        <button aria-label="Send message" className="cl-send" disabled={!draft.trim()} type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
