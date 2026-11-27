import { openSupportChat } from "../openChat";
import { OPENING_HOURS, PHONE } from "./content";
import { HEADING, INTRO } from "./ui";

const WF = "/assets/wf";

const BUTTON_BASE =
  "inline-flex h-14 items-center justify-center gap-2.5 rounded-full text-[17px] font-medium whitespace-nowrap transition-[background-color,scale] duration-200 " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none motion-reduce:active:scale-100";

export function AdvisorsSection() {
  return (
    <section
      aria-labelledby="advisors-heading"
      className="scroll-mt-24 px-4 py-12 md:pt-[98px] md:pb-[13px]"
    >
      <div className="rise relative isolate mx-auto max-w-[1408px] overflow-hidden rounded-[32px] bg-[linear-gradient(157deg,#f1e5ff_0%,#dfc8fd_100%)] p-6 shadow-[0_4px_16px_rgb(0_0_0/0.05)] md:p-7">
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-[-178px] right-[41px] -z-10 hidden h-[338px] w-[345px] max-w-none lg:block"
          height={338}
          src={`${WF}/advisor-ring.svg`}
          width={345}
        />

        <div className="mx-auto flex max-w-[1195px] flex-col items-center gap-8 md:flex-row md:justify-between xl:justify-start xl:gap-[213px]">
          <div className="flex w-full min-w-0 flex-col gap-8 md:max-w-[587px] md:flex-1">
            <div className="flex flex-col gap-6">
              <h2 className={`${HEADING} text-black`} id="advisors-heading">
                Speak with one of our advisors
              </h2>
              <p className={`${INTRO} tracking-[0.05px] text-[#334b53]`}>
                Forget long wait times. Our friendly UK-based team is ready when you are.
              </p>
            </div>

            <ul aria-label="Opening hours" className="flex flex-wrap gap-x-4 gap-y-3 text-base leading-[19px] xl:flex-nowrap">
              {OPENING_HOURS.map((slot) => (
                <li className="flex items-center gap-2 whitespace-nowrap xl:flex-1" key={slot.days}>
                  <span
                    aria-hidden="true"
                    className={`size-[7px] shrink-0 rounded-full ${slot.open ? "bg-success" : "bg-[#b0bbc2]"}`}
                  />
                  <span className="font-medium tracking-[-0.064px] text-ink">{slot.days}</span>
                  <span className="tracking-[-0.064px] text-[#314853]">{slot.hours}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                className={`${BUTTON_BASE} border border-brand px-6 tracking-[-0.17px] text-brand hover:bg-white`}
                href={PHONE.href}
              >
                <img alt="" height={20} src={`${WF}/phone.svg`} width={20} />
                <span className="sr-only">Call us on </span>
                {PHONE.label}
              </a>
              <button
                className={`${BUTTON_BASE} gap-3 bg-brand px-[30px] tracking-[-0.068px] text-white hover:bg-brand-dark`}
                onClick={openSupportChat}
                type="button"
              >
                <img alt="" height={20} src={`${WF}/chat.svg`} width={20} />
                Chat now
              </button>
            </div>
          </div>

          {/* Decorative: the whole fox, which has a transparent background and fits this box's proportions. */}
          <div aria-hidden="true" className="relative h-[436px] w-[288px] shrink-0">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              decoding="async"
              height={1024}
              loading="lazy"
              src="/assets/home/advisor-fox-headset.png"
              width={682}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
