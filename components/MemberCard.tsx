import Image from "next/image";
import { Member } from "@/lib/data";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + last).toUpperCase();
}

export function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors duration-200 hover:border-border-strong">
      <div className="relative aspect-square w-full bg-bg-raised">
        {member.avatarUrl ? (
          <Image
            src={member.avatarUrl}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-3xl text-ink-faint">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-base text-ink transition-colors duration-150 hover:text-accent"
          >
            {member.name}
          </a>
        ) : (
          <p className="font-display text-base text-ink">{member.name}</p>
        )}
        <p className="mt-1 text-xs text-ink-muted">{member.tagline}</p>
      </div>
    </div>
  );
}
