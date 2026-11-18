import { useEffect } from "react";

/**
 * Keeps the CSS variable --vvh equal to the visible height of the screen.
 * It shrinks when the on-screen keyboard opens, so the chat composer stays above the keyboard.
 */
export function useVisualViewport(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const viewport = window.visualViewport;

    function update() {
      const height = viewport ? viewport.height : window.innerHeight;
      root.style.setProperty("--vvh", `${height}px`);
    }

    update();
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      viewport?.removeEventListener("resize", update);
      viewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      root.style.removeProperty("--vvh");
    };
  }, [enabled]);
}
