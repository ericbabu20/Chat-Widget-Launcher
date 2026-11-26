import { AppLink, ROUTES } from "../router";
import { businessHero } from "./content";

type RegisterCtaProps = {
  /** "light" is a white button, for sitting on a purple background. */
  variant?: "primary" | "light";
  /** The label. Defaults to the hero wording, which is the same on every button. */
  label?: string;
};

/** The "Register your interest" button. It always goes to the registration route. */
export function RegisterCta({ variant = "primary", label = businessHero.cta }: RegisterCtaProps) {
  return (
    <AppLink className={`bz-cta${variant === "light" ? " bz-cta--light" : ""}`} to={ROUTES.businessEnergyRegister}>
      {label}
      <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      </svg>
    </AppLink>
  );
}
