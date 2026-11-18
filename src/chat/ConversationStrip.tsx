import { SendIcon } from "./ChatParts";
import type { Agent } from "./types";

type ConversationStripProps = {
  agents: Agent[];
  topics: string[];
  onPickTopic: (topic: string) => void;
  onOpenField: () => void;
};

/**
 * Mobile "strip": a launcher only. Tapping a topic chip or the fake input opens the chat.
 * The input is a button so the phone keyboard does not open on the page itself.
 */
export function ConversationStrip({ agents, topics, onPickTopic, onOpenField }: ConversationStripProps) {
  const lead = agents[0];

  return (
    <section aria-label={`Ask ${lead.name}, a real person`} className="cl-glass cl-strip cl-enter">
      <p className="cl-bubble cl-bubble--agent">
        Questions before you switch? Ask me. I am a real person, not a bot.
      </p>
      <div aria-label="Common topics" className="cl-strip__chips" role="group">
        {topics.map((topic) => (
          <button className="cl-chip" key={topic} onClick={() => onPickTopic(topic)} type="button">
            {topic}
          </button>
        ))}
      </div>
      <button aria-label="Type your message to a real person" className="cl-strip__field" onClick={onOpenField} type="button">
        <span>Type your message…</span>
        <span className="cl-strip__send">
          <SendIcon />
        </span>
      </button>
    </section>
  );
}
