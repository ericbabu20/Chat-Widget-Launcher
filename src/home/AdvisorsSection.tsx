import { MessageSquare, Phone } from "lucide-react";
import { openSupportChat } from "../openChat";
import { OPENING_HOURS, PHONE } from "./content";
import { PillButton } from "./ui";

export function AdvisorsSection() {
  return (
    <section aria-labelledby="advisors-heading" className="px-6 py-16 md:py-24">
      <div className="rise mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_92%_8%,#c9a6fb_0,#c9a6fb_11rem,transparent_11.05rem),linear-gradient(135deg,#f1e5ff,#dfc8fd)] p-6 md:grid-cols-2 md:p-14">
        <div>
          <h2
            className="mb-6 text-5xl leading-none font-medium text-balance text-ink md:text-6xl"
            id="advisors-heading"
            style={{ letterSpacing: "-0.04em" }}
          >
            Speak with one of our advisors
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-ink/75">
            Forget long wait times. Our friendly UK-based team is ready when you are.
          </p>

          <ul aria-label="Opening hours" className="mb-8 flex flex-wrap gap-x-6 gap-y-3 text-base">
            {OPENING_HOURS.map((slot) => (
              <li className="flex items-center gap-2" key={slot.days}>
                <span
                  aria-hidden="true"
                  className={`size-2 shrink-0 rounded-full ${slot.open ? "bg-success" : "bg-ink/40"}`}
                />
                <span className="font-medium text-ink">{slot.days}</span>
                <span className="text-ink/75">{slot.hours}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <PillButton href={PHONE.href} icon={Phone} variant="outline">
              <span className="sr-only">Call us on </span>
              {PHONE.label}
            </PillButton>
            <PillButton icon={MessageSquare} onClick={openSupportChat}>
              Chat now
            </PillButton>
          </div>
        </div>

        <img
          alt=""
          className="mx-auto w-[min(21rem,70%)] md:justify-self-center"
          decoding="async"
          height={1254}
          loading="lazy"
          src="/assets/home/advisor-fox.png"
          width={1254}
        />
      </div>
    </section>
  );
}
