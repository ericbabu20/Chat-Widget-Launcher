const logo = "/assets/5d1c5.svg";
const iconGlobe = "/assets/60e5c.svg";
const iconPin = "/assets/c43f5.svg";
const xMask = "/assets/d6913.png";

// The same links as the landing page footer.
const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/Oufox.Energy/", icon: "/assets/12fe5.svg" },
  { label: "X", href: "https://x.com/outfox_energy", mask: xMask },
  { label: "YouTube", href: "https://www.youtube.com/@outfox.energy", icon: "/assets/18d5a.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/outfoxenergy/", icon: "/assets/df110.svg" },
  { label: "Instagram", href: "https://www.instagram.com/outfox.energy", icon: "/assets/deb15.svg" },
  { label: "TikTok", href: "https://www.tiktok.com/notfound", icon: "/assets/f06aa.svg" },
];

const PAGE_LINKS = ["About Us", "Help Centre", "Account", "Contact us", "Complaints"];
const MORE_LINKS = ["FAQs", "Terms and conditions", "Our policies", "Anti-Slavery"];

export function SiteFooter() {
  return (
    <footer className="bz-footer">
      <div className="bz-footer__inner">
        <div className="bz-footer__brand">
          <img alt="Outfox Energy" className="bz-footer__logo" src={logo} />
          <p>Follow us on social media</p>
          <ul className="bz-footer__social">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a aria-label={item.label} href={item.href} rel="noreferrer" target="_blank">
                  {item.icon ? (
                    <img alt="" src={item.icon} />
                  ) : (
                    <span className="bz-footer__mask" style={{ maskImage: `url("${item.mask}")`, WebkitMaskImage: `url("${item.mask}")` }} />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bz-footer__contact">
          <h2>Contact</h2>
          <p className="bz-footer__row">
            <img alt="" src={iconGlobe} />
            <span>www.outfox.energy</span>
          </p>
          <p className="bz-footer__row">
            <img alt="" src={iconPin} />
            <span>
              Outfox Energy (Foxglove Energy Supply Ltd), 16 North Mills, Frog Island, Leicester, Leicestershire, LE3 5DL,
              England. Registered in England and Wales with company number 09689035.
            </span>
          </p>
          <p className="bz-footer__cookies">
            Like most websites, Outfox Energy uses cookies. Read our <strong>Cookie Policy</strong> for more information.
          </p>
        </div>

        <div className="bz-footer__links">
          <h2>Page</h2>
          <ul>
            {PAGE_LINKS.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>

        <div className="bz-footer__links">
          <h2>More</h2>
          <ul>
            {MORE_LINKS.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="bz-footer__legal">© {new Date().getFullYear()} - Outfox Energy</p>
    </footer>
  );
}
