import type { CSSProperties } from "react";
import type { Agent } from "./types";

export function BackIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22">
      <path d="M15 5 8 12l7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function PersonIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <circle cx="12" cy="8" r="3.2" fill="currentColor" />
      <path d="M5.5 19.2c.8-3.1 3.3-4.7 6.5-4.7s5.7 1.6 6.5 4.7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export function PopoutIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="M14 5h5v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M19 5 11 13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M17 13.5V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function MoreIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </svg>
  );
}

export function PaperclipIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
      <path
        d="M8.5 12.5 14.8 6.2a3 3 0 0 1 4.2 4.2l-8.2 8.2a4.2 4.2 0 0 1-6-6l8-8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function ZendeskMark() {
  return (
    <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 14 12" width="14">
      <path d="M1 1.2h12L1 10.8h12" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22">
      <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
      <path
        d="M4 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function StatusDot({ online }: { online: boolean }) {
  return <span aria-hidden="true" className={`cl-dot ${online ? "cl-dot--online" : "cl-dot--offline"}`} />;
}

/** Stacked agent avatars (up to two). Shows the first letter of the name when there is no photo. */
export function AgentAvatars({ agents, size = 32, online }: { agents: Agent[]; size?: number; online?: boolean }) {
  const shown = agents.slice(0, 2);
  const style = { "--cl-avatar-size": `${size}px` } as CSSProperties;

  return (
    <span aria-hidden="true" className="cl-avatars" style={style}>
      {shown.map((agent, index) => (
        <span className="cl-avatar" key={`${agent.name}-${index}`} style={{ zIndex: shown.length - index }}>
          {agent.avatarUrl ? <img alt="" src={agent.avatarUrl} /> : agent.name.charAt(0)}
        </span>
      ))}
      {online !== undefined && <StatusDot online={online} />}
    </span>
  );
}
