import StarsCanvas from './components/Animations/Star';
import HeroContent from './components/Hero';
import Navbar from './components/Navbar';
import "./App.css"
import "./styles/globals.css"
import Skills from './components/skills';
import About from './components/About';
import Page from "./components/Project-page"
import Certificate from "./components/Project"
import { useEffect, useState, useRef } from 'react';
import Contact from "./components/Contact"
import Pro1 from "./components/compoPages/Projects/Pro1"
const App = () => {
  // Track active section to avoid unnecessary clicks
  const [activeSection, setActiveSection] = useState<string>('home');
  const isScrollingProgrammatically = useRef(false);

  // Effect to handle active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Skip if we're programmatically scrolling to avoid loops
      if (isScrollingProgrammatically.current) return;

      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 150; // Adding offset for navbar

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Only update if this is a different section
          if (activeSection !== sectionId) {
            setActiveSection(sectionId);
            
            // Update navbar visually without triggering scroll
            const navItems = document.querySelectorAll('nav button');
            navItems.forEach(item => {
              // Get the data-section attribute value
              const itemSection = (item as HTMLElement).dataset.section;
              if (itemSection === sectionId) {
                // Update visual state without clicking
                item.classList.add('active-nav-item');
              } else {
                item.classList.remove('active-nav-item');
              }
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <main className="min-h-screen w-full bg-[#030014] overflow-x-hidden pt-20"> 
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isScrollingProgrammatically={isScrollingProgrammatically}
      />
      <StarsCanvas />
      
      {/* Home section */}
      <section id="home" className="min-h-screen">
        <HeroContent />
      </section>
      
      {/* Skills section - moved to correct position */}
      <section id="skills" className="min-h-screen">
        <Skills/>
      </section>
    
      {/* Projects section */}
      <section id="projects" className="min-h-screen">
        <Page/>
      </section>
      
      {/* About section */}
      <section id="about" className="min-h-screen">
        <About/>
      </section>
      
      {/* Contact section */}
      <section id="contact" className="min-h-screen">
        <Certificate/>
      </section>

      <section id="book-call" className="h-1000px">
        {/* Add your booking component here when ready */}
        <div className="flex items-center justify-center h-1/2">
       
        </div>
      </section>
      
      <section id="contact" className="min-h-screen">
        <Contact/>
      </section>
      <Pro1/>

      
      {/* Book a Call section */}
    
      
    </main>
  )
}

export default App
