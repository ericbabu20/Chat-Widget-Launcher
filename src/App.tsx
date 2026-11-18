import { useEffect, useState } from "react";
import DesktopLanding from "./generated/DesktopLanding";
import MobileLanding from "./generated/MobileLanding";
import { ChatLauncher } from "./chat/ChatLauncher";
import { createMockChatProvider } from "./chat/mockChatProvider";
import { useChatSession } from "./chat/useChatSession";
import type { Agent, LauncherVariant } from "./chat/types";

const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = 7556;
const MOBILE_WIDTH = 440;
const MOBILE_HEIGHT = 8209;

const CHAT_AGENTS: Agent[] = [
  { name: "Alex", avatarUrl: "" },
  { name: "Sam", avatarUrl: "" },
];

const CHAT_TOPICS = ["Moving home", "My bill", "Smart meter", "Switching", "Meter reading"];

// Local mock for now. Replace with the real vendor adapter later (see src/chat/README.md).
const chatProvider = createMockChatProvider();

function ResponsiveLandingPage() {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? DESKTOP_WIDTH : window.innerWidth,
  );

  useEffect(() => {
    function updateViewportWidth() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const isMobile = viewportWidth < 640;
  const sourceWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
  const sourceHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
  const scale = Math.min(1, viewportWidth / sourceWidth);

  return (
    <div className="landing-viewport" style={{ height: sourceHeight * scale }}>
      <div
        className="landing-canvas"
        style={{
          height: sourceHeight,
          transform: `translateX(-50%) scale(${scale})`,
          width: sourceWidth,
        }}
      >
        {isMobile ? <MobileLanding /> : <DesktopLanding />}
      </div>
    </div>
  );
}

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

export default function App() {
  return (
    <main className="landing-page">
      <ResponsiveLandingPage />
      <ChatWidget />
    </main>
  );
}
