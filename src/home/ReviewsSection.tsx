import { type CSSProperties, type PointerEvent, type RefObject, useCallback, useEffect, useRef } from "react";
import { useMediaQuery } from "../chat/useMediaQuery";
import { REVIEWS, type Review, TRUSTPILOT_PAGE } from "./content";
import { SectionHeader, Stars } from "./ui";

// How fast the cards drift sideways on their own (pixels per second). Slow enough to read as they pass.
const AUTO_SPEED = 40;
// After a visitor touches, scrolls, drags or uses an arrow, the cards stay still for this long (ms).
const RESUME_AFTER = 2000;
// Apple's scroll deceleration rate: how far a flick carries once the pointer lets go.
const DECELERATION = 0.998;
// Movement (px) before a press on the cards counts as a drag rather than a click.
const DRAG_THRESHOLD = 6;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Where a flick at this speed (px/s) would come to rest, measured from where it was let go. */
function projectMomentum(velocity: number) {
  return ((velocity / 1000) * DECELERATION) / (1 - DECELERATION);
}

/** The distance from one card to the next (card width plus the gap). */
function cardStep(scroller: HTMLElement) {
  const [first, second] = Array.from(scroller.children) as HTMLElement[];
  return first && second ? second.offsetLeft - first.offsetLeft : 0;
}

/** The width of one full set of cards. Scrolling back by this much shows exactly the same picture. */
function loopWidth(scroller: HTMLElement, cardsPerSet: number) {
  const first = scroller.children[0] as HTMLElement | undefined;
  const repeat = scroller.children[cardsPerSet] as HTMLElement | undefined;
  return first && repeat ? repeat.offsetLeft - first.offsetLeft : 0;
}

/**
 * Lets a mouse drag the cards like a finger would: they follow the pointer 1:1 from where they were grabbed,
 * and a flick carries on a little after letting go. Touch and trackpads already scroll natively.
 */
