"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { handleClick } = useScroll()

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000'

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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    setLoginLoading(true)

    try {
      console.log('Attempting login with:', { email: loginEmail })
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      const data = await response.json()
      console.log('Login response:', data)

      if (response.ok && data.role === 'admin') {
        localStorage.setItem('adminAuth', JSON.stringify({
          email: loginEmail,
          role: data.role,
          userId: data.userId
        }))
        setShowLoginModal(false)
        router.push('/admin')
      } else {
        setLoginError(data.message || 'Invalid credentials')
      }
    } catch (error) {
      setLoginError('Login failed. Please check your connection.')
      console.error('Login error:', error)
    } finally {
      setLoginLoading(false)
    }
  }

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
              {/* Login icon (small) */}
              <button
                onClick={() => setShowLoginModal(true)}
                aria-label="Login"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-white hover:bg-white/10 hover:text-white transition"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 0115 0" />
                </svg>
              </button>

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
                onClick={() => {
                  setShowLoginModal(true)
                  setIsMenuOpen(false)
                }}
                aria-label="Login"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-white hover:bg-white/10 transition"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 0115 0" />
                </svg>
              </button>
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#151030] rounded-2xl shadow-2xl border border-[#00BFFF]/30 p-8 max-w-md w-full relative">
            {/* Close button */}
            <button
              onClick={() => {
                setShowLoginModal(false)
                setLoginError("")
                setLoginEmail("")
                setLoginPassword("")
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00BFFF]/20 rounded-full mb-4">
                <svg className="w-8 h-8 text-[#00BFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
              <p className="text-gray-400">Access the admin dashboard</p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm text-center">{loginError}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#1a1443] text-white pl-12 pr-4 py-3 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none transition-colors"
                    placeholder=""
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#1a1443] text-white pl-12 pr-12 py-3 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#00BFFF] hover:bg-[#0099CC] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? 'Logging in...' : 'Login to Dashboard'}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                Admin access is restricted to authorized personnel only
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
