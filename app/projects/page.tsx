import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectsGrid } from "./ProjectsGrid";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "I progetti realizzati dai team BMLA.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <section>
      <div className="mx-auto max-w-content px-6 py-16 md:py-20">
        <SectionHeading
          eyebrow="Projects"
          title="From ideas to experiments"
          description="Explore what our teams are building."
        />
        <div className="mt-10">
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
