"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const TIMELINE_DATA = [
  {
    id: "seqato",
    year: "2020",
    fullDate: "Nov 2020 – Present",
    title: "SENIOR SOFTWARE ENGINEER",
    org: "Seqato Software Solutions",
    location: "Trivandrum, Kerala, India",
    points: [
      "Led the design and development of high-performance frontend applications using React.js, Next.js, and Angular, driving a 30% increase in user engagement.",
      "Engineered SEO-optimized, SSR and SSG applications with improved search visibility by 25%.",
      "Enhanced cross-browser compatibility across applications via modern CSS frameworks, achieving a 95% customer satisfaction rate.",
      "Spearheaded integration of RESTful APIs and backend services, improving data flow efficiency by 40%.",
      "Mentored junior developers, resulting in a 20% improvement in their coding efficiency.",
      "Streamlined CI/CD processes and automated tests, reducing deployment time by 15%.",
      "Collaborated in Agile/Scrum teams, achieving 98% sprint completion on schedule."
    ],
    type: "work",
    accentColor: "#3b82f6" // blue-500
  },
  {
    id: "education",
    year: "2020",
    fullDate: "May 2020",
    title: "Bachelor of Science in Computer Science",
    org: "University of Kerala",
    location: "Kerala, India",
    points: [
      "Graduated with a strong foundation in computer science principles, software engineering, and analytical thinking.",
      "Gained comprehensive knowledge in algorithms, data structures, and foundational programming.",
    ],
    type: "education",
    accentColor: "#a855f7" // purple-500
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative z-20 bg-[#060606] py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
      id="experience"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase mb-4 block">
              Evolution
            </span>
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mb-10">
              JOURNEY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                TIMELINE
              </span>
            </h2>
            <div className="w-12 h-[2px] bg-blue-500 mx-auto" />
          </motion.div>
        </div>

        <div className="relative">
          {/* Central Path */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5">
            <motion.div
              style={{ scaleY: pathLength, originY: 0 }}
              className="absolute inset-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
            />
            {/* Animated Light Pulse */}
            <motion.div
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 -translate-x-1/2 w-[3px] h-20 bg-gradient-to-b from-transparent via-white to-transparent blur-[2px]"
            />
          </div>

          <div className="space-y-60 relative">
            {TIMELINE_DATA.map((item, index) => (
              <TimelineSection key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ item, index }: { item: any; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yValue = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const yearOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.05, 0.05, 0]);

  // Color & Glow highlights based on scroll position
  const titleColor = useTransform(scrollYProgress, [0.35, 0.5, 0.65], ["#4b5563", "#ffffff", "#4b5563"]);
  const dateColor = useTransform(scrollYProgress, [0.4, 0.5, 0.6], ["#3b82f6", "#60a5fa", "#3b82f6"]);
  const labelColor = useTransform(scrollYProgress, [0.4, 0.5, 0.6], ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.1)"]);
  const orgOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0.3, 1, 0.3]);

  return (
    <div ref={sectionRef} className="relative min-h-[60vh] flex flex-col items-start md:items-center">
      {/* Sticky Background Year */}
      <motion.div
        style={{ opacity: yearOpacity }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <span className="text-[30vw] font-black text-white tracking-tighter select-none">
          {item.year}
        </span>
      </motion.div>

      <motion.div
        style={{ y: yValue, opacity: opacityValue }}
        className="relative z-10 w-full md:grid md:grid-cols-2 gap-16 md:gap-32"
      >
        {/* Date Panel */}
        <div className="flex md:justify-end items-center pl-12 md:pl-0 mb-8 md:mb-0">
          <div className="text-left md:text-right">
            <motion.span
              style={{ color: dateColor }}
              className="text-xs font-black tracking-[0.3em] block mb-2"
            >
              {item.fullDate}
            </motion.span>
            <motion.span
              style={{ color: labelColor }}
              className="text-4xl md:text-6xl font-bold italic"
            >
              {item.type === 'work' ? 'EXPERIENCE' : 'EDUCATION'}
            </motion.span>
          </div>
        </div>

        {/* Content Panel */}
        <div className="pl-12 md:pl-0">
          <div className="max-w-xl">
            <motion.h3
              style={{ color: titleColor }}
              className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-6 transition-colors duration-300"
            >
              {item.title}
            </motion.h3>
            <motion.div
              style={{ opacity: orgOpacity }}
              className="flex items-center gap-3 text-white font-medium text-sm tracking-widest uppercase mb-10"
            >
              <span>{item.org}</span>
              <div className="w-1 h-1 rounded-full bg-blue-500/50" />
              <span>{item.location}</span>
            </motion.div>

            <ul className="space-y-6">
              {item.points.map((point: string, i: number) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                  <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                    {point}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Center Anchor Point */}
      <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 mt-2 z-20">
        <div className="w-4 h-4 rounded-full bg-[#060606] border-2 border-blue-500/50 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6]" />
        </div>
      </div>
    </div>
  );
}
