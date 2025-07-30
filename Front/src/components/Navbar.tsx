import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaBars, FaTimes, FaUserLock } from "react-icons/fa"; // Add FaUserLock
import LoginModal from "./LoginModal"; // Import the LoginModal component

declare global {
  interface Window {
    closeProjectDetails?: () => void;
  }
}

// Define interface for Navbar props
interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isScrollingProgrammatically: { current: boolean };
}

// Define nav items with their corresponding section IDs or paths
const navItems = [
  { name: "Home", link: "/", id: "home" },
  { name: "About", link: "/#about", id: "about" },
  { name: "Skills", link: "/#skills", id: "skills" },
  { name: "Projects", link: "/#projects", id: "projects" },
  { name: "Works", link: "/#works", id: "works" },
  { name: "Research", link: "/#research", id: "research" },
  { name: "Certificates", link: "/#certificate", id: "certificate" },
  { name: "Contact", link: "/#contact", id: "contact" },
];

const Navbar = ({ 
  activeSection,
  setActiveSection,
  isScrollingProgrammatically 
}: NavbarProps) => {
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const loginStatus = sessionStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
  
  // Handle successful login
  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
  };
  
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

  // Update the handleNavClick function to ensure proper navigation
  const handleNavClick = (navItem: { name: string; link: string; id?: string; path?: string }) => {
    const { name, link, id, path } = navItem;
    setActive(name);
    setIsMenuOpen(false);
    
    // If the name is a section name (like "About", "Skills", etc.), convert it to lowercase for the section ID
    const sectionName = name.toLowerCase(); // This ensures section IDs match the lowercase format
    setActiveSection(sectionName); // Update active section using lowercase name

    // If path is provided, use it for navigation (like for Research page)
    if (path) {
      navigate(path);
      return;
    }

    // For hash-based navigation like /#about
    if (link.includes('#')) {
      const sectionId = link.split('#')[1];
      
      if (window.location.pathname !== '/') {
        // If not on home page, navigate to home with hash
        navigate(`/${link}`);
      } else {
        // If on home page, scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
          // If we're programmatically scrolling, set the flag
          if (isScrollingProgrammatically) {
            isScrollingProgrammatically.current = true;
          }
          
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
      }
    } else {
      // For regular paths like /research
      navigate(link);
    }
  };

  return (
    <>
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
            
            {/* Resume Button & Admin Login - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="/assets/ResumeR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:scale-105"
              >
                <FaFileAlt />
                <span className="font-medium">View Resume</span>
              </a>
              
              {/* Admin Login/Logout Button */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
                  title="Logout from admin mode"
                >
                  <FaUserLock />
                  <span className="font-medium">Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 hover:text-white transition-all duration-300"
                  title="Admin login"
                >
                  <FaUserLock />
                </button>
              )}
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
            
            {/* Admin Login Button - Mobile */}
            <div className="px-3 py-2">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
                >
                  <FaUserLock />
                  <span className="font-medium">Logout Admin</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all duration-300"
                >
                  <FaUserLock />
                  <span className="font-medium">Admin Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleSuccessfulLogin} 
      />
    </>
  );
};

export default Navbar;
