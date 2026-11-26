import { useEffect, useRef, useState } from "react";
import { openSupportChat } from "../openChat";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`bz-chevron${open ? " bz-chevron--open" : ""}`}
      fill="none"
      height="8"
      viewBox="0 0 14 8"
      width="14"
    >
      <path d="m1 1 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

/** "Help centre" in the desktop header. It opens a small menu with one item: chat with us. */
export function HelpCentreMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close with the Escape key, or by clicking anywhere outside the menu.
  useEffect(() => {
    if (!open) return;

    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("click", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="bz-help" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="bz-nav__item"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        Help centre
        <Chevron open={open} />
      </button>
      {/* Always on the page so it can animate in and out. When closed it is hidden, so it cannot be tabbed to. */}
      <div className="help-menu" data-open={open} role="menu">
        <button
          className="help-menu__item"
          onClick={() => {
            setOpen(false);
            openSupportChat();
          }}
          role="menuitem"
          type="button"
        >
          <span aria-hidden="true" className="help-menu__icon">
            <svg fill="none" viewBox="0 0 24 24">
              <path
                d="M7.2 6.8h9.6c1.1 0 2 .9 2 2v5.2c0 1.1-.9 2-2 2h-4.2L9.2 19.2v-3.2H7.2c-1.1 0-2-.9-2-2V8.8c0-1.1.9-2 2-2Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
            </svg>
            <span className="mobile-header-chat__dot" />
          </span>
          <span>
            <strong>Chat with us</strong>
            <small>We’re online and ready to help</small>
          </span>
        </button>
      </div>
    </div>
  );
}
