"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TIMELINE } from "@/lib/data";
import { cn } from "@/lib/utils";

const SIGNAL_STYLES = {
  LIVE: "bg-status-live shadow-[0_0_12px_2px_rgba(34,229,139,0.6)]",
  EXP: "bg-status-exp shadow-[0_0_12px_2px_rgba(255,176,32,0.6)]",
  IDLE: "bg-status-idle",
} as const;

export function TechTimeline() {
  const [active, setActive] = useState(0);
  const current = TIMELINE[active]!;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      {/* Selectable rail */}
      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan/40 via-hairline to-violet/40" />
        <ul className="flex flex-col gap-1">
          {TIMELINE.map((node, i) => {
            const on = i === active;
            return (
              <li key={node.id}>
                <button
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors",
                    on ? "bg-white/[0.04]" : "hover:bg-white/[0.02]",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border border-obsidian-900 transition-transform",
                      SIGNAL_STYLES[node.signal],
                      on && "scale-125",
                    )}
                  />
                  <span className="flex flex-col">
                    <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">{node.period}</span>
                    <span className={cn("text-sm", on ? "text-white" : "text-zinc-400")}>{node.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Detail panel */}
      <div className="glass bracket min-h-[220px] rounded-lg p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-2xs uppercase tracking-widest2 text-cyan">
                PHASE // {current.phase}
              </span>
              <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">{current.period}</span>
            </div>
            <h3 className="mb-3 font-sans text-2xl font-semibold tracking-tight text-white">{current.title}</h3>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">{current.detail}</p>

            <div className="mt-6 flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  SIGNAL_STYLES[current.signal],
                )}
              />
              <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">
                {current.signal === "LIVE" ? "Active Capability" : current.signal === "EXP" ? "In Development" : "Milestone"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
