"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Live UTC clock string. */
function useUtcClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        hour12: false,
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/** A number that drifts within a band to feel "live". */
function useDrift(base: number, band: number, ms: number) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      const next = base + (Math.random() - 0.5) * band;
      setV(next);
    }, ms);
    return () => clearInterval(id);
  }, [base, band, ms]);
  return v;
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1 border-l border-hairline pl-3">
      <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">{label}</span>
      <span className={cn("font-mono text-sm tabular-nums sm:text-base", accent ? "text-cyan text-glow-cyan" : "text-zinc-100")}>
        {value}
      </span>
    </div>
  );
}

/** Scrolling throughput sparkline. */
function Sparkline() {
  const [pts, setPts] = useState<number[]>(() => Array.from({ length: 32 }, () => 0.5));
  const ref = useRef<number[]>(pts);
  ref.current = pts;

  useEffect(() => {
    const id = setInterval(() => {
      const last = ref.current[ref.current.length - 1] ?? 0.5;
      const next = Math.max(0.05, Math.min(0.95, last + (Math.random() - 0.5) * 0.4));
      setPts((p) => [...p.slice(1), next]);
    }, 700);
    return () => clearInterval(id);
  }, []);

  const w = 100;
  const h = 28;
  const step = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(h - p * h).toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-7 w-full" aria-hidden>
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#spark)" />
      <path d={path} fill="none" stroke="#00F0FF" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function TelemetryHUD() {
  const clock = useUtcClock();
  const heap = useDrift(14336, 220, 1500);
  const reqs = useDrift(9240, 1800, 900);
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const s = Math.floor((Date.now() - start) / 1000);
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      setUptime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass bracket w-full max-w-xl rounded-lg p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="eyebrow">Telemetry // Live</span>
        <span className="flex items-center gap-2 font-mono text-2xs uppercase tracking-widest2 text-status-live">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-status-live" />
          Systems Operational
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
        <Stat label="Env" value="PRODUCTION" />
        <Stat label="Arch" value="x86-64" />
        <Stat label="Align" value="64-bit" />
        <Stat label="Cores" value="16" />
        <Stat label="Heap" value={`${Math.round(heap).toLocaleString()} MB`} accent />
        <Stat label="Uptime" value={uptime} />
        <Stat label="Clock" value={`${clock}Z`} accent />
        <Stat label="Req/s" value={Math.round(reqs).toLocaleString()} accent />
      </div>

      <div className="mt-4 border-t border-hairline pt-3">
        <span className="font-mono text-2xs uppercase tracking-widest2 text-zinc-500">Throughput</span>
        <Sparkline />
      </div>
    </div>
  );
}
