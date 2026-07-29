import type { Config } from "tailwindcss";

/**
 * CYBERNETIC DESIGN SYSTEM
 * ---------------------------------------------------------------------------
 * Deep obsidian substrate, electric-cyan / deep-violet accents, and precise
 * status semantics (emerald = live, amber = experimental). Tuned for a
 * telemetry-grade, high-contrast dark interface with zero layout shift.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Substrate
        obsidian: {
          950: "#070709",
          900: "#0D0E12",
          800: "#121319",
          700: "#181A22",
          600: "#22252F",
        },
        // Accents
        cyan: {
          DEFAULT: "#00F0FF",
          dim: "#0AA7B3",
          glow: "#5CF7FF",
        },
        violet: {
          DEFAULT: "#7000FF",
          dim: "#5411B0",
          glow: "#9A4DFF",
        },
        // Status semantics
        status: {
          live: "#22E58B", // emerald — operational
          exp: "#FFB020", //  amber  — experimental
          idle: "#5A6172", // slate  — standby
        },
        // Borders / lines
        hairline: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.04em" }],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      boxShadow: {
        "glow-cyan": "0 0 0 1px rgba(0,240,255,0.25), 0 0 24px -4px rgba(0,240,255,0.35)",
        "glow-violet": "0 0 0 1px rgba(112,0,255,0.25), 0 0 24px -4px rgba(112,0,255,0.45)",
        panel: "0 24px 60px -30px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-fade": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(112,0,255,0.18), transparent 70%)",
        "scan-line": "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.7)" },
        },
        "sweep": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "flicker": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        "blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        sweep: "sweep 4s linear infinite",
        flicker: "flicker 3s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
        ticker: "ticker 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
