import  { useRef, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/skills';
import Projects from './components/Project';
import Work from './components/Works';
import Certificate from './components/certificate';
import Contact from './components/Contact';
import ResearchPublications from "./components/Research";

import Pro1 from './components/compoPages/Projects/Pro1';
import Pro2 from './components/compoPages/Projects/Pro2';
import Pro3 from './components/compoPages/Projects/Pro3';
import Pro4 from './components/compoPages/Projects/Pro4';
import Pro5 from './components/compoPages/Projects/Pro5';

import Oodser from './components/compoPages/internships/Oodser';
import Menagalme from './components/compoPages/internships/Society';
import LuxorHoliday from './components/compoPages/internships/LuxorHoliday';
import Society from './components/compoPages/internships/Society';
import withScrollReset from './components/hoc/withScrollReset';

// Styles
import './App.css';
import './styles/globals.css';
import './styles/animations.css';

// ScrollToTop component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
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
          <Route path="/research" element={<ScrollResetResearch />} />
          <Route path="/internship/society" element={<ScrollResetSociety />} />
          <Route path="/internship/oodser" element={<ScrollResetOodser />} />
          <Route path="/internship/luxor-holiday" element={<ScrollResetLuxorHoliday />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
};

// Updated Home component with improved scroll detection
const Home = () => {
  const isScrollingProgrammatically = useRef(false);
  const [currentSection, setCurrentSection] = useState<string>('home');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;

      const sections = ["home", "about", "skills", "projects", "works", "research", "certificate", "contact"];
      const navbarHeight = 80; // Height of your navbar
      const scrollPosition = window.scrollY + navbarHeight + 50; // Add some offset for better detection
      
      let activeSection = 'home'; // Default to home

      // Check each section to find which one is currently in view
      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionStart = offsetTop;
          const sectionEnd = offsetTop + offsetHeight;
          
          // Check if scroll position is within this section
          if (scrollPosition >= sectionStart && scrollPosition < sectionEnd) {
            activeSection = sections[i];
            break;
          }
          
          // Special case for the last section (contact)
          if (i === sections.length - 1 && scrollPosition >= sectionStart) {
            activeSection = sections[i];
            break;
          }
        }
      }

      // Only update if the section has actually changed
      if (activeSection !== currentSection) {
        setCurrentSection(activeSection);
        
        // Update URL hash without causing scroll
        const newHash = `#${activeSection}`;
        if (window.location.hash !== newHash) {
          window.history.replaceState(null, '', newHash);
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [currentSection]); // Add currentSection as dependency

  // Handle hash changes from direct URL access
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== currentSection) {
        setCurrentSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check initial hash
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentSection]);

  return (
    <div>
      <Navbar
        activeSection={currentSection}
        setActiveSection={setCurrentSection}
        isScrollingProgrammatically={isScrollingProgrammatically}
      />
      {/* Make sure each section has the correct ID attribute */}
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
      <div id="works"><Work /></div>
      <div id="research"><ResearchPublications /></div>
      <div id="certificate"><Certificate /></div>
      <div id="contact" className="contact-mobile-margin"><Contact /></div>
    </div>
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
const ScrollResetResearch = withScrollReset(ResearchPublications);

export default App;
