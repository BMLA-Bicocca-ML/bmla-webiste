import { ReactNode } from "react";

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "accent" | "muted";
}) {
  const styles = {
    default: "border-border text-ink-muted",
    accent: "border-accent/40 text-accent bg-accent-faint",
    muted: "border-border text-ink-faint",
  };

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
