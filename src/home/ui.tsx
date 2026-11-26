import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Feature } from "./content";

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
  // Outfox purple pills, for the Warm Home Discount card (white text on #7100f1 is about 7:1).
  brand: "bg-brand text-white hover:bg-brand-dark focus-visible:outline-ink",
  // Darker purple so the label stays AA-readable on the lilac card (about 6:1).
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

/** Every button on the page: a pill, with an optional round arrow, in the same style as the design brief. */
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

type SectionProps = {
  id?: string;
  /** The id of the section's heading, so screen readers can name the section. */
  labelledBy: string;
  children: ReactNode;
  className?: string;
};

/** A page section: 24px side padding, content up to 88rem wide. */
export function Section({ id, labelledBy, children, className = "" }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={`scroll-mt-6 px-6 py-16 md:py-24 ${className}`} id={id}>
      <div className="rise mx-auto max-w-[88rem]">{children}</div>
    </section>
  );
}

type SplitHeaderProps = {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Buttons under the title, on the left. */
  actions?: ReactNode;
};

/** The "Meet USD Halo." pattern: big title (and buttons) on the left, a larger paragraph on the right. */
export function SplitHeader({ id, title, intro, actions }: SplitHeaderProps) {
  return (
    <div className="mb-10 grid grid-cols-1 items-start gap-6 md:mb-16 md:grid-cols-2 md:gap-12">
      <div>
        <h2 className="text-4xl leading-tight font-medium tracking-[-0.03em] text-balance text-ink md:text-5xl" id={id}>
          {title}
        </h2>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {intro ? <p className="text-xl leading-relaxed text-ink/70 md:text-3xl">{intro}</p> : null}
    </div>
  );
}

type FeatureTileProps = {
  feature: Feature;
  tone: "ink" | "tint";
  className?: string;
};

const TILE_TONES = {
  ink: {
    box: "bg-ink text-white",
    chip: "bg-white/10 text-white",
    body: "text-white/70",
  },
  // Soft lilac with a circle device from the brand's graphic language.
  tint: {
    box:
      "bg-[radial-gradient(circle_at_88%_12%,#c9a6fb_0,#c9a6fb_9rem,transparent_9.05rem),linear-gradient(135deg,#f1e5ff,#dfc8fd)] text-ink",
    chip: "bg-white text-brand",
    body: "text-ink/75",
  },
} as const;

/** A card with the title at the top and the explanation at the bottom. */
export function FeatureTile({ feature, tone, className = "" }: FeatureTileProps) {
  const { icon: Icon, title, body } = feature;
  const styles = TILE_TONES[tone];

  return (
    <li className={`flex min-h-80 flex-col justify-between rounded-2xl p-7 ${styles.box} ${className}`}>
      <div>
        <span className={`mb-5 grid size-12 place-items-center rounded-full ${styles.chip}`}>
          <Icon aria-hidden="true" className="size-6" />
        </span>
        <h3 className="text-2xl leading-snug font-medium tracking-[-0.02em]">{title}</h3>
      </div>
      <p className={`max-w-xs text-base ${styles.body}`}>{body}</p>
    </li>
  );
}

/** Five Trustpilot-green stars. Decorative: the rating is also given as text. */
export function Stars() {
  return (
    <span aria-hidden="true" className="inline-flex gap-0.5">
      {[0, 1, 2, 3, 4].map((index) => (
        <span className="grid size-[1.0625rem] place-items-center rounded-[3px] bg-[#00b67a]" key={index}>
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

