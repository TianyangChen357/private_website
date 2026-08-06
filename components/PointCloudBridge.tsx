"use client";

import { useEffect, useMemo, useRef } from "react";

type Point3D = { x: number; y: number; z: number; color: string; size: number };

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function buildBridge(): Point3D[] {
  const points: Point3D[] = [];
  const random = seededRandom(357);
  const jitter = (amount: number) => (random() - 0.5) * amount;

  for (let x = -4.2; x <= 4.2; x += 0.11) {
    for (let z = -1.2; z <= 1.2; z += 0.13) {
      if (random() > 0.23) points.push({ x: x + jitter(.035), y: jitter(.05), z: z + jitter(.04), color: "#2bd3b2", size: 1.35 });
    }
  }
  [-2.5, 0, 2.5].forEach((centerX) => {
    for (let y = -2.55; y < 0; y += 0.09) {
      for (let angle = 0; angle < Math.PI * 2; angle += .26) {
        if (random() > .2) points.push({ x: centerX + Math.cos(angle) * .34 + jitter(.025), y: y + jitter(.035), z: Math.sin(angle) * .34, color: "#73c2fb", size: 1.5 });
      }
    }
  });
  [-1.25, 1.25].forEach((z) => {
    for (let x = -4.2; x <= 4.2; x += .09) {
      points.push({ x: x + jitter(.025), y: .48 + jitter(.025), z, color: "#f1a164", size: 1.25 });
      if (Math.round((x + 4.2) * 10) % 6 === 0) {
        for (let y = .05; y <= .48; y += .08) points.push({ x, y, z, color: "#f1a164", size: 1.1 });
      }
    }
  });
  for (let i = 0; i < 720; i++) {
    const x = (random() - .5) * 11;
    const z = (random() - .5) * 6;
    points.push({ x, y: -2.65 + jitter(.08), z, color: "#355866", size: .8 });
  }
  return points;
}

export default function PointCloudBridge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useMemo(() => buildBridge(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let time = 0;
    let pointerX = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      time += reducedMotion ? 0 : .0022;
      context.clearRect(0, 0, width, height);
      const angle = -.28 + Math.sin(time) * .025 + pointerX * .06;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const projected = points.map((point) => {
        const x = point.x * cos - point.z * sin;
        const z = point.x * sin + point.z * cos;
        const scale = Math.min(width / 11.5, height / 6.7);
        const perspective = 1 + z * .032;
        return {
          x: width * .5 + x * scale * perspective,
          y: height * .53 - point.y * scale * perspective + z * scale * .13,
          z,
          color: point.color,
          size: point.size * perspective,
        };
      }).sort((a, b) => a.z - b.z);

      const glow = context.createRadialGradient(width * .5, height * .54, 0, width * .5, height * .54, width * .48);
      glow.addColorStop(0, "rgba(27, 155, 143, .12)");
      glow.addColorStop(1, "rgba(4, 20, 29, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      projected.forEach((point) => {
        context.globalAlpha = Math.max(.28, Math.min(1, .72 + point.z * .05));
        context.fillStyle = point.color;
        context.fillRect(point.x, point.y, point.size, point.size);
      });
      context.globalAlpha = 1;

      context.strokeStyle = "rgba(115, 194, 251, .18)";
      context.lineWidth = .7;
      context.setLineDash([4, 7]);
      context.beginPath();
      context.moveTo(width * .08, height * .83);
      context.lineTo(width * .92, height * .83);
      context.stroke();
      context.setLineDash([]);
      if (visible && !reducedMotion) frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width - .5;
    };
    const resizeObserver = new ResizeObserver(() => { resize(); if (reducedMotion) render(); });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(render);
    }, { threshold: .05 });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    resize();
    render();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", onMove);
    };
  }, [points]);

  return <canvas ref={canvasRef} className="point-cloud-canvas" aria-label="Animated semantic point-cloud model of a bridge" />;
}
