# Outfox chat launcher

The `<ChatLauncher />` component in this folder replaces the old "Chat with us" buttons.

## Files

| File | What it does |
| --- | --- |
| `ChatLauncher.tsx` | The state machine. Picks which view to show based on screen size, scroll position and cookie state. |
| `DesktopLauncher.tsx` | Desktop (1024px and up): the floating glass pill. |
| `DockBar.tsx` | Mobile and tablet dock, plus the small compact pill. |
| `PeekCard.tsx` | Mobile "peek" sheet (variant `peek`). |
| `ConversationStrip.tsx` | Mobile "strip" with topic chips (variant `strip`). |
| `ChatPanel.tsx` | The open chat: desktop window, tablet sheet or phone full screen. Lazy-loaded. |
| `ChatParts.tsx` | Shared avatars, status dot and icons. |
| `mockChatProvider.ts` | Fake agent for local testing. |
| `useChatSession.ts` | Connects a provider to React state. |
| `useVisualViewport.ts` | Sets `--vvh` so the composer sits above the on-screen keyboard. |
| `useScrollPastHero.ts` | True once the visitor has scrolled past the hero. |
| `useCookieConsent.ts` | Reads the cookie banner and consent state. |
| `useDialog.ts` | Focus trap, Escape to close, focus restore, scroll lock. |
| `chat.css` | All launcher styles. Classes use the `cl-` prefix. |

## Props

| Prop | Type | Notes |
| --- | --- | --- |
| `agentsOnline` | `boolean` | Shows the green dot and "Real agents online" versus "Agents are away". |
| `replyTimeMins` | `number` | Shown as "replies in ~X min". |
| `agents` | `{ name, avatarUrl }[]` | Up to two are shown stacked. Empty `avatarUrl` shows the first letter. |
| `topics` | `string[]` | Chips for the `strip` variant. |
| `variant` | `'dock' \| 'peek' \| 'strip'` | Mobile and tablet style only. Desktop always uses the pill. |
| `onOpen` / `onClose` | `() => void` | Called when the chat opens or closes. |
| `onSendMessage` | `(text, topic?) => void` | Called when the visitor sends a message. |
| `isAgentTyping` | `boolean` | Shows "… is typing" only when this is `true`. Never faked. |
| `messages` | `Message[]` | `{ id, author: 'customer' \| 'agent', text, topic? }` |
| `requireConsentBeforeLoad` | `boolean` | When `true`, the launcher stays hidden until consent is given. |
| `bottomOffset` | `number` | Extra space in pixels above the launcher, for example for a sticky button. |

## Variants

- **`dock`** (mobile default, Option 1): a full-width glass bar at the bottom with a status line. After the visitor scrolls past the hero it becomes a small pill.
- **`peek`** (Option 2): a glass sheet with a greeting and a "Start chat" button. It traps focus and locks scroll. Closing it turns it into the small pill.
- **`strip`**: an agent bubble, topic chips and a fake input. Tapping a chip sends that topic as the first message.

Add `?chatVariant=strip` (or `dock` or `peek`) to the URL to override the variant for testing.

## Wiring it up

`src/App.tsx` owns the provider and passes messages to the launcher:

```tsx
const { messages, isAgentTyping, sendMessage } = useChatSession(chatProvider);
<ChatLauncher ... messages={messages} isAgentTyping={isAgentTyping} onSendMessage={sendMessage} />
```

## Swapping in the real chat vendor

1. Create an object that implements `ChatProvider` in `types.ts`. It needs `getSnapshot`, `subscribe` and `sendMessage`.
2. Inside it, call the vendor SDK. Whenever a message arrives or the agent starts or stops typing, update the snapshot and notify the listeners.
3. In `App.tsx`, replace `createMockChatProvider()` with your new provider. Nothing else needs to change.

## Cookie banner

There is no cookie banner component in the site yet. When one is added, it should:

- Have the attribute `data-cookie-banner`, so the launcher moves above it.
- Store `outfox-cookie-consent` in `localStorage` when the visitor accepts.
- Dispatch the event `outfox:cookie-consent-change` on `window` after accepting.

The banner should use a z-index above `--cl-z-panel` (55), for example 80.

## Known limits

- The desktop focus trap also applies to the desktop window, so Tab stays inside the chat while it is open.
- Scroll lock uses `overflow: hidden` on the body. Some iOS versions still allow a little scrolling behind a sheet.
- Hero detection is approximate. It uses 80% of the window height, not the real hero element.
