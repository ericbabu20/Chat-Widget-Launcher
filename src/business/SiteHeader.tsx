import { AppLink, ROUTES } from "../router";
import { HelpCentreMenu } from "./HelpCentreMenu";
import { MobileNavMenu } from "./MobileNavMenu";

const logo = "/assets/58d14.svg";

// These menus have no pages yet, so they look the same as on the landing page but do nothing.
const MENUS_WITHOUT_PAGES = ["About us", "Account", "Tariffs"];

function Chevron() {
  return (
    <svg aria-hidden="true" fill="none" height="8" viewBox="0 0 14 8" width="14">
      <path d="m1 1 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

type SiteHeaderProps = {
  /** Highlights "Business energy" in the menu on the Business energy pages. */
  businessEnergyActive?: boolean;
  /** What the "Get a quote" button does. The home page uses it to jump to the postcode box. */
  onGetQuote?: () => void;
};

/** Purple pill on desktop. A full-width bar with a menu button on phones and tablets. */
export function SiteHeader({ businessEnergyActive = false, onGetQuote }: SiteHeaderProps) {
  return (
    <header className="bz-header">
      <div className="bz-header__bar">
        <AppLink aria-label="Outfox Energy home" className="bz-header__logo" to={ROUTES.home}>
          <img alt="" src={logo} />
        </AppLink>

        <nav aria-label="Main" className="bz-nav">
          {MENUS_WITHOUT_PAGES.map((label) => (
            <button className="bz-nav__item" key={label} type="button">
              {label}
              <Chevron />
            </button>
          ))}
          <HelpCentreMenu />
          <AppLink
            aria-current={businessEnergyActive ? "page" : undefined}
            className="bz-nav__item"
            to={ROUTES.businessEnergy}
          >
            Business energy
          </AppLink>
        </nav>

        <div className="bz-header__actions">
          <button className="bz-btn bz-btn--outline-light" onClick={onGetQuote} type="button">
            Get a quote
          </button>
          <button className="bz-btn bz-btn--white" type="button">
            Sign in
          </button>
        </div>

        <div className="bz-header__menu">
          <MobileNavMenu />
        </div>
      </div>
    </header>
  );
}
