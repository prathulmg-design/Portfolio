import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Dock from "@/components/Dock";
import Contact from "@/components/Contact";
import Technologies from "@/components/Technologies";
import Blog from "@/components/Blog";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticCursor from "@/components/MagneticCursor";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white relative">
      <ScrollProgress />
      <MagneticCursor />
      <Hero />
      <Projects />
      <Technologies />
      <Blog />
      <Skills />
      <Timeline />
      <Dock />
      <Contact />
    </main>
  );
}
