import { ArrowRight } from "lucide-react";
import { type FormEvent, useId, useRef, useState } from "react";
import { HeroLights } from "../HeroLights";
import { HeroSnow } from "../HeroSnow";
import { HomeNav } from "./HomeNav";
import { formatPostcode, isValidUkPostcode } from "./postcode";
import { TrustpilotRating } from "./TrustpilotRating";

const SCENE_WIDE = "/assets/b6bb6.png"; // fox and Christmas tree on the right
const SCENE_TALL = "/assets/9793d.png"; // same scene, fox at the bottom on phones
const AWARD_BADGE = "/assets/a1cbd.png";
const POSTCODE_INPUT_ID = "hero-postcode";

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

/**
 * The first screen: navigation over the Christmas scene, with the headline, award, postcode form and Trustpilot rating.
 * Reading order is always headline, award, postcode form, Trustpilot. The fox and tree are part of the picture.
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
    <div className="flex min-h-svh flex-col">
      <HomeNav onGetQuote={focusHeroPostcode} />

      <section aria-labelledby="hero-heading" className="flex flex-1 items-end px-6 pt-20 pb-6">
        <div className="relative isolate min-h-[calc(100svh-6.5rem)] w-full overflow-hidden rounded-2xl bg-[#d9d0f0]">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <picture className="block h-full w-full">
              <source media="(min-width: 768px)" srcSet={SCENE_WIDE} />
              <img
                alt=""
                className="absolute inset-x-0 bottom-0 h-auto w-full md:inset-0 md:h-full md:object-cover md:object-[right_center]"
                decoding="async"
                fetchPriority="high"
                src={SCENE_TALL}
              />
            </picture>
            <div className="absolute inset-0 hidden md:block">
              <HeroLights variant="desktop" />
            </div>
            {/* Same shape as the phone artwork, so the twinkle sits on the tree rather than the sky. */}
            <div className="absolute inset-x-0 bottom-0 aspect-[941/1672] md:hidden">
              <HeroLights variant="mobile" />
            </div>
            <HeroSnow />
          </div>

          <div className="relative z-10 flex h-full flex-col items-start justify-start p-6 pt-32 pb-10 md:p-12 md:pt-36">
            <h1
              className="mb-6 max-w-xl text-5xl leading-[1.05] font-medium text-ink md:text-6xl"
              id="hero-heading"
              style={{ letterSpacing: "-0.04em" }}
            >
              Pay less for
              <br />
              your energy
            </h1>

            <div className="mb-8 flex max-w-2xl items-center gap-4">
              <img alt="" className="size-14 shrink-0" height={620} src={AWARD_BADGE} width={620} />
              <div>
                <p className="text-lg font-medium text-ink md:text-xl">Uswitch Energy Awards 2026</p>
                <p className="mt-1 text-base leading-snug text-ink/80">
                  Overall Customer Satisfaction &amp; Best Value for Money | Small Supplier
                </p>
              </div>
            </div>

            <form className="mb-6 w-full max-w-md" noValidate onSubmit={handleSubmit}>
              <label className="mb-2 block text-base font-medium text-ink" htmlFor={POSTCODE_INPUT_ID}>
                Your postcode
              </label>
              <div className="flex items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-[0_8px_30px_rgb(0_30_40/0.08)] md:pl-6 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand">
                <input
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={error ? true : undefined}
                  aria-required="true"
                  autoCapitalize="characters"
                  autoComplete="postal-code"
                  className="min-h-10 min-w-0 flex-1 bg-transparent text-base text-ink md:text-lg outline-none placeholder:text-ink/60"
                  id={POSTCODE_INPUT_ID}
                  name="postcode"
                  onChange={(event) => setPostcode(event.target.value)}
                  placeholder="e.g. SW1A 1AA"
                  ref={inputRef}
                  spellCheck={false}
                  type="text"
                  value={postcode}
                />
                <button
                  className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2 text-base sm:pr-2 md:gap-3 md:pl-6 font-medium text-white transition-[background-color,scale] duration-200 hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
                  type="submit"
                >
                  Get a quote
                  <span className="hidden rounded-full bg-white p-1.5 text-ink sm:block md:p-2">
                    <ArrowRight aria-hidden="true" className="size-5" />
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

            <TrustpilotRating />
          </div>
        </div>
      </section>
    </div>
  );
}



