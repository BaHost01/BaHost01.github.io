"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, TerminalSquare } from "lucide-react";
import { TelemetryHUD } from "./TelemetryHUD";
import { useUI } from "@/components/providers/UIProvider";
import { PROFILE } from "@/lib/data";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { openPalette } = useUI();

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8"
    >
      <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-obsidian-900/60 px-3 py-1 font-mono text-2xs uppercase tracking-widest2 text-cyan/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-cyan" />
          {PROFILE.status} · {PROFILE.location}
        </motion.div>

        <motion.p variants={item} className="mb-3 font-mono text-2xs uppercase tracking-widest2 text-zinc-500">
          <span className="text-status-live">[ boot ]</span> initializing runtime environment… ok
        </motion.p>

        <motion.h1
          variants={item}
          className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Architect of
          <br />
          <span className="text-glow-cyan text-cyan">Engines</span> &amp;{" "}
          <span className="text-glow-violet text-violet-glow">Runtimes</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {PROFILE.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-cyan px-5 py-2.5 font-mono text-sm font-medium text-obsidian-950 transition-shadow hover:shadow-glow-cyan"
          >
            Featured Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-hairline bg-obsidian-900/60 px-5 py-2.5 font-mono text-sm text-zinc-200 backdrop-blur transition-colors hover:border-cyan/40 hover:text-white"
          >
            <Github className="h-4 w-4" />
            GitHub Matrix
          </a>
          <button
            type="button"
            onClick={openPalette}
            className="inline-flex items-center gap-2 rounded-md border border-hairline bg-obsidian-900/60 px-5 py-2.5 font-mono text-sm text-zinc-200 backdrop-blur transition-colors hover:border-violet/40 hover:text-white"
          >
            <TerminalSquare className="h-4 w-4" />
            Terminal Mode
            <kbd className="ml-1 rounded border border-hairline px-1.5 py-0.5 text-2xs text-zinc-400">⌘K</kbd>
          </button>
        </motion.div>
      </motion.div>

      <motion.div variants={item} className="mt-14 w-full">
        <TelemetryHUD />
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-2xs uppercase tracking-widest2 text-zinc-600 sm:block animate-flicker">
        scroll to decrypt ↓
      </div>
    </section>
  );
}
