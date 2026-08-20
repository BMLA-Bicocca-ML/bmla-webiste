import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { SITE } from "@/lib/config";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-content px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-base text-ink">
              <Image
                src="/logo.png"
                alt="BMLA"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              {SITE.shortName}
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">Contact</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-ink-muted">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-accent">
                <Mail size={14} /> {SITE.email}
              </a>
              <span>{SITE.university}</span>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">Social</p>
            <div className="mt-3 flex items-center gap-4 text-ink-muted">
              <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent">
                <Github size={18} />
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent">
                <Linkedin size={18} />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <Link href="/contacts" className="hover:text-ink-muted">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
