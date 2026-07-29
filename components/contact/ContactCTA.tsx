import { Github, Mail, TerminalSquare } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PROFILE } from "@/lib/data";

export function ContactCTA() {
  return (
    <Section
      id="contact"
      eyebrow="Channel // Open"
      title="Open a Channel"
      description="For principal engineering roles, reverse-engineering collaborations, or runtime research — reach out directly."
    >
      <Reveal>
        <div className="glass bracket flex flex-col items-start gap-6 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-mono text-2xs uppercase tracking-widest2 text-cyan/80">direct line</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-1 block font-sans text-xl font-semibold text-white transition-colors hover:text-cyan sm:text-2xl"
            >
              {PROFILE.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-hairline bg-obsidian-900/60 px-4 py-2.5 font-mono text-sm text-zinc-200 transition-colors hover:border-cyan/40 hover:text-white"
            >
              <Github className="h-4 w-4" /> GitHub Matrix
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-cyan px-4 py-2.5 font-mono text-sm font-medium text-obsidian-950 transition-shadow hover:shadow-glow-cyan"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
            <a
              href="#top"
              className="hidden items-center gap-2 rounded-md border border-hairline px-4 py-2.5 font-mono text-sm text-zinc-400 transition-colors hover:border-violet/40 hover:text-white sm:inline-flex"
            >
              <TerminalSquare className="h-4 w-4" /> Try ⌘K
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
