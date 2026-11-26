import { AdvisorsSection } from "./AdvisorsSection";
import { Hero } from "./Hero";
import { HomeFooter } from "./HomeFooter";
import { AppSection, EvSection } from "./PromoSections";
import { ReviewsSection } from "./ReviewsSection";
import { StepsSection } from "./StepsSection";
import { PriceCapSection, TariffsSection } from "./TariffSections";
import { CertificationsSection, WhyOutfoxSection } from "./TrustSections";
import { WarmHomeDiscountSection } from "./WarmHomeDiscountSection";

/** The Outfox Energy home page. Every section sits on the same light grey page. */
export function HomePage() {
  return (
    <div className="flex flex-col overflow-x-clip bg-canvas font-sans text-ink antialiased">
      <main>
        <Hero />
        <ReviewsSection />
        <TariffsSection />
        <PriceCapSection />
        <WarmHomeDiscountSection />
        <EvSection />
        <AppSection />
        <WhyOutfoxSection />
        <CertificationsSection />
        <StepsSection />
        <AdvisorsSection />
      </main>
      <HomeFooter />
    </div>
  );
}

