import Link from "next/link";
import { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

const variantStyles = {
  solid: "bg-accent text-bg hover:bg-accent-dim border border-accent",
  outline: "border border-border-strong text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink-muted hover:text-ink",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded px-4 py-2.5 text-sm font-medium transition-colors duration-150";

export function Button({
  children,
  variant = "solid",
  className = "",
  href,
  target,
  onClick,
  type = "button",
}: BaseProps & {
  href?: string;
  target?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
