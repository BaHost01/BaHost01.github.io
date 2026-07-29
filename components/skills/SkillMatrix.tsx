"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Cpu, MonitorSmartphone, ShieldHalf, type LucideIcon } from "lucide-react";
import { SKILL_CATEGORIES, TIER_LEGEND, type SkillTier } from "@/lib/data";
import { cn } from "@/lib/utils";

const GLYPHS: Record<string, LucideIcon> = {
  Cpu,
  Bot,
  ShieldHalf,
  MonitorSmartphone,
};

const TIER_STYLES: Record<SkillTier, string> = {
  INTERNAL: "text-cyan border-cyan/40 bg-cyan/10",
  EXPERT: "text-violet-glow border-violet/40 bg-violet/10",
  ADVANCED: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  OPERATIONAL: "text-zinc-300 border-hairline bg-white/5",
};

export function SkillMatrix() {
  const [active, setActive] = useState<string>("all");

  const filters = [{ id: "all", title: "All Systems" }, ...SKILL_CATEGORIES.map((c) => ({ id: c.id, title: c.title }))];
  const visible = active === "all" ? SKILL_CATEGORIES : SKILL_CATEGORIES.filter((c) => c.id === active);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = active === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-mono text-2xs uppercase tracking-widest2 transition-colors",
                on
                  ? "border-cyan/50 bg-cyan/10 text-cyan"
                  : "border-hairline text-zinc-500 hover:border-zinc-600 hover:text-zinc-300",
              )}
            >
              {f.title}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((cat) => {
            const Icon = GLYPHS[cat.glyph] ?? Cpu;
            const accentCyan = cat.accent === "cyan";
            return (
              <motion.article
                layout
                key={cat.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "glass glass-hover bracket rounded-lg p-5",
                  accentCyan ? "hover:shadow-glow-cyan" : "hover:shadow-glow-violet",
                )}
              >
                <header className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md border",
                        accentCyan ? "border-cyan/30 text-cyan" : "border-violet/30 text-violet-glow",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-semibold text-white">{cat.title}</h3>
                      <p className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">
                        {String(cat.skills.length).padStart(2, "0")} modules
                      </p>
                    </div>
                  </div>
                </header>

                <p className="mb-4 text-sm leading-relaxed text-zinc-400">{cat.description}</p>

                <ul className="flex flex-col gap-2.5">
                  {cat.skills.map((s) => (
                    <li
                      key={s.id}
                      className="group flex items-center justify-between gap-3 rounded-md border border-hairline bg-obsidian-950/40 px-3 py-2.5 transition-colors hover:border-cyan/20"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-mono text-sm text-zinc-100">{s.label}</p>
                        <p className="truncate font-mono text-2xs text-zinc-500">{s.note}</p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded border px-2 py-0.5 font-mono text-2xs uppercase tracking-widest2",
                          TIER_STYLES[s.tier],
                        )}
                      >
                        {s.tier}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Tier legend — capability tiers, not ratings */}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline pt-5">
        <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">Tier legend:</span>
        {TIER_LEGEND.map((t) => (
          <span key={t.tier} className="flex items-center gap-2" title={t.meaning}>
            <span className={cn("rounded border px-2 py-0.5 font-mono text-2xs uppercase tracking-widest2", TIER_STYLES[t.tier])}>
              {t.tier}
            </span>
            <span className="font-mono text-2xs text-zinc-500">{t.meaning}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
