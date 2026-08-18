import { MapPin, ExternalLink } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { EventItem, formatEventDate } from "@/lib/data";

export function EventCard({ event }: { event: EventItem }) {
  const isPast = event.status === "past";

  return (
    <Card muted={isPast}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-accent">{formatEventDate(event.date)}</span>
            <span className="font-mono text-xs text-ink-faint">{event.time}</span>
            <Badge variant="muted">{event.type}</Badge>
            {isPast && <Badge>Past</Badge>}
          </div>
          <h3 className="mt-2 font-display text-lg text-ink">{event.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{event.description}</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
            <MapPin size={13} /> {event.location}
          </div>
        </div>

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 text-xs text-ink-muted transition-colors duration-150 hover:text-accent"
          >
            Materiali <ExternalLink size={13} />
          </a>
        )}
      </div>
    </Card>
  );
}
