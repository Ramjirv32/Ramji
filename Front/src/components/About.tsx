"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import AOS from "aos"
import "aos/dist/aos.css"
import { FaMapMarkerAlt } from "react-icons/fa"

const About = () => {
  const [showLocation, setShowLocation] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const rotationRef = useRef(0)
  const currentRotationRef = useRef(0)

  // Motion values for tracking mouse position and rotation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotationY = useMotionValue(0)

  // Transform mouse position to rotation values for tilt effect
  const tiltX = useTransform(mouseY, [-300, 300], [15, -15])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    })
  }, [])

  // Handle mouse move for 3D rotation - FIXED
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate mouse position relative to container center
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)

    // Handle 360-degree rotation when dragging - IMPROVED SENSITIVITY
    if (isDragging) {
      const deltaX = e.clientX - startXRef.current
      const newRotation = rotationRef.current + deltaX * 0.8 // Increased sensitivity for more noticeable rotation

      // Update rotation (allows for continuous rotation beyond 360 degrees)
      rotationY.set(newRotation)
      currentRotationRef.current = newRotation
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || !isDragging) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - startXRef.current
    const newRotation = rotationRef.current + deltaX * 0.8
    
    rotationY.set(newRotation)
    currentRotationRef.current = newRotation
    
    // Prevent default touch behavior to avoid scrolling while rotating
    e.preventDefault()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    setIsDragging(true)
    startXRef.current = e.clientX
    rotationRef.current = currentRotationRef.current

    // Prevent text selection during drag
    document.body.style.userSelect = "none"
  }
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    
    setIsDragging(true)
    startXRef.current = e.touches[0].clientX
    rotationRef.current = currentRotationRef.current
    
    document.body.style.userSelect = "none"
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    document.body.style.userSelect = ""
  }
  
  const handleTouchEnd = () => {
    setIsDragging(false)
    document.body.style.userSelect = ""
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHovering(false)
    setIsDragging(false)
    document.body.style.userSelect = ""
  }

  // Add global mouse up event to handle cases where mouse is released outside the container
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        document.body.style.userSelect = ""
      }
    }
    
    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false)
        document.body.style.userSelect = ""
      }
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    window.addEventListener("touchend", handleGlobalTouchEnd)
    
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp)
      window.removeEventListener("touchend", handleGlobalTouchEnd)
    }
  }, [isDragging])

  // Add direct CSS styles to ensure 3D transforms work correctly
  useEffect(() => {
    if (containerRef.current) {
      // Force proper 3D context
      containerRef.current.style.perspective = "1500px"
    }
  }, [])

  return (
    <section id="about" className="w-full py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="h-1 w-20 bg-[#00BFFF] mx-auto"></div>
        </div>

        {/* Content container - flexbox for side by side layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - About content */}
          <div className="w-full lg:w-2/5" data-aos="fade-right">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6" data-aos="fade-up">
                Full Stack Developer, Cloud & AI/ML Enthusiast
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed" data-aos="fade-up">
                My name is Ramji, and I am a Full Stack Developer currently pursuing B.E. CSE at KPRIET, set to graduate in 2027. There has
                always been a burning passion for creating new things and a constant urge to learn, which has driven me
                into the technology industry.
              </p>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4" data-aos="fade-up">
                I have experience in both frontend and backend development, with a growing expertise in DevOps and cloud technologies. As a Red Hat Linux Administrator, I'm proficient in managing Linux systems and building robust infrastructures.
              </p>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4" data-aos="fade-up">
                With a keen interest in Artificial Intelligence and Machine Learning, I'm exploring how these technologies can be integrated into modern web applications to create intelligent, data-driven solutions. I love working with cloud platforms, containerization, automation tools, and AI/ML frameworks.
              </p>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4" data-aos="fade-up">
                I'm always ready for collaboration and new opportunities in web development, cloud technologies, DevOps practices, and AI/ML innovations.
              </p>

              <div className="flex flex-wrap gap-4 mt-8" data-aos="fade-up">
                {/* Fixed Get In Touch button with proper z-index */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-[#00BFFF]/25 transition duration-300 relative z-20 pointer-events-auto"
                >
                  Get In Touch
                </motion.a>
                
                {/* Fixed View My Work button - removed negative z-index and added positive z-index */}
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  className="border border-[#00BFFF] text-[#00BFFF] px-6 py-2.5 rounded-lg font-medium hover:bg-[#00BFFF]/10 transition duration-300 relative z-20 pointer-events-auto"
                >
                  View My Work
                </motion.a>
              </div>

              {/* Location popup */}
              <AnimatePresence>
                {showLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-4 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-purple-500/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500 rounded-full p-2">
                        <FaMapMarkerAlt className="text-white text-lg" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Chennai, India</h4>
                        <p className="text-gray-300 text-sm">13.0827° N, 80.2707° E</p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-300">
                      Based in Chennai, a tech hub known for its vibrant IT industry and cultural heritage.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - Computer Image with Enhanced 3D Effect - FIXED ROTATION */}
          <motion.div
            className="w-full lg:w-3/5 flex justify-center"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2 }}
            data-aos="fade-left"
          >
            {/* 3D effect container with mouse tracking */}
            <motion.div
              ref={containerRef}
              className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] cursor-grab active:cursor-grabbing"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleTouchEnd}
              style={{
                perspective: "1500px", // Explicitly set perspective as inline style
              }}
            >
              {/* 3D rotating container - FIXED STYLES */}
              <motion.div
                className="w-full h-full relative"
                style={{
                  rotateX: hovering && !isDragging ? tiltX : 0,
                  rotateY: rotationY, // This applies the 360 rotation
                  transformStyle: "preserve-3d", // Explicitly set this as inline style
                  transform: "translateZ(0)", // Force GPU acceleration
                  backfaceVisibility: "visible", // Make sure backface is visible for full 360 effect
                }}
              >
                {/* Image with enhanced shadow effect */}
                <motion.div className="w-full h-full relative">
                  {/* Circular frame with image */}
                  <div className="relative w-full h-full max-w-[450px] max-h-[450px] mx-auto">
                    {/* Enhanced outer glow and shadow effect */}
                    <div 
                      className="absolute -inset-4 rounded-full blur-xl -z-10"
                      style={{
                        background: "radial-gradient(circle, rgba(0,191,255,0.4) 0%, rgba(0,100,255,0.1) 60%, transparent 80%)",
                        boxShadow: "0 0 40px rgba(0,191,255,0.3)",
                      }}
                    ></div>
                    
                    {/* Deeper shadow for 3D effect */}
                    <div 
                      className="absolute -inset-2 rounded-full blur-2xl -z-20"
                      style={{
                        background: "radial-gradient(circle, rgba(0,30,60,0.6) 0%, transparent 70%)",
                        transform: "translateY(10px)",
                      }}
                    ></div>

                    {/* Black background circle */}
                    <div className="absolute inset-0 rounded-full bg-black"></div>
                    
                    {/* Glowing border */}
                    <div 
                      className="absolute inset-0 rounded-full -z-5"
                      style={{
                        border: "3px solid rgba(0,191,255,0.5)",
                        boxShadow: "inset 0 0 20px rgba(0,191,255,0.5), 0 0 15px rgba(0,191,255,0.5)",
                        filter: "brightness(1.2)"
                      }}
                    ></div>
                    
                    {/* Image container with reduced padding to fill more of the circle */}
                    <div className="absolute inset-[12px] overflow-hidden rounded-full border-[4px] border-black">
                      {/* Position the image to ensure it covers the entire circular area */}
                      <div className="w-full h-full relative">
                        <motion.img
                          src="/personal/r3.png"
                          alt="Ramji" 
                          className="w-full h-full object-cover absolute inset-0"
                          style={{
                            objectPosition: "center", // Center the image
                          }}
                          animate={
                            !hovering && !isDragging
                              ? {
                                  scale: [1, 1.03, 1],
                                }
                              : { scale: 1 }
                          }
                          transition={{
                            repeat: !hovering && !isDragging ? Number.POSITIVE_INFINITY : 0,
                            duration: 5,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Blue glowing ring effect */}
                    <div 
                      className="absolute -inset-1 rounded-full z-5 opacity-75"
                      style={{
                        border: "2px solid rgba(0,191,255,0.7)",
                        filter: "blur(3px)",
                        animation: "pulseGlow 3s infinite"
                      }}
                    ></div>
                  </div>

                  {/* 3D effect elements - IMPROVED DEPTH */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{ 
                      transform: "translateZ(-50px)", 
                      opacity: 0.5,
                      backfaceVisibility: "hidden" 
                    }}
                  >
                  </div>
                </motion.div>

                {/* Enhanced glow effect that responds to hover and rotation - FIXED COLOR TRANSITIONS */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl -z-10 transition-all duration-300"
                  style={{
                    background: isDragging 
                      ? "rgba(0, 191, 255, 0.25)" // Slightly reduced opacity
                      : hovering 
                        ? "rgba(0, 191, 255, 0.2)" // Reduced opacity
                        : "rgba(0, 191, 255, 0.15)", // Reduced base opacity
                    transform: isDragging 
                      ? "scale(1.3)" // Reduced scale to better frame personal photo
                      : hovering 
                        ? "scale(1.2)" // Reduced scale
                        : "scale(1)"
                  }}
                />
              </motion.div>

              {/* Drag indicator - IMPROVED VISIBILITY */}
              {isDragging && (
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 text-white text-sm py-2 px-4 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Rotating: {Math.round(((currentRotationRef.current % 360) + 360) % 360)}°
                </motion.div>
              )}

              <motion.div
                className="absolute cursor-pointer z-10"
                style={{ top: "35%", right: "35%" }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                onClick={(e) => {
                  e.stopPropagation() 
                  setShowLocation(!showLocation)
                }}
              >
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
