"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: 0 | 1; // 0 = cyan, 1 = violet
}

const CYAN = "0, 240, 255";
const VIOLET = "112, 0, 255";

/**
 * Interactive vector node-net. Draws a self-organizing mesh of nodes that
 * links when nearby, and reacts to pointer proximity. Hardware-rAF driven,
 * devicePixelRatio-aware, and reduced-motion safe.
 */
export function NodeNet() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;

    const LINK_DIST = 150;
    const POINTER_RADIUS = 190;

    const seed = () => {
      const area = width * height;
      const count = Math.max(28, Math.min(80, Math.floor(area / 18000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        hue: (i % 5 === 0 ? 1 : 0) as 0 | 1,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        // Pointer interaction: gentle gather + repel envelope.
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS && dist > 0.01) {
            const force = (1 - dist / POINTER_RADIUS) * 0.45;
            n.vx += (dx / dist) * force * 0.06;
            n.vy += (dy / dist) * force * 0.06;
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        // Soft friction + edge wrap.
        n.vx *= 0.992;
        n.vy *= 0.992;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // Links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx.strokeStyle = `rgba(${CYAN}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const rgb = n.hue === 1 ? VIOLET : CYAN;
        ctx.fillStyle = `rgba(${rgb}, 0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hue === 1 ? 1.8 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pointer glow
      if (pointer.active) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, POINTER_RADIUS);
        g.addColorStop(0, `rgba(${CYAN}, 0.10)`);
        g.addColorStop(1, `rgba(${CYAN}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, POINTER_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);

    if (reduceMotion) {
      // Render a single static frame.
      step();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] opacity-70"
    />
  );
}
