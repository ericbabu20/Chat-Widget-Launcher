import { useEffect, useRef, useState } from "react";
import { CERTIFICATIONS, WHY_OUTFOX_FEATURES } from "./content";
import { HEADING, INTRO, Marquee, Section } from "./ui";

/**
 * "Why Outfox": a big headline and the intro line on the editorial grid, then three polished cards.
 * Polish rules used (exact values): the card's corner radius is the picture's radius plus the card padding (24 + 8 = 32);
 * edges are a layered shadow ring (not a border) with a transparent border underneath so high-contrast mode still draws
 * one; hover effects only run on devices that can really hover (Tailwind's hover: and group-hover: already do that).
 * - Wide screens (1024px and up): three cards side by side, sliding in one after another as the section scrolls into view.
 * - Phones and tablets: an Apple-style swipeable strip. The card in focus sits in the middle, its neighbours peek in
 *   (smaller and faded), it snaps into place, and dots underneath show where you are (each dot is a button too).
 *   The scroll-linked sizing lives in index.css (.why-item).
 */export function WhyOutfoxSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const middle = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDistance = Infinity;
      Array.from(track.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle);
        if (distance < closestDistance) {
          closest = index;
          closestDistance = distance;
        }
      });
      setActive(closest);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function showCard(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <Section id="why" labelledBy="why-heading" padding="py-12 md:pt-[71px] md:pb-[98px]">
      <div className="flex flex-col gap-12 md:gap-20">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-x-8">
          <h2
            className="text-[2.25rem] leading-[2.5rem] font-bold tracking-[-1px] text-black md:text-[56px] md:leading-[56px] md:tracking-[-1.5px] lg:col-span-8 lg:text-[72px] lg:leading-[72px] lg:tracking-[-3px]"
            id="why-heading"
          >
            The Same Energy - <span className="md:block">Just Cheaper</span>
          </h2>
          <p className={`${INTRO} lg:col-span-4 lg:pb-2`}>
            Why pay more for your energy? Here's why we're the switch you've been waiting for.
          </p>
        </div>

        <div className="flex flex-col gap-1 lg:gap-0">
          <ul
            aria-label="Why choose Outfox"
            className="relative -mx-6 -mt-3 -mb-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pt-3 pb-10 [scrollbar-width:none] before:w-[max(0px,calc(50%_-_min(39%,200px)_-_1rem))] before:shrink-0 after:w-[max(0px,calc(50%_-_min(39%,200px)_-_1rem))] after:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand lg:m-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-8 lg:overflow-visible lg:p-0 lg:before:hidden lg:after:hidden [&::-webkit-scrollbar]:hidden"
            ref={trackRef}
            tabIndex={0}
          >
            {WHY_OUTFOX_FEATURES.map(({ image, title, body }) => (
              <li
                className="why-item flex w-[78%] max-w-[400px] shrink-0 snap-center lg:w-auto lg:max-w-none lg:shrink"
                key={title}
              >
                {/* Card: 32px corners = 24px picture corners + 8px padding. Ring shadow for the edge, soft shadows for lift. */}
                <div className="group flex h-full w-full flex-col gap-4 rounded-[32px] border border-transparent bg-white p-2 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.04),0_4px_12px_rgb(0_0_0/0.04)] hover:shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_4px_rgb(0_0_0/0.05),0_14px_32px_rgb(113_0_241/0.14)] motion-safe:transition-[translate,box-shadow] motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-[24px]">
                    <img
                      alt=""
                      className="h-28 w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover:scale-[1.04] lg:h-[124px]"
                      decoding="async"
                      draggable={false}
                      height={256}
                      loading="lazy"
                      src={image}
                      width={724}
                    />
                  </div>
                  <div className="flex flex-col gap-2 px-4 pb-5">
                    <h3 className="text-2xl leading-[28.8px] font-medium tracking-[-0.4px] text-ink">{title}</h3>
                    <p className="text-base leading-6 text-[#314853]">{body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Page dots: the dot for the card in focus stretches into a pill. Each one is a button. */}
          <div className="flex justify-center lg:hidden">
            {WHY_OUTFOX_FEATURES.map(({ title }, index) => (
              <button
                aria-current={index === active ? "true" : undefined}
                aria-label={`Show: ${title}`}
                className="grid h-11 min-w-7 place-items-center rounded-full [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand"
                key={title}
                onClick={() => showCard(index)}
                type="button"
              >
                <span
                  className={`h-2 rounded-full motion-safe:transition-[width,background-color] motion-safe:duration-300 ${
                    index === active ? "w-6 bg-ink" : "w-2 bg-[#7d8e94]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
/** The "backed by" row: a heading and a line on the left, the logos sliding past on the right. */
export function CertificationsSection() {
  return (
    <Section labelledBy="certified-heading" padding="py-12 md:pt-[99px] md:pb-[140px]">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 className={`${HEADING} text-black`} id="certified-heading">
            Certified to the standards that matter
          </h2>
          <p className={INTRO}>
            Your switch is backed by independently certified standards for security, service and a smooth, guaranteed
            switch.
          </p>
        </div>
        <Marquee label="Our certifications">
          {CERTIFICATIONS.map((logo) => (
            <img
              alt={logo.alt}
              className="mx-8 h-16 w-auto shrink-0 md:mx-10"
              height={logo.height}
              key={logo.src}
              loading="lazy"
              src={logo.src}
              width={logo.width}
            />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
