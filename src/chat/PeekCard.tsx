import { type MouseEvent, useId, useRef } from "react";
import { AgentAvatars, CloseIcon, StatusDot } from "./ChatParts";
import type { Agent } from "./types";
import { useDialog } from "./useDialog";

type PeekCardProps = {
  agents: Agent[];
  agentsOnline: boolean;
  controlsId: string;
  onStart: () => void;
  onClose: () => void;
};

/** Mobile "peek" sheet: a glass card with a greeting. Tapping the card or the button opens the chat. */
export function PeekCard({ agents, agentsOnline, controlsId, onStart, onClose }: PeekCardProps) {
  const lead = agents[0];
  const containerRef = useRef<HTMLElement>(null);
  const titleId = useId();

  useDialog({ containerRef, onClose, lockScroll: true });

  function handleCardClick(event: MouseEvent<HTMLElement>) {
    // Buttons handle their own clicks. A tap anywhere else on the card opens the chat.
    if ((event.target as HTMLElement).closest("button")) return;
    onStart();
  }

  return (
    <section
      aria-labelledby={titleId}
      aria-modal="true"
      className="cl-glass cl-peek"
      id={controlsId}
      onClick={handleCardClick}
      ref={containerRef}
      role="dialog"
    >
      <div aria-hidden="true" className="cl-sheet__handle" />
      <div className="cl-peek__top">
        <AgentAvatars agents={agents} size={44} />
        <div className="cl-peek__who">
          <strong id={titleId}>{lead.name} · Outfox team</strong>
          <small>
            <StatusDot online={agentsOnline} />
            {agentsOnline ? "A real person, online now" : "A real person, back soon"}
          </small>
        </div>
        <button aria-label="Close chat" className="cl-icon-btn" onClick={onClose} type="button">
          <CloseIcon />
        </button>
      </div>
      <p className="cl-bubble cl-bubble--agent">
        Hi, I’m {lead.name}. Thinking about your energy? Ask me anything. I’m a real person, not a bot.
      </p>
      <button className="cl-btn-primary" onClick={onStart} type="button">
        Start chat
      </button>
    </section>
  );
}
