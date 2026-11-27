import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { openSupportChat } from "../openChat";
import { AppLink, ROUTES } from "../router";
import { PHONE } from "./content";
import { PillButton } from "./ui";

const LOGO = "/assets/hero/logo-white.svg"; // the white logo, for the purple bar
const CHEVRON = "/assets/wf/chevron.svg"; // points right in the file, turned to point down

/** How far the page must scroll before the full-width bar turns into the floating oval. */
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
    label: "About Us",
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
    label: "Help Center",
    items: [
      { label: "Chat with us", onSelect: openSupportChat },
      { label: `Call ${PHONE.label}`, href: PHONE.href },
    ],
  },
];

const TOP_LINK =
  "inline-flex items-center gap-2 rounded-full p-2.5 text-base leading-5 font-normal whitespace-nowrap text-white transition-colors duration-200 hover:bg-white/15 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";

const ITEM_CLASS =
  "block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-ink hover:bg-canvas " +
  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand";

type HomeNavProps = {
  /** What "Get a quote" does. On the home page it jumps to the postcode box. */
  onGetQuote: () => void;
};

/**
 * The page header. At the top of the page it is a full-width purple bar.
 * Once the visitor scrolls it shrinks into a floating oval that stays on screen.
 * Links and the two buttons on large screens, a menu button below that.
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
        scrolled ? "px-4 pt-3 md:px-[60px] md:pt-[25px]" : "px-0 pt-0"
      }`}
      ref={rootRef}
    >
      <nav
        aria-label="Main"
        className={`relative bg-brand transition-[border-radius,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
          scrolled ? "rounded-full shadow-[0_10px_30px_rgb(60_0_130/0.28)]" : "rounded-none"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 transition-[height,padding] duration-300 ease-out motion-reduce:transition-none ${
            scrolled
              ? "h-16 pr-3 pl-5 md:h-20 md:px-[31px]"
              : "h-16 px-6 md:h-20 md:px-10 min-[1400px]:px-[91px]"
          }`}
        >
          <AppLink
            aria-label="Outfox Energy home"
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            to={ROUTES.home}
          >
            <img alt="" className="h-auto w-[140px] md:w-[165px]" height={29} src={LOGO} width={165} />
          </AppLink>

          <ul className="hidden items-center gap-[18px] xl:flex">
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
                    <span aria-hidden="true" className="grid h-2 w-[13.6px] place-items-center">
                      <img
                        alt=""
                        className={`h-[12.88px] w-[7.23px] max-w-none transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "-rotate-90" : "rotate-90"}`}
                        height={13}
                        src={CHEVRON}
                        width={7}
                      />
                    </span>
                  </button>

                  {isOpen ? (
                    <ul
                      className="absolute top-full left-1/2 mt-3 w-60 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-[0_12px_40px_rgb(0_30_40/0.18)]"
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
                Connect
              </AppLink>
            </li>
          </ul>

          <div className="hidden items-center gap-4 xl:flex">
            <button
              className="inline-flex h-[46px] items-center rounded-full border border-white px-[18px] text-base leading-5 font-normal text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
              onClick={onGetQuote}
              type="button"
            >
              Quote Me
            </button>
            <button
              className="inline-flex h-[46px] items-center rounded-full bg-white px-[30px] text-base leading-5 font-normal text-ink transition-colors duration-200 hover:bg-[#f1e5ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
              type="button"
            >
              Sign In
            </button>
          </div>

          <button
            aria-controls={panelId}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full bg-white text-brand transition-[background-color,scale] duration-200 hover:bg-[#f1e5ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 xl:hidden"
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
            className="absolute top-full right-3 mt-2 max-h-[calc(100svh-6rem)] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-3 shadow-[0_12px_40px_rgb(0_30_40/0.18)] xl:hidden"
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
              Connect
            </AppLink>
            <div className="mt-2 flex flex-col gap-2 border-t border-ink/10 pt-3">
              <PillButton className="w-full" onClick={chooseQuote} variant="brand">
                Quote Me
              </PillButton>
              <PillButton className="w-full" variant="brand-outline">
                Sign In
              </PillButton>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
