"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxBackground from "./ParallaxBackground";
import AnimatedText from "./AnimatedText";

const TECHNOLOGIES = [
    {
        name: "React.js",
        color: "group-hover:text-[#61DAFB]",
        borderColor: "group-hover:border-[#61DAFB]/50",
        glow: "group-hover:shadow-[0_0_20px_rgba(97,218,251,0.3)]",
        icon: (
            <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 fill-current">
                <circle cx="0" cy="0" r="2.05" />
                <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
            </svg>
        ),
    },
    {
        name: "Next.js",
        color: "group-hover:text-white",
        borderColor: "group-hover:border-white/50",
        glow: "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
        icon: (
            <svg viewBox="0 0 180 180" className="w-8 h-8 fill-current">
                <path d="M90,0C40.3,0,0,40.3,0,90c0,49.7,40.3,90,90,90c49.7,0,90-40.3,90-90C180,40.3,139.7,0,90,0z M149.3,153L73.1,65.2v59h-10 V64h15l73.4,85.2c-5.7,5.5-12,10.2-18.7,13.9C133,163.1,141.6,158.7,149.3,153z M117.1,64h10v51h-10V64z" />
            </svg>
        ),
    },
    {
        name: "Angular",
        color: "group-hover:text-[#DD0031]",
        borderColor: "group-hover:border-[#DD0031]/50",
        glow: "group-hover:shadow-[0_0_20px_rgba(221,0,49,0.3)]",
        icon: (
            <svg viewBox="0 0 250 250" className="w-8 h-8 fill-current">
                <path d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" fill="currentColor" fillOpacity="0.1" />
                <path d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z" fill="currentColor" fillOpacity="0.2" />
                <path d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z" />
            </svg>
        ),
    },
    {
        name: "TypeScript",
        color: "group-hover:text-[#3178C6]",
        borderColor: "group-hover:border-[#3178C6]/50",
        glow: "group-hover:shadow-[0_0_20px_rgba(49,120,198,0.3)]",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-current">
                <path d="M1.5 63.91v62.5h125v-125H1.5v62.5z" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M69 66.5v8.5H53.5v39h-10v-39H28v-8.5h41z" />
                <path d="M102.5 98c0 9-5.5 16-16 16-8 0-14-3.5-17.5-9.5L78 98c2.5 4 6 7 10.5 7 5 0 7.5-2.5 7.5-5.5 0-11-23-4.5-23-18.5 0-7.5 6-14.5 15.5-14.5 7.5 0 12.5 3.5 16 8l-8 5.5c-2-3-5.5-5-8.5-5-3.5 0-5.5 2-5.5 4.5 0 9.5 23 4 23 18.5z" />
            </svg>
        ),
    },
    {
        name: "JavaScript",
        color: "group-hover:text-[#F7DF1E]",
        borderColor: "group-hover:border-[#F7DF1E]/50",
        glow: "group-hover:shadow-[0_0_20px_rgba(247,223,30,0.3)]",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-current">
                <path d="M1.5 63.91v62.5h125v-125H1.5v62.5H1.5z" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M94.4 78a16 16 0 0113.6-7V62.4A23.7 23.7 0 0086 74v38.8a10 10 0 01-1 3.5c-.8 2-2.7 3.3-5.3 3.3-4 0-7.2-2.5-9-7L62.5 119a20.4 20.4 0 0017.3 11c9.4 0 15.2-4.5 18-9 2-3 3-7 3-12.8V80c0-6.8 5-9.4 10-10l.3-.2a24.5 24.5 0 00-16.7 8.2zm-35.3-2.6c0-7 5-9.5 10.3-10l.2-.2a24.2 24.2 0 00-16-8.2 16.3 16.3 0 0112.5-7.2V61.2a23 23 0 00-21 11v40.5H53c0 10.8 1 12.8-1 15v8.5a72 72 0 01-5-18l-8-5.7v10.5c.3 4 .3 8-.3 11-1.3 7.8-8.8 13.5-17.6 13.5H19v-8.8h1.8c4 0 8.2-1.8 9-5.7.5-2.2.3-5.3 0-8L19.5 73.8l7.5-3 8 20L41 62.5h8.8L38.4 97v22c0 3 2.5 3 4.2 3 5 0 7.8-2.6 8.5-6.5a24.6 24.6 0 00.3-9V80c0-6.8 4.7-9.4 9.8-10.2l-2-4.4z" />
            </svg>
        ),
    },
    {
        name: "Docker",
        color: "group-hover:text-[#2496ED]",
        borderColor: "group-hover:border-[#2496ED]/50",
        glow: "group-hover:shadow-[0_0_20px_rgba(36,150,237,0.3)]",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-current">
                <path d="M123.6 57a34 34 0 00-14-12v-1a55 55 0 00-47-5v-1a22 22 0 00-18 6L39 49v3H13v34c0 3 6 15 28 20a59 59 0 0041-3 51 51 0 0031-28v-5l-4-3a21 21 0 0014-9V57zm-111 25v-1H25v20zm42 5H42v-20h12.5zm25-5v1H55v-20h25zM114 62a35 35 0 01-18 20V62h18v-5H92V42H64.5a18 18 0 0113-5v14H96v11z" />
            </svg>
        ),
    },
    {
        name: "Redux",
        color: "group-hover:text-[#764ABC]",
        borderColor: "group-hover:border-[#764ABC]/50",
        glow: "group-hover:shadow-[0_0_20px_rgba(118,74,188,0.3)]",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-current">
                <path d="M85 30c-2.4-4-6.4-6-10.6-6-4.5 0-8.8 2.2-11.4 6-5.5-3.3-12-5-18.4-5C32.4 25 21 34.6 21 48c0 14.8 11.4 22 24.6 24 .8 10.4 6 18.6 15.6 24 6.8 3.8 14.6 5 22.8 4 10.6-1.5 19.4-7 24-16 .7-1.3 1-3 1-4.4 0-4-3.5-7.5-7.5-7.5-2.6 0-5 1.4-6.4 3.6-2.5 4.5-6.8 6.8-12 7.7-6 .8-11.8.2-16.7-2.6-7-4-10-10.5-10.7-18 5-.4 10-1 14.4-2.5 10.5-3.3 18.2-10 18.2-22C88.4 35.8 87.2 33.6 85 30zM45 61.5c-7 0-11-5.5-11-13.5C34 38 41.5 36 45 36c8 0 11.5 5 11.5 11v2C56 55.4 52 61.5 45 61.5zM69 77.2c2.4.2 5 .4 7.6.4 5 0 9.8-.5 14.4-1.7 6.4-1.8 9.5-5 9.5-11.8s-3.2-10-9.6-11.8c-3.6-1-7.2-1.4-11-1.6-1 .5-2 1-3 1.6-4.8 3-10 4-15 4.5-1-12 .7-21.8 5-29 1.6-2.7 4-5 7.6-5 6.6 0 9.5 5 9.5 13.5 0 7-.7 13.5-3.8 19-1.2 2-2 4.4-2 6.8 0 4 3 7 7 7 2.6 0 5-1.4 6.4-3.6C95.5 51 97 42 97 37c0-10-4.8-16-13-16a18.2 18.2 0 00-15.6 8.5c-6-3.8-13-5.5-20.4-5.5C31.5 24 16 33.5 16 48c0 14 11 26 26.6 28 6 13.5 16 23 30.6 23C85.4 99 97 88.5 97 81.5c0-4-3-6.5-6.5-6.5-2.6 0-5 2-6.5 4-5 8-15 10.5-24 10.5-10.5 0-18-5.5-21.5-16.5A62 62 0 0169 77.2z" />
            </svg>
        ),
    },
];

