import { Github, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline bg-obsidian-950/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-cyan/40 font-mono text-xs text-cyan">
            ⌁
          </span>
          <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">
            {PROFILE.handle} · {PROFILE.status}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest2 text-zinc-400 transition-colors hover:text-cyan"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest2 text-zinc-400 transition-colors hover:text-cyan"
          >
            <Mail className="h-3.5 w-3.5" /> {PROFILE.email}
          </a>
        </div>
        <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-600">
          © {year} · built near the metal
        </span>
      </div>
    </footer>
  );
}
