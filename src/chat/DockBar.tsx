import type { RefObject } from "react";
import { ChatMark, CloseIcon } from "./ChatParts";
import { getLauncherText, type LauncherCopy } from "./copy";

type DockBarProps = {
  copy: LauncherCopy;
  handoffToHuman: boolean;
  controlsId: string;
  buttonRef: RefObject<HTMLButtonElement | null>;
  dockRef: RefObject<HTMLDivElement | null>;
  minimised: boolean;
  onActivate: () => void;
  onMinimise: () => void;
};

/** Phone and tablet: the help bar along the bottom, or the round button after it is closed. */
export function DockBar({
  copy,
  handoffToHuman,
  controlsId,
  buttonRef,
  dockRef,
  minimised,
  onActivate,
  onMinimise,
}: DockBarProps) {
  const text = getLauncherText({ copy, handoffToHuman });

  if (minimised) {
    return (
      <div className="cl-dock cl-dock--fab cl-enter" ref={dockRef}>
        <button aria-label={text.ariaLabel} className="cl-fab" onClick={onActivate} ref={buttonRef} type="button">
          <ChatMark size={26} />
          <span className="cl-live-dot cl-live-dot--fab" />
        </button>
      </div>
    );
  }

  return (
    <div className="cl-dock cl-enter" ref={dockRef}>
      <nav aria-label="Get help" className="cl-helpbar">
        <button
          aria-controls={controlsId}
          aria-expanded={false}
          aria-label={text.ariaLabel}
          className="cl-helpbar__button"
          onClick={onActivate}
          ref={buttonRef}
          type="button"
        >
          <span className="cl-mark cl-mark--dock">
            <ChatMark size={21} />
            <span className="cl-live-dot" />
          </span>
          <span className="cl-glass-pill__copy">
            <span className="cl-glass-pill__eyebrow">{text.eyebrow}</span>
            <strong>{text.line1}</strong>
            <small>{text.line2}</small>
          </span>
        </button>
        <button aria-label="Minimise chat launcher" className="cl-helpbar__close" onClick={onMinimise} type="button">
          <CloseIcon />
        </button>
      </nav>
    </div>
  );
}
