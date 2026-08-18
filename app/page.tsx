import Link from "next/link";
import { ArrowRight, GraduationCap, Rocket, Users, Network, BookOpen, Presentation, FlaskConical } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { APPLY_FORM_URL, STATS } from "@/lib/config";

const OBIETTIVI = [
  {
    icon: Users,
    title: "Community",
    description: "An open space where students with shared interests can connect, exchange ideas, and grow together.",
  },
  {
    icon: Rocket,
    title: "Projects",
    description: "Teams that turn ideas into projects, tackling real-world problems and putting what we learn into practice.",
  },
  {
    icon: GraduationCap,
    title: "Learning",
    description: "Reading groups, technical sessions, and in-depth discussions to explore new ideas, tools, and topics in Machine Learning.",
  },
  {
    icon: Network,
    title: "Connections",
    description: "Opportunities to connect with researchers and professors who work with data and models every day.",
  },
];

const METODO = [

  {
    icon: FlaskConical,
    title: "Team Projects",
    description: "Small teams that turn ideas into concrete projects, experimenting, iterating, and tackling real-world problems.",
  },

  {
    icon: BookOpen,
    title: "Reading Groups",
    description: "We explore foundational papers and recent research, discussing their ideas, methods, and results to understand where the field is heading.",
  },

  {
    icon: Users,
    title: "Talks & Guest Speakers",
    description: "We invite professors, researchers, PhD students, and industry professionals to share their work and experiences.",
  },

  {
    icon: Presentation,
    title: "Hands-on Sessions",
    description: "Practical sessions focused on libraries, tools, frameworks, and techniques that help community members develop their projects.",
  },

];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-content px-6 py-28 md:py-36">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            BMLA - Università di Milano-Bicocca
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-display-xl text-ink">
            Bicocca Machine Learning Association
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Student-led Machine Learning community at the University of Milano-Bicocca
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={APPLY_FORM_URL} variant="solid">
              Apply now <ArrowRight size={16} />
            </Button>
            <Button href="/projects" variant="outline">
              View projects
            </Button>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <SectionHeading
            eyebrow="Vision"
            title="Why We Exist"
            description="BMLA was created to bring together Bicocca students passionate about Machine Learning, AI, and Data Science, building a community where we can learn together, exchange ideas, and work on real-world projects. We believe that growth comes through collaboration, curiosity, and direct engagement with research and the professional world."
          />
        </div>
      </section>

      {/* Obiettivi */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <SectionHeading eyebrow="Our Goals" title="What We Aim to Build" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OBIETTIVI.map((item) => (
              <Card key={item.title}>
                <item.icon size={20} className="text-accent" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-base text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metodo */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <SectionHeading eyebrow="How We Work" title="How We Work" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {METODO.map((item) => (
              <Card key={item.title}>
                <item.icon size={20} className="text-accent" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-base text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stat bar */}
      <section className="border-b border-border bg-bg-surface">
        <div className="mx-auto max-w-content px-6 py-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-3xl text-accent md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-ink-faint">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <SectionHeading
              eyebrow="Apply"
              title="Join BMLA"
              description="BMLA is open to all Bicocca students with a strong interest in ML, AI, and Data Science and a willingness to contribute. We are looking for curious, motivated people who are ready to challenge themselves through projects, research, and new ideas."
            />
            <div className="flex md:justify-end">
              <Button href={APPLY_FORM_URL} variant="solid" className="w-full md:w-auto">
                Apply now <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section>
        <div className="mx-auto max-w-content px-6 py-20 text-center">
          <h2 className="font-display text-display-md text-ink">Have Questions?</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-muted">
            Get in touch with us. We’d be happy to talk about our work and how you can get involved.
          </p>
          <div className="mt-8">
            <Button href="/contacts" variant="outline">
              Contact Us <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
