import { type RefObject, useEffect, useRef } from "react";

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

type UseDialogOptions = {
  containerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  /** Element to focus when the dialog closes. Falls back to whatever had focus before opening. */
  returnFocusRef?: RefObject<HTMLElement | null>;
  /** Stops the page behind from scrolling while open. Used for sheets and full-screen chat. */
  lockScroll: boolean;
};

/** Focus trap, Escape to close, focus restore and optional scroll lock for a dialog. */
export function useDialog({ containerRef, onClose, returnFocusRef, lockScroll }: UseDialogOptions): void {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const container: HTMLElement = element;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = "hidden";

    function focusableInside(): HTMLElement[] {
      return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (item) => item.getClientRects().length > 0,
      );
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusableInside();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const insideDialog = active instanceof Node && container.contains(active);

      if (event.shiftKey && (!insideDialog || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!insideDialog || active === last)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    if (!container.contains(document.activeElement)) focusableInside()[0]?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      (returnFocusRef?.current ?? previouslyFocused)?.focus();
    };
  }, [containerRef, returnFocusRef, lockScroll]);
}
