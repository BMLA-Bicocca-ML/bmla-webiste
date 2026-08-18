import { Github, FileDown } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Project, formatMonthYear } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  const hasLinks = project.githubUrl || project.pdfUrl;

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-ink">{project.title}</h3>
          {project.status === "ongoing" && <Badge variant="accent">In corso</Badge>}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-xs text-ink-faint">{formatMonthYear(project.date)}</span>

        {hasLinks && (
          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-ink-muted transition-colors duration-150 hover:text-accent"
                aria-label={`Repository GitHub di ${project.title}`}
              >
                <Github size={14} /> Repo
              </a>
            )}
            {project.pdfUrl && (
              <a
                href={project.pdfUrl}
                className="flex items-center gap-1.5 text-xs text-ink-muted transition-colors duration-150 hover:text-accent"
                aria-label={`Scarica PDF di ${project.title}`}
              >
                <FileDown size={14} /> PDF
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
