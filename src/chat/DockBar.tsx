import type { RefObject } from "react";
import { AgentAvatars, StatusDot } from "./ChatParts";
import type { Agent } from "./types";

type DockBarProps = {
  agents: Agent[];
  agentsOnline: boolean;
  replyTimeMins: number;
  controlsId: string;
  expanded: boolean;
  /** Compact = the small pill shown after the visitor scrolls past the hero. */
  compact: boolean;
  bottomOffset: number;
  buttonRef: RefObject<HTMLButtonElement | null>;
  onActivate: () => void;
};

/** Mobile and tablet (under 1024px): the bottom dock. Compact mode is the small pill. */
export function DockBar({
  agents,
  agentsOnline,
  replyTimeMins,
  controlsId,
  expanded,
  compact,
  bottomOffset,
  buttonRef,
  onActivate,
}: DockBarProps) {
  if (compact) {
    return (
      <div
        className="cl-dock-compact cl-enter"
        style={{ bottom: `calc(18px + env(safe-area-inset-bottom) + ${bottomOffset}px)` }}
      >
        <button
          aria-controls={controlsId}
          aria-expanded={expanded}
          aria-label="Chat to a real person"
          className="cl-glass cl-glass--purple cl-pill cl-pill--mini"
          onClick={onActivate}
          ref={buttonRef}
          type="button"
        >
          <AgentAvatars agents={agents} online={agentsOnline} size={34} />
          <span className="cl-pill__label">Chat</span>
        </button>
      </div>
    );
  }

  return (
    <div className="cl-dock cl-enter">
      <div className="cl-glass cl-dock__bar">
        <p className="cl-dock__status">
          <StatusDot online={agentsOnline} />
          {agentsOnline ? `Real agents online · reply in ${replyTimeMins} min` : "Agents are away · leave a message"}
        </p>
        <button
          aria-controls={controlsId}
          aria-expanded={expanded}
          aria-label="Chat to a real person. Not a bot. Tap to start."
          className="cl-glass cl-glass--purple cl-dock__pill"
          onClick={onActivate}
          ref={buttonRef}
          type="button"
        >
          <AgentAvatars agents={agents} size={36} />
          <span className="cl-pill__text">
            <strong>Chat to a real person</strong>
            <small>Not a bot. Tap to start.</small>
          </span>
        </button>
      </div>
    </div>
  );
}
