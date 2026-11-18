import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import { OPEN_CHAT_EVENT } from "../openChat";
import "./chat.css";
import { ConversationStrip } from "./ConversationStrip";
import { DesktopLauncher } from "./DesktopLauncher";
import { DockBar } from "./DockBar";
import { PeekCard } from "./PeekCard";
import type { Agent, LauncherVariant, Message } from "./types";
import { useCookieConsent } from "./useCookieConsent";
import { useMediaQuery } from "./useMediaQuery";
import { useScrollPastHero } from "./useScrollPastHero";
import { useVisualViewport } from "./useVisualViewport";

// Loaded only when the chat opens, so the page itself stays light.
const ChatPanel = lazy(() => import("./ChatPanel"));

export type ChatLauncherProps = {
  agentsOnline: boolean;
  replyTimeMins: number;
  agents: Agent[];
  topics: string[];
  /** Mobile and tablet style. Desktop always uses the floating pill. */
  variant: LauncherVariant;
  onOpen?: () => void;
  onClose?: () => void;
  onSendMessage: (text: string, topic?: string) => void;
  isAgentTyping: boolean;
  messages: Message[];
  /** When true, the launcher stays hidden until the visitor has consented to cookies. */
  requireConsentBeforeLoad: boolean;
  /** Extra space (px) above the launcher, e.g. for a cookie banner or a sticky button. */
  bottomOffset: number;
};

export function ChatLauncher({
  agentsOnline,
  replyTimeMins,
  agents,
  topics,
  variant,
  onOpen,
  onClose,
  onSendMessage,
  isAgentTyping,
  messages,
  requireConsentBeforeLoad,
  bottomOffset,
}: ChatLauncherProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const consent = useCookieConsent();
  const pastHero = useScrollPastHero();

  const [open, setOpen] = useState(false);
  const [peekDismissed, setPeekDismissed] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [pendingTopic, setPendingTopic] = useState<string | undefined>(undefined);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const controlsId = useId();

  const layout = isDesktop ? "panel" : isTablet ? "sheet" : "fullscreen";
  const hidden = requireConsentBeforeLoad && !consent.consented;
  // When the cookie banner is showing, sit above it.
  const offset = bottomOffset + (consent.bannerVisible ? 120 : 0);

  useVisualViewport(open && !isDesktop);

  // Reserve space at the bottom of the page on mobile so the footer is never hidden behind the dock.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("chat-has-dock", !isDesktop && !hidden);
    root.dataset.chatVariant = variant;
    return () => {
      root.classList.remove("chat-has-dock");
      delete root.dataset.chatVariant;
    };
  }, [isDesktop, hidden, variant]);

  // The header chat icon and the desktop Help Centre menu both dispatch this event.
  useEffect(() => {
    function handleOpenRequest() {
      setPendingTopic(undefined);
      setOpen(true);
      onOpen?.();
    }
    window.addEventListener(OPEN_CHAT_EVENT, handleOpenRequest);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handleOpenRequest);
  }, [onOpen]);

  function openChat(topic?: string) {
    setPendingTopic(topic);
    setOpen(true);
    onOpen?.();
  }

  function closeChat() {
    setOpen(false);
    setPendingTopic(undefined);
    setPeekDismissed(true);
    onClose?.();
  }

  function renderMobileLauncher() {
    const dockProps = {
      agents,
      agentsOnline,
      replyTimeMins,
      controlsId,
      expanded: open,
      bottomOffset: offset,
      buttonRef: launcherRef,
      onActivate: () => openChat(),
    };

    if (variant === "peek") {
      // The peek card is a focus-trapping dialog, so it is removed while the chat is open.
      if (!open && !peekDismissed && !pastHero) {
        return (
          <PeekCard
            agents={agents}
            agentsOnline={agentsOnline}
            controlsId={controlsId}
            onClose={() => setPeekDismissed(true)}
            onStart={() => openChat()}
          />
        );
      }
      return <DockBar {...dockProps} compact />;
    }

    if (variant === "strip" && !pastHero) {
      return (
        <ConversationStrip
          agents={agents}
          onOpenField={() => openChat()}
          onPickTopic={(topic) => openChat(topic)}
          topics={topics}
        />
      );
    }

    return <DockBar {...dockProps} compact={pastHero} />;
  }

  if (hidden) return null;

  return (
    <div className="cl-root">
      {isDesktop ? (
        <DesktopLauncher
          agents={agents}
          agentsOnline={agentsOnline}
          bottomOffset={offset}
          buttonRef={launcherRef}
          compact={pastHero && !open}
          controlsId={controlsId}
          expanded={open}
          onActivate={() => (open ? closeChat() : openChat())}
          onDismissTeaser={() => setTeaserDismissed(true)}
          replyTimeMins={replyTimeMins}
          showTeaser={!open && !pastHero && !teaserDismissed}
        />
      ) : (
        renderMobileLauncher()
      )}

      <Suspense fallback={null}>
        {open && (
          <ChatPanel
            bottomOffset={offset}
            id={controlsId}
            initialTopic={pendingTopic}
            isAgentTyping={isAgentTyping}
            key={layout}
            layout={layout}
            agents={agents}
            messages={messages}
            onClose={closeChat}
            onSendMessage={onSendMessage}
            returnFocusRef={launcherRef}
          />
        )}
      </Suspense>
    </div>
  );
}
