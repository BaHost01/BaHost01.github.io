"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, TerminalSquare } from "lucide-react";
import { useUI } from "@/components/providers/UIProvider";
import { PROFILE, TERMINAL_COMMANDS } from "@/lib/data";
import { cn } from "@/lib/utils";

type Tone = "cyan" | "amber" | "zinc" | "violet";
interface Line {
  prompt?: boolean;
  text: string;
  tone: Tone;
}

const PROMPT = "visitor@bahost01:~$";

function isEditable(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

export function CommandPalette() {
  const { paletteOpen, closePalette, togglePalette, toggleScanlines, scanlines } = useUI();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [output, setOutput] = useState<Line[]>([
    { text: "BAHOST01 terminal v1.0 — type 'help' for commands.", tone: "violet" },
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TERMINAL_COMMANDS;
    return TERMINAL_COMMANDS.filter(
      (c) => c.name.includes(q) || c.description.toLowerCase().includes(q),
    );
  }, [query]);

  // Global open shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePalette();
        return;
      }
      if ((e.key === "`" || e.key === "~") && !isEditable(e.target)) {
        e.preventDefault();
        togglePalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePalette]);

  // Focus + reset on open
  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [paletteOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const go = (id: string) => {
    closePalette();
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo: Line = { prompt: true, text: raw, tone: "cyan" };

    if (cmd === "clear") {
      setOutput([]);
      return;
    }
    if (cmd === "help") {
      setOutput((o) => [
        ...o,
        echo,
        ...TERMINAL_COMMANDS.map((c) => ({ text: `  ${c.name.padEnd(12)} ${c.description}`, tone: "zinc" as Tone })),
      ]);
      return;
    }
    if (cmd === "whoami") {
      setOutput((o) => [
        ...o,
        echo,
        { text: `  handle   : ${PROFILE.handle}`, tone: "zinc" },
        { text: `  role     : ${PROFILE.name}`, tone: "zinc" },
        { text: `  location : ${PROFILE.location}`, tone: "zinc" },
        { text: `  status   : ${PROFILE.status}`, tone: "cyan" },
      ]);
      return;
    }
    if (cmd === "fetch-stats") {
      setOutput((o) => [
        ...o,
        echo,
        { text: "  ENV      : PRODUCTION", tone: "cyan" },
        { text: "  ARCH     : x86-64 / 64-bit alignment", tone: "zinc" },
        { text: "  HEAP     : ~14.3 GB committed", tone: "zinc" },
        { text: "  THREADS  : 16 online", tone: "zinc" },
        { text: "  SYSTEMS  : OPERATIONAL", tone: "cyan" },
      ]);
      return;
    }
    if (cmd === "projects") { setOutput((o) => [...o, echo, { text: "  → navigating to /projects", tone: "violet" }]); go("projects"); return; }
    if (cmd === "skills") { setOutput((o) => [...o, echo, { text: "  → navigating to /skills", tone: "violet" }]); go("skills"); return; }
    if (cmd === "timeline") { setOutput((o) => [...o, echo, { text: "  → navigating to /timeline", tone: "violet" }]); go("timeline"); return; }
    if (cmd === "research") { setOutput((o) => [...o, echo, { text: "  → navigating to /research", tone: "violet" }]); go("research"); return; }
    if (cmd === "contact") { setOutput((o) => [...o, echo, { text: `  → ${PROFILE.email}`, tone: "cyan" }]); go("contact"); return; }
    if (cmd === "matrix") {
      setOutput((o) => [...o, echo, { text: "  → opening GitHub matrix", tone: "violet" }]);
      window.open(PROFILE.github, "_blank", "noopener");
      return;
    }
    if (cmd === "scanlines") {
      toggleScanlines();
      setOutput((o) => [...o, echo, { text: `  scanlines → ${scanlines ? "OFF" : "ON"}`, tone: "amber" }]);
      return;
    }
    setOutput((o) => [...o, echo, { text: `  command not found: ${raw || "''"} — type 'help'`, tone: "amber" }]);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[selected]?.name ?? query;
      run(cmd);
      setQuery("");
    } else if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
    }
  };

  // Keep selected visible in the list
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  return (
    <AnimatePresence>
      {paletteOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            aria-label="Close terminal"
            className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm"
            onClick={closePalette}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass bracket relative w-full max-w-2xl overflow-hidden rounded-xl"
          >
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
              <TerminalSquare className="h-4 w-4 text-cyan" />
              <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">command palette</span>
              <span className="ml-auto font-mono text-2xs text-zinc-600">esc to close</span>
            </div>

            <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
              <span className="font-mono text-sm text-cyan">{PROMPT}</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="type a command…"
                spellCheck={false}
                autoComplete="off"
                className="w-full bg-transparent font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>

            <ul ref={listRef} className="max-h-56 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <li className="px-4 py-2 font-mono text-2xs text-zinc-500">no matching commands</li>
              ) : (
                filtered.map((c, i) => (
                  <li key={c.name} data-idx={i}>
                    <button
                      onMouseEnter={() => setSelected(i)}
                      onClick={() => run(c.name)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 px-4 py-2 text-left transition-colors",
                        i === selected ? "bg-cyan/10" : "hover:bg-white/[0.03]",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className={cn("font-mono text-sm", i === selected ? "text-cyan" : "text-zinc-200")}>
                          {c.name}
                        </span>
                        <span className="font-mono text-2xs text-zinc-500">{c.description}</span>
                      </span>
                      {i === selected ? <CornerDownLeft className="h-3.5 w-3.5 text-cyan" /> : null}
                    </button>
                  </li>
                ))
              )}
            </ul>

            {output.length > 0 ? (
              <div className="max-h-40 overflow-y-auto border-t border-hairline bg-obsidian-950/60 px-4 py-3 font-mono text-2xs leading-relaxed">
                {output.map((l, i) => (
                  <div key={i} className="whitespace-pre-wrap">
                    {l.prompt ? <span className="text-cyan">{PROMPT} </span> : null}
                    <span
                      className={cn(
                        l.tone === "cyan" && "text-cyan",
                        l.tone === "amber" && "text-status-exp",
                        l.tone === "violet" && "text-violet-glow",
                        l.tone === "zinc" && "text-zinc-400",
                      )}
                    >
                      {l.text}
                    </span>
                  </div>
                ))}
                <span className="inline-block h-3 w-2 animate-blink bg-cyan align-middle" />
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
