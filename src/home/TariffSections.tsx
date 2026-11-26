import { Flame, TrendingDown, Zap, type LucideIcon } from "lucide-react";
import { type Fuel, PRICE_CAP_FEATURES, TARIFF_FOOTNOTE, TARIFFS, type Tariff } from "./content";
import { focusHeroPostcode } from "./Hero";
import { FeatureTile, PillButton, Section, SplitHeader } from "./ui";

const FUEL_ICONS: Record<Fuel, { icon: LucideIcon; label: string }> = {
  electricity: { icon: Zap, label: "Electricity" },
  gas: { icon: Flame, label: "Gas" },
};

function TariffCard({ tariff }: { tariff: Tariff }) {
  return (
    <li className="flex min-h-96 flex-col justify-between rounded-2xl bg-ink p-7 text-white">
      <div>
        <span className="mb-5 flex gap-2">
          {tariff.fuels.map((fuel) => {
            const { icon: Icon, label } = FUEL_ICONS[fuel];
            return (
              <span className="grid size-12 place-items-center rounded-full bg-white/10 text-white" key={fuel}>
                <Icon aria-hidden="true" className="size-6" />
                <span className="sr-only">{label}</span>
              </span>
            );
          })}
        </span>
        <h3 className="text-2xl leading-snug font-medium tracking-[-0.02em]">{tariff.name}</h3>
      </div>

      <div className="flex flex-col items-start gap-5">
        <p className="flex flex-wrap items-baseline gap-x-1">
          <span className="text-5xl font-medium tracking-[-0.04em] md:text-6xl">{tariff.price}</span>
          <span className="text-xl text-white/70">/month</span>
        </p>
        <p className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-base text-white">
          <TrendingDown aria-hidden="true" className="size-5 shrink-0 text-[#3ddc33]" />
          {tariff.saving}
        </p>
        <PillButton arrow onClick={focusHeroPostcode} variant="light">
          Get started
        </PillButton>
      </div>
    </li>
  );
}

export function TariffsSection() {
  return (
    <Section id="tariffs" labelledBy="tariffs-heading">
      <SplitHeader
        id="tariffs-heading"
        intro="Our tariffs are designed to help you pay less than the price cap."
        title="Our most popular tariffs"
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {TARIFFS.map((tariff) => (
          <TariffCard key={tariff.name} tariff={tariff} />
        ))}
      </ul>
      <p className="mt-8 max-w-3xl text-sm leading-snug text-ink/70">{TARIFF_FOOTNOTE}</p>
    </Section>
  );
}

export function PriceCapSection() {
  return (
    <Section labelledBy="price-cap-heading">
      <SplitHeader
        actions={
          <>
            <PillButton arrow onClick={focusHeroPostcode}>
              Get a quote
            </PillButton>
            <PillButton href="#steps" variant="outline">
              How this tariff works
            </PillButton>
          </>
        }
        id="price-cap-heading"
        intro="A 12-month smart tracker tariff that stays 5% below the Ofgem price cap."
        title="Outfox the Price Cap"
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureTile className="sm:col-span-2" feature={PRICE_CAP_FEATURES[0]} tone="tint" />
        <FeatureTile feature={PRICE_CAP_FEATURES[1]} tone="ink" />
        <FeatureTile feature={PRICE_CAP_FEATURES[2]} tone="ink" />
      </ul>
    </Section>
  );
}

