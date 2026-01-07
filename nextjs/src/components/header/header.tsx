"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";
// import FunnyThemeToggle from "../theme/funny-theme-toggle";

const navItems = [
  { name: "Home", link: "#hero", id: "hero" },
  // { name: "About", link: "#about", id: "about" },
  { name: "Skills", link: "#skills", id: "skills" },
  { name: "Projects", link: "#projects", id: "projects" },
  { name: "Works", link: "#works", id: "works" },
  { name: "Certifications", link: "#certifications", id: "certifications" },
  { name: "Contact", link: "#contact", id: "contact" },
];

const Header = () => {
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-detect active section on scroll
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        name: item.name,
        element: document.getElementById(item.id)
      }));

      const scrollPosition = window.scrollY + 100; // offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActive(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy(); // Run on mount

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Smooth scroll to section
  const handleNavClick = (item: typeof navItems[0]) => {
    setActive(item.name);
    setIsMenuOpen(false);

    const targetId = item.id;
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 text-zinc-950 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-zinc-100"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">

            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
              <div className="relative bg-zinc-100/80 border border-zinc-200 backdrop-blur-md rounded-full px-2 py-1.5 flex items-center space-x-1 shadow-sm">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap",
                      active === item.name
                        ? "bg-zinc-900 text-white shadow-md scale-105"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50"
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* <FunnyThemeToggle className="w-6 h-6" /> */}

              {/* Resume Button */}
              <a
                href="/com/Ramji.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex px-3 md:px-4 py-2 bg-transparent border-2 border-zinc-900 text-zinc-900 rounded-lg text-xs md:text-sm font-medium hover:bg-zinc-900 hover:text-white transition-all duration-300"
              >
                Resume
              </a>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-zinc-900 hover:text-zinc-600 focus:outline-none"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <span
                      className={cn(
                        "bg-zinc-900 h-0.5 w-full transform transition duration-300",
                        isMenuOpen ? "rotate-45 translate-y-2" : ""
                      )}
                    ></span>
                    <span
                      className={cn(
                        "bg-zinc-900 h-0.5 w-full transition duration-300",
                        isMenuOpen ? "opacity-0" : ""
                      )}
                    ></span>
                    <span
                      className={cn(
                        "bg-zinc-900 h-0.5 w-full transform transition duration-300",
                        isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                      )}
                    ></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 z-40 bg-zinc-100 dark:bg-black transition-all duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          )}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-200">
            <div className="text-xs font-medium bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 bg-clip-text text-transparent animate-pulse drop-shadow-sm">
              Learning again is learning deeper.
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md text-zinc-600 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white focus:outline-none"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6 text-zinc-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "block w-full text-left px-4 py-4 rounded-md text-base font-medium border-b border-zinc-300/50 dark:border-gray-800/50",
                  active === item.name
                    ? "text-zinc-900 bg-zinc-100 border-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                {item.name}
              </button>
            ))}
            <a
              href="/com/Ramji.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-4 rounded-md text-base font-medium border-b-2 border-zinc-900 text-zinc-900 bg-transparent hover:bg-zinc-100 transition-all duration-300"
            >
              📄 View Resume
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
