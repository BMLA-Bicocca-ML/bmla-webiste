import type { Metadata } from "next";
import { Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { ContactForm } from "./ContactForm";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contacts",
  description: "Contatta Bicocca Machine Learning Association: email, social e sede.",
};

export default function ContactsPage() {
  return (
    <section>
      <div className="mx-auto max-w-content px-6 py-16 md:py-20">
        <SectionHeading
          eyebrow="Contacts"
          title="Let's connect"
          description="Have an idea, want to join BMLA, or think we could collaborate? Get in touch. We’re always open to new people, projects, and connections."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Card className="h-fit">
            <div className="flex flex-col gap-5 text-sm">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-ink-muted hover:text-accent">
                <Mail size={16} /> {SITE.email}
              </a>
              <div className="flex items-center gap-3 text-ink-muted">
                <MapPin size={16} /> {SITE.university}, {SITE.location}
              </div>
              <div className="flex items-center gap-4 border-t border-border pt-5">
                <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-ink-muted hover:text-accent">
                  <Github size={18} />
                </a>
                <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-ink-muted hover:text-accent">
                  <Linkedin size={18} />
                </a>
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ink-muted hover:text-accent">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </Card>

          <Card>
            <ContactForm />
          </Card>
        </div>
      </div>
    </section>
  );
}
