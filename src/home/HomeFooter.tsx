const ASSETS = "/assets/home";
const WF = "/assets/wf";

// The same profiles as the footer on the Business energy pages.
const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/Oufox.Energy/", icon: `${ASSETS}/social-facebook.svg`, width: 8, height: 16 },
  { label: "X", href: "https://x.com/outfox_energy", icon: `${ASSETS}/social-x.svg`, width: 16, height: 16 },
  { label: "Instagram", href: "https://www.instagram.com/outfox.energy", icon: `${ASSETS}/social-instagram.svg`, width: 16, height: 16 },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/outfoxenergy/", icon: `${ASSETS}/social-linkedin.svg`, width: 16, height: 16 },
  // This icon file already includes the round border, so it fills the whole circle.
  { label: "YouTube", href: "https://www.youtube.com/@outfox.energy", icon: `${WF}/social-youtube.svg`, width: 44, height: 44, hasOwnBorder: true },
];

const PAGE_LINKS = ["About Us", "Help Centre", "Account", "Contact Us", "Complaints"];
const MORE_LINKS = ["FAQs", "Terms and Conditions", "Our Policies", "Anti-Slavery"];

const COLUMN_HEADING = "border-b border-white/[0.28] pb-[15px] text-[17px] leading-[17px] font-medium tracking-[-0.17px] text-white";
const LINK_FOCUS = "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** The dark footer band that runs the full width of the page. */
export function HomeFooter() {
  return (
    <footer className="bg-ink pt-12 pb-[calc(1rem+var(--cl-dock-space,0px))] md:pt-14">
      <div className="flex flex-col gap-12 px-6 md:px-12 xl:px-[120px]">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div className="flex shrink-0 flex-col gap-6">
            <img alt="Outfox Energy" className="h-auto w-[224px]" height={39} src={`${ASSETS}/footer-logo.svg`} width={224} />
            <p className="text-sm leading-[21px] tracking-[0.1313px] text-[#f8f6f3]">Follow us on social media</p>
            <ul className="flex flex-wrap gap-3">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    aria-label={`Outfox Energy on ${item.label} (opens in a new tab)`}
                    className={`grid size-11 place-items-center rounded-full transition-[background-color,scale] duration-200 hover:bg-white/10 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 ${"hasOwnBorder" in item ? "" : "border-[0.8px] border-white/[0.19]"} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img alt="" height={item.height} src={item.icon} width={item.width} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-10 text-sm leading-[17px] tracking-[-0.056px] sm:flex-row sm:flex-wrap sm:gap-12 lg:min-w-0 lg:flex-1 lg:flex-nowrap lg:justify-end lg:gap-8 xl:gap-12">
            <div className="flex flex-col gap-4 lg:min-w-0 lg:max-w-[360px] lg:flex-1">
              <h2 className={`${COLUMN_HEADING} text-base tracking-[-0.064px]`}>Contact</h2>
              <p className="flex items-center gap-3 pt-px text-white/90">
                <img alt="" className="shrink-0" height={18} src={`${WF}/mail.svg`} width={18} />
                <a className={`hover:underline ${LINK_FOCUS}`} href="mailto:hello@outfox.energy">
                  hello@outfox.energy
                </a>
              </p>
              <p className="flex items-start gap-3 pt-0.5 text-white/90">
                <img alt="" className="mt-px shrink-0" height={18} src={`${WF}/pin.svg`} width={18} />
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
              <p className="pt-2.5 text-white">
                Like most websites, Outfox Energy uses cookies. Read our{" "}
                <span className="underline underline-offset-2">Cookie Policy</span> for more information.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:w-[130px] lg:shrink-0 xl:w-[150px]">
              <h2 className={COLUMN_HEADING}>Page</h2>
              <ul className="flex flex-col gap-4 text-white/90">
                {PAGE_LINKS.map((label) => (
                  <li className="pt-[2.5px] pb-[1.69px]" key={label}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 lg:w-[150px] lg:shrink-0 xl:w-[170px]">
              <h2 className={COLUMN_HEADING}>More</h2>
              <ul className="flex flex-col gap-4 text-white/90">
                {MORE_LINKS.map((label) => (
                  <li className="pt-[2.5px] pb-[1.69px]" key={label}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-12 border-t-[0.5px] border-white px-4 pt-4 pb-4 text-center text-lg leading-[27px] tracking-[0.1688px] text-white">
        © 2026 - Outfox Energy
      </p>
    </footer>
  );
}
