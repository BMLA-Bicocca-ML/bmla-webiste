import Image from "next/image";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + last).toUpperCase();
}

/**
 * Piccolo avatar circolare: mostra la foto se disponibile, altrimenti le iniziali.
 * Se è presente linkedinUrl, l'avatar (e opzionalmente il nome) diventa un link
 * cliccabile che apre il profilo LinkedIn in una nuova tab.
 */
export function Avatar({
  name,
  avatarUrl,
  size = 28,
}: {
  name: string;
  avatarUrl?: string | null;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-bg-raised text-ink-muted"
      style={{ width: size, height: size }}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          className="font-mono font-medium"
          style={{ fontSize: Math.max(10, size * 0.36) }}
        >
          {getInitials(name)}
        </span>
      )}
    </span>
  );
}

export function PersonChip({
  name,
  linkedinUrl,
  avatarUrl,
  size = 28,
}: {
  name: string;
  linkedinUrl?: string | null;
  avatarUrl?: string | null;
  size?: number;
}) {
  const content = (
    <>
      <Avatar name={name} avatarUrl={avatarUrl} size={size} />
      <span className="text-xs text-ink-muted transition-colors duration-150 group-hover:text-accent">
        {name}
      </span>
    </>
  );

  if (linkedinUrl) {
    return (
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-1.5"
        aria-label={`Profilo LinkedIn di ${name}`}
      >
        {content}
      </a>
    );
  }

  return <span className="flex items-center gap-1.5">{content}</span>;
}
