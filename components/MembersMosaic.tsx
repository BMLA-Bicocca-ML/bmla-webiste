"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import type { Member, MemberGroup } from "@/lib/data";
import { APPLY_FORM_URL } from "@/lib/config";

/* -------------------------------------------------------------------------- */
/*  CONFIG                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Ruoli del mosaico "Our Team", NELL'ORDINE in cui compaiono (il primo è
 * il primo esagono in alto a sinistra).
 *
 * `match` è un pezzo di testo cercato nel nome del ruolo, ignorando maiuscole
 * e spazi: "founder" riconosce "Founders", "Founder", "Co-Founder", ecc.
 * Per aggiungere un ruolo basta aggiungere una riga qui.
 */
const TEAM_ROLES = [
  { match: "founder", color: "#F59E0B" },
  { match: "head of projects", color: "#009FB7" },
  { match: "head of analysis", color: "#E5484D" },
  { match: "active", color: "#8FA3B0" },
];

/** Colore della cornice degli Advisor (mosaico separato). */
const ADVISOR_COLOR = "#F59E0B";

/** Colori di riserva per ruoli non elencati sopra. */
const FALLBACK_COLORS = ["#10B981", "#EC4899", "#3B82F6", "#F97316", "#84CC16"];

const GAP = 6; // spazio tra gli esagoni (px)
const BORDER = 3.5; // spessore della cornice colorata (px)

const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
const HEX_RATIO = 2 / Math.sqrt(3);

/* -------------------------------------------------------------------------- */
/*  TIPI E HELPER                                                             */
/* -------------------------------------------------------------------------- */

type Cell =
  | { kind: "member"; key: string; member: Member; color: string }
  | { kind: "join"; key: string }
  | { kind: "ghost"; key: string };

function normalizeRole(role: string): string {
  return role.toLowerCase().replace(/\s+/g, " ").trim();
}

function isAdvisor(role: string): boolean {
  return normalizeRole(role).includes("advisor");
}

/** Posizione del ruolo nell'ordine desiderato (i ruoli sconosciuti vanno in coda). */
function roleRank(role: string): number {
  const n = normalizeRole(role);
  const i = TEAM_ROLES.findIndex((r) => n.includes(r.match));
  return i === -1 ? TEAM_ROLES.length : i;
}

/** Ordina i gruppi secondo TEAM_ROLES (a parità di rango mantiene l'ordine originale). */
function sortGroups(groups: MemberGroup[]): MemberGroup[] {
  return groups
    .map((group, index) => ({ group, index }))
    .sort((a, b) => roleRank(a.group.role) - roleRank(b.group.role) || a.index - b.index)
    .map(({ group }) => group);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function splitName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  const last = parts.pop() as string;
  return { first: parts.join(" "), last };
}

function targetSize(containerWidth: number): number {
  if (containerWidth < 520) return 100;
  if (containerWidth < 900) return 120;
  return 136;
}

/* -------------------------------------------------------------------------- */
/*  COMPONENTE PRINCIPALE                                                     */
/* -------------------------------------------------------------------------- */

