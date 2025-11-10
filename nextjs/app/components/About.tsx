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

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotationY = useMotionValue(0)

  const tiltX = useTransform(mouseY, [-300, 300], [15, -15])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    })
  }, [])


  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)

    if (isDragging) {
      const deltaX = e.clientX - startXRef.current
      const newRotation = rotationRef.current + deltaX * 0.8

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
    
    e.preventDefault()
  }


  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    setIsDragging(true)
    startXRef.current = e.clientX
    rotationRef.current = currentRotationRef.current

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

  const handleMouseLeave = () => {
    setHovering(false)
    setIsDragging(false)
    document.body.style.userSelect = ""
  }

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.perspective = "1500px"
    }
  }, [])

  return (
    <section id="about" className="w-full py-20 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="h-1 w-20 bg-[#00BFFF] mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-full">
          <div className="w-full lg:w-2/5 px-2 max-w-full">
            <div className="space-y-4 max-w-full overflow-hidden">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                Full Stack Developer, Cloud & AI/ML Enthusiast
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                My name is Ramji, and I am a Full Stack Developer currently pursuing B.E. CSE at KPRIET, set to graduate in 2027. There has
                always been a burning passion for creating new things and a constant urge to learn, which has driven me
                into the technology industry.
              </p>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4">
                I have experience in both frontend and backend development, with a growing expertise in DevOps and cloud technologies. As a Red Hat Linux Administrator, I'm proficient in managing Linux systems and building robust infrastructures.
              </p>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4">
                With a keen interest in Artificial Intelligence and Machine Learning, I'm exploring how these technologies can be integrated into modern web applications to create intelligent, data-driven solutions. I love working with cloud platforms, containerization, automation tools, and AI/ML frameworks.
              </p>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4">
                I'm always ready for collaboration and new opportunities in web development, cloud technologies, DevOps practices, and AI/ML innovations.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium shadow-lg hover:shadow-[#00BFFF]/25 transition duration-300 relative z-20 pointer-events-auto text-sm sm:text-base"
                >
                  Get In Touch
                </motion.a>
                
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  className="border border-[#00BFFF] text-[#00BFFF] px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-[#00BFFF]/10 transition duration-300 relative z-20 pointer-events-auto text-sm sm:text-base"
                >
                  View My Work
                </motion.a>
              </div>

              <AnimatePresence>
                {showLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-purple-500/50 max-w-full"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500 rounded-full p-2 flex-shrink-0">
                        <FaMapMarkerAlt className="text-white text-base sm:text-lg" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-white text-sm sm:text-base">Chennai, India</h4>
                        <p className="text-gray-300 text-xs sm:text-sm">13.0827° N, 80.2707° E</p>
                      </div>
                    </div>
                    <div className="mt-3 text-xs sm:text-sm text-gray-300">
                      Based in Chennai, a tech hub known for its vibrant IT industry and cultural heritage.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="w-full lg:w-3/5 flex justify-center px-2 overflow-hidden"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2 }}
            data-aos="fade-left"
          >
            <motion.div
              ref={containerRef}
              className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] cursor-grab active:cursor-grabbing max-w-full"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleTouchEnd}
              style={{
                perspective: "1500px",
              }}
            >
              <motion.div
                className="w-full h-full relative"
                style={{
                  rotateX: hovering && !isDragging ? tiltX : 0,
                  rotateY: rotationY,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(0)",
                  backfaceVisibility: "visible",
                }}
              >
                <motion.div className="w-full h-full relative">
                  <div className="relative w-full h-full max-w-[400px] max-h-[400px] mx-auto">
                    <div 
                      className="absolute -inset-3 sm:-inset-4 rounded-full blur-xl -z-10"
                      style={{
                        background: "radial-gradient(circle, rgba(0,191,255,0.4) 0%, rgba(0,100,255,0.1) 60%, transparent 80%)",
                        boxShadow: "0 0 40px rgba(0,191,255,0.3)",
                      }}
                    ></div>
                    
                    <div 
                      className="absolute -inset-2 rounded-full blur-2xl -z-20"
                      style={{
                        background: "radial-gradient(circle, rgba(0,30,60,0.6) 0%, transparent 70%)",
                        transform: "translateY(10px)",
                      }}
                    ></div>

                    <div className="absolute inset-0 rounded-full bg-black"></div>
                    
                    <div 
                      className="absolute inset-0 rounded-full -z-5"
                      style={{
                        border: "3px solid rgba(0,191,255,0.5)",
                        boxShadow: "inset 0 0 20px rgba(0,191,255,0.5), 0 0 15px rgba(0,191,255,0.5)",
                        filter: "brightness(1.2)"
                      }}
                    ></div>
                    
                    <div className="absolute inset-[12px] overflow-hidden rounded-full border-[4px] border-black">
                      <div className="w-full h-full relative">
                        <motion.img
                          src="/h/r3.webp"
                          alt="Ramji" 
                          className="w-full h-full object-cover absolute inset-0"
                          style={{
                            objectPosition: "center",
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
                    
                    <div 
                      className="absolute -inset-1 rounded-full z-5 opacity-75"
                      style={{
                        border: "2px solid rgba(0,191,255,0.7)",
                        filter: "blur(3px)",
                        animation: "pulseGlow 3s infinite"
                      }}
                    ></div>
                  </div>

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

                <div
                  className="absolute inset-0 rounded-full blur-3xl -z-10 transition-all duration-300"
                  style={{
                    background: isDragging 
                      ? "rgba(0, 191, 255, 0.25)"
                      : hovering 
                        ? "rgba(0, 191, 255, 0.2)"
                        : "rgba(0, 191, 255, 0.15)",
                    transform: isDragging 
                      ? "scale(1.3)"
                      : hovering 
                        ? "scale(1.2)"
                        : "scale(1)"
                  }}
                />
              </motion.div>

              {isDragging && (
                <motion.div
                  className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 text-white text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-full whitespace-nowrap"
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
