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
  // const tiltY = useTransform(mouseX, [-300, 300], [-15, 15])

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
          <div className="h-1 w-20 bg-purple-600 mx-auto"></div>
        </div>

        {/* Content container - flexbox for side by side layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - About content */}
          <div className="w-full lg:w-2/5" data-aos="fade-right">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6" data-aos="fade-up">
                Full Stack Developer & Cloud Enthusiast
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed" data-aos="fade-up">
  My name is Ramji, and I am a Full Stack Developer currently pursuing B.E. CSE at KPRIET, set to graduate in 2027. There has
  always been a burning passion for creating new things and a constant urge to learn, which has driven me
  into the technology industry.
</p>

<p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4" data-aos="fade-up">
  I have experience in both frontend and backend development, and I am looking for more new opportunities.
</p>

<p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4" data-aos="fade-up">
  I love browsing for new tech or thinking about my next move. I am always ready for collaboration and new opportunities in web development and cloud technologies.
</p>


              <div className="flex flex-wrap gap-4 mt-8" data-aos="fade-up">
                {/* Fixed Get In Touch button with proper z-index */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition duration-300 relative z-20 pointer-events-auto"
                >
                  Get In Touch
                </motion.a>
                
                {/* Fixed View My Work button - removed negative z-index and added positive z-index */}
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  className="border border-purple-500 text-purple-500 px-6 py-2.5 rounded-lg font-medium hover:bg-purple-500/10 transition duration-300 relative z-20 pointer-events-auto"
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
              className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] cursor-grab active:cursor-grabbing"
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
                  <motion.img
                    src="/3.png"
                    alt="Computer Workstation"
                    className="w-full h-full object-contain  transition-all duration-300"
                    animate={
                      !hovering && !isDragging
                        ? {
                            y: [0, -15, 0],
                            rotateZ: [0, 2, 0, -2, 0],
                          }
                        : { y: 0, rotateZ: 0 }
                    }
                    transition={{
                      repeat: !hovering && !isDragging ? Number.POSITIVE_INFINITY : 0,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                  />

                  {/* 3D effect elements - IMPROVED DEPTH */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{ 
                      transform: "translateZ(-50px)", 
                      opacity: 0.5,
                      backfaceVisibility: "hidden" 
                    }}
                  >
                    {/* <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl"></div> */}
                  </div>
                </motion.div>

                {/* Enhanced glow effect that responds to hover and rotation - FIXED COLOR TRANSITIONS */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl -z-10 transition-all duration-300"
                  style={{
                    background: isDragging 
                      ? "rgba(59, 130, 246, 0.3)" 
                      : hovering 
                        ? "rgba(168, 85, 247, 0.3)" 
                        : "rgba(168, 85, 247, 0.2)",
                    transform: isDragging 
                      ? "scale(1.5)" 
                      : hovering 
                        ? "scale(1.25)" 
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
