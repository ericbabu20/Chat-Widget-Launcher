import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Small building blocks shared by the home page sections.
 * Styling is Tailwind. Colours and fonts come from the theme in src/index.css (brand guidelines).
 */

type PillButtonProps = {
  children: ReactNode;
  /** "dark" = Outfox Black pill. "light" = white pill, for dark cards. "outline" = outlined pill. */
  variant?: "dark" | "light" | "outline" | "brand" | "brand-outline" | "light-outline";
  /** Adds the round arrow on the right, like the "Join us" button in the design. */
  arrow?: boolean;
  /** A small icon before the label. */
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  className?: string;
};

const PILL_BASE =
  "group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full text-base font-medium whitespace-nowrap " +
  "transition-[background-color,scale] duration-200 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 " +
  "focus-visible:outline-2 focus-visible:outline-offset-4";

const PILL_VARIANTS = {
  dark: "bg-ink text-white hover:bg-ink-soft focus-visible:outline-brand",
  light: "bg-white text-ink hover:bg-[#f1e5ff] focus-visible:outline-white",
  outline: "border border-ink bg-transparent text-ink hover:bg-white focus-visible:outline-brand",
  // White outlined pill, for the purple header bar.
  "light-outline": "border border-white bg-transparent text-white hover:bg-white/15 focus-visible:outline-white",
  // Outfox purple pills (white text on #7100f1 is about 7:1).
  brand: "bg-brand text-white hover:bg-brand-dark focus-visible:outline-ink",
  // Darker purple so the label stays AA-readable on a lilac fill (about 6:1).
  "brand-outline": "border border-brand-dark bg-transparent text-brand-dark hover:bg-white focus-visible:outline-ink",
} as const;

const ARROW_CIRCLES = {
  dark: "bg-white text-ink",
  light: "bg-ink text-white",
  outline: "bg-ink text-white",
  "light-outline": "bg-white text-brand",
  brand: "bg-white text-brand",
  "brand-outline": "bg-brand text-white",
} as const;

/** The small pill buttons, used in the header's mobile menu. */
export function PillButton({
  children,
  variant = "dark",
  arrow = false,
  icon: Icon,
  href,
  onClick,
  external,
  className = "",
}: PillButtonProps) {
  const spacing = arrow ? "py-2 pr-2 pl-7" : "px-7 py-2.5";
  const classes = `${PILL_BASE} ${PILL_VARIANTS[variant]} ${spacing} ${className}`;
  const content = (
    <>
      {Icon ? <Icon aria-hidden="true" className="size-5" /> : null}
      <span>{children}</span>
      {arrow ? (
        <span className={`rounded-full p-2 ${ARROW_CIRCLES[variant]}`}>
          <ArrowRight aria-hidden="true" className="size-5" />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type="button">
      {content}
    </button>
  );
}

type CtaButtonProps = {
  children: ReactNode;
  /** "primary" = purple gradient pill with a round arrow. "outline" = purple outlined pill. */
  variant?: "primary" | "outline";
  href?: string;
  onClick?: () => void;
  external?: boolean;
  className?: string;
};

const CTA_BASE =
  "inline-flex h-14 shrink-0 items-center justify-center gap-2.5 rounded-full text-xl leading-6 font-medium whitespace-nowrap " +
  "transition-[filter,background-color,scale] duration-200 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand max-sm:w-full";

const CTA_VARIANTS = {
  // White text on the gradient is at least 7:1.
  primary:
    "min-w-[247px] border border-white/30 bg-[linear-gradient(179deg,#9b4cf5_3%,#7100f1_50%,#5900c2_97%)] px-[23px] text-white hover:brightness-110",
  outline: "border border-brand px-[26px] text-brand hover:bg-white",
} as const;

/** The big call-to-action buttons used under section headings (56px tall, gradient or outlined). */
export function CtaButton({ children, variant = "primary", href, onClick, external, className = "" }: CtaButtonProps) {
  const classes = `${CTA_BASE} ${CTA_VARIANTS[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {variant === "primary" ? (
        <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-white">
          <img alt="" draggable={false} height={12} src="/assets/wf/arrow.svg" width={12} />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type="button">
      {content}
    </button>
  );
}

type SectionProps = {
  id?: string;
  /** The id of the section's heading, so screen readers can name the section. */
  labelledBy: string;
  children: ReactNode;
  className?: string;
  /** Up and down spacing. The design spaces each section a little differently, so a section can set its own. */
  padding?: string;
};

/** A page section: 24px side padding, content up to 1195px wide (the width used all through the design). */
export function Section({ id, labelledBy, children, className = "", padding = "py-12 md:py-[82px]" }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={`scroll-mt-24 px-6 ${padding} ${className}`} id={id}>
      <div className="rise mx-auto w-full max-w-[1195px]">{children}</div>
    </section>
  );
}

/** The heading style used by every section: 56px bold on desktop, with an optional line of lighter text under it. */
export const HEADING =
  "text-[2.25rem] leading-[2.5rem] font-bold tracking-[-1px] md:text-[56px] md:leading-[56px] md:tracking-[-1.5px]";

export const INTRO = "text-lg leading-6 font-light tracking-[-0.3px] text-[#314853] md:text-xl";

type SectionHeaderProps = {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Heading colour. The design uses Outfox Black, pure black or Outfox purple on different sections. */
  tone?: "ink" | "black" | "brand";
  className?: string;
};

const HEADING_TONES = { ink: "text-ink", black: "text-black", brand: "text-brand" } as const;

/** A section heading with its short paragraph underneath. */
export function SectionHeader({ id, title, intro, tone = "ink", className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className={`${HEADING} ${HEADING_TONES[tone]}`} id={id}>
        {title}
      </h2>
      {intro ? <p className={INTRO}>{intro}</p> : null}
    </div>
  );
}

/** Five Trustpilot-green stars. Decorative: the rating is also given as text. `size` is each star's box in px. */
export function Stars({ size = 17 }: { size?: number }) {
  return (
    <span aria-hidden="true" className="inline-flex gap-0.5">
      {[0, 1, 2, 3, 4].map((index) => (
        <span
          className="grid place-items-center rounded-[3px] bg-[#00b67a]"
          key={index}
          style={{ height: size, width: size }}
        >
          <img alt="" draggable={false} height={13} src="/assets/home/tp-star.svg" width={13} />
        </span>
      ))}
    </span>
  );
}

/**
 * A row that scrolls sideways for ever. The content is drawn twice and the row slides half its width, then repeats.
 * For people who reduce motion it stops, shows once, and wraps instead.
 */
export function Marquee({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      aria-label={label}
      className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]"
      role="group"
    >
      <div className="flex w-max items-center motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:gap-y-6">
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center motion-reduce:hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
