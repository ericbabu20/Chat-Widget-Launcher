import { type AnchorHTMLAttributes, type MouseEvent, useSyncExternalStore } from "react";

/**
 * A very small router, so the site can have more than one page without adding a library.
 * Pages are real URLs (for example /business-energy), and the browser back button works.
 */

export const ROUTES = {
  home: "/",
  businessEnergy: "/business-energy",
  businessEnergyRegister: "/business-energy/register",
} as const;

const NAVIGATE_EVENT = "outfox-navigate";

/** Treats "/business-energy/" and "/business-energy" as the same page. */
function normalisePath(path: string) {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function navigate(to: string) {
  if (normalisePath(window.location.pathname) === normalisePath(to)) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

/** The current page path. The page re-renders whenever it changes. */
export function usePathname() {
  return useSyncExternalStore(
    subscribe,
    () => normalisePath(window.location.pathname),
    () => "/",
  );
}

type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

/**
 * A normal link that switches page without reloading the site.
 * Ctrl/Cmd-click and "open in new tab" still work, because it is a real <a href>.
 */
export function AppLink({ to, onClick, ...rest }: AppLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || event.button !== 0 || modified) return;
    event.preventDefault();
    navigate(to);
  }

  return <a {...rest} href={to} onClick={handleClick} />;
}
