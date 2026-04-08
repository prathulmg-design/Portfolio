"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  rotation: number;
  type: "circle" | "square" | "triangle" | "line";
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.5 + 0.1,
    rotation: Math.random() * 360,
    type: ["circle", "square", "triangle", "line"][Math.floor(Math.random() * 4)] as Particle["type"],
  }));
}

function ParticleShape({ particle, scrollY }: { particle: Particle; scrollY: any }) {
  const y = useTransform(scrollY, [0, 1000], [0, -particle.speed * 200]);
  const x = useTransform(scrollY, [0, 1000], [0, Math.sin(particle.id) * 50]);
  const rotate = useTransform(scrollY, [0, 1000], [0, particle.rotation * 2]);

  const shapeStyle = {
    width: particle.size,
    height: particle.type === "line" ? 1 : particle.size,
    opacity: particle.opacity,
  };

  const renderShape = () => {
    switch (particle.type) {
      case "circle":
        return <div style={shapeStyle} className="rounded-full bg-white" />;
      case "square":
        return <div style={shapeStyle} className="bg-white" />;
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid rgba(255,255,255,${particle.opacity})`,
            }}
          />
        );
      case "line":
        return <div style={{ ...shapeStyle, width: particle.size * 3 }} className="bg-white/30" />;
      default:
        return <div style={shapeStyle} className="rounded-full bg-white" />;
    }
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        y,
        x,
        rotate,
      }}
      className="pointer-events-none"
    >
      {renderShape()}
    </motion.div>
  );
}

export default function FloatingParticles({ count = 50 }: { count?: number }) {
  const { scrollY } = useScroll();
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <ParticleShape key={particle.id} particle={particle} scrollY={scrollY} />
      ))}
    </div>
  );
}
