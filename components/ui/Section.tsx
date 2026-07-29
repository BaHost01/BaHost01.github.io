import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Standard section shell: telemetry eyebrow, title, optional description. */
export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28", className)}>
      <div className="mb-10 flex flex-col gap-3">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">{description}</p>
        ) : null}
        <div className="hairline-node mt-2" />
      </div>
      {children}
    </section>
  );
}
