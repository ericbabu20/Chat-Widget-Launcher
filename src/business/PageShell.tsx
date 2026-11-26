import { type ReactNode, useEffect } from "react";
import "./business.css";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PageShellProps = {
  title: string;
  children: ReactNode;
};

/** The frame every Business Energy page sits in: header, content, footer. */
export function PageShell({ title, children }: PageShellProps) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <div className="bz-page">
      <SiteHeader businessEnergyActive />
      <div className="bz-body">{children}</div>
      <SiteFooter />
    </div>
  );
}
