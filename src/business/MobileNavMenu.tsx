import { useEffect, useId, useRef, useState } from "react";
import { AppLink, ROUTES, usePathname } from "../router";

const menuIcon = "/assets/73a98.svg";

const LINKS = [
  { label: "Home", to: ROUTES.home },
  { label: "Business energy", to: ROUTES.businessEnergy },
];

/** The phone and tablet menu button. Opens a small list of pages. */
export function MobileNavMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const pathname = usePathname();

  // Close with the Escape key, or by tapping anywhere outside the menu.
  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function handlePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [open]);

  return (
    <div className="bz-menu" ref={rootRef}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-label="Menu"
        className="bz-menu__button"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <img alt="" height={24} src={menuIcon} width={24} />
      </button>
      {/* Always on the page so it can animate in and out. When closed it is hidden, so it cannot be tabbed to. */}
      <nav aria-label="Site pages" className="bz-menu__panel" data-open={open} id={panelId}>
        {LINKS.map((link) => (
          <AppLink
            aria-current={pathname === link.to ? "page" : undefined}
            className="bz-menu__link"
            key={link.to}
            onClick={() => setOpen(false)}
            to={link.to}
          >
            {link.label}
          </AppLink>
        ))}
      </nav>
    </div>
  );
}
