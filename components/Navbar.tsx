"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { APPLY_FORM_URL, SITE } from "@/lib/config";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/contacts", label: "Contacts" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-medium text-ink">
          <Image
            src="/logo.png"
            alt="BMLA"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          {SITE.shortName}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-150 ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Button href={APPLY_FORM_URL} variant="outline" className="!py-2 text-sm">
            Apply
          </Button>
        </div>

        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-2 py-3 text-sm text-ink-muted hover:bg-bg-raised hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Button href={APPLY_FORM_URL} variant="solid" className="mt-2 w-full">
              Apply
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
