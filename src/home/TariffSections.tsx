import { type Fuel, PRICE_CAP_FEATURES, TARIFF_FOOTNOTE, TARIFFS, type Tariff } from "./content";
import { focusHeroPostcode } from "./Hero";
import { CtaButton, Section, SectionHeader } from "./ui";

const WF = "/assets/wf";

const FUEL_ICONS: Record<Fuel, { src: string; label: string }> = {
  electricity: { src: `${WF}/zap.svg`, label: "Electricity" },
  gas: { src: `${WF}/flame.svg`, label: "Gas" },
};

function TariffCard({ tariff, ringClass }: { tariff: Tariff; ringClass: string }) {
  return (
    <li className="relative flex flex-col gap-6 overflow-hidden rounded-[32px] bg-ink p-6 sm:p-8">
      <div className="flex items-start gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <h3 className="text-2xl leading-[29px] font-normal tracking-[-0.108px] text-white">{tariff.name}</h3>
          <p className="text-white">
            <span className="text-[42px] leading-[50px] font-bold tracking-[-1.54px]">{tariff.price}</span>
            <span className="text-2xl leading-[29px] tracking-[-0.25px]">/month</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {tariff.fuels.map((fuel) => {
            const { src, label } = FUEL_ICONS[fuel];
            return (
              <span
                className="grid size-14 place-items-center rounded-[32px] bg-gradient-to-b from-[#f1e5fe]/5 to-[#e4cbff]/5"
                key={fuel}
              >
                <img alt="" height={32} src={src} width={32} />
                <span className="sr-only">{label}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="grid shrink-0 place-items-center rounded-[32px] bg-[#11b508] p-2">
          <img alt="" height={20} src={`${WF}/trend-down-green.svg`} width={20} />
        </span>
        <p className="text-lg leading-[26px] text-[#11b508]">{tariff.saving}</p>
      </div>

      <CtaButton className="relative z-10" onClick={focusHeroPostcode}>
        Get started
      </CtaButton>

      <img
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute h-[183.858px] w-[188px] max-w-none ${ringClass}`}
        height={184}
        src={`${WF}/ring-tariff.svg`}
        width={188}
      />
    </li>
  );
}

export function TariffsSection() {
  return (
    <Section id="tariffs" labelledBy="tariffs-heading">
      <div className="flex flex-col gap-12">
        <SectionHeader
          id="tariffs-heading"
          intro="Our tariffs are designed to help you pay less than the price cap."
          title="Our most popular tariffs"
        />
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {TARIFFS.map((tariff, index) => (
            <TariffCard
              key={tariff.name}
              ringClass={index === 0 ? "top-[186px] right-0" : "top-[-96px] right-[112px]"}
              tariff={tariff}
            />
          ))}
        </ul>
        <p className="max-w-[714px] text-[10px] leading-[12px] font-light text-[#334b53]">{TARIFF_FOOTNOTE}</p>
      </div>
    </Section>
  );
}

/**
 * "Outfox the Price Cap": the heading and intro, three illustrated cards, then the two buttons.
 * Wide screens (1024px and up): three cards side by side, picture on top. Tablets: the cards stack, each with
 * the picture on the left and the words on the right. Phones: the cards stack, picture on top.
 * Nothing depends on hovering; the lift and zoom on hover are decoration only.
 */
export function PriceCapSection() {
  return (
    <Section labelledBy="price-cap-heading">
      <div className="flex flex-col gap-10 md:gap-12">
        <SectionHeader
          id="price-cap-heading"
          intro="Our Tracker Tariff rates are always set below the Ofgem price cap, helping you stay in control of your energy costs."
          title="Outfox the Price Cap"
        />

        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {PRICE_CAP_FEATURES.map(({ image, title, body }) => (
            <li className="flex" key={title}>
              {/* Card: 32px corners = 24px picture corners + 8px padding. Ring shadow for the edge, soft shadows for lift. */}
              <div className="group flex h-full w-full flex-col gap-4 rounded-[32px] border border-transparent bg-white p-2 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.04),0_4px_12px_rgb(0_0_0/0.04)] hover:shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_4px_rgb(0_0_0/0.05),0_14px_32px_rgb(113_0_241/0.14)] motion-safe:transition-[translate,box-shadow] motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1 md:max-lg:flex-row md:max-lg:items-center md:max-lg:gap-6">
                {/* The pictures are 300 x 180 and have no background, so they sit centred on a soft lilac panel at their own size (they stay sharp). */}
                <div className="grid h-[200px] shrink-0 place-items-center overflow-hidden rounded-[24px] bg-[linear-gradient(161.5deg,#f8f3ff_0%,#e9dcfd_100%)] md:max-lg:h-[200px] md:max-lg:w-[320px]">
                  <img
                    alt=""
                    className="h-auto w-[300px] max-w-full motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover:scale-[1.04]"
                    decoding="async"
                    draggable={false}
                    height={180}
                    loading="lazy"
                    src={image}
                    width={300}
                  />
                </div>
                <div className="flex flex-col gap-2 px-4 pb-5 md:max-lg:px-0 md:max-lg:py-4 md:max-lg:pr-6">
                  <h3 className="text-2xl leading-[28.8px] font-medium tracking-[-0.4px] text-balance text-ink">{title}</h3>
                  <p className="text-base leading-6 text-[#314853]">{body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <CtaButton onClick={focusHeroPostcode}>Get a quote</CtaButton>
          <CtaButton href="#steps" variant="outline">
            How this tariff works?
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
