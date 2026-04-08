"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 20 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const cursorScale = useSpring(1, springConfig);
  const cursorOpacity = useSpring(0);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set window dimensions
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [role='button'], .cursor-pointer"
    );

    const handleMouseOver = () => {
      setIsHovering(true);
      cursorScale.set(2.5);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      cursorScale.set(1);
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseOut);
      });
    };
  }, [mouseX, mouseY, cursorScale, isVisible]);

  const rotateX = useTransform(cursorY, [0, windowHeight], [10, -10]);
  const rotateY = useTransform(cursorX, [0, windowWidth], [-10, 10]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        style={{
          x: cursorX,
          y: cursorY,
          scale: cursorScale,
          opacity: isVisible ? 1 : 0,
          rotateX,
          rotateY,
        }}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference ${
          isHovering ? "bg-white/20" : "bg-white"
        }`}
      />

      {/* Cursor ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-white/30 pointer-events-none z-[9998]"
      />
    </>
  );
}
