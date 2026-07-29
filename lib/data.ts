/* ===========================================================================
   PORTFOLIO DATA MODEL
   Single source of truth for the Systems Architect / Low-Level Engineer
   portfolio. All copy is typed so components stay declarative.
   =========================================================================== */

export const PROFILE = {
  handle: "BAHOST01",
  name: "Systems Architect · Low-Level Engineer",
  tagline:
    "I build near the bare metal — custom runtimes, bytecode VMs, memory inspectors, and autonomous agents.",
  location: "Remote · UTC±0",
  status: "OPERATIONAL" as const,
  email: "contact@bahost01.dev",
  github: "https://github.com/BaHost01",
  summary:
    "Reverse-engineer of engines, architect of custom runtimes, and builder of autonomous agents. " +
    "I work where abstraction ends: pattern scanners, VTable hooks, Luau bytecode, and protocol engines — " +
    "optimizing for memory alignment, execution speed, and stealth.",
} as const;

/* ---------------------------------------------------------------------------
   SKILL MATRIX — strictly NO percentage bars / star ratings.
   Skills are expressed as capability tiers + surface-area descriptors only.
   --------------------------------------------------------------------------- */
export type SkillTier = "INTERNAL" | "EXPERT" | "ADVANCED" | "OPERATIONAL";

export interface Skill {
  id: string;
  label: string;
  tier: SkillTier;
  note: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  glyph: string; // lucide icon name handled in component
  description: string;
  skills: Skill[];
  accent: "cyan" | "violet";
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "lowlevel",
    title: "Low-Level & Runtimes",
    glyph: "Cpu",
    accent: "cyan",
    description:
      "Engine internals, memory manipulation, and runtime surgery. Proficiency measured by depth of internals access, not superficial familiarity.",
    skills: [
      { id: "luau", label: "Luau Internals", tier: "INTERNAL", note: "GC, VM opcodes, upvals, protos" },
      { id: "cpp", label: "C++", tier: "EXPERT", note: "RAII, templates, UB exploitation, SIMD" },
      { id: "bytecode", label: "Bytecode Analysis", tier: "INTERNAL", note: "disasm, reassembly, control-flow" },
      { id: "vtable", label: "VTable Hooking", tier: "EXPERT", note: "detours, virtual dispatch redirect" },
      { id: "offsets", label: "Memory Offsets", tier: "EXPERT", note: "pattern scanning, sig dumps" },
      { id: "pointers", label: "Pointer Arithmetic", tier: "EXPERT", note: "heap walk, type punning" },
    ],
  },
  {
    id: "automation",
    title: "Automation & Agents",
    glyph: "Bot",
    accent: "violet",
    description:
      "Autonomous behavior trees, pathfinding, and LLM-augmented agents operating inside live runtime environments.",
    skills: [
      { id: "node", label: "Node.js", tier: "EXPERT", note: "event loop, worker threads, native addons" },
      { id: "mineflayer", label: "Mineflayer", tier: "INTERNAL", note: "client emulation, world state" },
      { id: "pathfinding", label: "Pathfinding Engines", tier: "ADVANCED", note: "A* grids, goal-based nav" },
      { id: "agents", label: "Autonomous AI Agents", tier: "ADVANCED", note: "tool use, planning loops" },
      { id: "behavior", label: "Behavior Trees", tier: "ADVANCED", note: "tick scheduling, blackboards" },
    ],
  },
  {
    id: "security",
    title: "Security & Reverse Engineering",
    glyph: "ShieldHalf",
    accent: "cyan",
    description:
      "Static analysis, obfuscation surfaces, and protocol inspection. Mapping trust boundaries in hostile runtimes.",
    skills: [
      { id: "obf", label: "Obfuscation", tier: "EXPERT", note: "control-flow flattening, VM protectors" },
      { id: "deobf", label: "Deobfuscation", tier: "INTERNAL", note: "symbolic exec, AST rebuild" },
      { id: "static", label: "Static Analysis", tier: "EXPERT", note: "IDA/Ghidra, type recovery" },
      { id: "protocol", label: "Protocol Monitoring", tier: "ADVANCED", note: "packet capture, state machines" },
      { id: "anti", label: "Anti-Tamper", tier: "ADVANCED", note: "integrity checks, traps" },
    ],
  },
  {
    id: "systems",
    title: "Systems & Desktop",
    glyph: "MonitorSmartphone",
    accent: "violet",
    description:
      "High-performance desktop tooling and bespoke frameworks. Native speed with ergonomic developer surfaces.",
    skills: [
      { id: "csharp", label: "C#", tier: "ADVANCED", note: "unsafe, Span<T>, reflection emit" },
      { id: "rust", label: "Rust", tier: "ADVANCED", note: "ownership, FFI, no_std" },
      { id: "python", label: "Python", tier: "EXPERT", note: "cffi, metaprogramming, tooling" },
      { id: "frameworks", label: "Custom Frameworks", tier: "EXPERT", note: "DSLs, plugin hosts" },
      { id: "desktop", label: "Desktop Tooling", tier: "ADVANCED", note: "native UI, GPU overlays" },
    ],
  },
];

