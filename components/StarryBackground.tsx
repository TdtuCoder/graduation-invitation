"use client";

import { useEffect, useMemo, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleAmount: number;
  twinkleSpeed: number;
  phase: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const isReducedMotion = useMemo(() => {
    // Memoized only for initial mount; we also listen to changes below.
    return prefersReducedMotion();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const getStarColor = () => {
      // Use app theme token; expected to be a valid CSS color (e.g. "#ededed").
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim();
      return value || "currentColor";
    };

    let starColor = getStarColor();

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const createStars = () => {
      // Star density scales with area, clamped for performance.
      const area = width * height;
      const count = Math.max(120, Math.min(520, Math.round(area / 6500)));

      const next: Star[] = new Array(count);
      for (let i = 0; i < count; i++) {
        const radius = 0.7 + Math.random() * 1.8;
        next[i] = {
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          baseAlpha: 0.35 + Math.random() * 0.6,
          twinkleAmount: 0.55 + Math.random() * 0.45,
          twinkleSpeed: 0.4 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
        };
      }
      stars = next;
    };

    const resize = () => {
      const nextWidth = Math.max(1, window.innerWidth);
      const nextHeight = Math.max(1, window.innerHeight);
      const nextDpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    const draw = (tMs: number) => {
      ctx.clearRect(0, 0, width, height);

      const t = tMs / 1000;
      ctx.fillStyle = starColor;

      for (const s of stars) {
        // Make twinkle peaks sharper & more noticeable.
        const p1 = (Math.sin(t * s.twinkleSpeed + s.phase) + 1) / 2; // 0..1
        const p2 = (Math.sin(t * (s.twinkleSpeed * 1.9) + s.phase * 1.7) + 1) / 2;
        const p = 0.75 * p1 + 0.25 * p2;

        // Spike brightness near peaks while keeping a faint baseline.
        const spike = Math.pow(p, 4);
        const twinkle = (1 - s.twinkleAmount) * 0.55 + s.twinkleAmount * (0.12 + 0.88 * spike);
        const alpha = Math.max(0, Math.min(1, s.baseAlpha * twinkle));

        // Soft glow layer first (makes "lấp lánh" visible), then core.
        ctx.globalAlpha = alpha * 0.35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const reduced = isReducedMotion;

    const animate = (tMs: number) => {
      draw(tMs);
      rafIdRef.current = window.requestAnimationFrame(animate);
    };

    resize();

    if (reduced) {
      draw(performance.now());
    } else {
      rafIdRef.current = window.requestAnimationFrame(animate);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    // If theme variables change (e.g. media query), update star color.
    const onThemeChange = () => {
      starColor = getStarColor();
    };
    window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener?.("change", onThemeChange);
    window.matchMedia?.("(prefers-color-scheme: light)")?.addEventListener?.("change", onThemeChange);

    // Keep reduced-motion preference in sync (best-effort).
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (!media) return;
      if (media.matches) {
        if (rafIdRef.current != null) {
          window.cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        draw(performance.now());
      } else {
        if (rafIdRef.current == null) {
          rafIdRef.current = window.requestAnimationFrame(animate);
        }
      }
    };

    if (media) {
      // Safari still supports addListener in some versions.
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", onMotionChange);
      } else if (typeof media.addListener === "function") {
        media.addListener(onMotionChange);
      }
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.matchMedia?.("(prefers-color-scheme: dark)")?.removeEventListener?.("change", onThemeChange);
      window.matchMedia?.("(prefers-color-scheme: light)")?.removeEventListener?.("change", onThemeChange);
      if (media) {
        if (typeof media.removeEventListener === "function") {
          media.removeEventListener("change", onMotionChange);
        } else if (typeof media.removeListener === "function") {
          media.removeListener(onMotionChange);
        }
      }
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isReducedMotion]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* subtle vignette using theme tokens only */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--color-foreground) 8%, transparent), transparent 60%), radial-gradient(70% 60% at 50% 100%, color-mix(in srgb, var(--color-foreground) 6%, transparent), transparent 65%)",
        }}
      />
    </div>
  );
}
