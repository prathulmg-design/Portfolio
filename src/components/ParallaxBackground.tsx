"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxLayer {
  speed: number;
  opacity: number;
  gradient: string;
  size: string;
  position: string;
}

const defaultLayers: ParallaxLayer[] = [
  {
    speed: 0.2,
    opacity: 0.08,
    gradient: "from-blue-600/20 to-cyan-500/20",
    size: "w-[800px] h-[800px]",
    position: "top-[-20%] right-[-10%]",
  },
  {
    speed: 0.4,
    opacity: 0.06,
    gradient: "from-purple-600/20 to-pink-500/20",
    size: "w-[600px] h-[600px]",
    position: "bottom-[-10%] left-[-15%]",
  },
  {
    speed: 0.6,
    opacity: 0.04,
    gradient: "from-indigo-600/20 to-blue-500/20",
    size: "w-[500px] h-[500px]",
    position: "top-[40%] left-[20%]",
  },
];

export default function ParallaxBackground({
  layers = defaultLayers,
  scrollContainerRef,
}: {
  layers?: ParallaxLayer[];
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef || containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {layers.map((layer, index) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, -layer.speed * 500]);
        const x = useTransform(scrollYProgress, [0, 1], [0, Math.sin(index) * 100]);
        const rotate = useTransform(scrollYProgress, [0, 1], [0, index * 30]);

        return (
          <motion.div
            key={index}
            style={{
              y,
              x,
              rotate,
            }}
            className={`absolute ${layer.position} ${layer.size} rounded-full bg-gradient-to-br ${layer.gradient} blur-[120px]`}
          />
        );
      })}
    </div>
  );
}
