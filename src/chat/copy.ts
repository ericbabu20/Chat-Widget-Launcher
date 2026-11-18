/**
 * Every line of text on the launcher (mobile dock, tablet dock and desktop pill).
 * Placeholders: {replyTimeMins} and {nextAvailableText} are filled in at render time.
 * Pass a `copy` prop to ChatLauncher to override any of these per page (for A/B tests).
 */

export type LauncherLines = {
  /** Bold first line. */
  line1: string;
  /** Smaller second line. */
  line2: string;
  /** Full accessible name of the button. */
  ariaLabel: string;
};

export type NarrowLines = {
  line1: string;
  line2: string;
};

export type LauncherCopy = {
  online: LauncherLines;
  offline: LauncherLines;
  /** Used on screens under 360px wide while agents are online. Text wraps, never truncates. */
  narrow: NarrowLines;
};

export type LauncherCopyOverride = {
  online?: Partial<LauncherLines>;
  offline?: Partial<LauncherLines>;
  narrow?: Partial<NarrowLines>;
};

export const DEFAULT_NEXT_AVAILABLE_TEXT = "as soon as we're back";

export const defaultLauncherCopy: LauncherCopy = {
  online: {
    line1: "Need help? Chat to a real person",
    line2: "Not a bot. Usually replies in {replyTimeMins} min",
    ariaLabel: "Need help? Chat to a real person. Not a bot, usually replies in {replyTimeMins} minutes.",
  },
  offline: {
    line1: "Need help? Leave us a message",
    line2: "A real person will reply {nextAvailableText}",
    ariaLabel: "Need help? Leave us a message. A real person will reply {nextAvailableText}.",
  },
  narrow: {
    line1: "Need help?",
    line2: "Chat to a real person, not a bot",
  },
};

export function resolveLauncherCopy(override?: LauncherCopyOverride): LauncherCopy {
  return {
    online: { ...defaultLauncherCopy.online, ...override?.online },
    offline: { ...defaultLauncherCopy.offline, ...override?.offline },
    narrow: { ...defaultLauncherCopy.narrow, ...override?.narrow },
  };
}

export type LauncherText = {
  line1: string;
  line2: string;
  /** Full sentence read by screen readers. */
  ariaLabel: string;
  /** Short name used by the icon-only (collapsed) state. */
  collapsedLabel: string;
};

export function getLauncherText({
  copy,
  agentsOnline,
  replyTimeMins,
  nextAvailableText,
  narrow,
}: {
  copy: LauncherCopy;
  agentsOnline: boolean;
  replyTimeMins: number;
  nextAvailableText: string;
  narrow: boolean;
}): LauncherText {
  const values = { replyTimeMins: String(replyTimeMins), nextAvailableText };
  const lines = agentsOnline ? copy.online : copy.offline;
  // The short narrow copy only makes sense while online. Offline never shows a reply time.
  const useNarrow = narrow && agentsOnline;

  return {
    line1: fill(useNarrow ? copy.narrow.line1 : lines.line1, values),
    line2: fill(useNarrow ? copy.narrow.line2 : lines.line2, values),
    ariaLabel: fill(lines.ariaLabel, values),
    collapsedLabel: fill(lines.line1, values),
  };
}

function fill(template: string, values: { replyTimeMins: string; nextAvailableText: string }) {
  return template
    .replace(/\{replyTimeMins\}/g, values.replyTimeMins)
    .replace(/\{nextAvailableText\}/g, values.nextAvailableText);
}
