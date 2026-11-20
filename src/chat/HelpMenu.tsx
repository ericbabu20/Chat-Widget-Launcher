const TOPICS = [
  { label: "Submit a meter reading", icon: "bolt" },
  { label: "Bills & payments", icon: "bill" },
  { label: "Moving home", icon: "home" },
  { label: "My account & login", icon: "person" },
] as const;

type HelpMenuProps = {
  variant: "desktop" | "mobile";
  bottomOffset: number;
  onClose: () => void;
  onStart: (topic?: string) => void;
};

/** The topic panel that opens from the launcher, before the chat itself. */
export function HelpMenu({ variant, bottomOffset, onClose, onStart }: HelpMenuProps) {
  const desktop = variant === "desktop";

  return (
    <div
      className={`cl-help cl-enter ${desktop ? "cl-help--desktop" : "cl-help--mobile"}`}
      style={desktop ? { bottom: `calc(24px + env(safe-area-inset-bottom) + ${bottomOffset}px)` } : undefined}
    >
      {!desktop && <button aria-label="Close chat options" className="cl-help__backdrop" onClick={onClose} type="button" />}
      <section aria-label="Chat with Outfox" className="cl-help__panel" role="dialog">
        {!desktop && <span aria-hidden="true" className="cl-help__grabber" />}
        <header className="cl-help__head">
          <span className="cl-mark cl-mark--small">
            <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
              <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.6-5A8.5 8.5 0 1 1 21 11.5z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </span>
          <span className="cl-help__who">
            <strong>Outfox Help</strong>
            <small>
              <span className="cl-help__online" />
              Assistant online now
            </small>
          </span>
          <button aria-label="Close" className="cl-help__close" onClick={onClose} type="button">
            <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
            </svg>
          </button>
        </header>
        <div className="cl-help__intro">
          <h2>How can we help today?</h2>
          {desktop && <p>Pick a topic and we'll take you straight to the right answer.</p>}
        </div>
        <div className={desktop ? "cl-help__list" : "cl-help__grid"}>
          {TOPICS.map((topic) => (
            <button className="cl-help__topic" key={topic.label} onClick={() => onStart(topic.label)} type="button">
              <TopicIcon name={topic.icon} />
              <span>{desktop ? topic.label : shortLabel(topic.label)}</span>
              {desktop && (
                <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              )}
            </button>
          ))}
        </div>
        <button className="cl-help__start" onClick={() => onStart()} type="button">
          Start a chat
          <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
          </svg>
        </button>
        <p className="cl-help__hours">
          Need a person? Our team is in chat Monday to Friday, 8:30am to 5pm.
          <br />
          <a href="https://www.outfox.energy/">Other ways to contact us</a>
        </p>
      </section>
    </div>
  );
}

function shortLabel(label: string) {
  if (label.startsWith("Submit")) return "Meter reading";
  if (label.startsWith("My account")) return "Account & login";
  return label;
}

function TopicIcon({ name }: { name: (typeof TOPICS)[number]["icon"] }) {
  const common = { "aria-hidden": true, fill: "none", height: 18, stroke: "currentColor", strokeWidth: 2, viewBox: "0 0 24 24", width: 18 } as const;
  return (
    <span className="cl-help__icon">
      {name === "bolt" && (
        <svg {...common}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" strokeLinejoin="round" />
        </svg>
      )}
      {name === "bill" && (
        <svg {...common}>
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" strokeLinejoin="round" />
          <path d="M9 8h6M9 12h6" strokeLinecap="round" />
        </svg>
      )}
      {name === "home" && (
        <svg {...common}>
          <path d="M3 11 12 4l9 7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 10v10h14V10" strokeLinejoin="round" />
        </svg>
      )}
      {name === "person" && (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
