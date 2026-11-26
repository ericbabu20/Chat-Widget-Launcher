import { registerPage } from "./content";
import { PageShell } from "./PageShell";

/**
 * The registration route. It is a heading-only stub, because the form is not designed yet.
 * The form files (RegisterForm.tsx and friends) are kept on disk but are not used here.
 */
export function BusinessEnergyRegister() {
  return (
    <PageShell title={`${registerPage.heading} | Business Energy | Outfox Energy`}>
      <div className="bz-narrow">
        <section aria-labelledby="bz-register-title" className="bz-card-lg bz-register-intro">
          <h1 id="bz-register-title">{registerPage.heading}</h1>
        </section>
      </div>
    </PageShell>
  );
}
