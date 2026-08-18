"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/lib/data";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`rounded border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
            activeTag === null
              ? "border-accent/40 bg-accent-faint text-accent"
              : "border-border text-ink-muted hover:border-border-strong hover:text-ink"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
              activeTag === tag
                ? "border-accent/40 bg-accent-faint text-accent"
                : "border-border text-ink-muted hover:border-border-strong hover:text-ink"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-ink-muted">Nessun progetto trovato per questo tag.</p>
      )}
    </div>
  );
}
