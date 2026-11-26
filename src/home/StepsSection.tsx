import { STEPS } from "./content";
import { focusHeroPostcode } from "./Hero";
import { PillButton, Section } from "./ui";

/** Words on the left, the four steps on the right. The first step is the one to do right now, so it is the dark card. */
export function StepsSection() {
  return (
    <Section id="steps" labelledBy="steps-heading">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-8">
        <div className="md:sticky md:top-8 md:pt-2 md:pr-12">
          <h2
            className="mb-6 text-5xl leading-none font-medium text-balance text-ink md:text-6xl"
            id="steps-heading"
            style={{ letterSpacing: "-0.04em" }}
          >
            The sooner you <span className="text-brand">switch</span>, the sooner you{" "}
            <span className="text-brand">save</span>
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-ink/70">
            Four simple steps and you’re done - most switches take under ten minutes, and we handle the heavy lifting.
          </p>
          <PillButton arrow onClick={focusHeroPostcode}>
            Get your quote
          </PillButton>
        </div>

        <ol className="flex flex-col gap-4">
          {STEPS.map((step, index) => {
            const first = index === 0;
            return (
              <li
                className={`flex gap-5 rounded-2xl p-7 md:gap-8 ${first ? "bg-ink text-white" : "bg-white text-ink"}`}
                key={step.title}
              >
                <span
                  aria-hidden="true"
                  className={`w-14 shrink-0 text-4xl leading-none font-medium tracking-[-0.04em] ${first ? "text-[#c9a6fb]" : "text-brand"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-2 text-2xl leading-snug font-medium tracking-[-0.02em]">{step.title}</h3>
                  <p className={`text-base leading-relaxed ${first ? "text-white/70" : "text-ink/70"}`}>{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
