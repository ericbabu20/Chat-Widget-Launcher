import { ArrowRight } from "lucide-react";
import { type FormEvent, useId, useRef, useState } from "react";
import { HeroLights } from "../HeroLights";
import { HeroSnow } from "../HeroSnow";
import { HomeNav } from "./HomeNav";
import { formatPostcode, isValidUkPostcode } from "./postcode";
import { TRUSTPILOT_PAGE } from "./content";
import { Stars } from "./ui";

const SCENE_WIDE = "/assets/b6bb6.png"; // fox and Christmas tree on the right
const SCENE_TALL = "/assets/9793d.png"; // same scene, fox at the bottom on phones
const LOGO_STACKED = "/assets/hero/logo-stacked.svg";
const AWARD_BADGE = "/assets/a1cbd.png";
const POSTCODE_INPUT_ID = "hero-postcode";

// The Trustpilot line is typed in, as it is in the Figma design. Update these when the real numbers change.
const TRUSTPILOT_SCORE = "4.8";
const TRUSTPILOT_REVIEW_COUNT = "54,949+";

/** Every "Get a quote" button on the page brings the visitor back to the postcode box. */
export function focusHeroPostcode() {
  const input = document.getElementById(POSTCODE_INPUT_ID);
  if (!input) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  input.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
  input.focus({ preventScroll: true });
}

type HeroProps = {
  /**
   * Called with a tidy, valid postcode (for example "SW1A 1AA") when the visitor presses "Get a quote".
   * The quote journey does not exist yet, so nothing is wired to this. Connect it here when it does.
   */
  onSubmitPostcode?: (postcode: string) => void;
};

/** A small map pin, drawn in the current text colour. */
function PinIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-4" fill="none" viewBox="0 0 16.2708 19.9375">
      <path
        d="M15.4688 8.13542C15.4688 13.6354 8.13542 19.1354 8.13542 19.1354C8.13542 19.1354 0.802083 13.6354 0.802083 8.13542C0.802083 6.1905 1.5747 4.32523 2.94997 2.94997C4.32523 1.5747 6.1905 0.802083 8.13542 0.802083C10.0803 0.802083 11.9456 1.5747 13.3209 2.94997C14.6961 4.32523 15.4688 6.1905 15.4688 8.13542Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.60417"
      />
      <path
        d="M6.30208 3.55208C6.30208 5.07087 5.07087 6.30208 3.55208 6.30208C2.0333 6.30208 0.802083 5.07087 0.802083 3.55208C0.802083 2.0333 2.0333 0.802083 3.55208 0.802083C5.07087 0.802083 6.30208 2.0333 6.30208 3.55208Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.60417"
        transform="translate(4.583 4.583)"
      />
    </svg>
  );
}

/**
 * The first screen: the Christmas scene fills the page behind the floating header, with the logo, headline,
 * award, postcode form and Trustpilot line on top. Reading order is headline, award, postcode form, Trustpilot.
 * The fox and tree are part of the picture.
 */
