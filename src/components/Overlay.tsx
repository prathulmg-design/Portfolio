"use client";

import { useTransform, motion, MotionValue } from "framer-motion";
import { SplitText } from "./AnimatedText";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Opacity transforms
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);

    // Enhanced Parallax Y movement with more depth
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [80, -80]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [80, -80]);

    // Scale effects for dramatic entrance
    const scale1 = useTransform(scrollYProgress, [0, 0.05, 0.15], [0.8, 1, 1]);
    const scale2 = useTransform(scrollYProgress, [0.2, 0.25, 0.45], [0.85, 1, 1]);
    const scale3 = useTransform(scrollYProgress, [0.5, 0.55, 0.75], [0.85, 1, 1]);

    // Blur effects for depth
    const blur1 = useTransform(scrollYProgress, [0, 0.1], ["10px", "0px"]);
    const blur2 = useTransform(scrollYProgress, [0.2, 0.3], ["10px", "0px"]);
    const blur3 = useTransform(scrollYProgress, [0.5, 0.6], ["10px", "0px"]);

    // Giant text horizontal scroll parallax
    const giantTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const giantTextOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.05]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-white overflow-hidden" style={{ textShadow: "0px 4px 12px rgba(0,0,0,0.4)" }}>
            {/* Giant Parallax Background Text */}
            <motion.div
                style={{ x: giantTextX, opacity: giantTextOpacity }}
                className="absolute top-1/3 left-0 whitespace-nowrap text-[15vw] md:text-[18vw] font-black tracking-tighter text-white z-0 opacity-20"
            >
                FRONTEND DEVELOPER • ENGINEER • CREATOR
            </motion.div>

            {/* Side UI - Left */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-10 opacity-70 z-20"
            >
                <div className="text-sm tracking-[0.3em] font-medium uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    Frontend Architecture
                </div>
                <div className="w-[1px] h-24 bg-white/50"></div>
                <div className="text-sm tracking-[0.3em] font-medium uppercase rotate-180 text-blue-300" style={{ writingMode: 'vertical-rl' }}>
                    React & Next.js
                </div>
            </motion.div>

            {/* Side UI - Right */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-10 opacity-70 z-20"
            >
                <div className="text-sm tracking-[0.3em] font-medium uppercase text-purple-300" style={{ writingMode: 'vertical-rl' }}>
                    5+ Years Experience
                </div>
                <div className="w-[1px] h-24 bg-white/50"></div>
                <div className="text-sm tracking-[0.3em] font-medium uppercase" style={{ writingMode: 'vertical-rl' }}>
                    Scalable Web Apps
                </div>
            </motion.div>

            {/* Section 1 – Name & Title */}
            <motion.div
                style={{ opacity: opacity1, y: y1, scale: scale1, filter: blur1 }}
                className="absolute inset-0 flex items-center justify-center p-8 z-10"
            >
                <div className="text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold tracking-tight mb-4 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <SplitText text="Prathul M G" delay={0.2} />
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl font-medium text-gray-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Senior Frontend Developer.
                    </motion.p>
                </div>
            </motion.div>

            {/* Section 2 – Expertise */}
            <motion.div
                style={{ opacity: opacity2, y: y2, scale: scale2, filter: blur2 }}
                className="absolute inset-0 flex items-center justify-start p-8 md:p-24 z-10"
            >
                <div className="max-w-3xl">
                    <motion.h2
                        className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, x: -50 }}
                    >
                        <SplitText text="Delivering scalable web apps" delay={0} />
                        <br />
                        <span className="text-blue-400 drop-shadow-md">with React.js</span> & Next.js.
                    </motion.h2>
                </div>
            </motion.div>

            {/* Section 3 – Stack */}
            <motion.div
                style={{ opacity: opacity3, y: y3, scale: scale3, filter: blur3 }}
                className="absolute inset-0 flex items-center justify-end p-8 md:p-24 text-right z-10"
            >
                <div className="max-w-3xl ml-auto">
                    <motion.h2
                        className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, x: 50 }}
                    >
                        Expert in <span className="text-purple-400 drop-shadow-md">Angular</span>, SSR
                        <br /> & component-driven architecture.
                    </motion.h2>
                </div>
            </motion.div>
        </div>
    );
}