export const TIER_LEGEND: { tier: SkillTier; meaning: string }[] = [
  { tier: "INTERNAL", meaning: "Reads/writes engine internals & private state" },
  { tier: "EXPERT", meaning: "Production-grade, edge-case fluent" },
  { tier: "ADVANCED", meaning: "Self-sufficient across real-world scope" },
  { tier: "OPERATIONAL", meaning: "Shipping & maintaining in production" },
];

/* ---------------------------------------------------------------------------
   FEATURED PROJECTS — Engine Showcase
   --------------------------------------------------------------------------- */
export type ComplexityTag = "KERNEL" | "BYTECODE VM" | "NETWORK PROTOCOL" | "RUNTIME" | "AGENT" | "MEMORY";

export interface ProjectMilestone {
  metric: string;
  value: string;
  detail: string;
}

export interface Project {
  id: string;
  codename: string;
  title: string;
  classification: ComplexityTag[];
  year: string;
  status: "LIVE" | "EXPERIMENTAL" | "ARCHIVED";
  summary: string;
  architecture: string[]; // execution-flow nodes
  highlights: ProjectMilestone[];
  stack: string[];
  repo?: string;
  docs?: string;
  demo?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "luau-vm",
    codename: "PROJECT//AETHER",
    title: "Custom Luau Bytecode Runtime",
    classification: ["BYTECODE VM", "RUNTIME"],
    year: "2025",
    status: "EXPERIMENTAL",
    summary:
      "A from-scratch Luau interpreter/hybrid compiler operating directly on dumped protos — enabling analysis, transformation, and sandboxed execution of engine bytecode.",
    architecture: ["Bytecode Loader", "Proto Normalizer", "Register VM", "GC Bridge", "Host Bindings"],
    highlights: [
      { metric: "Decode", value: "100%", detail: "opcodes mapped incl. fast-call variants" },
      { metric: "Exec", value: "1.4×", detail: "vs reference interpreter on hot loops" },
      { metric: "Overhead", value: "−38%", detail: "allocator churn via region pooling" },
    ],
    stack: ["Rust", "Luau", "Capstone", "WASM"],
    repo: "https://github.com/BaHost01",
    docs: "https://github.com/BaHost01",
  },
  {
    id: "pattern-scanner",
    codename: "PROJECT//SIGIL",
    title: "Vectorized Pattern Scanner",
    classification: ["MEMORY", "KERNEL"],
    year: "2024",
    status: "LIVE",
    summary:
      "A SIMD-accelerated signature scanner that resolves runtime offsets from obfuscated modules in real time, with wildcard masks and relative-branch resolution.",
    architecture: ["Module Map", "SIMD Scan", "Mask Resolver", "Reloc Fixup", "Cache Layer"],
    highlights: [
      { metric: "Offset", value: "−40%", detail: "faster extraction vs naive memcmp scan" },
      { metric: "Throughput", value: "12 GB/s", detail: "AVX2 multi-region parallel" },
      { metric: "False+", value: "0.02%", detail: "on 4M-region corpus" },
    ],
    stack: ["C++20", "AVX2", "Windows API", "CMake"],
    repo: "https://github.com/BaHost01",
    docs: "https://github.com/BaHost01",
  },
  {
    id: "agent-fleet",
    codename: "PROJECT//HERD",
    title: "Autonomous Agent Fleet (Minecraft)",
    classification: ["AGENT", "NETWORK PROTOCOL"],
    year: "2025",
    status: "LIVE",
    summary:
      "A distributed Mineflayer agent swarm with goal planning, A* pathfinding, and LLM tool-use — coordinating hundreds of clients against a shared world model.",
    architecture: ["World Model", "Planner", "A* Nav", "Tool Router", "LLM Bridge"],
    highlights: [
      { metric: "Agents", value: "300+", detail: "concurrent clients, sub-ms tick sync" },
      { metric: "Path", value: "−62%", detail: "recompute cost via cached chunks" },
      { metric: "Tasks", value: "94%", detail: "autonomous completion rate" },
    ],
    stack: ["Node.js", "Mineflayer", "TypeScript", "OpenAI"],
    repo: "https://github.com/BaHost01",
    demo: "https://github.com/BaHost01",
  },
  {
    id: "deobf",
    codename: "PROJECT//PRISM",
    title: "Luau Deobfuscation Pipeline",
    classification: ["BYTECODE VM", "MEMORY"],
    year: "2024",
    status: "LIVE",
    summary:
      "Static + runtime pipeline that reconstructs control flow and symbol tables from VM-protected scripts, turning flattened bytecode back into auditable source.",
    architecture: ["Collector", "CFG Rebuild", "Symbol Recover", "AST Emit", "Diff View"],
    highlights: [
      { metric: "Flatten", value: "UNROLL", detail: "dispatching predicates solved symbolically" },
      { metric: "Symbols", value: "71%", detail: "recovered from stripped protos" },
      { metric: "Noise", value: "−90%", detail: "dead-branch pruning" },
    ],
    stack: ["Python", "Z3", "Luau", "LLVM" ],
    repo: "https://github.com/BaHost01",
    docs: "https://github.com/BaHost01",
  },
];

