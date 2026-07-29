import { ArrowRight, BookText, ExternalLink, Github } from "lucide-react";
import type { ComplexityTag, Project } from "@/lib/data";
import { StatusBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const TAG_STYLES: Record<ComplexityTag, string> = {
  KERNEL: "border-violet/40 text-violet-glow",
  "BYTECODE VM": "border-cyan/40 text-cyan",
  "NETWORK PROTOCOL": "border-cyan/40 text-cyan",
  RUNTIME: "border-violet/40 text-violet-glow",
  AGENT: "border-emerald-400/40 text-emerald-300",
  MEMORY: "border-status-exp/40 text-status-exp",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass bracket group flex h-full flex-col rounded-lg p-5 transition-shadow duration-300 hover:shadow-glow-cyan">
      {/* Header */}
      <header className="mb-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="font-mono text-2xs uppercase tracking-widest2 text-cyan/80">{project.codename}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="font-sans text-xl font-semibold tracking-tight text-white">{project.title}</h3>
        <p className="mt-1 font-mono text-2xs uppercase tracking-widest2 text-zinc-500">{project.year}</p>
      </header>

      {/* Complexity classification */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.classification.map((tag) => (
          <span
            key={tag}
            className={cn(
              "rounded border bg-white/[0.03] px-2 py-0.5 font-mono text-2xs uppercase tracking-widest2",
              TAG_STYLES[tag],
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mb-5 text-sm leading-relaxed text-zinc-400">{project.summary}</p>

      {/* Execution-flow architecture callout */}
      <div className="mb-5 rounded-md border border-hairline bg-obsidian-950/50 p-3">
        <span className="mb-2 block font-mono text-2xs uppercase tracking-widest2 text-zinc-500">Execution Flow</span>
        <div className="flex flex-wrap items-center gap-1.5">
          {project.architecture.map((node, i) => (
            <span key={node} className="flex items-center gap-1.5">
              <span className="rounded border border-cyan/20 bg-cyan/5 px-2 py-1 font-mono text-2xs text-zinc-200">
                {node}
              </span>
              {i < project.architecture.length - 1 ? (
                <ArrowRight className="h-3 w-3 text-cyan/40" />
              ) : null}
            </span>
          ))}
        </div>
      </div>

      {/* Benchmark highlights */}
      <div className="mb-5 grid grid-cols-3 gap-2">
        {project.highlights.map((h) => (
          <div key={h.metric} className="rounded-md border border-hairline bg-obsidian-950/40 p-2 text-center">
            <p className="font-mono text-base font-semibold text-cyan sm:text-lg">{h.value}</p>
            <p className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">{h.metric}</p>
            <p className="mt-0.5 text-[10px] leading-tight text-zinc-600">{h.detail}</p>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="rounded bg-white/5 px-2 py-0.5 font-mono text-2xs text-zinc-400">
            {s}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-auto flex flex-wrap gap-3 border-t border-hairline pt-4">
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest2 text-zinc-400 transition-colors hover:text-cyan"
          >
            <Github className="h-3.5 w-3.5" /> Repo
          </a>
        ) : null}
        {project.docs ? (
          <a
            href={project.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest2 text-zinc-400 transition-colors hover:text-cyan"
          >
            <BookText className="h-3.5 w-3.5" /> Docs
          </a>
        ) : null}
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest2 text-zinc-400 transition-colors hover:text-cyan"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Demo
          </a>
        ) : null}
      </div>
    </article>
  );
}
