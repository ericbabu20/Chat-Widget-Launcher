import type { CSSProperties } from "react";
import type { Agent } from "./types";

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
