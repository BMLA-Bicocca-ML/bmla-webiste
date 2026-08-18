import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Workshop, speaker talk e reading group organizzati da BMLA, passati e futuri.",
};

export default function EventsPage() {
  const { upcoming, past } = getEvents();

  return (
    <section>
      <div className="mx-auto max-w-content px-6 py-16 md:py-20">
        <SectionHeading
          eyebrow="Events"
          title="Learn. Discuss. Connect."
          description="BMLA events are opportunities to explore new ideas, exchange perspectives, and meet people working in the field of Machine Learning."
        />

        <div className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
            Upcoming Events
          </h3>
          <div className="mt-5 flex flex-col gap-4">
            {upcoming.length > 0 ? (
              upcoming.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="text-sm text-ink-muted">Nessun evento in programma al momento.</p>
            )}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
            Past Events
          </h3>
          <div className="mt-5 flex flex-col gap-4">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
