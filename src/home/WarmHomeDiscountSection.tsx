import { PillButton, Section } from "./ui";

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
 * Warm Home Discount promo card, in the same family as the "Speak with one of our advisors" card:
 * a soft lilac card with the brand's circle device, no border, large corners.
 * Desktop (769px and wider): text on the left (60%), illustration on the right (40%).
 * Phones and small tablets (768px and narrower): illustration first, then text, then full-width buttons.
 */
export function WarmHomeDiscountSection() {
  return (
    <Section id="warm-home-discount" labelledBy={HEADING_ID}>
      <div className="group grid grid-cols-1 gap-6 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#f1e5ff,#e4d0fd)] p-6 shadow-[0_24px_48px_-24px_rgb(113_0_241/0.28)] min-[769px]:grid-cols-[3fr_2fr] min-[769px]:gap-10 min-[769px]:p-10 lg:p-12">
        <div className="self-center">
          <h2
            className="mb-4 text-5xl leading-[1.02] font-medium text-balance text-brand md:text-6xl"
            id={HEADING_ID}
            style={{ letterSpacing: "-0.04em" }}
          >
            Warm Home Discount
          </h2>
          <p className="mb-4 max-w-xl text-lg leading-relaxed text-ink/75 md:text-xl">
            If you live in Scotland and do not qualify for the Core Group rebate, you can apply for the Broader Group for
            Scotland.
          </p>
          <p className="mb-8 max-w-xl text-lg leading-relaxed font-bold text-ink md:text-xl">
            Check to see if you are eligible and apply today.
          </p>
          <div className="flex flex-col gap-3 min-[769px]:flex-row">
            <PillButton
              arrow
              className="w-full min-[769px]:w-auto"
              external={isExternal(APPLY_URL)}
              href={APPLY_URL}
              variant="brand"
            >
              <LinkLabel url={APPLY_URL}>Apply today</LinkLabel>
            </PillButton>
            <PillButton
              className="w-full min-[769px]:w-auto"
              external={isExternal(INFO_URL)}
              href={INFO_URL}
              variant="brand-outline"
            >
              <LinkLabel url={INFO_URL}>Find out more</LinkLabel>
            </PillButton>
          </div>
        </div>

        {/* Decorative. On desktop it fills its column but never adds height, so the text column sets the card height. */}
        <div className="relative order-first py-4 min-[769px]:order-none min-[769px]:py-0">
          {/* Three soft rings behind the house. They are faint and fade out at their edges, so they merge into the card fill. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="col-start-1 row-start-1 aspect-square h-[190%] rounded-full bg-[radial-gradient(circle,transparent_55%,rgb(255_255_255/0.22)_75%,transparent_100%)]" />
            <span className="col-start-1 row-start-1 aspect-square h-[140%] rounded-full bg-[radial-gradient(circle,transparent_55%,rgb(255_255_255/0.3)_75%,transparent_100%)]" />
            <span className="col-start-1 row-start-1 aspect-square h-[95%] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.5)_0%,rgb(255_255_255/0.4)_60%,transparent_100%)]" />
          </div>
          <img
            alt=""
            className="relative mx-auto h-36 w-auto motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-[1.03] min-[769px]:absolute min-[769px]:inset-0 min-[769px]:h-full min-[769px]:w-full min-[769px]:object-contain"
            decoding="async"
            height={768}
            loading="lazy"
            src="/assets/warm-home-discount-house.png"
            width={1024}
          />
        </div>
      </div>
    </Section>
  );
}