export function Hero({ onSubmitPostcode }: HeroProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const errorId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!postcode.trim()) {
      setError("Enter your postcode.");
      inputRef.current?.focus();
      return;
    }
    if (!isValidUkPostcode(postcode)) {
      setError("Enter a full UK postcode, for example SW1A 1AA.");
      inputRef.current?.focus();
      return;
    }

    setError("");
    onSubmitPostcode?.(formatPostcode(postcode));
  }

  return (
    <div>
      <HomeNav onGetQuote={focusHeroPostcode} />

      <section
        aria-labelledby="hero-heading"
        className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-[#e6d8fb] px-6 pt-28 pb-64 md:px-12 md:pt-[147px] lg:px-[clamp(3rem,9.6vw,14rem)] lg:pb-12"
      >
        {/* The picture. It is sized like a "cover" background so the lights and fox stay in the same place on every screen. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 [container-type:size]">
          <div className="absolute bottom-0 left-1/2 aspect-[9/16] w-[max(100cqw,calc(100cqh*9/16))] -translate-x-1/2 lg:right-0 lg:left-auto lg:aspect-video lg:w-[max(100cqw,calc(100cqh*16/9))] lg:translate-x-0">
            <picture className="block h-full w-full">
              <source media="(min-width: 1024px)" srcSet={SCENE_WIDE} />
              <img alt="" className="block h-full w-full" decoding="async" fetchPriority="high" src={SCENE_TALL} />
            </picture>
            <div className="absolute inset-0 hidden lg:block">
              <HeroLights variant="desktop" />
            </div>
            <div className="absolute inset-0 lg:hidden">
              <HeroLights variant="mobile" />
            </div>
          </div>
          <HeroSnow />
        </div>

        <img
          alt="Outfox Energy"
          className="mx-auto h-auto w-36 md:w-[220px]"
          height={128}
          src={LOGO_STACKED}
          width={220}
        />

        <div className="mt-6 flex flex-col items-start md:mt-[22px]">
          <h1
            className="text-[2.5rem] leading-[1.1] font-medium tracking-[-0.04em] text-ink md:text-[60px] md:leading-[63px]"
            id="hero-heading"
          >
            Pay less for your energy
          </h1>

          <div className="mt-6 flex max-w-2xl items-center gap-4">
            <img alt="" className="size-14 shrink-0" height={56} src={AWARD_BADGE} width={56} />
            <div>
              <p className="text-lg leading-7 font-medium text-ink md:text-xl">Uswitch Energy Awards 2026</p>
              <p className="text-base leading-[22px] text-ink/80">
                Overall Customer Satisfaction &amp; Best Value for Money- Small Supplier
              </p>
            </div>
          </div>

          <form className="mt-6 w-full max-w-[437px]" noValidate onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor={POSTCODE_INPUT_ID}>
              Enter your postcode
            </label>
            <div className="flex items-center justify-between gap-2 rounded-full border-[0.5px] border-[#e5e8e9] bg-white p-2 shadow-[0_4px_16px_rgb(0_0_0/0.1)] sm:p-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand">
              <div className="flex min-w-0 flex-1 items-center">
                <span className="grid size-9 shrink-0 place-items-center rounded-full text-brand sm:size-12">
                  <PinIcon />
                </span>
                <input
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={error ? true : undefined}
                  aria-required="true"
                  autoCapitalize="characters"
                  autoComplete="postal-code"
                  className="min-h-10 min-w-0 flex-1 bg-transparent text-[15px] tracking-[0.18px] sm:text-base text-ink outline-none placeholder:text-[#66777f]"
                  id={POSTCODE_INPUT_ID}
                  name="postcode"
                  onChange={(event) => setPostcode(event.target.value)}
                  placeholder="Enter your postcode"
                  ref={inputRef}
                  spellCheck={false}
                  type="text"
                  value={postcode}
                />
              </div>
              <button
                className="inline-flex h-12 shrink-0 sm:h-[52px] items-center gap-2.5 rounded-full border border-white/30 bg-ink px-3.5 text-[15px] font-medium tracking-[-0.15px] text-white transition-[background-color,scale] duration-200 hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.97] sm:px-[23px] motion-reduce:transition-none motion-reduce:active:scale-100"
                type="submit"
              >
                Get a quote
                <span className="hidden size-[22px] place-items-center rounded-full bg-white text-brand sm:grid">
                  <ArrowRight aria-hidden="true" className="size-3" strokeWidth={2.4} />
                </span>
              </button>
            </div>
            {error ? (
              <p
                className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-base font-medium text-danger"
                id={errorId}
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </form>

          <a
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md text-[13px] leading-5 text-[#314853] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            href={TRUSTPILOT_PAGE}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Stars size={20} />
            <span>
              <strong className="font-medium text-ink">Excellent {TRUSTPILOT_SCORE}</strong> out of 5 · Trustpilot
            </span>
            <span aria-hidden="true" className="hidden h-5 w-px bg-[#606060] sm:block" />
            <span>
              Rated on <strong className="font-medium text-ink">{TRUSTPILOT_REVIEW_COUNT}</strong> reviews
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </section>
    </div>
  );
}
