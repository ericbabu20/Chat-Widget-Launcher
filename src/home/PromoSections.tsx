import { APP_STORE_URL, EV_FEATURES, PLAY_STORE_URL } from "./content";
import { CtaButton, HEADING, INTRO, Section } from "./ui";

/**
 * TODO: replace with the real address of the My EV information page once it is confirmed.
 * A full address on another website (https://...) opens in a new tab automatically.
 * An address on this site (/something or #something) opens in the same tab.
 */
const EV_INFO_URL = "#ev-heading"; // MY EV INFO PAGE URL – to be confirmed

/** True when the link leaves this site, so it needs a new tab and a screen reader warning. */
function isExternal(url: string) {
  try {
    return new URL(url, window.location.href).origin !== window.location.origin;
  } catch {
    return false;
  }
}

const ASSETS = "/assets/home";
const WF = "/assets/wf";

const STORE_BADGE =
  "flex h-12 w-[146px] items-center gap-2 rounded-lg border border-[#a6a6a6] bg-ink px-3 text-white transition-[scale] duration-200 " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none motion-reduce:active:scale-100";

/** A full-width dark card: words and two feature boxes on the left, the car on the right. */
export function EvSection() {
  return (
    <section
      aria-labelledby="ev-heading"
      className="scroll-mt-24 px-4 py-12 md:pt-[82px] md:pb-14"
    >
      <div className="rise relative isolate mx-auto flex max-w-[1408px] items-center overflow-hidden rounded-[32px] bg-ink px-6 py-12 md:px-10 md:py-14 xl:min-h-[598px] xl:py-20">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 xl:flex-row xl:gap-[clamp(2rem,6.3vw,91px)]">
          <div className="flex w-full flex-col gap-6 xl:w-[566px] xl:shrink-0">
            <div className="flex flex-col gap-4">
              <h2
                className="text-[2.25rem] leading-[2.5rem] font-medium tracking-[-1px] text-balance text-white md:text-[56px] md:leading-[64px] md:tracking-[-1.54px]"
                id="ev-heading"
              >
                Charge your EV for less <br className="hidden md:block" />
                while you sleep
              </h2>
              <p className="text-lg leading-[31px] text-[#b0bbc2] md:text-xl">
                Meet <strong className="font-medium text-white">My EV</strong>, our smart tariff for EV drivers, with
                discounted overnight electricity for cheaper home charging.
              </p>
            </div>

            <ul className="flex flex-col gap-4 sm:flex-row">
              {EV_FEATURES.map(({ icon, title, body }) => (
                <li className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-1" key={title}>
                  <span className="grid size-11 place-items-center">
                    <img alt="" height={32} src={icon} width={32} />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg leading-[18px] font-medium tracking-[0.0216px] text-white">{title}</h3>
                    <p className="text-base leading-[19px] text-[#b0bbc2]">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex">
              {/* White focus ring: the purple one is too faint against this dark card. */}
              <CtaButton className="focus-visible:outline-white!" external={isExternal(EV_INFO_URL)} href={EV_INFO_URL}>
                Learn more
                {isExternal(EV_INFO_URL) ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </CtaButton>
            </div>
          </div>

          {/* Decorative: the car is cut out with a mask, and a line drawing sits over it. */}
          <div aria-hidden="true" className="relative aspect-[543/306] w-full max-w-[543px] xl:min-w-0 xl:flex-1">
            <img
              alt=""
              className="h-full w-full object-cover [mask-image:url(/assets/home/ev-mask.svg)] [mask-size:100%_100%]"
              decoding="async"
              height={675}
              loading="lazy"
              src={`${ASSETS}/ev-car.png`}
              width={1200}
            />
            <img
              alt=""
              className="pointer-events-none absolute top-[-1.7%] left-[-0.93%] h-[85.44%] w-[95.28%]"
              height={261}
              loading="lazy"
              src={`${WF}/ev-overlay.svg`}
              width={518}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AppSection() {
  return (
    <Section id="app" labelledBy="app-heading" padding="py-12 md:pt-14 md:pb-[70px]">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className={`${HEADING} text-black`} id="app-heading">
              Stay on top of your account
            </h2>
            <p className={`${INTRO} tracking-[0.05px]`}>
              Submit meter readings, check your balance, view statements and keep your account up to date all from the
              Outfox app.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg leading-[22px] font-medium text-ink">Download the Outfox Energy app today !</p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <a className={STORE_BADGE} href={APP_STORE_URL} rel="noopener noreferrer" target="_blank">
                  <img alt="" className="shrink-0" height={24} src={`${ASSETS}/apple.svg`} width={20} />
                  <span className="flex flex-col gap-[3px] leading-none">
                    <span className="text-[9px] font-medium">Download on the</span>
                    <span className="text-lg font-medium tracking-[-0.026em]">App Store</span>
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a className={STORE_BADGE} href={PLAY_STORE_URL} rel="noopener noreferrer" target="_blank">
                  <img alt="" className="shrink-0" height={24} src={`${ASSETS}/play-store.svg`} width={21} />
                  <span className="flex flex-col gap-[3px] leading-none">
                    <span className="font-sans text-[10px] font-normal uppercase">Get it on</span>
                    {/* The wordmark file is drawn upside down, so it is flipped back. */}
                    <img
                      alt="Google Play"
                      className="block [scale:1_-1]"
                      height={15}
                      src={`${ASSETS}/google-play-word.svg`}
                      width={74}
                    />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative isolate h-[360px] overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#7100f1_49%,#41008b)] sm:h-[460px]">
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-[-89px] left-[-27px] h-[236px] w-[241px] max-w-none"
            height={236}
            src={`${WF}/app-ring.svg`}
            width={241}
          />
          <div className="absolute top-0 left-1/2 h-full w-[min(515.839px,100%)] -translate-x-1/2 overflow-hidden">
            <img
              alt="The Outfox Energy app on a phone, showing an account balance and quick actions"
              className="absolute top-0 left-0 h-auto w-full max-w-none sm:h-[112.14%]"
              decoding="async"
              height={2048}
              loading="lazy"
              src={`${ASSETS}/app-phone.png`}
              width={2048}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
