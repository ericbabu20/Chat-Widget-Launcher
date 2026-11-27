import { CircleCheck } from "lucide-react";
import { CtaButton, Section } from "./ui";

/**
 * TODO: replace both placeholders with the real addresses once they are confirmed.
 * A full address on another website (https://...) opens in a new tab automatically.
 * An address on this site (/something or #something) opens in the same tab.
 */
const APPLY_URL = "#warm-home-discount"; // APPLICATION URL – to be confirmed
const INFO_URL = "#warm-home-discount"; // WARM HOME DISCOUNT INFO PAGE URL – to be confirmed

const HEADING_ID = "warm-home-discount-heading";

/** True when the link leaves this site, so it needs a new tab and a screen reader warning. */
function isExternal(url: string) {
  try {
    return new URL(url, window.location.href).origin !== window.location.origin;
  } catch {
    return false;
  }
}

function LinkLabel({ children, url }: { children: string; url: string }) {
  return (
    <>
      {children}
      {isExternal(url) ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </>
  );
}

/**
 * Warm Home Discount: one soft lilac card that matches the illustration's own colours. Words on the left, the
 * eligibility prompt set apart just above the two buttons, and the illustration fading in from the right edge.
 * Wide screens (1280px and up): two columns. Phones and tablets: illustration first, then the words, then
 * full-width buttons.
 */
export function WarmHomeDiscountSection() {
  return (
    <Section id="warm-home-discount" labelledBy={HEADING_ID}>
      <div className="group grid grid-cols-1 overflow-hidden rounded-[32px] border border-transparent bg-[linear-gradient(180deg,#e2d6fb_0%,#ede6fb_100%)] shadow-[0_0_0_1px_rgb(113_0_241/0.08),0_4px_16px_rgb(0_0_0/0.04)] xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] xl:items-stretch">
        <div className="relative z-10 flex flex-col justify-center gap-6 px-6 pt-2 pb-8 min-[769px]:px-10 min-[769px]:pb-10 xl:gap-5 xl:py-6">
          <div className="flex flex-col gap-3">
            <h2
              className="text-[2.25rem] leading-[2.5rem] font-bold tracking-[-1px] text-balance text-ink min-[769px]:text-[56px] min-[769px]:leading-[56px] min-[769px]:tracking-[-1.5px]"
              id={HEADING_ID}
            >
              Warm Home Discount
            </h2>
            <p className="text-lg leading-[28px] font-light text-[#334b53] md:text-xl md:leading-[30px]">
              If you live in Scotland and do not qualify for the Core Group rebate, you can apply for the Broader Group
              for Scotland.
            </p>
          </div>

          {/* The prompt that leads into the buttons, set apart so it is the first thing the eye lands on after the heading. */}
          <div className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/55 p-4 shadow-[0_8px_24px_rgb(91_0_196/0.08),inset_0_1px_0_rgb(255_255_255/0.9)] backdrop-blur-xl backdrop-saturate-150 min-[769px]:items-center min-[769px]:p-4 xl:py-3 contrast-more:border-brand contrast-more:bg-white [@media(prefers-reduced-transparency:reduce)]:bg-white">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-brand">
              <CircleCheck className="size-6" strokeWidth={2} />
            </span>
            <p className="text-lg leading-[24px] font-medium tracking-[-0.2px] text-ink md:text-xl">
              Check to see if you are eligible and apply today.
            </p>
          </div>

          <div className="flex flex-col gap-3 min-[769px]:flex-row min-[769px]:flex-wrap min-[769px]:gap-4">
            <CtaButton external={isExternal(APPLY_URL)} href={APPLY_URL}>
              <LinkLabel url={APPLY_URL}>Apply today</LinkLabel>
            </CtaButton>
            <CtaButton external={isExternal(INFO_URL)} href={INFO_URL} variant="outline">
              <LinkLabel url={INFO_URL}>Find out more</LinkLabel>
            </CtaButton>
          </div>
        </div>

        {/*
          Decorative illustration, running right to the card edge. Its background colours match the card, and a mask
          fades it into the card (on the left edge on wide screens, the bottom edge on phones and tablets), so there
          is no hard picture edge. It zooms in very slightly when the card is hovered (not for people who reduce motion).
        */}
        <div className="relative min-h-[230px] [mask-image:linear-gradient(to_bottom,#000_62%,transparent)] max-xl:order-first min-[769px]:max-xl:min-h-[320px] xl:min-h-[300px] xl:[mask-image:linear-gradient(to_right,transparent,#000_36%)]">
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover:scale-[1.03]"
            decoding="async"
            height={621}
            loading="lazy"
            sizes="(min-width: 1280px) 560px, 100vw"
            src="/assets/home/warm-home-discount-house.webp"
            srcSet="/assets/home/warm-home-discount-house-640.webp 640w, /assets/home/warm-home-discount-house.webp 1024w"
            width={1024}
          />
        </div>
      </div>
    </Section>
  );
}