import { FlaskConical, GitBranch, Radar, Gauge } from "lucide-react";
import { RESEARCH, type ResearchEntry } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const KIND_META: Record<ResearchEntry["kind"], { label: string; icon: typeof Radar; cls: string }> = {
  RESEARCH: { label: "Research", icon: FlaskConical, cls: "text-cyan border-cyan/30" },
  OSS: { label: "Open Source", icon: GitBranch, cls: "text-violet-glow border-violet/30" },
  PROTOCOL: { label: "Protocol", icon: Radar, cls: "text-emerald-300 border-emerald-400/30" },
  BENCH: { label: "Benchmark", icon: Gauge, cls: "text-status-exp border-status-exp/30" },
};

export function Research() {
  return (
    <Section
      id="research"
      eyebrow="Signals // Independent Work"
      title="Research & Benchmarks"
      description="Security research, open-source maintenance, protocol behavior analysis, and reproducible benchmarks."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {RESEARCH.map((r, i) => {
          const meta = KIND_META[r.kind];
          const Icon = meta.icon;
          return (
            <Reveal key={r.id} delay={(i % 2) * 0.08}>
              <article className="glass glass-hover h-full rounded-lg p-5">
                <header className="mb-3 flex items-center justify-between gap-3">
                  <span className={cn("inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-2xs uppercase tracking-widest2", meta.cls)}>
                    <Icon className="h-3 w-3" />
                    {meta.label}
                  </span>
                </header>
                <h3 className="mb-2 font-sans text-lg font-semibold text-white">{r.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-400">{r.body}</p>
                <div className="flex flex-wrap gap-2 border-t border-hairline pt-3">
                  {r.benchmarks.map((b) => (
                    <span
                      key={b.label}
                      className="flex flex-col rounded-md border border-hairline bg-obsidian-950/40 px-2.5 py-1.5"
                      title={b.context}
                    >
                      <span className="font-mono text-sm text-cyan">{b.result}</span>
                      <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">{b.label}</span>
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