export default function Technologies() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const marqueeSpeed = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const titleScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={containerRef} className="relative z-20 bg-[#0a0a0a] py-32 overflow-hidden" id="technologies">
            {/* Parallax Background Layers */}
            <ParallaxBackground />

            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-widest text-[#64ffda] uppercase mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-[#64ffda] animate-pulse" />
                    Core Technologies
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    style={{ scale: titleScale, opacity: titleOpacity }}
                    className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter"
                >
                    <AnimatedText
                        text="My Frameworks"
                        className="block"
                        animation="slide"
                    />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                        & Tools
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    The robust tech stack and tools I use to build scalable, high-performance applications.
                </motion.p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden py-10 flex">
                {/* Mask gradient for smooth fade effect on edges */}
                <div className="absolute top-0 left-0 w-32 h-full z-20 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-full z-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

                {/* Track */}
                <motion.div
                    className="flex gap-6 px-4"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {/* Tripling the array for seamless endless looping */}
                    {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
                        <div
                            key={index}
                            className={`group relative flex items-center gap-4 w-[280px] p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-xl shrink-0 cursor-default transition-all duration-500 hover:-translate-y-2 ${tech.borderColor} ${tech.glow}`}
                        >
                            <div className="absolute inset-0 bg-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className={`text-white/40 transition-colors duration-500 ${tech.color} z-10`}>
                                {tech.icon}
                            </div>

                            <h4 className={`text-xl font-bold tracking-tight text-white/70 transition-colors duration-500 ${tech.color} z-10`}>
                                {tech.name}
                            </h4>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
