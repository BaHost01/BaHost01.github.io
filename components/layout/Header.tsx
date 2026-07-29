"use client";

import { useEffect, useState } from "react";
import { Github, ScanLine, TerminalSquare } from "lucide-react";
import { useUI } from "@/components/providers/UIProvider";
import { PROFILE } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "timeline", label: "Timeline" },
  { id: "research", label: "Research" },
];

export function Header() {
  const { scanlines, toggleScanlines, openPalette } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-hairline bg-obsidian-950/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-cyan/40 font-mono text-xs text-cyan text-glow-cyan">
            ⌁
          </span>
          <span className="font-mono text-sm font-semibold tracking-widest2 text-white">{PROFILE.handle}</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="font-mono text-2xs uppercase tracking-widest2 text-zinc-400 transition-colors hover:text-cyan"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleScanlines}
            aria-pressed={scanlines}
            title="Toggle CRT scanlines"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md border transition-colors",
              scanlines ? "border-cyan/50 text-cyan" : "border-hairline text-zinc-400 hover:text-white",
            )}
          >
            <ScanLine className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={openPalette}
            title="Open command palette"
            className="hidden h-8 items-center gap-1.5 rounded-md border border-hairline px-2.5 font-mono text-2xs uppercase tracking-widest2 text-zinc-300 transition-colors hover:border-cyan/40 hover:text-cyan sm:flex"
          >
            <TerminalSquare className="h-3.5 w-3.5" /> ⌘K
          </button>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-zinc-400 transition-colors hover:border-cyan/40 hover:text-cyan"
            title="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
