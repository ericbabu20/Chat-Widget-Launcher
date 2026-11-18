import { useEffect, useState } from "react";

/**
 * The site has no cookie banner component yet. This hook follows the convention below so a
 * banner can be added later without changing the launcher:
 *   - the banner element has the attribute data-cookie-banner
 *   - when the visitor accepts, the banner stores "outfox-cookie-consent" in localStorage
 *     and dispatches a window event called "outfox:cookie-consent-change"
 */
export const COOKIE_CONSENT_KEY = "outfox-cookie-consent";
export const COOKIE_BANNER_SELECTOR = "[data-cookie-banner]";
export const COOKIE_CONSENT_EVENT = "outfox:cookie-consent-change";

export type CookieConsentState = {
  bannerVisible: boolean;
  consented: boolean;
};

function readConsent(): CookieConsentState {
  let consented = false;
  try {
    consented = window.localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
  } catch {
    consented = false;
  }
  return {
    bannerVisible: document.querySelector(COOKIE_BANNER_SELECTOR) !== null,
    consented,
  };
}

export function useCookieConsent(): CookieConsentState {
  const [state, setState] = useState<CookieConsentState>(readConsent);

  useEffect(() => {
    const refresh = () => setState(readConsent());
    refresh();
    window.addEventListener(COOKIE_CONSENT_EVENT, refresh);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, refresh);
  }, []);

  return state;
}
