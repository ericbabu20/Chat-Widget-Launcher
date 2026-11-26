import { useEffect } from "react";
import { BusinessEnergyIntro } from "./business/BusinessEnergyIntro";
import { BusinessEnergyRegister } from "./business/BusinessEnergyRegister";
import { HomePage } from "./home/HomePage";
import { ROUTES, usePathname } from "./router";
import { ChatLauncher } from "./chat/ChatLauncher";
import { createMockChatProvider } from "./chat/mockChatProvider";
import { useChatSession } from "./chat/useChatSession";
import type { Agent, LauncherVariant } from "./chat/types";

const CHAT_AGENTS: Agent[] = [
  { name: "Alex", avatarUrl: "" },
  { name: "Sam", avatarUrl: "" },
];

const CHAT_TOPICS = ["Moving home", "My bill", "Smart meter", "Switching", "Meter reading"];

// Local mock for now. Replace with the real vendor adapter later (see src/chat/README.md).
const chatProvider = createMockChatProvider();

function ChatWidget() {
  const { messages, isAgentTyping, sendMessage } = useChatSession(chatProvider);

  // Hidden testing aid: ?chatVariant=strip (or dock / peek) switches the launcher.
  const override = new URLSearchParams(window.location.search).get("chatVariant");
  const variant: LauncherVariant =
    override === "strip" || override === "peek" || override === "dock" ? override : "dock";

  return (
    <ChatLauncher
      agentsOnline
      agents={CHAT_AGENTS}
      bottomOffset={0}
      isAgentTyping={isAgentTyping}
      messages={messages}
      onSendMessage={sendMessage}
      replyTimeMins={4}
      requireConsentBeforeLoad={false}
      topics={CHAT_TOPICS}
      variant={variant}
    />
  );
}

/** Picks the page for the current address. Anything unknown shows the landing page. */
function Pages() {
  const pathname = usePathname();

  // A new page should always start at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  if (pathname === ROUTES.businessEnergy) return <BusinessEnergyIntro />;
  if (pathname === ROUTES.businessEnergyRegister) return <BusinessEnergyRegister />;
  return <HomePage />;
}

export default function App() {
  return (
    <main className="landing-page">
      <Pages />
      <ChatWidget />
    </main>
  );
}
