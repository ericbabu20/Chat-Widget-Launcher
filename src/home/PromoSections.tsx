import { APP_STORE_URL, EV_FEATURES, PLAY_STORE_URL } from "./content";
import { focusHeroPostcode } from "./Hero";
import { PillButton, Section } from "./ui";

const ASSETS = "/assets/home";

const STORE_BADGE =
  "flex h-12 w-36 items-center gap-2 rounded-lg border border-[#a6a6a6] bg-ink px-3 text-white transition-[scale] duration-200 " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none motion-reduce:active:scale-100";

/** "Use modes" pattern: words on the left, one large rounded card on the right. */
export function EvSection() {
  return (
    <Section labelledBy="ev-heading">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="md:pt-2 md:pr-12">
          <h2
            className="mb-6 text-5xl leading-none font-medium text-balance text-ink md:text-6xl"
            id="ev-heading"
            style={{ letterSpacing: "-0.04em" }}
          >
            Charge your EV for less while you sleep
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-ink/70">
            Meet <strong className="font-medium text-ink">My EV</strong>, our smart tariff for EV drivers, with
            discounted overnight electricity for cheaper home charging.
          </p>
          <PillButton arrow onClick={focusHeroPostcode}>
            Get a quote
          </PillButton>
        </div>

        <div className="relative isolate flex min-h-[640px] flex-col overflow-hidden rounded-3xl bg-ink p-6 md:p-10">
          <ul className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {EV_FEATURES.map(({ icon: Icon, title, body }) => (
              <li className="rounded-2xl bg-white/10 p-5" key={title}>
                <span className="mb-4 grid size-11 place-items-center rounded-xl bg-brand/40 text-white">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mb-1 text-lg leading-snug font-medium text-white">{title}</h3>
                <p className="text-base leading-snug text-white/70">{body}</p>
              </li>
            ))}
          </ul>

          <div aria-hidden="true" className="absolute inset-x-0 bottom-6 -z-10 aspect-[543/306] md:bottom-10">
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
              src={`${ASSETS}/ev-overlay.svg`}
              width={518}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export function AppSection() {
  return (
    <Section id="app" labelledBy="app-heading">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        {/* On wide screens the picture is on the left; on phones the words come first. */}
        <div className="relative isolate order-2 min-h-[560px] overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#7100f1_49%,#41008b)] md:order-1 md:min-h-[720px]">
          <div aria-hidden="true" className="absolute top-[-6rem] right-[-6rem] -z-10 size-80 rounded-full bg-white/10" />
          <div aria-hidden="true" className="absolute top-24 left-[-5rem] -z-10 size-52 rounded-full bg-white/10" />
          <img
            alt="The Outfox Energy app on a phone, showing an account balance and quick actions"
            className="absolute right-0 bottom-0 w-[min(40rem,100%)] max-w-none"
            decoding="async"
            height={2048}
            loading="lazy"
            src={`${ASSETS}/app-phone.png`}
            width={2048}
          />
        </div>

        <div className="order-1 md:order-2 md:pt-2 md:pl-12">
          <h2
            className="mb-6 text-5xl leading-none font-medium text-balance text-ink md:text-6xl"
            id="app-heading"
            style={{ letterSpacing: "-0.04em" }}
          >
            Stay on top of your account
          </h2>
          <p className="mb-10 max-w-md text-lg leading-relaxed text-ink/70">
            Submit meter readings, check your balance, view statements and keep your account up to date all from the
            Outfox app.
          </p>

          <p className="mb-4 text-lg font-medium text-ink">Download the Outfox Energy app today !</p>
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
    </Section>
  );
}

