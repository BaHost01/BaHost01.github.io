import { PROJECTS } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectShowcase() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {PROJECTS.map((p, i) => (
        <Reveal key={p.id} delay={(i % 2) * 0.08}>
          <ProjectCard project={p} />
        </Reveal>
      ))}
    </div>
  );
}
