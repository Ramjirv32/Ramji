import StarsCanvas from './components/Animations/Star';
import HeroContent from './components/Hero';
import Navbar from './components/Navbar';
import "./App.css";
import "./styles/globals.css";
import Skills from './components/skills';
import About from './components/About';
import Project from "./components/Project";
import { useState, useEffect, useRef } from 'react';
import Contact from "./components/Contact";
import Certificate from './components/certificate';
// Import all project detail components
import Pro1 from "./components/compoPages/Projects/Pro1";
import Pro2 from "./components/compoPages/Projects/Pro2";
import Pro3 from "./components/compoPages/Projects/Pro3";
import Pro4 from "./components/compoPages/Projects/Pro4";
import Pro5 from "./components/compoPages/Projects/Pro5";
// Import the new Works component
import Works from './components/Works';

const App = () => {
  // Track active section for navigation
  const [activeSection, setActiveSection] = useState<string>('home');
  const isScrollingProgrammatically = useRef(false);
  
  // Add state for project detail viewing
  const [activeProject, setActiveProject] = useState<number | null>(null);

  // Set up the global navigation function
  useEffect(() => {
    // Add the global function with proper typing
    window.openProjectDetails = (index: number) => {
      console.log("🚀 App.tsx - Opening project:", index); // For debugging
      setActiveProject(index);
      
      // Scroll to top when showing project details
      window.scrollTo(0, 0);
      
      // Force a re-render by touching state slightly
      setTimeout(() => {
        setActiveProject(prev => {
          console.log("Re-confirming active project:", prev);
          return prev;
        });
      }, 100);
    };
    
    // Make the close function available globally
    window.closeProjectDetails = () => {
      console.log("🔙 App.tsx - Closing project details"); // For debugging
      setActiveProject(null);
    };

    // Clean up the global functions when component unmounts
    return () => {
      delete window.openProjectDetails;
      delete window.closeProjectDetails;
    };
  }, []);

  // If a project is active, show only that project
  if (activeProject !== null) {
    switch(activeProject) {
      case 0:
        return <Pro1 />;
      case 1:
        return <Pro2 />;
      case 2:
        return <Pro3 />;
      case 3:
        return <Pro4 />;
      case 4:
        return <Pro5 />;
      default:
        return null;
    }
  }

  // Normal layout when no project is selected
  return (
    <main className="min-h-screen w-full bg-[#030014] overflow-x-hidden pt-20"> 
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isScrollingProgrammatically={isScrollingProgrammatically}
      />
      <StarsCanvas />
      
      <section id="home" className="min-h-screen">
        <HeroContent />
      </section>
      
    
    
     
      
      <section id="about" className="min-h-screen">
        <About/>
      </section>

      <section id="projects" className="min-h-screen">
        <Project />
      </section>
      
      {/* Add Works section after Projects */}
      <section id="works" className="min-h-screen">
        <Works />
      </section>

      <section id="skills" className="min-h-screen">
        <Skills/>
      </section>
      
      {/* Add other sections */}

      <section id="certificate" className="min-h-screen">
        <Certificate/>
      </section>

      
      <section id="contact" className="min-h-screen">
        <Contact/>
      </section>
     
    </main>
  )
}

// Add type definitions for the global window object
declare global {
  interface Window {
    openProjectDetails?: (index: number) => void;
    closeProjectDetails?: () => void;
  }
}

export default App;

// In your Navbar.tsx file, update the navItems array
// const navItems = [
//   { name: "Home", id: "home" },
//   { name: "Projects", id: "projects" },
//   { name: "Works", id: "works" },  // Add this new item
//   { name: "Skills", id: "skills" },
//   { name: "Certifications", id: "certificate" },
//   { name: "Contact", id: "contact" },
// ];
