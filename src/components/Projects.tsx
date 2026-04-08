"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import ParallaxBackground from "./ParallaxBackground";
import AnimatedText from "./AnimatedText";

// Accurately represented from the Professional Resume
const projects = [
    {
        id: "wale-culinda",
        title: "Hospital Health Care Projects",
        category: "Healthcare Platform",
        description: "Healthcare privacy monitoring platform detecting suspicious activities and policy violations.",
        longDescription: "Developed a healthcare privacy monitoring platform to detect suspicious activities and policy violations. Implemented role-based access control (RBAC) to ensure secure handling of sensitive patient data. Built dynamic dashboards for real-time monitoring and compliance tracking while optimizing application performance using lazy loading techniques.",
        techStack: ["Angular", "RBAC", "Secure Data Handling", "Lazy Loading"],
        repo: "#",
        demo: "#",
        color: "from-blue-600/30 to-cyan-500/30",
        hoverColor: "group-hover:from-blue-600/50 group-hover:to-cyan-500/50",
        span: "md:col-span-2 md:row-span-2",
        mediaType: "image",
        mediaUrl: "https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        demoUrl: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "fethr-health",
        title: "VitalPoint Healthcare",
        category: "Medical Integrations",
        description: "Healthcare integration platform for secure patient data exchange using HL7.",
        longDescription: "Developed a healthcare integration platform enabling secure exchange of patient data using HL7 standards. Integrated webhooks and WebSocket for real-time data synchronization. Improved interoperability between hospitals and clinics and deployed applications using Docker for scalable environments.",
        techStack: ["React.js", "Bootstrap", "Webhooks", "WebSocket", "Docker"],
        repo: "#",
        demo: "#",
        color: "from-purple-600/30 to-pink-500/30",
        hoverColor: "group-hover:from-purple-600/50 group-hover:to-pink-500/50",
        span: "md:col-span-1 md:row-span-2",
        mediaType: "image",
        mediaUrl: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        demoUrl: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "adcb-hoa",
        title: "Dubai Based Bank Project",
        category: "Banking Solutions",
        description: "Fintech-enabled property management platform supporting secure financial operations.",
        longDescription: "Built a fintech-enabled property management platform supporting secure financial operations. Implemented role-based access control for different user levels. Integrated REST APIs and developed modular components for scalability, effectively enhancing system security and performance through an optimized architecture.",
        techStack: ["React.js", "REST APIs", "RBAC", "Component-Based Architecture"],
        repo: "#",
        demo: "#",
        color: "from-green-600/30 to-teal-500/30",
        hoverColor: "group-hover:from-green-600/50 group-hover:to-teal-500/50",
        span: "md:col-span-3 md:row-span-1",
        mediaType: "image",
        mediaUrl: "https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        demoUrl: "https://images.pexels.com/photos/7820428/pexels-photo-7820428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
];

function ProjectCard({ project, index, onSelect }: { project: typeof projects[0]; index: number; onSelect: () => void }) {
    const ref = useRef<HTMLDivElement>(null);

    // 3D Tilt effect on hover
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mousYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mousYSpring, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            layoutId={project.id}
            onClick={onSelect}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`group relative rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 bg-white/5 backdrop-blur-xl ${project.span}`}
            whileHover={{ scale: 1.02, y: -8 }}
        >
            <motion.img
                src={project.mediaUrl}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700"
                style={{ scale: useTransform(mouseXSpring, [-0.5, 0.5], [1.1, 1.15]) }}
            />

            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} ${project.hoverColor} transition-all duration-500 opacity-80 mix-blend-overlay`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent opacity-90" />

            <motion.div
                className="absolute inset-0 p-8 flex flex-col justify-end z-10"
                style={{ transform: "translateZ(50px)" }}
            >
                <motion.div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-bold tracking-widest uppercase text-blue-200 backdrop-blur-md mb-4 shadow-xl">
                        {project.category}
                    </span>
                    <h3 className="text-3xl font-extrabold text-white mb-3 tracking-tight group-hover:text-blue-200 transition-colors">{project.title}</h3>
                    <p className="text-gray-300 text-sm md:text-base line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {project.description}
                    </p>
                </motion.div>

                <div className="flex flex-wrap gap-2 mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {project.techStack.map(t => (
                        <span key={t} className="text-xs font-medium text-white/90 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md shadow-sm">
                            {t}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedProject = projects.find((p) => p.id === selectedId);

    return (
        <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="projects">
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium tracking-widest text-blue-300 uppercase mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Portfolio
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter">
                        <AnimatedText
                            text="Key Projects"
                            className="block"
                            animation="slide"
                        />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            & Innovation
                        </span>
                    </h2>
                    <motion.p
                        className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        A selection of enterprise-grade applications focusing on healthcare data security, financial platforms, and robust interoperability.
                    </motion.p>
                </motion.div>

                {/* Grid Layout with 3D Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[minmax(320px,auto)]"
                >
                    <AnimatePresence mode="popLayout">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onSelect={() => setSelectedId(project.id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Modal Detail View */}
                <AnimatePresence>
                    {selectedId && selectedProject && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-50 transition-all duration-500"
                            />
                            <div className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-auto p-4 md:p-8">
                                <motion.div
                                    layoutId={selectedId}
                                    className="bg-[#0f0f0f] w-full max-w-5xl h-[85vh] md:h-auto overflow-y-auto rounded-[2rem] border border-white/10 shadow-3xl relative scrollbar-hide flex flex-col md:flex-row"
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-6 right-6 z-20 p-3 bg-black/40 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/10 hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    { /* Image Pane */}
                                    <div className={`w-full md:w-2/5 min-h-[300px] md:min-h-[500px] relative overflow-hidden flex flex-col justify-end p-8`}>
                                        <img
                                            src={selectedProject.demoUrl || selectedProject.mediaUrl}
                                            alt={selectedProject.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-70"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} mix-blend-overlay opacity-90`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="relative z-10"
                                        >
                                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-widest text-blue-200 uppercase mb-4 border border-white/10 backdrop-blur-md">
                                                {selectedProject.category}
                                            </span>
                                            <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                                                {selectedProject.title}
                                            </h3>
                                        </motion.div>
                                    </div>

                                    {/* Detailed Content Pane */}
                                    <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#0f0f0f] flex flex-col justify-center">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                        >
                                            <h4 className="text-sm font-extrabold text-white/40 uppercase tracking-widest mb-4">Project Overview</h4>
                                            <p className="text-gray-300 leading-relaxed mb-10 text-lg md:text-xl font-light">
                                                {selectedProject.longDescription}
                                            </p>

                                            <div className="mb-12">
                                                <h4 className="text-sm font-extrabold text-white/40 uppercase tracking-widest mb-4">Technologies & Concepts</h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {selectedProject.techStack.map((tech, i) => (
                                                        <motion.span
                                                            key={tech}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.4 + (i * 0.05) }}
                                                            className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium text-gray-200 border border-white/5"
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
