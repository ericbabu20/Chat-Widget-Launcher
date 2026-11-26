import { Mail, MapPin } from "lucide-react";

const ASSETS = "/assets/home";

// The same profiles as the footer on the Business energy pages.
const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/Oufox.Energy/", icon: "social-facebook.svg", width: 8, height: 16 },
  { label: "X", href: "https://x.com/outfox_energy", icon: "social-x.svg", width: 16, height: 16 },
  { label: "Instagram", href: "https://www.instagram.com/outfox.energy", icon: "social-instagram.svg", width: 16, height: 16 },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/outfoxenergy/", icon: "social-linkedin.svg", width: 16, height: 16 },
  // This icon file already includes the round border, so it fills the whole circle.
  { label: "YouTube", href: "https://www.youtube.com/@outfox.energy", icon: "social-youtube.svg", width: 44, height: 44, hasOwnBorder: true },
];

const PAGE_LINKS = ["About Us", "Help Centre", "Account", "Contact Us", "Complaints"];
const MORE_LINKS = ["FAQs", "Terms and Conditions", "Our Policies", "Anti-Slavery"];

const COLUMN_HEADING = "mb-4 border-b border-white/30 pb-3.5 text-base font-medium text-white";
const LINK_FOCUS = "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** The dark footer card, in the same rounded style as the hero. */
export function HomeFooter() {
  return (
    <footer className="px-6 pb-[calc(1.5rem+var(--cl-dock-space,0px))]">
      <div className="mx-auto max-w-[88rem] rounded-2xl bg-ink px-6 pt-10 text-white/90 md:px-14 md:pt-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.4fr_0.7fr_0.8fr] lg:gap-14">
          <div>
            <img alt="Outfox Energy" className="h-8 w-auto" height={39} src={`${ASSETS}/footer-logo.svg`} width={224} />
            <p className="mt-6 mb-4 text-sm text-white">Follow us on social media</p>
            <ul className="flex flex-wrap gap-3">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    aria-label={`Outfox Energy on ${item.label} (opens in a new tab)`}
                    className={`grid size-11 place-items-center rounded-full transition-[background-color,scale] duration-200 hover:bg-white/10 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 ${"hasOwnBorder" in item ? "" : "border border-white/30"} ${LINK_FOCUS}`}
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img alt="" height={item.height} src={`${ASSETS}/${item.icon}`} width={item.width} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={COLUMN_HEADING}>Contact</h2>
            <p className="mb-4 flex items-start gap-3 text-sm leading-snug">
              <Mail aria-hidden="true" className="mt-px size-[18px] shrink-0" />
              <a className={`hover:underline ${LINK_FOCUS}`} href="mailto:hello@outfox.energy">
                hello@outfox.energy
              </a>
            </p>
            <p className="mb-4 flex items-start gap-3 text-sm leading-snug">
              <MapPin aria-hidden="true" className="mt-px size-[18px] shrink-0" />
              <span>
                Outfox Energy
                <br />
                (Foxglove Energy Supply LTD),
                <br />
                16 North Mills, Frog Island, Leicester, Leicestershire, LE3 5DL,
                <br />
                Registered in England and Wales with company number 09689035
              </span>
            </p>
            <p className="pt-2 text-sm leading-snug text-white">
              Like most websites, Outfox Energy uses cookies. Read our{" "}
              <span className="underline underline-offset-4">Cookie Policy</span> for more information.
            </p>
          </div>

          <div>
            <h2 className={COLUMN_HEADING}>Page</h2>
            <ul className="flex flex-col gap-4 text-sm">
              {PAGE_LINKS.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={COLUMN_HEADING}>More</h2>
            <ul className="flex flex-col gap-4 text-sm">
              {MORE_LINKS.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/30 py-5 text-center text-base text-white">© 2026 - Outfox Energy</p>
      </div>
    </footer>
  );
}