/* ---------------------------------------------------------------------------
   TECHNICAL TIMELINE — evolution of capability
   --------------------------------------------------------------------------- */
export interface TimelineNode {
  id: string;
  phase: string;
  period: string;
  title: string;
  detail: string;
  signal: "LIVE" | "EXP" | "IDLE";
}

export const TIMELINE: TimelineNode[] = [
  { id: "lua", phase: "00", period: "2019", title: "Lua Fundamentals", detail: "Embedded scripting, metatables, coroutines, and first engine mods.", signal: "IDLE" },
  { id: "py", phase: "01", period: "2020", title: "Python Automation", detail: "Tooling, metaprogramming, and reverse-engineering helper frameworks.", signal: "IDLE" },
  { id: "cpp", phase: "02", period: "2021", title: "C++ Systems Programming", detail: "Memory models, SIMD, and native modules bridging script runtimes.", signal: "IDLE" },
  { id: "re", phase: "03", period: "2023", title: "Reverse Engineering & Memory Hooks", detail: "VTable detours, pattern scanning, and offset dumping.", signal: "EXP" },
  { id: "bytecode", phase: "04", period: "2024", title: "Luau Bytecode Runtimes", detail: "Custom VMs, deobfuscation pipelines, and proto manipulation.", signal: "EXP" },
  { id: "agents", phase: "05", period: "2025", title: "Autonomous AI Agent Development", detail: "Swarm coordination, pathfinding, and LLM-driven tool use.", signal: "LIVE" },
];

/* ---------------------------------------------------------------------------
   RESEARCH & BENCHMARKS
   --------------------------------------------------------------------------- */
export interface Benchmark {
  label: string;
  result: string;
  context: string;
}

export interface ResearchEntry {
  id: string;
  kind: "RESEARCH" | "OSS" | "PROTOCOL" | "BENCH";
  title: string;
  body: string;
  benchmarks: Benchmark[];
}

export const RESEARCH: ResearchEntry[] = [
  {
    id: "vm-protect",
    kind: "RESEARCH",
    title: "VM-Based Lua Obfuscation: A Cost Model",
    body: "Empirical analysis of dispatch entropy vs. deobfuscation cost across 11 protectors, proposing an economic bound on control-flow flattening.",
    benchmarks: [
      { label: "Disp. entropy", result: "9.2 bits", context: "avg across sampled protectors" },
      { label: "Recon cost", result: "O(n·log n)", context: "symbolic predicate solving" },
    ],
  },
  {
    id: "oss",
    kind: "OSS",
    title: "Open-Source Maintenance & Commits",
    body: "Active maintainer of runtime tooling, bytecode utilities, and agent frameworks. Patch review and protocol documentation for the community.",
    benchmarks: [
      { label: "Repos", result: "20+", context: "public tooling" },
      { label: "Merged PRs", result: "300+", context: "across runtime projects" },
    ],
  },
  {
    id: "protocol",
    kind: "PROTOCOL",
    title: "Client/Server Protocol Behavior Analysis",
    body: "Reconstructed state machines for proprietary network protocols; documented handshake, compression, and anti-replay behavior.",
    benchmarks: [
      { label: "States mapped", result: "148", context: "server state graph" },
      { label: "Drift", result: "<2ms", context: "clock-sync tolerance" },
    ],
  },
  {
    id: "bench",
    kind: "BENCH",
    title: "Allocator Benchmark Suite",
    body: "Region-pooled allocator benchmarked against system malloc under engine-like allocation churn profiles.",
    benchmarks: [
      { label: "Alloc p50", result: "31 ns", context: "region pool" },
      { label: "Frag", result: "−44%", context: "vs default malloc" },
    ],
  },
];

/* ---------------------------------------------------------------------------
   TERMINAL COMMANDS
   --------------------------------------------------------------------------- */
export interface TerminalCommand {
  name: string;
  description: string;
  usage: string;
}

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  { name: "help", description: "List available commands", usage: "help" },
  { name: "projects", description: "Show featured engine projects", usage: "projects" },
  { name: "skills", description: "Dump the skill matrix", usage: "skills" },
  { name: "fetch-stats", description: "Pull live telemetry snapshot", usage: "fetch-stats" },
  { name: "timeline", description: "Print capability evolution", usage: "timeline" },
  { name: "research", description: "List research & benchmarks", usage: "research" },
  { name: "contact", description: "Output contact channels", usage: "contact" },
  { name: "matrix", description: "Open the GitHub matrix", usage: "matrix" },
  { name: "scanlines", description: "Toggle CRT scanline overlay", usage: "scanlines" },
  { name: "whoami", description: "Identity handshake", usage: "whoami" },
  { name: "clear", description: "Clear terminal output", usage: "clear" },
];
