import { useEffect, useState } from "react";

/** True once the visitor has scrolled past roughly the first screen (the hero). */
export function useScrollPastHero(): boolean {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    let frame = 0;

    function check() {
      frame = 0;
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(check);
    }

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return pastHero;
}
