"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  clipType?: "circle" | "inset" | "polygon";
  duration?: number;
}

export default function SectionReveal({
  children,
  className = "",
  clipType = "circle",
  duration = 1.2,
}: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const getClipPathValues = () => {
    switch (clipType) {
      case "circle":
        return ["circle(0% at 50% 50%)", "circle(75% at 50% 50%)", "circle(150% at 50% 50%)"];
      case "inset":
        return ["inset(50% 0)", "inset(10% 0)", "inset(0% 0)"];
      case "polygon":
        return [
          "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ];
      default:
        return ["none", "none", "none"];
    }
  };

  const clipPathValues = getClipPathValues();
  const clipPath = useTransform(scrollYProgress, [0, 0.5, 1], clipPathValues);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.5, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        clipPath,
        opacity,
        scale,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);

  return (
    <motion.div ref={containerRef} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
