import { Binary, Layers, ShieldCheck, Workflow } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PROFILE } from "@/lib/data";

const PRINCIPLES = [
  {
    icon: Binary,
    tag: "01",
    title: "Reverse Engineering & Engine Internals",
    body:
      "I treat a runtime as a system to be understood, not a black box. Pattern scanning, offset dumping, and VTable hooking are how I recover the contract an engine never documented — then validate it against observed behavior until the model is exact.",
  },
  {
    icon: Layers,
    tag: "02",
    title: "Memory · Speed · Stealth Trade-offs",
    body:
      "Every design is a negotiated compromise. Region-pooled allocators cut fragmentation but cost bookkeeping; deeper hooks buy control at the price of detection surface. I make those trade-offs explicit and measure them, never by intuition alone.",
  },
  {
    icon: Workflow,
    tag: "03",
    title: "Custom Automation & Runtimes",
    body:
      "When the available tooling imposes the wrong abstraction, I build the runtime instead. Custom VMs, agent swarms, and protocol engines exist to remove the friction between intent and execution at machine speed.",
  },
  {
    icon: ShieldCheck,
    tag: "04",
    title: "Tooling as a Force Multiplier",
    body:
      "High-signal, low-noise interfaces are a discipline. I design telemetry-first developer tooling so that the next engineer — or the next agent — can reason about a system without decoding it by hand.",
  },
];

export function Principles() {
  return (
    <Section
      id="about"
      eyebrow="Architecture // Methodology"
      title="Engineering Principles"
      description={PROFILE.summary}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PRINCIPLES.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.tag} delay={(i % 2) * 0.08}>
              <article className="glass glass-hover bracket h-full rounded-lg p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan/25 text-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-600">{p.tag}</span>
                </div>
                <h3 className="mb-2 font-sans text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{p.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
