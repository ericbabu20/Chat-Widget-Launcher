import { businessHero, closing } from "./content";
import { PageShell } from "./PageShell";
import { RegisterCta } from "./RegisterCta";

const billImage = "/assets/business-bill-3d.png";

function ClockIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

/** The Business Energy page: the hero with the register button, then the closing call to action. */
export function BusinessEnergyIntro() {
  return (
    <PageShell title="Business Energy | Outfox Energy">
      <div className="bz-container">
        <section aria-labelledby="bz-intro-title" className="bz-hero">
          <div className="bz-hero__text">
            <h1 id="bz-intro-title">
              {businessHero.headingStart} <em>{businessHero.headingHighlight}</em> {businessHero.headingEnd}
            </h1>
            <p>{businessHero.intro}</p>
            <div className="bz-hero__actions">
              <RegisterCta variant="light" />
              <span className="bz-hero__minute">
                <ClockIcon />
                {businessHero.minute}
              </span>
            </div>
          </div>
          {/* Decorative 3D picture. The hero text already says what it is about, so it is hidden from screen readers. */}
          <img alt="" aria-hidden="true" className="bz-hero__image" height={1024} src={billImage} width={1024} />
        </section>

        <section aria-labelledby="bz-closing-title" className="bz-closing">
          <div>
            <h2 className="bz-section-title" id="bz-closing-title">
              {closing.heading}
            </h2>
            <p className="bz-section-intro">{closing.body}</p>
          </div>
          <RegisterCta label={closing.cta} />
        </section>
      </div>
    </PageShell>
  );
}