function useMouseDrag(scrollerRef: RefObject<HTMLUListElement | null>) {
  const drag = useRef<{ id: number; startX: number; startScroll: number; moved: boolean; samples: { t: number; x: number }[] } | null>(null);

  const onPointerDown = useCallback((event: PointerEvent<HTMLUListElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      id: event.pointerId,
      startX: event.clientX,
      startScroll: scroller.scrollLeft,
      moved: false,
      samples: [{ t: event.timeStamp, x: event.clientX }],
    };
  }, [scrollerRef]);

  const onPointerMove = useCallback((event: PointerEvent<HTMLUListElement>) => {
    const scroller = scrollerRef.current;
    const state = drag.current;
    if (!scroller || !state || state.id !== event.pointerId) return;

    const dx = event.clientX - state.startX;
    if (!state.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      state.moved = true;
      scroller.setPointerCapture(event.pointerId);
      scroller.dataset.dragging = "true";
    }

    // Stops the page from selecting the review text while the cards are being dragged.
    window.getSelection()?.removeAllRanges();
    scroller.scrollLeft = state.startScroll - dx;
    state.samples.push({ t: event.timeStamp, x: event.clientX });
    if (state.samples.length > 6) state.samples.shift();
  }, [scrollerRef]);

  const onPointerUp = useCallback((event: PointerEvent<HTMLUListElement>) => {
    const scroller = scrollerRef.current;
    const state = drag.current;
    drag.current = null;
    if (!scroller || !state || state.id !== event.pointerId || !state.moved) return;

    const first = state.samples[0];
    const last = state.samples[state.samples.length - 1];
    const elapsed = Math.max(1, last.t - first.t);
    const pointerVelocity = ((last.x - first.x) / elapsed) * 1000; // px/s
    const max = scroller.scrollWidth - scroller.clientWidth;
    const target = Math.min(max, Math.max(0, scroller.scrollLeft - projectMomentum(pointerVelocity)));

    const release = () => {
      delete scroller.dataset.dragging;
    };
    scroller.addEventListener("scrollend", release, { once: true });
    window.setTimeout(release, 900);
    scroller.scrollTo({ left: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [scrollerRef]);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp };
}

/**
 * Slides the cards sideways on their own, round and round. The first set of cards is drawn a second time
 * after the last, and when the slide reaches the end of the first set it jumps back to the start, which looks identical.
 * It stands still while the visitor hovers, touches, drags, uses the keyboard, or when the carousel is off screen.
 */
function useAutoScroll(
  scrollerRef: RefObject<HTMLUListElement | null>,
  enabled: boolean,
  cardsPerSet: number,
  lastInteraction: RefObject<number>,
) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!enabled || !scroller) return;

    let frame = 0;
    let previous = 0;
    let position = scroller.scrollLeft;
    let hovered = false;
    let onScreen = true;
    let width = loopWidth(scroller, cardsPerSet);

    const markInteraction = () => {
      lastInteraction.current = performance.now();
    };
    const handleEnter = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "mouse") hovered = true;
    };
    const handleLeave = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "mouse") hovered = false;
    };
    const handleResize = () => {
      width = loopWidth(scroller, cardsPerSet);
    };

    function tick(time: number) {
      frame = window.requestAnimationFrame(tick);
      const elapsed = previous ? Math.min(64, time - previous) : 0;
      previous = time;

      const idle = performance.now() - lastInteraction.current > RESUME_AFTER;
      const running =
        onScreen &&
        idle &&
        !hovered &&
        !document.hidden &&
        !scroller!.dataset.dragging &&
        !scroller!.matches(":focus-visible");

      if (!running) {
        // Follow wherever the visitor has taken the cards, so the slide carries on from there.
        position = scroller!.scrollLeft;
        return;
      }

      position += (AUTO_SPEED * elapsed) / 1000;
      if (width > 0 && position >= width) position -= width;
      scroller!.scrollLeft = position;
    }

    const watcher = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    watcher.observe(scroller);

    scroller.addEventListener("pointerenter", handleEnter);
    scroller.addEventListener("pointerleave", handleLeave);
    scroller.addEventListener("pointerdown", markInteraction);
    scroller.addEventListener("pointerup", markInteraction);
    scroller.addEventListener("touchstart", markInteraction, { passive: true });
    scroller.addEventListener("touchend", markInteraction, { passive: true });
    scroller.addEventListener("wheel", markInteraction, { passive: true });
    scroller.addEventListener("keydown", markInteraction);
    window.addEventListener("resize", handleResize);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      watcher.disconnect();
      scroller.removeEventListener("pointerenter", handleEnter);
      scroller.removeEventListener("pointerleave", handleLeave);
      scroller.removeEventListener("pointerdown", markInteraction);
      scroller.removeEventListener("pointerup", markInteraction);
      scroller.removeEventListener("touchstart", markInteraction);
      scroller.removeEventListener("touchend", markInteraction);
      scroller.removeEventListener("wheel", markInteraction);
      scroller.removeEventListener("keydown", markInteraction);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollerRef, enabled, cardsPerSet, lastInteraction]);
}

function ReviewCard({ review, repeat = false }: { review: Review; repeat?: boolean }) {
  return (
    // The repeated set only exists to make the loop seamless, so screen readers skip it.
    <li
      aria-hidden={repeat ? true : undefined}
      className="relative flex min-h-[243px] w-[min(388px,82vw)] shrink-0 flex-col gap-[12.7px] rounded-[20px] border border-[#e5e8e9] bg-white pt-[27px] pr-[27px] pb-[25px] pl-[27px] drop-shadow-[0_4px_8px_rgb(0_0_0/0.05)]"
    >
      <Stars />
      <span className="sr-only">Rated 5 out of 5</span>
      <h3 className="text-lg leading-[25.2px] font-medium tracking-[-0.18px] text-ink">{review.title}</h3>
      <p className="flex-1 text-sm leading-[21.7px] text-[#314853]">{review.body}</p>
      <div className="flex items-center gap-[11px] pt-1">
        <span
          aria-hidden="true"
          className="grid size-[38px] shrink-0 place-items-center rounded-full bg-[#e5d6fc] text-[15px] leading-[15px] font-medium text-brand"
        >
          {review.name.charAt(0)}
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-sm leading-[16.8px] font-medium text-ink">{review.name}</span>
          <span className="text-xs leading-[14.4px] text-[#314853]">{review.when}</span>
        </span>
      </div>
    </li>
  );
}

