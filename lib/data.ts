import projectsData from "@/data/projects.json";
import eventsData from "@/data/events.json";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string | null;
  pdfUrl: string | null;
  date: string;
  status: "completed" | "ongoing";
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
