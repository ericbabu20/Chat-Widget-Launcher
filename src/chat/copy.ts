/**
 * Every line of text on the launcher: the desktop pill, the mobile/tablet dock and the desktop bubble.
 * Pass a `copy` prop to ChatLauncher to override any of these per page (for A/B tests).
 *
 * Only turn on `handoffToHuman` once a real person can take over the Zendesk chat.
 */

export type BubblePrompt = {
  /** Path pattern. "/tariffs*" matches /tariffs and /tariffs/anything. */
  match: string;
  text: string;
};

export type LauncherCopy = {
  /** Small purple line above the title. */
  eyebrow: string;
  /** Bold title. */
  line1: string;
  /** Smaller second line. */
  line2: string;
  /** Second line when handoffToHuman is true. */
  handoffLine2: string;
  /** Full accessible name of the launcher button. */
  ariaLabel: string;
  /** Accessible name when handoffToHuman is true. */
  handoffAriaLabel: string;
  /** Proactive bubble prompts. Pages that match none of these show no bubble. */
  prompts: BubblePrompt[];
};

export type LauncherCopyOverride = Partial<Omit<LauncherCopy, "prompts">> & {
  prompts?: BubblePrompt[];
};

export const defaultLauncherCopy: LauncherCopy = {
  eyebrow: "Fastest way to get help",
  line1: "Chat with us",
  line2: "Most issues are resolved in chat",
  handoffLine2: "Instant answers, with a real person if you need one",
  ariaLabel: "Fastest way to get help. Chat with us. Most issues are resolved in chat.",
  handoffAriaLabel: "Need help? Chat with us. Instant answers, with a real person if you need one.",
  prompts: [
    { match: "/tariffs*", text: "Questions about our fixed tariffs?" },
    { match: "/help/*", text: "Can't find what you need? Ask us" },
    { match: "/moving-home*", text: "Moving home? We can help" },
  ],
};

export function resolveLauncherCopy(override?: LauncherCopyOverride): LauncherCopy {
  return {
    ...defaultLauncherCopy,
    ...override,
    prompts: override?.prompts ?? defaultLauncherCopy.prompts,
  };
}

export type LauncherText = {
  eyebrow: string;
  line1: string;
  line2: string;
  /** Full sentence read by screen readers. */
  ariaLabel: string;
};

export function getLauncherText({
  copy,
  handoffToHuman,
}: {
  copy: LauncherCopy;
  handoffToHuman: boolean;
}): LauncherText {
  return {
    eyebrow: copy.eyebrow,
    line1: copy.line1,
    line2: handoffToHuman ? copy.handoffLine2 : copy.line2,
    ariaLabel: handoffToHuman ? copy.handoffAriaLabel : copy.ariaLabel,
  };
}

/** The bubble text for this page, or null when the page is not in the list. */
export function promptForPath(prompts: BubblePrompt[], pathname: string): string | null {
  const hit = prompts.find((prompt) => pathMatches(prompt.match, pathname));
  return hit ? hit.text : null;
}

function pathMatches(pattern: string, pathname: string) {
  const wildcard = pattern.endsWith("*");
  const base = (wildcard ? pattern.slice(0, -1) : pattern).replace(/\/$/, "") || "/";
  return wildcard ? pathname === base || pathname.startsWith(`${base}/`) : pathname === pattern;
}
