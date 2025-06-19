import React, { useState, useEffect } from "react";
import { FaFileAlt, FaBars, FaTimes } from "react-icons/fa"; // Import additional icons

// Define interface for Navbar props to handle project page navigation
interface NavbarProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  isScrollingProgrammatically?: React.MutableRefObject<boolean>;
  isProjectPage?: boolean;
}

// Define nav items with their corresponding section IDs
const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Certifications", id: "certificate" },
  { name: "Contact", id: "contact" },
];

const Navbar = ({ 
  activeSection, 
  setActiveSection, 
  isScrollingProgrammatically, 
  isProjectPage = false 
}: NavbarProps) => {
  const [active, setActive] = useState(activeSection || "Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll to change navbar background opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: string, id: string) => {
    setActive(item);
    setIsMenuOpen(false); // Close mobile menu when clicking an item
    
    // If on a project page, first return to main page
    if (isProjectPage) {
      if (typeof window.closeProjectDetails === 'function') {
        window.closeProjectDetails();
        // After going back to main page, add a timeout to ensure navigation after render
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // If we don't have the close function, use URL hash
        window.location.href = '/#' + id;
      }
      return;
    }

    // Update active section if prop is available
    if (setActiveSection) {
      setActiveSection(id);
    }
    
    // If we're programmatically scrolling, set the flag
    if (isScrollingProgrammatically) {
      isScrollingProgrammatically.current = true;
    }
    
    // Get the element by ID
    const element = document.getElementById(id);
    
    // Scroll to the element if it exists
    if (element) {
      // Offset for navbar height
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Reset the flag after animation completes
      if (isScrollingProgrammatically) {
        setTimeout(() => {
          isScrollingProgrammatically.current = false;
        }, 1000);
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full ${scrolled ? 'bg-black/60' : 'bg-black/30'} backdrop-blur-md z-50 text-white transition-all duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="text-2xl md:text-3xl font-bold">Ramji</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  data-section={item.id}
                  onClick={() => handleNavClick(item.name, item.id)}
                  className={`relative px-3 py-2 text-sm rounded-full transition-all duration-300 ${
                    active === item.name || (activeSection && activeSection === item.id)
                      ? "bg-white text-black shadow-[0_0_10px_white]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Resume Button - Desktop */}
          <div className="hidden md:block">
            <a
              href="/assets/ResumeR.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:scale-105"
            >
              <FaFileAlt />
              <span className="font-medium">View Resume</span>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          <div className="text-2xl font-bold text-white">Ramji</div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md text-gray-300 hover:text-white focus:outline-none"
          >
            <span className="sr-only">Close menu</span>
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              data-section={item.id}
              onClick={() => handleNavClick(item.name, item.id)}
              className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium border-b border-gray-800 ${
                active === item.name || (activeSection && activeSection === item.id)
                  ? "text-white bg-purple-800/30"
                  : "text-gray-300 hover:bg-purple-900/20 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
          
          {/* Resume Button - Mobile */}
          <div className="px-3 py-4">
            <a
              href="/assets/ResumeR.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaFileAlt />
              <span className="font-medium">View Resume</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
