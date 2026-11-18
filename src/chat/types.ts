export type Agent = {
  name: string;
  /** Optional photo. When empty, the first letter of the name is shown instead. */
  avatarUrl: string;
};

export type Message = {
  id: string;
  author: "customer" | "agent";
  text: string;
  topic?: string;
};

export type LauncherVariant = "dock" | "peek" | "strip";

export type ChatSnapshot = {
  messages: Message[];
  isAgentTyping: boolean;
};

/**
 * Transport adapter. The launcher never talks to a chat vendor directly.
 * Swap `createMockChatProvider` for an object that implements this interface
 * and wraps the real vendor SDK.
 */
export interface ChatProvider {
  getSnapshot: () => ChatSnapshot;
  subscribe: (listener: () => void) => () => void;
  sendMessage: (text: string, topic?: string) => void;
}
