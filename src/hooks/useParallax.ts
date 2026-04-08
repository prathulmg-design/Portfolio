"use client";

import { useScroll, useTransform, useSpring, MotionValue, useVelocity, useSpring as useSpringTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * Hook for parallax Y movement based on scroll
 */
export function useParallaxY(speed: number = 0.5) {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 1000], [0, speed * 1000]);
}

/**
 * Hook for scroll velocity with spring smoothing
 */
export function useScrollVelocity(smoothness: number = 50) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpringTransform(velocity, {
    damping: smoothness,
    stiffness: smoothness,
  });
  return smoothVelocity;
}

/**
 * Hook for scroll-based skew effect
 */
export function useScrollSkew(maxSkew: number = 2) {
  const velocity = useScrollVelocity(30);
  return useTransform(velocity, [-1000, 0, 1000], [-maxSkew, 0, maxSkew]);
}

/**
 * Hook for scroll-based opacity
 */
export function useScrollOpacity(
  range: [number, number, number] = [0, 0.2, 1]
) {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, range, [0, 1, 1]);
}

/**
 * Hook for mouse position tracking
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}

/**
 * Hook for element visibility on scroll
 */
export function useInView(ref: React.RefObject<HTMLElement | null>, threshold: number = 0.1) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}

/**
 * Hook for parallax scale based on scroll
 */
export function useParallaxScale(
  range: [number, number] = [0, 1],
  outputRange: [number, number] = [1, 1.2]
) {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, range, outputRange);
}

/**
 * Hook for horizontal parallax movement
 */
export function useParallaxX(speed: number = 0.3) {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 1000], [0, speed * 500]);
}

/**
 * Hook for scroll progress with smooth spring
 */
export function useSmoothScrollProgress(springConfig = { stiffness: 100, damping: 30 }) {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, springConfig);
}
