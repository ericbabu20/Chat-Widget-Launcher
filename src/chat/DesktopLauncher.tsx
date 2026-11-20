import type { RefObject } from "react";
import { ChatMark, CloseIcon } from "./ChatParts";
import { getLauncherText, type LauncherCopy } from "./copy";

type DesktopLauncherProps = {
  bottomOffset: number;
  buttonRef: RefObject<HTMLButtonElement | null>;
  controlsId: string;
  copy: LauncherCopy;
  handoffToHuman: boolean;
  minimised: boolean;
  onMinimise: () => void;
  onOpen: () => void;
};

/** Desktop: the glass pill, or the round button after it is minimised. */
export function DesktopLauncher({
  bottomOffset,
  buttonRef,
  controlsId,
  copy,
  handoffToHuman,
  minimised,
  onMinimise,
  onOpen,
}: DesktopLauncherProps) {
  const text = getLauncherText({ copy, handoffToHuman });
  const style = { bottom: `calc(24px + env(safe-area-inset-bottom) + ${bottomOffset}px)` };

  if (minimised) {
    return (
      <div className="cl-desktop cl-enter" style={style}>
        <button aria-label={text.ariaLabel} className="cl-fab" onClick={onOpen} ref={buttonRef} type="button">
          <ChatMark size={26} />
          <span className="cl-live-dot cl-live-dot--fab" />
        </button>
      </div>
    );
  }

  return (
    <div className="cl-desktop cl-enter" style={style}>
      <div className="cl-glass-pill">
        <button aria-controls={controlsId} aria-expanded={false} aria-label={text.ariaLabel} className="cl-glass-pill__main" onClick={onOpen} ref={buttonRef} type="button">
          <span className="cl-mark">
            <ChatMark />
            <span className="cl-live-dot" />
          </span>
          <span className="cl-glass-pill__copy">
            <span className="cl-glass-pill__eyebrow">{text.eyebrow}</span>
            <strong>{text.line1}</strong>
            <small>{text.line2}</small>
          </span>
        </button>
        <button aria-label="Minimise chat launcher" className="cl-glass-pill__min" onClick={onMinimise} type="button">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
