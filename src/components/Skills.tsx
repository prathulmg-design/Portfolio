"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxBackground from "./ParallaxBackground";
import AnimatedText from "./AnimatedText";
import FloatingParticles from "./FloatingParticles";

const skills = [
  {
    category: "Frontend Technologies",
    items: ["React.js", "Next.js", "Angular", "TypeScript", "JavaScript (ES6+)", "Component-Based Architecture", "Redux", "React Query"],
  },
  {
    category: "UI & UX",
    items: ["UI/UX Principles", "Accessibility (a11y)", "Cross-Browser Compatibility", "Web Performance Optimization"],
  },
  {
    category: "Development & Testing",
    items: ["Server-Side Rendering (SSR)", "Static Site Generation (SSG)", "RESTful APIs", "Jest", "React Testing Library"],
  },
];

const aiExperience = [
  "Utilized ChatGPT, Gemini, Claude, SWE-Qwen, and Cursor for code generation, debugging, and optimization.",
  "Assisted in test case creation, documentation, and code refactoring using AI-assisted development tools.",
  "Participated in AI-driven code reviews, testing, and bug fixing to ensure production-ready releases.",
  "Worked with Hugging Face libraries for exploring machine learning and NLP-based solutions."
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParticles = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scaleAI = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.9, 1, 1]);
  const rotateSkills = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={containerRef} className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="skills">
      {/* Floating Particles */}
      <FloatingParticles count={40} />

      {/* Parallax Background Layers */}
      <ParallaxBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium tracking-widest text-purple-300 uppercase mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Expertise
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter">
            <AnimatedText
              text="Technical Toolkit"
              className="block"
              animation="slide"
            />
          </h2>
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A battle-tested stack focused on building performant, accessible, and scalable frontend experiences.
          </motion.p>
        </motion.div>

        {/* AI & LLM Experience - Highlighted Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: scaleAI }}
          className="mb-16 relative p-1 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 blur-xl opacity-30"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="bg-[#0a0a0a] rounded-[23px] p-8 md:p-12 relative z-10 h-full w-full">
            <h3 className="text-3xl font-bold font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-6 flex items-center gap-4">
              AI & LLM Experience
              <motion.svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </motion.svg>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiExperience.map((point, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 text-gray-300 leading-relaxed font-light text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <motion.span
                    className="text-blue-500 mt-1.5 opacity-80 shrink-0"
                    whileHover={{ scale: 1.3, rotate: 180 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </motion.span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Core Skills Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          style={{ rotateX: rotateSkills }}
        >
          {skills.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all shadow-xl group"
            >
              <h3 className="text-xl font-bold tracking-widest text-white/60 mb-8 uppercase group-hover:text-blue-300 transition-colors">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    className="px-4 py-2 bg-black/40 rounded-xl text-sm font-medium text-gray-300 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 hover:-translate-y-1 hover:text-white transition-all cursor-default shadow-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + sIdx * 0.03 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra: Certifications & Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-md"
            whileHover={{ y: -5, scale: 1.01 }}
          >
            <h3 className="text-lg font-bold tracking-widest text-purple-400 mb-6 uppercase">Certifications</h3>
            <ul className="space-y-4 text-gray-300">
              {["Certification in JavaScript Development", "Certified Agile Scrum Master"].map((cert, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
                    whileHover={{ scale: 1.5 }}
                  />
                  {cert}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-bl from-white/5 to-white/0 border border-white/10 backdrop-blur-md"
            whileHover={{ y: -5, scale: 1.01 }}
          >
            <h3 className="text-lg font-bold tracking-widest text-blue-400 mb-6 uppercase">Methodologies & Languages</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              {["Agile / Scrum", "CI / CD Pipelines"].map((item, i) => (
                <motion.span
                  key={i}
                  className="px-4 py-2 rounded-full bg-white/5 text-sm text-gray-300 border border-white/10"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
            <p className="text-gray-400 text-sm italic">
              English (Professional) • Malayalam (Native) • Hindi (Professional)
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
