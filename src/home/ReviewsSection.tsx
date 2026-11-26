import { ArrowLeft, ArrowRight } from "lucide-react";
import { type CSSProperties, type PointerEvent, type RefObject, useCallback, useEffect, useRef } from "react";
import { useMediaQuery } from "../chat/useMediaQuery";
import { REVIEWS, type Review } from "./content";
import { TrustpilotRating } from "./TrustpilotRating";
import { SplitHeader, Stars } from "./ui";

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
      className="relative flex w-[min(24rem,82vw)] shrink-0 flex-col gap-4 rounded-2xl bg-white p-7"
    >
      <Stars />
      <span className="sr-only">Rated 5 out of 5</span>
      <h3 className="text-xl leading-snug font-medium tracking-[-0.02em] text-ink">{review.title}</h3>
      <p className="flex-1 text-base leading-relaxed text-ink/70">{review.body}</p>
      <div className="mt-2 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f1e5ff] text-base font-medium text-brand"
        >
          {review.name.charAt(0)}
        </span>
        <span className="flex flex-col">
          <span className="text-base leading-tight font-medium text-ink">{review.name}</span>
          <span className="text-sm text-ink/70">{review.when}</span>
        </span>
      </div>
    </li>
  );
}

const ROUND_BUTTON =
  "grid size-12 place-items-center rounded-full border border-ink bg-white text-ink transition-[background-color,scale] duration-200 " +
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
    <section aria-labelledby="reviews-heading" className="py-16 md:py-24">
      <div className="mx-auto max-w-[88rem] px-6">
        <SplitHeader
          id="reviews-heading"
          intro="Real feedback from customers who switched to Outfox Energy and are now paying less for the same energy."
          title="Join thousands paying less for their energy"
        />
      </div>

      {/* The cards start in line with the page content and slide left. Anything left of the content edge is hidden,
          so a card never pops in or out at the very edge of the screen. */}
      <ul
        aria-label="Customer reviews"
        className="flex scroll-px-(--edge) gap-4 overflow-x-auto overscroll-x-contain px-(--edge) pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand data-[dragging]:cursor-grabbing data-[dragging]:select-none pointer-fine:cursor-grab [&::-webkit-scrollbar]:hidden"
        onDragStart={(event) => event.preventDefault()}
        ref={scrollerRef}
        style={
          {
            "--edge": "max(1.5rem, calc((100% - 88rem) / 2 + 1.5rem))",
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

      <div className="mx-auto mt-10 flex max-w-[88rem] flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="w-full md:w-auto">
          <TrustpilotRating align="start" />
        </div>
        <div className="flex gap-3">
          <button aria-label="Previous reviews" className={ROUND_BUTTON} onClick={() => step(-1)} type="button">
            <ArrowLeft aria-hidden="true" className="size-5" />
          </button>
          <button aria-label="Next reviews" className={ROUND_BUTTON} onClick={() => step(1)} type="button">
            <ArrowRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
