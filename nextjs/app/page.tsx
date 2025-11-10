import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Skills from "@/app/components/Skills";
import Projects from "@/app/components/Projects";
import Works from "@/app/components/Works";
import Certificate from "@/app/components/Certificate";
import Contact from "@/app/components/Contact";
import Research from "@/app/components/Research";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <main className="w-full relative">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="works">
          <Works />
        </section>
        <section id="certificates">
          <Certificate />
        </section>
        <section id="research">
          <Research />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}