export function MembersMosaic({ groups }: { groups: MemberGroup[] }) {
  // Una sola card girata alla volta, anche tra i due mosaici
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [teamFilter, setTeamFilter] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveKey(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const teamGroups = useMemo(
    () => sortGroups(groups.filter((g) => !isAdvisor(g.role))),
    [groups]
  );
  const advisorGroups = useMemo(() => groups.filter((g) => isAdvisor(g.role)), [groups]);

  return (
    <div className="space-y-16">
      {/* MOSAICO 1: TEAM (Founders → Head of Projects → Head of Analysis → Active Members) */}
      {teamGroups.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-xl text-ink">Our Team</h2>
          <MembersGrid
            groups={teamGroups}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            roleFilter={teamFilter}
            setRoleFilter={setTeamFilter}
            showLegend
            includeJoin
            minRows={2}
          />
        </div>
      )}

      {/* MOSAICO 2: ADVISORS */}
      
      {/*
      {advisorGroups.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-xl text-ink">Advisors</h2>
          <MembersGrid
            groups={advisorGroups}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            roleFilter={null}
            setRoleFilter={() => {}}
            showLegend={false}
            includeJoin={false}
            minRows={1}
          />
        </div>
      )}
      */}  

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MOSAICO RIUTILIZZABILE                                                    */
/* -------------------------------------------------------------------------- */

function MembersGrid({
  groups,
  activeKey,
  setActiveKey,
  roleFilter,
  setRoleFilter,
  showLegend,
  includeJoin,
  minRows,
}: {
  groups: MemberGroup[]; // già ordinati
  activeKey: string | null;
  setActiveKey: (key: string | null) => void;
  roleFilter: string | null;
  setRoleFilter: (role: string | null) => void;
  showLegend: boolean;
  includeJoin: boolean;
  minRows: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Colore di ogni ruolo
  const roleColor = useMemo(() => {
    const map: Record<string, string> = {};
    let fb = 0;
    groups.forEach((g) => {
      const n = normalizeRole(g.role);
      const known = TEAM_ROLES.find((r) => n.includes(r.match));
      map[g.role] = isAdvisor(g.role)
        ? ADVISOR_COLOR
        : known?.color ?? FALLBACK_COLORS[fb++ % FALLBACK_COLORS.length];
    });
    return map;
  }, [groups]);

  // Dimensione esagoni: riempiono esattamente la larghezza disponibile
  const { cols, size } = useMemo(() => {
    const w = width || 960;
    const target = targetSize(w);
    const c = Math.max(2, Math.floor((w + GAP) / (target + GAP)));
    return { cols: c, size: (w + GAP) / c - GAP };
  }, [width]);

  const height = size * HEX_RATIO;
  const rowOverlap = -0.25 * height + (Math.sqrt(3) / 2) * GAP;

  // Righe alternate da `cols` e `cols - 1` esagoni, nell'ordine dei gruppi
  const rows = useMemo(() => {
    const items: Cell[] = groups.flatMap((g) =>
      g.members.map<Cell>((m) => ({
        kind: "member",
        key: `${g.role}-${m.name}`,
        member: m,
        color: roleColor[g.role],
      }))
    );
    if (includeJoin) items.push({ kind: "join", key: "join" });

    const out: Cell[][] = [];
    let i = 0;
    let r = 0;
    while (i < items.length || r < minRows) {
      const cap = r % 2 === 0 ? cols : cols - 1;
      const row = items.slice(i, i + cap);
      i += cap;
      while (row.length < cap) {
        row.push({ kind: "ghost", key: `ghost-${r}-${row.length}` });
      }
      out.push(row);
      r++;
    }
    return out;
  }, [groups, roleColor, cols, includeJoin, minRows]);

  return (
    <div>
      {/* Legenda ruoli (cliccabile: evidenzia un ruolo) */}
      {showLegend && (
        <div className="flex flex-wrap items-center gap-2">
          {groups.map((g) => {
            const active = roleFilter === g.role;
            return (
              <button
                key={g.role}
                type="button"
                onClick={() => setRoleFilter(active ? null : g.role)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
                  active
                    ? "border-accent/40 bg-accent-faint text-ink"
                    : "border-border text-ink-muted hover:border-border-strong hover:text-ink"
                }`}
              >
                <span
                  aria-hidden
                  className="inline-block h-3 w-[10.4px]"
                  style={{ clipPath: HEX, background: roleColor[g.role] }}
                />
                {g.role}
                <span className="text-ink-faint">{g.members.length}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Esagoni */}
      <div
        ref={containerRef}
        className={`${showLegend ? "mt-8" : "mt-2"} transition-opacity duration-300 ${
          width ? "opacity-100" : "opacity-0"
        }`}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="flex justify-center"
            style={{ gap: GAP, marginTop: ri === 0 ? 0 : rowOverlap }}
          >
            {row.map((cell) => {
              const common = { size, height };
              if (cell.kind === "ghost") return <GhostHex key={cell.key} {...common} />;
              if (cell.kind === "join") return <JoinHex key={cell.key} {...common} />;

              const flipped = activeKey === cell.key;
              const dimmed = roleFilter !== null && roleFilter !== cell.member.role;
              return (
                <MemberHex
                  key={cell.key}
                  {...common}
                  member={cell.member}
                  color={cell.color}
                  flipped={flipped}
                  dimmed={dimmed}
                  onToggle={() => setActiveKey(flipped ? null : cell.key)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SOTTO-COMPONENTI                                                          */
/* -------------------------------------------------------------------------- */

/** Esagono con cornice colorata e contenuto interno. */
function Hex({
  color,
  children,
  innerClassName = "",
  style,
}: {
  color: string;
  children: React.ReactNode;
  innerClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        clipPath: HEX,
        background: color,
        padding: `${BORDER * HEX_RATIO}px ${BORDER}px`,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        ...style,
      }}
    >
      <div className={`relative h-full w-full ${innerClassName}`} style={{ clipPath: HEX }}>
        {children}
      </div>
    </div>
  );
}

function MemberHex({
  member,
  color,
  size,
  height,
  flipped,
  dimmed,
  onToggle,
}: {
  member: Member;
  color: string;
  size: number;
  height: number;
  flipped: boolean;
  dimmed: boolean;
  onToggle: () => void;
}) {
  const { first, last } = splitName(member.name);

  return (
    <div
      className={`relative shrink-0 transition-[transform,opacity,filter] duration-300 hover:z-10 hover:scale-[1.06] has-[:focus-visible]:z-10 has-[:focus-visible]:scale-[1.06] ${
        flipped ? "z-20" : ""
      } ${dimmed ? "opacity-25 grayscale" : ""}`}
      style={{ width: size, height, perspective: 900, clipPath: HEX }}
    >
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 650ms cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONTE */}
        <button
          type="button"
          onClick={onToggle}
          tabIndex={flipped ? -1 : 0}
          aria-hidden={flipped}
          aria-label={`${member.name}, ${member.role}. Show details`}
          className="absolute inset-0 block cursor-pointer outline-none"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <Hex color={color} innerClassName="bg-bg-raised">
            {member.avatarUrl ? (
              <Image src={member.avatarUrl} alt="" fill sizes="160px" className="object-cover" />
            ) : (
              <span
                className="flex h-full w-full items-center justify-center font-mono text-ink-faint"
                style={{ fontSize: size * 0.28 }}
              >
                {getInitials(member.name)}
              </span>
            )}
          </Hex>
        </button>

        {/* RETRO */}
        <div
          role="button"
          tabIndex={flipped ? 0 : -1}
          aria-hidden={!flipped}
          aria-label="Flip back"
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle();
            }
          }}
          className="absolute inset-0 cursor-pointer outline-none"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Hex color={color} innerClassName="bg-bg-surface">
            <div
              className="flex h-full w-full flex-col items-center justify-center text-center"
              style={{ padding: `${size * 0.14}px ${size * 0.1}px` }}
            >
              <span
                className="flex items-center gap-1 font-mono uppercase leading-tight tracking-wider text-ink-muted"
                style={{ fontSize: Math.max(7.5, size * 0.065) }}
              >
                <span
                  aria-hidden
                  className="inline-block shrink-0 rounded-full"
                  style={{ width: 5, height: 5, background: color }}
                />
                {member.role}
              </span>

              <p
                className="mt-1.5 font-display leading-tight text-ink"
                style={{ fontSize: Math.max(11, size * 0.105) }}
              >
                {member.linkedinUrl ? (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={flipped ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                    className="group inline-flex flex-col items-center transition-colors duration-150 hover:text-accent"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <span>{first}</span>
                    {last && <span className="font-semibold">{last}</span>}
                  </a>
                ) : (
                  <>
                    <span className="block">{first}</span>
                    {last && <span className="block font-semibold">{last}</span>}
                  </>
                )}
              </p>

              <p
                className="mt-1 leading-tight text-ink-muted"
                style={{ fontSize: Math.max(9, size * 0.082) }}
              >
                {member.tagline}
              </p>
            </div>
          </Hex>
        </div>
      </div>
    </div>
  );
}

/** Esagono "Join us": porta al form di iscrizione. */
function JoinHex({ size, height }: { size: number; height: number }) {
  return (
    <a
      href={APPLY_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join BMLA"
      className="relative block shrink-0 outline-none transition-transform duration-300 hover:z-10 hover:scale-[1.06] focus-visible:scale-[1.06]"
      style={{ width: size, height, clipPath: HEX }}
    >
      <Hex color="#009FB7" innerClassName="bg-accent-faint">
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-accent">
          <Plus aria-hidden style={{ width: size * 0.22, height: size * 0.22 }} />
          <span
            className="font-mono uppercase tracking-wider"
            style={{ fontSize: Math.max(9, size * 0.08) }}
          >
            Join us
          </span>
        </div>
      </Hex>
    </a>
  );
}

/** Esagono vuoto decorativo: completa il mosaico. */
function GhostHex({ size, height }: { size: number; height: number }) {
  return (
    <div
      aria-hidden
      className="shrink-0 bg-bg-raised/70"
      style={{ width: size, height, clipPath: HEX }}
    />
  );
}
