import { CERTIFICATIONS, WHY_OUTFOX_FEATURES } from "./content";
import { FeatureTile, Marquee, Section, SplitHeader } from "./ui";

export function WhyOutfoxSection() {
  return (
    <Section id="why" labelledBy="why-heading">
      <SplitHeader
        id="why-heading"
        intro="Why pay more for your energy? Here's why we're the switch you've been waiting for."
        title="The Same Energy - Just Cheaper"
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureTile feature={WHY_OUTFOX_FEATURES[0]} tone="ink" />
        <FeatureTile feature={WHY_OUTFOX_FEATURES[1]} tone="ink" />
        <FeatureTile className="sm:col-span-2" feature={WHY_OUTFOX_FEATURES[2]} tone="tint" />
      </ul>
    </Section>
  );
}

/** The "backed by" row: a short line on the left, the logos sliding past on the right. */
export function CertificationsSection() {
  return (
    <section aria-labelledby="certified-heading" className="px-6 py-8 md:py-12">
      <div className="rise mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-8 md:grid-cols-4">
        <div>
          <h2 className="mb-3 text-2xl leading-snug font-medium tracking-[-0.02em] text-ink" id="certified-heading">
            Certified to the standards that matter
          </h2>
          <p className="text-base leading-relaxed text-ink/70">
            Your switch is backed by independently certified standards for security, service and a smooth, guaranteed
            switch.
          </p>
        </div>
        <div className="md:col-span-3">
          <Marquee label="Our certifications">
            {CERTIFICATIONS.map((logo) => (
              <img
                alt={logo.alt}
                className="mx-8 h-16 w-auto shrink-0 md:mx-10"
                height={logo.height}
                key={logo.src}
                loading="lazy"
                src={logo.src}
                width={logo.width}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
