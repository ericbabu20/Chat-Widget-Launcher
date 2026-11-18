import type { RefObject } from "react";
import { AgentAvatars, CloseIcon } from "./ChatParts";
import type { Agent } from "./types";

type DesktopLauncherProps = {
  agents: Agent[];
  agentsOnline: boolean;
  replyTimeMins: number;
  controlsId: string;
  expanded: boolean;
  compact: boolean;
  showTeaser: boolean;
  bottomOffset: number;
  buttonRef: RefObject<HTMLButtonElement | null>;
  onActivate: () => void;
  onDismissTeaser: () => void;
};

/** Desktop (1024px and up): the floating glass pill, bottom-right. */
export function DesktopLauncher({
  agents,
  agentsOnline,
  replyTimeMins,
  controlsId,
  expanded,
  compact,
  showTeaser,
  bottomOffset,
  buttonRef,
  onActivate,
  onDismissTeaser,
}: DesktopLauncherProps) {
  return (
    <div className="cl-desktop cl-enter" style={{ bottom: `calc(24px + env(safe-area-inset-bottom) + ${bottomOffset}px)` }}>
      {showTeaser && (
        <div className="chat-teaser">
          <button aria-label="Dismiss message" className="chat-teaser__close" onClick={onDismissTeaser} type="button">
            <CloseIcon />
          </button>
          <button className="chat-teaser__bubble" onClick={onActivate} type="button">
            Hi. Need any help?
          </button>
        </div>
      )}
      <button
        aria-controls={controlsId}
        aria-expanded={expanded}
        aria-label={expanded ? "Close chat" : "Chat to a real person. Not a bot."}
        className={`cl-glass cl-pill ${compact ? "is-compact" : ""}`}
        onClick={onActivate}
        ref={buttonRef}
        type="button"
      >
        <AgentAvatars agents={agents} online={agentsOnline} />
        <span className="cl-pill__text">
          <strong>{expanded ? "Close chat" : "Chat to a real person"}</strong>
          <small>Not a bot · replies in ~{replyTimeMins} min</small>
        </span>
      </button>
    </div>
  );
}