const ROUND_BUTTON =
  "grid size-12 place-items-center rounded-full border border-[#b0bbc2] bg-white transition-[background-color,scale] duration-200 " +
  "hover:bg-[#f1e5ff] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand " +
  "motion-reduce:transition-none motion-reduce:active:scale-100";
export function ReviewsSection() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const lastInteraction = useRef(0);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const dragHandlers = useMouseDrag(scrollerRef);
  const autoplay = !reduceMotion;

  useAutoScroll(scrollerRef, autoplay, REVIEWS.length, lastInteraction);

  function step(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    lastInteraction.current = performance.now();
    const distance = cardStep(scroller);
    const width = loopWidth(scroller, REVIEWS.length);
    // At the very start there is nothing to the left, so jump to the identical spot one set along first.
    if (direction === -1 && width > 0 && scroller.scrollLeft < distance) scroller.scrollLeft += width;
    scroller.scrollBy({ left: direction * distance, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  return (
    <section aria-labelledby="reviews-heading" className="scroll-mt-24 py-12 md:pt-[112px] md:pb-[82px]">
      <div className="mx-auto max-w-[1243px] px-6">
        <SectionHeader
          id="reviews-heading"
          intro="Real feedback from customers who switched to Outfox Energy and are now paying less for the same energy."
          title="Join thousands paying less for their energy"
        />
      </div>

      {/* The cards start at the page edge and slide left. Anything left of the edge is hidden,
          so a card never pops in or out at the very edge of the screen. */}
      <ul
        aria-label="Customer reviews"
        className="mt-10 flex scroll-px-(--edge) gap-5 overflow-x-auto overscroll-x-contain px-(--edge) pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand data-[dragging]:cursor-grabbing data-[dragging]:select-none pointer-fine:cursor-grab [&::-webkit-scrollbar]:hidden"
        onDragStart={(event) => event.preventDefault()}
        ref={scrollerRef}
        style={
          {
            "--edge": "1.5rem",
            maskImage: "linear-gradient(to right, transparent calc(var(--edge) - 1rem), #000 calc(var(--edge) - 1rem))",
            WebkitMaskImage:
              "linear-gradient(to right, transparent calc(var(--edge) - 1rem), #000 calc(var(--edge) - 1rem))",
          } as CSSProperties
        }
        tabIndex={0}
        {...dragHandlers}
      >
        {REVIEWS.map((review) => (
          <ReviewCard key={review.title} review={review} />
        ))}
        {autoplay
          ? REVIEWS.map((review) => <ReviewCard key={`repeat-${review.title}`} repeat review={review} />)
          : null}
      </ul>

      <div className="mx-auto mt-6 flex max-w-[1243px] flex-col gap-5 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Stars size={18} />
          <a
            className="rounded-sm text-[13px] leading-[16.9px] text-[#314853] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            href={TRUSTPILOT_PAGE}
            rel="noopener noreferrer"
            target="_blank"
          >
            Rated <strong className="font-medium text-ink">4.7 / 5</strong> · based on{" "}
            <strong className="font-medium text-ink">52,900+</strong> reviews on{" "}
            <strong className="font-medium text-ink">Trustpilot</strong>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="flex gap-2.5">
          <button aria-label="Previous reviews" className={ROUND_BUTTON} onClick={() => step(-1)} type="button">
            <img alt="" className="size-5 rotate-180" height={20} src="/assets/wf/arrow-next.svg" width={20} />
          </button>
          <button aria-label="Next reviews" className={ROUND_BUTTON} onClick={() => step(1)} type="button">
            <img alt="" className="size-5" height={20} src="/assets/wf/arrow-next.svg" width={20} />
          </button>
        </div>
      </div>
    </section>
  );
}