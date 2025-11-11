"use client"

import { useState, useEffect } from "react"
import { useScroll } from "@/app/components/SmoothScroll"

interface NavbarProps {
  activeSection?: string
  setActiveSection?: (section: string) => void
  isScrollingProgrammatically?: { current: boolean }
}

const navItems = [
  { name: "Home", link: "#hero", id: "home" },
  { name: "About", link: "/#about", id: "about" },
  { name: "Skills", link: "/#skills", id: "skills" },
  { name: "Projects", link: "/#projects", id: "projects" },
  { name: "Works", link: "/#works", id: "works" },
  { name: "Certificates", link: "/#certificates", id: "certificates" },
  { name: "Research", link: "/#research", id: "research" },
  { name: "Contact", link: "/#contact", id: "contact" },
]

export default function Navbar({
  activeSection = "",
  setActiveSection = () => {},
  isScrollingProgrammatically,
}: NavbarProps) {
  const [active, setActive] = useState("Home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { handleClick } = useScroll()

  // Sync active state with activeSection prop
  useEffect(() => {
    const activeItem = navItems.find((item) => item.id === activeSection)
    if (activeItem) {
      setActive(activeItem.name)
    }
  }, [activeSection])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (navItem: { name: string; link: string; id?: string }) => {
    const { name, link, id } = navItem
    setActive(name)
    setIsMenuOpen(false)

    if (id) {
      setActiveSection(id)
    }

    if (link.includes("#")) {
      const sectionId = link.split("#")[1]
      const targetId = name === "Home" || sectionId === "hero" ? "home" : sectionId

      if (window.location.pathname !== "/") {
        window.location.href = `/${link}`
        return
      }

      // Use Lenis smooth scroll
      handleClick(targetId)
      window.history.pushState(null, "", `#${targetId}`)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full ${scrolled ? "bg-black/60" : "bg-black/30"} backdrop-blur-md z-50 text-white transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Ramji</div>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
              <div className="relative bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-2 py-1.5 flex items-center space-x-1 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    data-section={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                      active === item.name
                        ? "bg-white text-black shadow-[0_0_10px_white] scale-105"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <span
                      className={`bg-white h-0.5 w-full transform transition duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                    ></span>
                    <span
                      className={`bg-white h-0.5 w-full transition duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                    ></span>
                    <span
                      className={`bg-white h-0.5 w-full transform transition duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                    ></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
            <div className="text-2xl font-bold text-white">Ramji</div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md text-gray-300 hover:text-white focus:outline-none"
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.name}
                data-section={item.id}
                onClick={() => handleNavClick(item)}
                className={`block w-full text-left px-4 py-4 rounded-md text-base font-medium border-b border-gray-800/50 ${
                  active === item.name
                    ? "text-white bg-purple-800/30 border-purple-500/30"
                    : "text-gray-300 hover:bg-purple-900/20 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>


    </>
  )
}
