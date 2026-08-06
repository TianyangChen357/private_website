"use client";

import { useEffect, useRef } from "react";
import {
  geoGraticule10,
  geoOrthographic,
  geoPath,
  type GeoPermissibleObjects,
} from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldData from "world-atlas/countries-110m.json";

const topology = worldData as unknown as Topology<{
  countries: GeometryCollection;
  land: GeometryCollection;
}>;
const land = feature(topology, topology.objects.land);
const borders = mesh(topology, topology.objects.countries, (a, b) => a !== b);
const graticule = geoGraticule10();

export default function SpatialGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef<[number, number]>([78, -17]);
  const dragRef = useRef({ active: false, x: 0, y: 0 });

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
    let lastTime = performance.now();
    let lastInteraction = 0;

    const projection = geoOrthographic().precision(0.4).clipAngle(90);
    const path = geoPath(projection, context);

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      projection
        .translate([width * 0.51, height * 0.49])
        .scale(Math.min(width, height) * 0.405);
    };

    const drawPath = (object: GeoPermissibleObjects) => {
      context.beginPath();
      path(object);
    };

    const draw = (now: number) => {
      const delta = Math.min(now - lastTime, 40);
      lastTime = now;
      if (!dragRef.current.active && !reducedMotion && now - lastInteraction > 4500) {
        rotationRef.current[0] += delta * 0.0032;
      }
      projection.rotate([rotationRef.current[0], rotationRef.current[1], 0]);

      context.clearRect(0, 0, width, height);
      context.save();

      context.shadowColor = "rgba(99, 221, 255, 0.48)";
      context.shadowBlur = Math.min(width, height) * 0.09;
      drawPath({ type: "Sphere" });
      const sphereGradient = context.createRadialGradient(
        width * 0.39,
        height * 0.33,
        0,
        width * 0.51,
        height * 0.49,
        Math.min(width, height) * 0.43,
      );
      sphereGradient.addColorStop(0, "#123c46");
      sphereGradient.addColorStop(0.62, "#071f2b");
      sphereGradient.addColorStop(1, "#020d15");
      context.fillStyle = sphereGradient;
      context.fill();
      context.shadowBlur = 0;

      context.save();
      drawPath({ type: "Sphere" });
      context.clip();

      drawPath(graticule);
      context.strokeStyle = "rgba(112, 213, 227, 0.13)";
      context.lineWidth = 0.65;
      context.stroke();

      drawPath(land as GeoPermissibleObjects);
      context.fillStyle = "rgba(15, 78, 82, 0.86)";
      context.fill();
      context.strokeStyle = "rgba(47, 221, 190, 0.7)";
      context.lineWidth = 0.75;
      context.stroke();

      drawPath(borders as GeoPermissibleObjects);
      context.strokeStyle = "rgba(115, 194, 251, 0.18)";
      context.lineWidth = 0.45;
      context.stroke();
      context.restore();

      drawPath({ type: "Sphere" });
      context.strokeStyle = "rgba(135, 224, 239, 0.65)";
      context.lineWidth = 1;
      context.stroke();
      context.restore();

      if (visible && !reducedMotion) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      lastTime = performance.now();
      frame = requestAnimationFrame(draw);
    };

    const onPointerDown = (event: PointerEvent) => {
      lastInteraction = performance.now();
      dragRef.current = { active: true, x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add("is-dragging");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = event.clientX - dragRef.current.x;
      const dy = event.clientY - dragRef.current.y;
      rotationRef.current[0] += dx * 0.24;
      rotationRef.current[1] = Math.max(-55, Math.min(55, rotationRef.current[1] - dy * 0.2));
      lastInteraction = performance.now();
      dragRef.current.x = event.clientX;
      dragRef.current.y = event.clientY;
      if (reducedMotion) draw(performance.now());
    };
    const onPointerUp = (event: PointerEvent) => {
      dragRef.current.active = false;
      canvas.releasePointerCapture(event.pointerId);
      canvas.classList.remove("is-dragging");
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const movement = 6;
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") rotationRef.current[0] -= movement;
      if (event.key === "ArrowRight") rotationRef.current[0] += movement;
      if (event.key === "ArrowUp") rotationRef.current[1] = Math.min(55, rotationRef.current[1] + movement);
      if (event.key === "ArrowDown") rotationRef.current[1] = Math.max(-55, rotationRef.current[1] - movement);
      lastInteraction = performance.now();
      if (reducedMotion) draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(performance.now());
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion) start();
      else cancelAnimationFrame(frame);
    }, { threshold: 0.04 });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("keydown", onKeyDown);
    resize();
    draw(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="globe-wrap">
      <div className="globe-orbit orbit-one" />
      <div className="globe-orbit orbit-two" />
      <canvas ref={canvasRef} className="globe-canvas" tabIndex={0} aria-label="Interactive orthographic globe. Drag or use the arrow keys to rotate." />
      <div className="globe-caption">
        <span>DRAG TO ROTATE</span>
        <i />
      </div>
    </div>
  );
}
