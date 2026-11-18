import type { ChatProvider, ChatSnapshot, Message } from "./types";

const REPLY_DELAY_MS = 1400;

function replyFor(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("moving")) {
    return "Moving home? Lovely. Let’s make sure your energy moves with you. What’s your new postcode?";
  }
  if (t.includes("bill")) {
    return "Happy to take a look at your bill. Do you have the amount from your latest statement?";
  }
  if (t.includes("smart")) {
    return "Smart meters are a big help. Is yours already installed, or are you thinking about getting one?";
  }
  if (t.includes("meter")) {
    return "You can send a meter reading in the app or here. Do you have your meter serial number to hand?";
  }
  if (t.includes("switch")) {
    return "Switching is quick and usually takes about five working days. Want me to check which tariff suits you?";
  }
  return "Thanks for getting in touch. I’m a real person on the Outfox team, so let’s get this sorted together.";
}

/** Local fake transport for testing. It never contacts a server. */
export function createMockChatProvider(): ChatProvider {
  let snapshot: ChatSnapshot = { messages: [], isAgentTyping: false };
  let nextId = 1;
  let replyTimer: number | undefined;
  const listeners = new Set<() => void>();

  function publish(next: ChatSnapshot) {
    snapshot = next;
    listeners.forEach((listener) => listener());
  }

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    sendMessage: (text, topic) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const customer: Message = { id: String(nextId++), author: "customer", text: trimmed, topic };
      publish({ messages: [...snapshot.messages, customer], isAgentTyping: true });

      if (replyTimer !== undefined) window.clearTimeout(replyTimer);
      replyTimer = window.setTimeout(() => {
        const agent: Message = { id: String(nextId++), author: "agent", text: replyFor(trimmed) };
        publish({ messages: [...snapshot.messages, agent], isAgentTyping: false });
        replyTimer = undefined;
      }, REPLY_DELAY_MS);
    },
  };
}
