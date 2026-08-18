import { ReactNode } from "react";

export function Card({
  children,
  className = "",
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-bg-surface p-6 transition-colors duration-200 ${
        muted ? "opacity-60" : "hover:border-border-strong"
      } ${className}`}
    >
      {children}
    </div>
  );
}
