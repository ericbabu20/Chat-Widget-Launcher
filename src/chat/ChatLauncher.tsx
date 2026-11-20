import { lazy, Suspense, useEffect, useId, useMemo, useRef, useState } from "react";
import { OPEN_CHAT_EVENT } from "../openChat";
import "./chat.css";
import { ConversationStrip } from "./ConversationStrip";
import { type LauncherCopyOverride, promptForPath, resolveLauncherCopy } from "./copy";
import { DesktopLauncher } from "./DesktopLauncher";
import { DockBar } from "./DockBar";
import { HelpMenu } from "./HelpMenu";
import { PeekCard } from "./PeekCard";
import type { Agent, LauncherVariant, Message } from "./types";
import { useCookieConsent } from "./useCookieConsent";
import { useMediaQuery } from "./useMediaQuery";
import { useScrollPastHero } from "./useScrollPastHero";
import { useVisualViewport } from "./useVisualViewport";

// Loaded only when the chat opens, so the page itself stays light.
const ChatPanel = lazy(() => import("./ChatPanel"));

// The proactive bubble stays hidden for the rest of the browser session once the visitor closes it.
const TEASER_KEY = "outfox-chat-teaser-dismissed";

function readTeaserDismissed() {
  try {
    return sessionStorage.getItem(TEASER_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberTeaserDismissed() {
  try {
    sessionStorage.setItem(TEASER_KEY, "1");
  } catch {
    // Storage can be blocked. The bubble simply comes back on the next visit.
  }
}

export type ChatLauncherProps = {
  /** @deprecated The assistant is always available. Only the peek card still reads this. */
  agentsOnline: boolean;
  /** @deprecated Reply times are no longer shown. Accepted and ignored. */
  replyTimeMins: number;
  /** @deprecated Avatars are no longer shown. Only the peek and strip variants still read this. */
  agents: Agent[];
  topics: string[];
  /** Mobile and tablet style. Desktop always uses the floating pill. */
  variant: LauncherVariant;
  onOpen?: () => void;
  onClose?: () => void;
  onSendMessage: (text: string, topic?: string) => void;
  /** @deprecated Typing state is only shown inside the open chat window. Accepted and passed through. */
  isAgentTyping: boolean;
  messages: Message[];
  /** When true, the launcher stays hidden until the visitor has consented to cookies. */
  requireConsentBeforeLoad: boolean;
  /** Extra space (px) above the launcher, e.g. for a cookie banner or a sticky button. */
  bottomOffset: number;
  /** @deprecated Offline wording has been removed. Accepted and ignored. */
  nextAvailableText?: string;
  /** Optional per-page override of the launcher wording. See copy.ts. */
  copy?: LauncherCopyOverride;
  /** Turn on only when a real person can take over the Zendesk chat. Default off. */
  handoffToHuman?: boolean;
};

export function ChatLauncher({
  agentsOnline,
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
  replyTimeMins = 4,
  copy,
  handoffToHuman = false,
}: ChatLauncherProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const consent = useCookieConsent();
  const pastHero = useScrollPastHero();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [peekDismissed, setPeekDismissed] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(readTeaserDismissed);
  const [pendingTopic, setPendingTopic] = useState<string | undefined>(undefined);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const controlsId = useId();
  const resolvedCopy = useMemo(() => resolveLauncherCopy(copy), [copy]);
  const prompt = promptForPath(resolvedCopy.prompts, window.location.pathname);

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

  // Match the page's bottom spacer to the dock's real height (plus its gap from the screen edge).
  useEffect(() => {
    const dock = dockRef.current;
    if (isDesktop || hidden || !dock) return;
    const root = document.documentElement;
    const measure = () => {
      if (dock.classList.contains("cl-dock--fab")) {
        root.style.setProperty("--cl-dock-space", "0px");
        return;
      }
      const gap = parseFloat(getComputedStyle(dock).bottom) || 0;
      root.style.setProperty("--cl-dock-space", `${Math.ceil(dock.offsetHeight + gap)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(dock);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--cl-dock-space");
    };
  }, [isDesktop, hidden, variant, pastHero, open, offset, minimised]);

  // The header chat icon and the desktop Help Centre menu both dispatch this event.
  useEffect(() => {
    function handleOpenRequest() {
      setMinimised(false);
      setMenuOpen(true);
    }
    window.addEventListener(OPEN_CHAT_EVENT, handleOpenRequest);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handleOpenRequest);
  }, [onOpen]);

  function openChat(topic?: string) {
    setMenuOpen(false);
    setPendingTopic(topic);
    setOpen(true);
    onOpen?.();
  }

  function openMenu() {
    setMinimised(false);
    setMenuOpen(true);
  }

  function dismissTeaser() {
    rememberTeaserDismissed();
    setTeaserDismissed(true);
  }

  function closeChat() {
    setOpen(false);
    setPendingTopic(undefined);
    setPeekDismissed(true);
    onClose?.();
  }

  function renderMobileLauncher() {
    const dockProps = {
      copy: resolvedCopy,
      handoffToHuman,
      controlsId,
      buttonRef: launcherRef,
      dockRef,
      minimised,
      onActivate: openMenu,
      onMinimise: () => setMinimised(true),
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
      return <DockBar {...dockProps} />;
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

    return <DockBar {...dockProps} />;
  }

  if (hidden) return null;

  return (
    <div className="cl-root">
      {menuOpen && !open ? (
        <HelpMenu
          bottomOffset={offset}
          onClose={() => setMenuOpen(false)}
          onStart={openChat}
          variant={isDesktop ? "desktop" : "mobile"}
        />
      ) : isDesktop ? (
        !open && (
          <DesktopLauncher
            bottomOffset={offset}
            buttonRef={launcherRef}
            controlsId={controlsId}
            copy={resolvedCopy}
            handoffToHuman={handoffToHuman}
            minimised={minimised}
            onMinimise={() => setMinimised(true)}
            onOpen={openMenu}
          />
        )
      ) : (
        !open && renderMobileLauncher()
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
