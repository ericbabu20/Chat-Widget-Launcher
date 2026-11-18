# Outfox Chat Launcher

A modern, frosted-glass customer chat launcher for the **Outfox Energy** website, built in React.

It invites visitors to *chat to a real person* without blocking the page underneath. On desktop it is a floating glass pill. On mobile and tablet it becomes a bottom dock designed for real browsers: it handles the toolbar, safe areas and the on-screen keyboard.

> **Status:** 🚧 In development. This is a prototype being A/B tested against the current "Chat with us" button.

---

## Contents

- [Why this exists](#why-this-exists)
- [Features](#features)
- [Screens and variants](#screens-and-variants)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Props](#props)
- [Chat provider adapter](#chat-provider-adapter)
- [Proactive triggers](#proactive-triggers)
- [Analytics events](#analytics-events)
- [Accessibility](#accessibility)
- [Browser support](#browser-support)
- [Project structure](#project-structure)
- [Testing checklist](#testing-checklist)
- [Design and research notes](#design-and-research-notes)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## Why this exists

The current solid "Chat with us" button covers tariff cards and page content, looks like a third-party plugin, and doesn't tell people they'll reach a human. This launcher aims to:

- **Drive more useful contacts** with page-specific prompts and topic chips
- **Stay out of the way**: glass surfaces, collapse on scroll, and no covering of CTAs, the footer or the cookie banner
- **Build trust** with a visible "real person, not a bot" promise, agent avatars and honest reply times

## Features

- 🪟 **Glass UI**: `backdrop-filter` blur with a solid fallback where unsupported
- 🖥️ **Desktop floating launcher**: a pill that shrinks to an icon after the hero and opens a 380×560 chat panel
- 📱 **Mobile/tablet bottom dock**: three testable variants (dock, peek and strip) plus full-screen chat
- ⌨️ **Keyboard-safe composer**: sized to `visualViewport`, so the input always sits above the keyboard
- 🍪 **Consent-aware**: yields to the cookie banner and can wait for consent before loading
- 💬 **Topic chips**: one tap starts a chat with the chosen topic pre-filled
- 🎯 **Proactive triggers**: time on page and scroll depth, page-specific copy, and frequency caps
- 🔌 **Vendor-agnostic**: chat transport sits behind a `ChatProvider` adapter (a mock is included)
- ♿ **Accessible**: dialog semantics, focus trap, live region and reduced-motion support
- 📊 **Analytics hooks**: every interaction emits an event you can send to GA4 or similar

## Screens and variants

| Breakpoint | State | Description |
|---|---|---|
| Desktop ≥1024px | Floating pill | Glass pill bottom-right with avatars, an online dot and "Chat to a real person". Collapses to an icon past the hero. |
| Desktop ≥1024px | Chat panel | Anchored glass panel with agent header, messages, typing indicator and composer. |
| Mobile/tablet | **W1 – Dock** | Full-width glass bar above the browser toolbar. Status row plus "Chat to a real person" button. |
| Mobile/tablet | **W2 – Peek card** | Bottom sheet with a greeting from a named agent and a "Start chat" button. |
| Mobile/tablet | **W3 – Conversation strip** | Agent bubble, topic chips and a fake input. Tapping it opens W4. |
| Mobile/tablet | **W4 – Full-screen chat** | Real chat. Composer sits above the keyboard and the input is ≥16px so iOS doesn't zoom. |
| Mobile/tablet | **W5 – Cookie banner** | The banner owns the bottom edge and a compact launcher sits above it, or waits for consent. |

On tablet (768–1023px) the sheet is capped at 480px wide, and the chat opens as a 90dvh bottom sheet instead of full screen.

<!-- Add screenshots/GIFs here -->
<!-- ![Desktop launcher](docs/images/desktop.png) ![Mobile dock](docs/images/mobile-w1.png) -->

## Getting started

### Prerequisites

- Node.js 18+
- npm, pnpm or yarn

### Install and run

```bash
git clone https://github.com/<org>/<repo>.git
cd <repo>
npm install
npm run dev
```

Open the local URL that's printed. The mock provider is used by default, so you'll get fake agent replies.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the code |
| `npm run test` | Run unit tests |

> Adjust these to match `package.json` if your scripts differ.

## Usage

```tsx
import { ChatLauncher } from '@/components/ChatLauncher';
import { MockChatProvider } from '@/components/ChatLauncher/providers/MockChatProvider';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <ChatLauncher
        provider={MockChatProvider}
        agentsOnline
        replyTimeMins={2}
        agents={[
          { name: 'Sam', avatarUrl: '/avatars/sam.png' },
          { name: 'Jo', avatarUrl: '/avatars/jo.png' },
        ]}
        topics={['Moving home', 'My bill', 'Smart meter', 'Switching', 'Meter reading']}
        variant="dock"
        requireConsentBeforeLoad={false}
      />
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `provider` | `ChatProvider` | `MockChatProvider` | Chat transport adapter |
| `agentsOnline` | `boolean` | `false` | Shows the online state. When `false`, the launcher falls back to the offline/contact form state. |
| `replyTimeMins` | `number` | — | Typical reply time shown to users. Keep it honest. |
| `agents` | `{ name: string; avatarUrl: string }[]` | `[]` | Agents shown in the avatar stack and header |
| `topics` | `string[]` | `[]` | Topic chips for the W3 strip and empty chat state |
| `variant` | `'dock' \| 'peek' \| 'strip'` | `'dock'` | Mobile/tablet launcher variant, for A/B testing |
| `messages` | `Message[]` | `[]` | Controlled message list (optional) |
| `isAgentTyping` | `boolean` | `false` | Shows the typing line. Only set it from real provider events. |
| `requireConsentBeforeLoad` | `boolean` | `false` | Hides the launcher until cookie consent is given |
| `bottomOffset` | `number` | `0` | Extra px to keep clear of other fixed UI |
| `hideOnPaths` | `string[]` | `['/checkout', '/sign-up/confirm']` | Routes where the launcher is suppressed |
| `triggers` | `TriggerConfig[]` | see below | Proactive prompt rules |
| `onOpen` | `() => void` | — | Called when the chat opens |
| `onClose` | `() => void` | — | Called when the chat closes |
| `onSendMessage` | `(text: string, topic?: string) => void` | — | Called when the user sends a message |
| `onEvent` | `(event: ChatEvent) => void` | — | Analytics hook (see below) |

## Chat provider adapter

The UI doesn't depend on any chat vendor. To plug in a real one (for example Intercom, Zendesk or Freshchat), implement `ChatProvider`:

```ts
export interface ChatProvider {
  init(config: { consentGiven: boolean }): Promise<void>;
  getAvailability(): Promise<{ agentsOnline: boolean; replyTimeMins?: number }>;
  startConversation(opts?: { topic?: string }): Promise<{ conversationId: string }>;
  sendMessage(conversationId: string, text: string): Promise<void>;
  onMessage(cb: (msg: Message) => void): () => void;      // returns unsubscribe
  onTyping(cb: (isTyping: boolean) => void): () => void;  // returns unsubscribe
  destroy(): void;
}
```

Then swap it in:

```tsx
<ChatLauncher provider={MyVendorProvider} ... />
```

> ⚠️ Check with Legal whether the vendor script needs cookie consent before it loads. If it does, set `requireConsentBeforeLoad`.

## Proactive triggers

Prompts are user-friendly by default: delayed, page-specific and capped.

```ts
const triggers: TriggerConfig[] = [
  {
    match: '/tariffs*',
    after: { seconds: 35 },              // or { scrollPercent: 65 }
    message: 'Not sure between 1 and 2-year fixed? Ask a real person.',
  },
  {
    match: '/help/*',
    after: { scrollPercent: 70 },
    message: 'Still stuck? Chat to {agentName}.',
  },
];
```

**Built-in rules**

- At most **2 prompts per session**, and a dismissed prompt doesn't come back that session
- Never shown on paths in `hideOnPaths`, such as checkout or final sign-up steps
- Never shown while the cookie banner is visible
- Mobile uses later thresholds than desktop

## Analytics events

`onEvent` receives `{ name, variant, path, topic?, timestamp }`.

| Event | When |
|---|---|
| `launcher_impression` | Launcher first becomes visible |
| `launcher_collapsed` / `launcher_expanded` | Scroll-based state changes |
| `prompt_shown` / `prompt_dismissed` | Proactive prompt lifecycle |
| `chat_opened` / `chat_closed` | Panel or sheet opens or closes |
| `topic_chip_clicked` | A chip is tapped (includes `topic`) |
| `first_message_sent` | User sends their first message |
| `agent_first_reply` | First agent reply arrives (includes the wait time) |
| `quote_started_after_chat` | Quote flow starts in the same session after a chat |

Example GA4 wiring:

```ts
onEvent={(e) => window.gtag?.('event', e.name, e)}
```

## Accessibility

- The launcher is a real `<button>` with `aria-label`, `aria-expanded` and `aria-controls`
- Chat is a `role="dialog"` with `aria-modal`, labelled by the agent header
- Focus is trapped inside the open chat. Esc closes it, and focus returns to the launcher.
- The message list is an `aria-live="polite"` region
- Hit targets are at least 44×44px, with a visible brand-purple focus ring
- `prefers-reduced-motion` turns slides into fades and stops the online-dot pulse
- Text on glass meets WCAG AA over both the light hero and the purple tariff cards

## Browser support

| Browser | Notes |
|---|---|
| Chrome / Edge (latest 2) | Full support |
| Safari 15.4+ / iOS Safari | Full support. Uses `-webkit-backdrop-filter`, `dvh`/`svh` and `visualViewport`. |
| Firefox (latest 2) | Full support |
| No `backdrop-filter` | Falls back to a near-opaque white surface |

## Project structure

```
src/
└── components/
    └── ChatLauncher/
        ├── ChatLauncher.tsx          # Entry; picks desktop or mobile layout
        ├── desktop/
        │   ├── FloatingPill.tsx
        │   └── ChatPanel.tsx
        ├── mobile/
        │   ├── DockBar.tsx           # W1
        │   ├── PeekCard.tsx          # W2
        │   ├── ConversationStrip.tsx # W3
        │   └── FullScreenChat.tsx    # W4
        ├── shared/
        │   ├── AgentHeader.tsx
        │   ├── MessageList.tsx
        │   ├── Composer.tsx
        │   └── TopicChips.tsx
        ├── hooks/
        │   ├── useVisualViewport.ts
        │   ├── useScrollPastHero.ts
        │   ├── useCookieConsent.ts
        │   └── useProactiveTriggers.ts
        ├── providers/
        │   ├── ChatProvider.ts       # Interface
        │   └── MockChatProvider.ts
        ├── styles/
        │   └── glass.css
        └── types.ts
```

## Testing checklist

Before merging UI changes, check:

- [ ] Desktop Chrome, Safari and Firefox: the pill never covers primary CTAs or tariff card buttons
- [ ] iOS Safari: the composer stays above the keyboard and the page doesn't jump or zoom on focus
- [ ] Android Chrome: same as above
- [ ] Tablet (768px): the sheet is width-capped and the chat opens at 90dvh
- [ ] The footer is never covered (page bottom padding is applied)
- [ ] With the cookie banner showing: the banner owns the bottom edge and the launcher behaves per config
- [ ] Glass text is readable over the hero **and** over the purple tariff cards
- [ ] Keyboard only: Tab to the launcher, open, type, Esc, and focus returns
- [ ] Screen reader (VoiceOver/NVDA) announces new messages
- [ ] Reduced motion: no slide or pulse animations
- [ ] Offline agents: the launcher shows the offline state and never promises a reply time

## Design and research notes

Key principles behind the design:

- **User-initiated beats site-initiated.** Users see interrupting chat as a distraction, so prompts are delayed, contextual and capped ([Baymard](https://baymard.com/blog/live-chat-usability-issues)).
- **Sticky UI on mobile is risky.** The dock is slim, collapses on scroll and is A/B tested against the alternatives.
- **Page-specific copy beats generic greetings**, and engagement-based triggers (30–45s, 60–70% scroll) beat exit intent ([WebChatAgent](https://webchatagent.com/blog/proactive-chat-triggers-benchmarks)).
- **Multiple entry points**, not just a floating launcher. Inline chat links in Help Centre articles and the quote journey increase reach ([Alhena](https://alhena.ai/blog/chat-widget-design-ecommerce-conversions/)).
- **Respond quickly.** Satisfaction peaks with a first response within 5–10s, so only show "online" when it's true ([Ringly](https://www.ringly.io/blog/live-chat-statistics-2026)).

Wireframes: *[link to the design file]*

## Roadmap

- [ ] Connect the real chat vendor through `ChatProvider`
- [ ] Offline state with a contact form fallback
- [ ] Inline chat entry points for Help Centre and quote pages
- [ ] A/B test: proactive vs passive, and dock vs peek vs strip
- [ ] Analytics dashboard for launcher → chat → quote funnel
- [ ] Persist the conversation across page navigations

## Contributing

1. Branch from `main`: `feature/<short-description>`
2. Follow the existing lint and format rules (`npm run lint`)
3. Run through the [testing checklist](#testing-checklist) for UI changes
4. Open a PR with screenshots for desktop and mobile, and link the Jira ticket

---

© Outfox Energy. Internal project. Not for redistribution.
