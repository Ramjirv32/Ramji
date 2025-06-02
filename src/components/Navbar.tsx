import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa"; // Import the resume icon

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
  { name: "Contact", id: "contact" },];

const Navbar = ({ 
  activeSection, 
  setActiveSection, 
  isScrollingProgrammatically, 
  isProjectPage = false 
}: NavbarProps) => {
  const [active, setActive] = useState(activeSection || "Home");

  const handleNavClick = (item: string, id: string) => {
    setActive(item);
    
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
    <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md z-50 text-white flex items-center justify-between px-8 py-4">
      <div className="text-3xl font-bold">Ramji</div>

      <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        {navItems.map((item) => (
          <button
            key={item.name}
            data-section={item.id}
            onClick={() => handleNavClick(item.name, item.id)}
            className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              active === item.name || (activeSection && activeSection === item.id)
                ? "bg-white text-black shadow-[0_0_10px_white]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Replace the ⌘ symbol with a View Resume button */}
      <a
        href="/resume.pdf" // Replace with your actual resume file path
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:scale-105"
      >
        <FaFileAlt />
        <span className="font-medium">View Resume</span>
      </a>
    </nav>
  );
};

export default Navbar;
