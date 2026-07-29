import { cn } from "@/lib/utils";

export type Status = "LIVE" | "EXPERIMENTAL" | "ARCHIVED" | "OPERATIONAL" | "IDLE";

const STATUS_STYLES: Record<string, { dot: string; text: string; ring: string }> = {
  LIVE: { dot: "bg-status-live", text: "text-status-live", ring: "ring-status-live/30" },
  OPERATIONAL: { dot: "bg-status-live", text: "text-status-live", ring: "ring-status-live/30" },
  EXPERIMENTAL: { dot: "bg-status-exp", text: "text-status-exp", ring: "ring-status-exp/30" },
  ARCHIVED: { dot: "bg-status-idle", text: "text-zinc-400", ring: "ring-status-idle/30" },
  IDLE: { dot: "bg-status-idle", text: "text-zinc-400", ring: "ring-status-idle/30" },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.IDLE!;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-2xs uppercase tracking-widest2 ring-1",
        s.ring,
        s.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot, status !== "IDLE" && status !== "ARCHIVED" && "animate-pulse-dot")} />
      {status}
    </span>
  );
}
