"use client";

import { useScroll, MotionValue } from "framer-motion";
import { useRef, useEffect, ReactNode } from "react";

interface ScrollyVideoProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

// Smooth exponential lerp — frame-rate independent
function damp(current: number, target: number, smoothness: number, dt: number) {
  return current + (target - current) * (1 - Math.pow(smoothness, dt));
}

export default function ScrollyVideo({ src, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const smoothedRef = useRef(0);  // smoothed playback position
  const targetRef = useRef(0);    // raw scroll-mapped target

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Jump to correct frame once metadata loads
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const t = scrollYProgress.get() * video.duration;
    smoothedRef.current = t;
    targetRef.current = t;
    video.currentTime = t;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Update raw target whenever scroll changes
    const unsub = scrollYProgress.on("change", (latest) => {
      if (!video.duration) return;
      targetRef.current = Math.max(0, Math.min(latest * video.duration, video.duration));
    });

    const SMOOTHNESS = 0.85;   // closer to 1 = smoother/slower catch-up
    const MIN_DELTA = 1 / 60;  // ~1 video frame; don't seek smaller than this
    let lastSeekTime = 0;
    const SEEK_INTERVAL_MS = 32; // max 30 seeks/sec — prevent decoder overload

    let lastTime = performance.now();

    const tick = (now: number) => {
      if (video.readyState >= 2) {
        const dt = Math.min((now - lastTime) / 1000, 0.1); // seconds, capped
        lastTime = now;

        // Smooth the position
        smoothedRef.current = damp(smoothedRef.current, targetRef.current, SMOOTHNESS, dt * 60);

        // Throttle seeks to prevent browser decode overload (max 30/s)
        if (
          now - lastSeekTime >= SEEK_INTERVAL_MS &&
          Math.abs(smoothedRef.current - video.currentTime) > MIN_DELTA
        ) {
          lastSeekTime = now;
          // fastSeek picks the nearest keyframe — much less decode work
          if (typeof (video as any).fastSeek === "function") {
            (video as any).fastSeek(smoothedRef.current);
          } else {
            video.currentTime = smoothedRef.current;
          }
        }
      }
      requestAnimationFrame(tick);
    };

    const rafId = requestAnimationFrame(tick);

    return () => {
      unsub();
      cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-[95vh] w-full overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
        />
        {children && children(scrollYProgress)}
      </div>
    </div>
  );
}
