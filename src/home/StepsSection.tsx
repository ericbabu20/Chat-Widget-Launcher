import { STEPS } from "./content";
import { focusHeroPostcode } from "./Hero";
import { CtaButton, INTRO, Section } from "./ui";

/**
 * "The sooner you switch": a quiet editorial layout on a strict grid.
 * - Top: a big headline on the left, the intro line and the button in a narrow column on the right (wide screens).
 * - Below: the four steps as an open row, each one under a thin rule with a small number. Pointing at a step draws a
 *   purple line across its rule and nudges the words a little (not for people who reduce motion).
 * Phones: the same content stacked, each step a row with its number in the margin.
 */
export function StepsSection() {
  return (
    <Section id="steps" labelledBy="steps-heading" padding="py-12 md:pt-[141px] md:pb-[97px]">
      <div className="flex flex-col gap-12 md:gap-20">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-x-8">
          <h2
            className="text-[2.25rem] leading-[2.5rem] font-bold tracking-[-1px] text-black md:text-[56px] md:leading-[56px] md:tracking-[-1.5px] lg:col-span-8 lg:text-[72px] lg:leading-[72px] lg:tracking-[-3px]"
            id="steps-heading"
          >
            The sooner you <span className="text-brand">switch</span>,{" "}
            <span className="md:block">
              the sooner you <span className="text-brand">save</span>
            </span>
          </h2>
          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:pb-2">
            <p className={INTRO}>
              Four simple steps and you’re done - most switches take under ten minutes, and we handle the heavy lifting.
            </p>
            <CtaButton onClick={focusHeroPostcode}>Get a quote</CtaButton>
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 md:gap-y-12 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              className="group relative grid grid-cols-[2.5rem_1fr] content-start gap-x-2 border-t border-ink/20 pt-5 md:grid-cols-1 md:gap-y-10 md:pt-6"
              key={step.title}
            >
              {/* The purple line that draws across the rule when the step is pointed at. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-brand group-hover:scale-x-100 motion-safe:transition-[scale] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              />
              <span
                aria-hidden="true"
                className="pt-1 text-xs leading-4 font-medium tracking-[0.12em] text-[#4a5f68] uppercase tabular-nums group-hover:text-brand motion-safe:transition-colors motion-safe:duration-300"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3 motion-safe:transition-[translate] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover:translate-x-1">
                <h3 className="text-2xl leading-[28.8px] font-medium tracking-[-0.4px] text-ink">{step.title}</h3>
                <p className="text-base leading-6 text-[#314853]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
