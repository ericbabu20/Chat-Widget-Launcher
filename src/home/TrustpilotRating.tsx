import { useEffect, useRef } from "react";
import { useMediaQuery } from "../chat/useMediaQuery";

/**
 * The official Trustpilot TrustBox. Trustpilot's own script draws it and keeps the numbers up to date,
 * so no score or review count is typed in here.
 *
 * Wider screens get "Micro Combo": the rating word, stars and review count on one line.
 * Phones get "Micro TrustScore": the rating word and the score out of 5, which fits a narrow screen.
 */

// Outfox's Trustpilot business unit. This is the same id the live Outfox site already uses for its reviews.
const BUSINESS_UNIT_ID = "684fcec9257a8efcadfe9b4e";
const REVIEWS_PAGE = "https://uk.trustpilot.com/review/www.outfoxthemarket.co.uk";
const SCRIPT_SRC = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

const MICRO_COMBO = { templateId: "5419b6ffb0d04a076446a9af", width: "26.5rem", shiftLeft: "-0.25rem" };
// The score line is drawn centred inside its box, so the box is pulled left a little to line up with the text above.
const MICRO_TRUSTSCORE = { templateId: "5419b637fa0340045cd0c936", width: "16rem", shiftLeft: "-1.25rem" };

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (element: HTMLElement, force?: boolean) => void };
  }
}

let scriptLoading: Promise<void> | null = null;

/** Adds Trustpilot's script to the page once, however many times this component appears. */
function loadTrustpilotScript() {
  if (window.Trustpilot) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = SCRIPT_SRC;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      scriptLoading = null; // allow another try next time
      reject(new Error("Trustpilot script could not be loaded"));
    };
    document.head.appendChild(script);
  });
  return scriptLoading;
}

type TrustpilotRatingProps = {
  /** "start" lines the widget up with left-aligned text. "center" centres it in its row. */
  align?: "start" | "center";
};

export function TrustpilotRating({ align = "start" }: TrustpilotRatingProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const isWide = useMediaQuery("(min-width: 521px)");
  const box = isWide ? MICRO_COMBO : MICRO_TRUSTSCORE;
  const placement = align === "center" ? { marginInline: "auto" } : { marginLeft: box.shiftLeft };

  useEffect(() => {
    let cancelled = false;
    loadTrustpilotScript()
      .then(() => {
        if (!cancelled && boxRef.current) window.Trustpilot?.loadFromElement(boxRef.current, true);
      })
      .catch(() => {
        // Blocked or offline: the plain link inside the box stays on screen.
      });
    return () => {
      cancelled = true;
    };
  }, [box.templateId]);

  return (
    <div
      // A new key rebuilds the box when the screen size crosses the breakpoint, so Trustpilot redraws it cleanly.
      key={box.templateId}
      className="trustpilot-widget"
      data-businessunit-id={BUSINESS_UNIT_ID}
      data-locale="en-GB"
      data-style-height="24px"
      data-style-width="100%"
      data-template-id={box.templateId}
      data-theme="light"
      ref={boxRef}
      style={{ width: `min(100%, ${box.width})`, textAlign: align, ...placement }}
    >
      {/* Shown until the widget loads, and kept if it can't. It holds no score on purpose. */}
      <a
        className="text-base font-medium text-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        href={REVIEWS_PAGE}
        rel="noopener noreferrer"
        target="_blank"
      >
        See our reviews on Trustpilot
      </a>
    </div>
  );
}
