import { useSyncExternalStore } from "react";
import type { ChatProvider } from "./types";

/** Connects any ChatProvider to React state: returns the messages, typing flag and a send function. */
export function useChatSession(provider: ChatProvider) {
  const snapshot = useSyncExternalStore(provider.subscribe, provider.getSnapshot, provider.getSnapshot);
  return { ...snapshot, sendMessage: provider.sendMessage };
}
