import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaBars, FaTimes } from "react-icons/fa"; // Import additional icons

declare global {
  interface Window {
    closeProjectDetails?: () => void;
  }
}

// Define interface for Navbar props
interface NavbarProps {
  isScrollingProgrammatically?: React.MutableRefObject<boolean>;
}

// Define nav items with their corresponding section IDs or paths
const navItems = [
  { name: "Home", id: "home", path: "/" },
  { name: "About", id: "about", path: "/#about" },
  { name: "Projects", id: "projects", path: "/#projects" },
  { name: "Internships", id: "works", path: "/#works" },
  { name: "Skills", id: "skills", path: "/#skills" },
  { name: "Certifications", id: "certificate", path: "/#certificate" },
  { name: "Contact", id: "contact", path: "/#contact" },
];

const Navbar = ({ 
  isScrollingProgrammatically 
}: NavbarProps = {}) => {
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
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

  const handleNavClick = (navItem: { name: string; id: string; path?: string }) => {
    const { name, id, path } = navItem;
    setActive(name);
    setIsMenuOpen(false);

    // If path is provided, use it for navigation
    if (path) {
      if (path.startsWith('/#')) {
        // Handle hash-based navigation
        if (window.location.pathname !== '/') {
          // If not on home page, navigate to home with hash
          navigate(`/${path.substring(1)}`);
        } else {
          // If already on home page, scroll to section
          const sectionId = path.substring(2);
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        // Handle regular path navigation
        navigate(path);
      }
      return;
    }

    // If no path but has ID, try to scroll to section
    if (id) {
      if (window.location.pathname !== '/') {
        // If not on home page, navigate to home with hash
        navigate(`/#${id}`);
      } else {
        // If on home page, scroll to section
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
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
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3 py-2 text-sm rounded-full transition-all duration-300 ${
                    active === item.name
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
              onClick={() => handleNavClick(item)}
              className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium border-b border-gray-800 ${
                active === item.name
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
