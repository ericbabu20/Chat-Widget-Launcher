import type { RefObject } from "react";
import { AgentAvatars } from "./ChatParts";
import { getLauncherText, type LauncherCopy } from "./copy";
import type { Agent } from "./types";
import { useMediaQuery } from "./useMediaQuery";

type DockBarProps = {
  agents: Agent[];
  agentsOnline: boolean;
  replyTimeMins: number;
  nextAvailableText: string;
  copy: LauncherCopy;
  controlsId: string;
  expanded: boolean;
  /** Compact = the small pill shown after the visitor scrolls past the hero. */
  compact: boolean;
  bottomOffset: number;
  buttonRef: RefObject<HTMLButtonElement | null>;
  dockRef: RefObject<HTMLDivElement | null>;
  onActivate: () => void;
};

/** Mobile and tablet (under 1024px): the bottom dock. Compact mode is the small pill. */
export function DockBar({
  agents,
  agentsOnline,
  replyTimeMins,
  nextAvailableText,
  copy,
  controlsId,
  expanded,
  compact,
  bottomOffset,
  buttonRef,
  dockRef,
  onActivate,
}: DockBarProps) {
  const narrow = useMediaQuery("(max-width: 359px)");
  const text = getLauncherText({ copy, agentsOnline, replyTimeMins, nextAvailableText, narrow });

  if (compact) {
    return (
      <div
        className="cl-dock-compact cl-enter"
        ref={dockRef}
        style={{ bottom: `calc(18px + env(safe-area-inset-bottom) + ${bottomOffset}px)` }}
      >
        <button
          aria-controls={controlsId}
          aria-expanded={expanded}
          aria-label={text.collapsedLabel}
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
    <div className="cl-dock cl-enter" ref={dockRef}>
      <div className="cl-glass cl-dock__bar">
        <button
          aria-controls={controlsId}
          aria-expanded={expanded}
          aria-label={text.ariaLabel}
          className="cl-glass cl-glass--purple cl-dock__pill"
          onClick={onActivate}
          ref={buttonRef}
          type="button"
        >
          <AgentAvatars agents={agents} online={agentsOnline} size={36} />
          <span className="cl-pill__text">
            <strong>{text.line1}</strong>
            <small>{text.line2}</small>
          </span>
        </button>
      </div>
    </div>
  );
}
