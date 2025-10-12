import { useRef, useEffect, useState, lazy, Suspense, memo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';

// Loading component for lazy-loaded routes
import Loading from './components/Loading';

// Critical components - load immediately
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import withScrollReset from './components/hoc/withScrollReset';

// Lazy load non-critical components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/skills'));
const Projects = lazy(() => import('./components/Project'));
const Work = lazy(() => import('./components/Works'));
const Certificate = lazy(() => import('./components/certificate'));
const Contact = lazy(() => import('./components/Contact'));
const ResearchPublications = lazy(() => import('./components/Research'));

// Lazy load project detail pages
const Pro1 = lazy(() => import('./components/compoPages/Projects/Pro1'));
const Pro2 = lazy(() => import('./components/compoPages/Projects/Pro2'));
const Pro3 = lazy(() => import('./components/compoPages/Projects/Pro3'));
const Pro4 = lazy(() => import('./components/compoPages/Projects/Pro4'));
const Pro5 = lazy(() => import('./components/compoPages/Projects/Pro5'));

// Lazy load internship pages
const Oodser = lazy(() => import('./components/compoPages/internships/Oodser'));
const Menagalme = lazy(() => import('./components/compoPages/internships/Society'));
const LuxorHoliday = lazy(() => import('./components/compoPages/internships/LuxorHoliday'));
const Society = lazy(() => import('./components/compoPages/internships/Society'));

// Styles
import './App.css';
import './styles/globals.css';
import './styles/animations.css';

// ScrollToTop component to handle scroll to top on route change
const ScrollToTop = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
});

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={<Loading />}>
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
        </Suspense>
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
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loading /></div>}>
        <div id="about"><About /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="works"><Work /></div>
        <div id="research"><ResearchPublications /></div>
        <div id="certificate"><Certificate /></div>
        <div id="contact" className="contact-mobile-margin"><Contact /></div>
      </Suspense>
    </div>
  );
};

// Create wrapped components with lazy loading and scroll reset
const createLazyScrollResetComponent = (LazyComponent: React.LazyExoticComponent<React.ComponentType<any>>) => {
  const Component = (props: any) => (
    <Suspense fallback={<Loading />}>
      {(() => {
        const WrappedComponent = withScrollReset(LazyComponent as any);
        return <WrappedComponent {...props} />;
      })()}
    </Suspense>
  );
  return Component;
};

const ScrollResetPro1 = createLazyScrollResetComponent(Pro1);
const ScrollResetPro2 = createLazyScrollResetComponent(Pro2);
const ScrollResetPro3 = createLazyScrollResetComponent(Pro3);
const ScrollResetPro4 = createLazyScrollResetComponent(Pro4);
const ScrollResetPro5 = createLazyScrollResetComponent(Pro5);
const ScrollResetLuxorHoliday = createLazyScrollResetComponent(LuxorHoliday);
const ScrollResetSociety = createLazyScrollResetComponent(Society);
const ScrollResetOodser = createLazyScrollResetComponent(Oodser);
const ScrollResetResearch = createLazyScrollResetComponent(ResearchPublications);

export default App;
