import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { openSupportChat } from "../openChat";
import { AppLink, ROUTES } from "../router";
import { PHONE } from "./content";
import { PillButton } from "./ui";

const LOGO = "/assets/home/footer-logo.svg"; // the white logo, for the purple bar

/** How far the page must scroll before the full-width bar turns into the floating pill. */
const SCROLL_THRESHOLD = 24;

type MenuItem = {
  label: string;
  /** A link to a place on this page, or to the phone. */
  href?: string;
  /** Or an action, such as opening the chat. */
  onSelect?: () => void;
};

type NavMenu = { label: string; items: MenuItem[] };

// These menus only point at things that already exist on this page, the chat and the phone number.
const MENUS: NavMenu[] = [
  {
    label: "About us",
    items: [
      { label: "Why Outfox", href: "#why" },
      { label: "How it works", href: "#steps" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Outfox app", href: "#app" },
      { label: "Account help", onSelect: openSupportChat },
    ],
  },
  {
    label: "Tariffs",
    items: [
      { label: "Our tariffs", href: "#tariffs" },
      { label: "Warm Home Discount", href: "#warm-home-discount" },
    ],
  },
  {
    label: "Help centre",
    items: [
      { label: "Chat with us", onSelect: openSupportChat },
      { label: `Call ${PHONE.label}`, href: PHONE.href },
    ],
  },
];

const TOP_LINK =
  "inline-flex items-center gap-1.5 rounded-full px-1 py-2 text-base font-medium text-white transition-opacity duration-200 hover:opacity-80 " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none";

const ITEM_CLASS =
  "block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-ink hover:bg-canvas " +
  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand";

type HomeNavProps = {
  /** What "Get a quote" does. On the home page it jumps to the postcode box. */
  onGetQuote: () => void;
};

/**
 * The page header. At the top of the page it is a full-width purple bar.
 * Once the visitor scrolls it shrinks into a floating, rounded "glass" pill that stays on screen.
 * Links on large screens, a menu button below that.
 */
export function HomeNav({ onGetQuote }: HomeNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelId = useId();

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Close menus with Escape (and put focus back on the button), or by pressing anywhere outside the header.
  const anythingOpen = mobileOpen || openMenu !== null;
  useEffect(() => {
    if (!anythingOpen) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (openMenu) menuButtons.current[openMenu]?.focus();
      else mobileButtonRef.current?.focus();
      setOpenMenu(null);
      setMobileOpen(false);
    }
    function handlePointer(event: PointerEvent) {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpenMenu(null);
      setMobileOpen(false);
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [anythingOpen, openMenu]);

  function closeAll() {
    setOpenMenu(null);
    setMobileOpen(false);
  }

  function chooseItem(item: MenuItem) {
    closeAll();
    item.onSelect?.();
  }

  function chooseQuote() {
    closeAll();
    onGetQuote();
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
        scrolled ? "px-4 pt-3 md:px-[max(1.5rem,calc((100%-88rem)/2))]" : "px-0 pt-0"
      }`}
      ref={rootRef}
    >
      {/* The glass: a see-through purple with a blur behind it. Solid purple if the visitor asks for less transparency. */}
      <nav
        aria-label="Main"
        className={`relative bg-brand/80 backdrop-blur-xl backdrop-saturate-150 transition-[border-radius,box-shadow] duration-300 ease-out motion-reduce:transition-none [@media(prefers-reduced-transparency:reduce)]:bg-brand [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none ${
          scrolled
            ? "rounded-full shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_10px_36px_rgb(60_0_130/0.28)]"
            : "rounded-none shadow-[inset_0_-1px_0_rgb(255_255_255/0.14)]"
        }`}
      >
        <div className="flex h-20 items-center justify-between gap-6 px-6 md:px-8">
          <AppLink
            aria-label="Outfox Energy home"
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            to={ROUTES.home}
          >
            <img alt="" className="h-7 w-auto" height={39} src={LOGO} width={224} />
          </AppLink>

          <ul className="hidden items-center gap-7 lg:flex">
            {MENUS.map((menu) => {
              const isOpen = openMenu === menu.label;
              const menuId = `${panelId}-${menu.label.replace(/\s+/g, "-")}`;
              return (
                <li className="relative" key={menu.label}>
                  <button
                    aria-controls={isOpen ? menuId : undefined}
                    aria-expanded={isOpen}
                    className={TOP_LINK}
                    onClick={() => {
                      setMobileOpen(false);
                      setOpenMenu(isOpen ? null : menu.label);
                    }}
                    ref={(node) => {
                      menuButtons.current[menu.label] = node;
                    }}
                    type="button"
                  >
                    {menu.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen ? (
                    <ul
                      className="absolute top-full left-1/2 mt-4 w-60 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-[0_12px_40px_rgb(0_30_40/0.18)]"
                      id={menuId}
                    >
                      {menu.items.map((item) => (
                        <li key={item.label}>
                          {item.href ? (
                            <a className={ITEM_CLASS} href={item.href} onClick={() => chooseItem(item)}>
                              {item.label}
                            </a>
                          ) : (
                            <button className={ITEM_CLASS} onClick={() => chooseItem(item)} type="button">
                              {item.label}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
            <li>
              <AppLink className={TOP_LINK} to={ROUTES.businessEnergy}>
                Business energy
              </AppLink>
            </li>
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <PillButton onClick={onGetQuote} variant="light-outline">
              Get a quote
            </PillButton>
            <PillButton variant="light">Sign in</PillButton>
          </div>

          <button
            aria-controls={panelId}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full bg-white text-brand transition-[background-color,scale] duration-200 hover:bg-[#f1e5ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 lg:hidden"
            onClick={() => {
              setOpenMenu(null);
              setMobileOpen((value) => !value);
            }}
            ref={mobileButtonRef}
            type="button"
          >
            {mobileOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>

        {mobileOpen ? (
          <div
            className="absolute top-full right-3 mt-2 max-h-[calc(100svh-6rem)] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-3 shadow-[0_12px_40px_rgb(0_30_40/0.18)] lg:hidden"
            id={panelId}
          >
            {MENUS.map((menu) => (
              <div className="mb-1" key={menu.label}>
                <p className="px-4 pt-3 pb-1 text-sm font-medium text-ink/70">{menu.label}</p>
                <ul>
                  {menu.items.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <a className={`${ITEM_CLASS} py-2.5`} href={item.href} onClick={() => chooseItem(item)}>
                          {item.label}
                        </a>
                      ) : (
                        <button className={`${ITEM_CLASS} py-2.5`} onClick={() => chooseItem(item)} type="button">
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <AppLink className={`${ITEM_CLASS} py-2.5`} onClick={closeAll} to={ROUTES.businessEnergy}>
              Business energy
            </AppLink>
            <div className="mt-2 flex flex-col gap-2 border-t border-ink/10 pt-3">
              <PillButton className="w-full" onClick={chooseQuote} variant="brand">
                Get a quote
              </PillButton>
              <PillButton className="w-full" variant="brand-outline">
                Sign in
              </PillButton>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
