# Chat launcher requirements

Build the Outfox chat launcher in React. This document describes the launcher that is on the current page. Match the wording, layout, and behaviour below. Do not invent extra states.

The launcher sits on top of the page. It does not block the page. Clicking it opens the chat. In this build the chat opens in the page. It does not open a new tab.

## Wording

Use these lines on desktop, tablet, and mobile. Do not change them.

| | Text |
| --- | --- |
| Line 1, bold | Fastest way to get help: chat with us |
| Line 2 | No queue, no hold music. Most issues are resolved in chat. |
| Screen reader name | Fastest way to get help: chat with us. No queue, no hold music. Most issues are resolved in chat. |

When the desktop chat is open, line 1 changes to **Close chat**. Line 2 stays the same. The screen reader name becomes **Close chat**.

Do not show any of these on the launcher:

- "real person"
- "not a bot"
- "agents online"
- a reply time, such as "replies in 4 min"
- agent photos or initials
- a green online dot

`handoffToHuman` is off. Do not turn it on unless a real person can take over the chat. If it is on, keep line 1 and change only line 2 to:

> Instant answers, with a real person if you need one

The screen reader name in that case is:

> Need help? Chat with us. Instant answers, with a real person if you need one.

## What the control looks like

The same card is used on every screen size. It has three parts, in one row:

1. A chat icon. The bubble is `#7000ff`. It sits in a 36px white circle. Purple is only on the icon.
2. The two lines of text. Line 1 is white, 600 weight. Line 2 is white at 82% opacity.
3. A white chevron on the right.

The button behind those parts is `#0c2c38`, with 16px rounded corners. It sits inside a `#001e28` shell with 22px rounded corners and 12px of padding. There is no frosted glass and no blur.

Text must wrap. It must not be cut off. On a 414px-wide card, line 1 stays on one line and line 2 wraps to two lines.

### Desktop, 1024px and wider

- Fix the card to the bottom-right.
- Keep 24px from the right and bottom edges, plus any safe-area inset.
- The shell is 414px wide, or `100vw - 48px` when the screen is narrower than that.
- The card stays that size while the visitor scrolls. Do not shrink it to an icon.

### Tablet, 640px to 1023px

- Same card as desktop.
- Fix it to the bottom-right, 24px from the edges.
- It stays visible while the page scrolls.

### Phone, under 640px

- The shell runs along the bottom edge, full width.
- Only the top corners are rounded (18px).
- Padding is 8px on the sides and 8px on the top. The bottom padding is at least 8px and grows for the safe area.
- The button fills the shell. Line 1 is 14px. Line 2 is 12px.
- The bar stays full width while the visitor scrolls. Do not turn it into a circle or a side button.
- Do not put a second chat button in the page header. The logo and menu stay. This bar is the only chat entry on the phone.

Leave space at the bottom of the page equal to the bar height, so the bar does not cover the footer. Measure the real height. Do not guess a fixed number.

## Desktop prompt bubble

On desktop only, a short prompt may sit above the card. Show it only when all of these are true:

- The chat is closed.
- The visitor has not scrolled past the hero. Treat "past the hero" as a scroll position greater than 80% of the window height.
- The visitor has not dismissed the prompt in this browser tab.
- The page path matches one of the rows below.

| Path | Prompt |
| --- | --- |
| `/tariffs` and anything under it | Questions about our fixed tariffs? |
| `/help/…` (must have something after `/help/`) | Can't find what you need? Ask us |
| `/moving-home` and anything under it | Moving home? We can help |

The home page, and any path that is not in the table, shows no prompt.

The prompt has an X. The X label is **Dismiss message**. Clicking the X hides the prompt for the rest of that browser tab. Store that in `sessionStorage` under the key `outfox-chat-teaser-dismissed`. Clicking the prompt text opens the chat.

## Behaviour

- One launcher is on the page. Desktop and mobile are the same component, with a different layout.
- The button is a real `<button>`.
- `aria-expanded` is `false` when the chat is closed and `true` when it is open.
- `aria-controls` points at the open chat.
- Clicking the card opens the chat.
- On desktop, clicking the card again while the chat is open closes it.
- Focus must be visible. Use a 3px `#7100f1` outline with a 3px offset.
- Hover on desktop and tablet lifts the button by 2px and changes the button background to `#143c4b`. On a phone, do not move the button on hover.
- Respect `prefers-reduced-motion`. If it is set, do not animate the entrance or the hover lift.

## Done when

- Desktop, tablet, and phone all show the two lines in the wording table, with the purple chat icon and the chevron.
- The words are not clipped at 1440px, 768px, 414px, or 320px.
- Scrolling the page does not hide or shrink the launcher.
- On a phone, the bar stays fixed to the bottom edge and the page content can still be scrolled out from under it.
- The phone header has no chat button.
- The prompt appears only on the three paths above, and only on desktop before the hero is scrolled away.
- Dismissing the prompt keeps it hidden until the tab is closed.
- A screen reader announces the full screen-reader name from the wording table.
- The launcher does not say a person is waiting, unless `handoffToHuman` is on.
