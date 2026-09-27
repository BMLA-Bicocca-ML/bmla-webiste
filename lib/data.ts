import projectsData from "@/data/projects.json";
import eventsData from "@/data/events.json";
import membersData from "@/data/members.json";

export type Contributor = {
  name: string;
  linkedinUrl: string | null;
  avatarUrl: string | null;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string | null;
  pdfUrl: string | null;
  date: string;
  status: "completed" | "ongoing";
  contributors?: Contributor[];
};

export type Member = {
  name: string;
  role: string;
  tagline: string;
  linkedinUrl: string | null;
  avatarUrl: string | null;
};

export type MemberGroup = {
  role: string;
  members: Member[];
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
  status: "upcoming" | "past";
  link: string | null;
};

export function getProjects(): Project[] {
  return (projectsData as Project[]).slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEvents(): { upcoming: EventItem[]; past: EventItem[] } {
  const all = eventsData as EventItem[];
  const upcoming = all
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => (a.date > b.date ? 1 : -1));
  const past = all
    .filter((e) => e.status === "past")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return { upcoming, past };
}

// Ordine di visualizzazione dei ruoli nella pagina Members.
// Aggiungi qui nuovi ruoli per farli comparire nell'ordine desiderato;
// eventuali ruoli presenti in members.json ma non elencati qui finiscono in coda.
const ROLE_ORDER = [
  "Founders",
  "Advisor",
  "Head of Projects",
  "Head of Analysis",
  "Active Members",
];

export function getMembers(): MemberGroup[] {
  const all = membersData as Member[];
  const roles = Array.from(new Set(all.map((m) => m.role))).sort((a, b) => {
    const ia = ROLE_ORDER.indexOf(a);
    const ib = ROLE_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return roles.map((role) => ({
    role,
    members: all.filter((m) => m.role === role),
  }));
}

const MONTHS_IT = [
  "gen", "feb", "mar", "apr", "mag", "giu",
  "lug", "ago", "set", "ott", "nov", "dic",
];

export function formatEventDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} ${MONTHS_IT[m - 1]} ${y}`;
}

export function formatMonthYear(dateStr: string): string {
  const [y, m] = dateStr.split("-").map(Number);
  return `${MONTHS_IT[m - 1]} ${y}`;
}
