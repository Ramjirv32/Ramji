import React, { useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Skills from "./components/skills"
// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Project';
import Work from './components/Works';
import Certificate from './components/certificate';
import Contact from './components/Contact';


import Pro1 from './components/compoPages/Projects/Pro1';
import Pro2 from './components/compoPages/Projects/Pro2';
import Pro3 from './components/compoPages/Projects/Pro3';
import Pro4 from './components/compoPages/Projects/Pro4';
import Pro5 from './components/compoPages/Projects/Pro5';

import Oodser from './components/compoPages/internships/Oodser';
import Menagalme from './components/compoPages/internships/Society';
import LuxorHoliday from './components/compoPages/internships/LuxorHoliday';
import Society from './components/compoPages/internships/Society'; // Create this component
import withScrollReset from './components/hoc/withScrollReset';

// Styles
import './App.css';
import './styles/globals.css';

// ScrollToTop component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top immediately when route changes
    window.scrollTo(0, 0);
  }, [pathname]); // Add pathname as dependency

  return null;
};

const Home = () => {
  const isScrollingProgrammatically = useRef(false);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;

      const sections = ["home", "about", "projects", "works", "certificate", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            // Update URL hash without causing scroll
            if (window.location.hash !== `#${section}`) {
              window.history.replaceState(null, '', `#${section}`);
            }
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar isScrollingProgrammatically={isScrollingProgrammatically} />
      <section id="home" className="min-h-screen">
        <Hero />
      </section>

      <section id="about" className="min-h-screen">
        <About />
      </section>

      <section id="projects" className="min-h-screen">
        <Projects />
      </section>

      <section id="works" className="min-h-screen">
        <Work />
      </section>
      <section id="skills" className="min-h-screen">
        <Skills />
      </section>

      <section id="certificate" className="min-h-screen">
        <Certificate />
      </section>

      <section id="contact" className="min-h-screen">
        <Contact />
      </section>
    </>
  );
};


const ScrollResetPro1 = withScrollReset(Pro1);
const ScrollResetPro2 = withScrollReset(Pro2);
const ScrollResetPro3 = withScrollReset(Pro3);
const ScrollResetPro4 = withScrollReset(Pro4);
const ScrollResetPro5 = withScrollReset(Pro5);
const ScrollResetLuxorHoliday = withScrollReset(LuxorHoliday);
const ScrollResetSociety = withScrollReset(Society);
const ScrollResetOodser = withScrollReset(Oodser);

const App = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/certifications" element={<Certificate />} />
          <Route path="/project/1" element={<ScrollResetPro1 />} />
          <Route path="/project/2" element={<ScrollResetPro2 />} />
          <Route path="/project/3" element={<ScrollResetPro3 />} />
          <Route path="/project/4" element={<ScrollResetPro4 />} />
          <Route path="/project/5" element={<ScrollResetPro5 />} />
          <Route path="/internship/society" element={<ScrollResetSociety />} />
          <Route path="/internship/oodser" element={<ScrollResetOodser />} />
          <Route path="/internship/luxor-holiday" element={<ScrollResetLuxorHoliday />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
