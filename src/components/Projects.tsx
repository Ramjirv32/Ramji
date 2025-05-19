"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Tilt } from "react-tilt"
import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa"
import { HiExternalLink } from "react-icons/hi"

// Animation variants
const fadeIn = (direction: string, type: string, delay: number, duration: number) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  }
}

const textVariant = (delay?: number) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  }
}

// Projects data
const projects = [
  {
    name: "AI Code Assistant",
    description:
      "A web application that leverages machine learning to help developers write better code. Features include code completion, refactoring suggestions, and bug detection.",
    tags: [
      {
        name: "react",
        color: "text-blue-400",
      },
      {
        name: "tensorflow.js",
        color: "text-orange-400",
      },
      {
        name: "tailwind",
        color: "text-sky-400",
      },
    ],
    image: "/project-1.png",
    source_code_link: "https://github.com/yourusername/ai-code-assistant",
    live_demo_link: "https://ai-code-assistant.demo.com",
  },
  {
    name: "Cloud File Manager",
    description:
      "A comprehensive cloud storage solution that allows users to upload, organize, and share files securely with fine-grained access controls and real-time collaboration.",
    tags: [
      {
        name: "nextjs",
        color: "text-white",
      },
      {
        name: "aws-s3",
        color: "text-yellow-400",
      },
      {
        name: "typescript",
        color: "text-blue-500",
      },
    ],
    image: "/project-2.png",
    source_code_link: "https://github.com/yourusername/cloud-file-manager",
    live_demo_link: "https://cloud-file-manager.demo.com",
  },
  {
    name: "DevOps Dashboard",
    description:
      "A monitoring dashboard for DevOps teams that integrates with CI/CD pipelines, provides real-time metrics, and sends alerts when performance thresholds are crossed.",
    tags: [
      {
        name: "vue",
        color: "text-green-400",
      },
      {
        name: "docker",
        color: "text-blue-300",
      },
      {
        name: "graphql",
        color: "text-pink-400",
      },
    ],
    image: "/project-3.png",
    source_code_link: "https://github.com/yourusername/devops-dashboard",
    live_demo_link: "https://devops-dashboard.demo.com",
  },
  {
    name: "Smart Home IoT Hub",
    description:
      "An IoT platform that connects and controls smart home devices from different manufacturers with a unified interface, automation rules, and voice control capabilities.",
    tags: [
      {
        name: "react",
        color: "text-blue-400",
      },
      {
        name: "nodejs",
        color: "text-green-500",
      },
      {
        name: "mqtt",
        color: "text-purple-400",
      },
    ],
    image: "/project-4.png",
    source_code_link: "https://github.com/yourusername/smart-home-hub",
    live_demo_link: "https://smart-home-hub.demo.com",
  },
]

// Project Card Component
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
  setCardRef,
  isFourthCard,
}: any) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const leftNodeRef = useRef<HTMLDivElement>(null)
  const bottomNodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      setCardRef(index, cardRef.current, leftNodeRef.current, bottomNodeRef.current)
    }
  }, [index, setCardRef])

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)} ref={cardRef} className="relative">
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-[#151030]/80 p-5 rounded-2xl sm:w-[360px] w-full h-full backdrop-blur-sm border border-purple-500/20"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image || "/placeholder.svg"}
            alt={`${name} project thumbnail`}
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-black/70 backdrop-blur-md hover:bg-purple-700 transition-all"
            >
              <FaGithub className="w-1/2 h-1/2 text-white" />
            </div>
            {live_demo_link && (
              <div
                onClick={() => window.open(live_demo_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-black/70 backdrop-blur-md hover:bg-blue-700 transition-all"
              >
                <HiExternalLink className="w-1/2 h-1/2 text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-gray-300 text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag: any) => (
            <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>

      {/* Connection nodes - visible circles at the center of each card for first 3 cards */}
      {!isFourthCard && (
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-6 h-6 rounded-full bg-purple-600 border-2 border-white shadow-[0_0_15px_5px_rgba(147,51,234,0.5)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      )}

      {/* Connection node at the top for the 4th card */}
      {isFourthCard && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-6 h-6 rounded-full bg-purple-600 border-2 border-white shadow-[0_0_15px_5px_rgba(147,51,234,0.5)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      )}

      {/* Left connection node for the first card */}
      {index === 0 && (
        <div ref={leftNodeRef} className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-6 h-6 rounded-full bg-purple-600 border-2 border-white shadow-[0_0_15px_5px_rgba(147,51,234,0.5)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Energy Connection Component
const EnergyConnection = ({
  startRef,
  endRef,
  index,
  isLoaded,
  isFourthConnection = false,
  isFirstToFourthConnection = false,
  isBottomToFourthConnection = false,
}: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<any[]>([])

  useEffect(() => {
    if (!startRef || !endRef || !isLoaded) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get positions
    const startRect = startRef.getBoundingClientRect()
    const endRect = endRef.getBoundingClientRect()

    // Set canvas size and position
    const parentRect = canvas.parentElement?.getBoundingClientRect()
    if (!parentRect) return

    canvas.width = parentRect.width
    canvas.height = parentRect.height

    // Calculate start and end points relative to canvas
    let startX, startY, endX, endY

    if (isBottomToFourthConnection) {
      // For the connection from the bottom of the 1st card
      // Start from the bottom center of the 1st card
      startX = startRect.left + startRect.width / 2 - parentRect.left
      startY = startRect.bottom - parentRect.top

      // End at the top center of the 4th card
      endX = endRect.left + endRect.width / 2 - parentRect.left
      endY = endRect.top - parentRect.top
    } else if (isFirstToFourthConnection) {
      // For the connection from the left side of the 1st card
      // Start from the left center of the 1st card
      startX = startRect.left - parentRect.left
      startY = startRect.top + startRect.height / 2 - parentRect.top

      // End at the top center of the 4th card
      endX = endRect.left + endRect.width / 2 - parentRect.left
      endY = endRect.top - parentRect.top
    } else if (isFourthConnection) {
      // For the connection to the 4th card (which is below)
      // Start from the center right of the 3rd card
      startX = startRect.right - parentRect.left
      startY = startRect.top + startRect.height / 2 - parentRect.top

      // End at the top center of the 4th card
      endX = endRect.left + endRect.width / 2 - parentRect.left
      endY = endRect.top - parentRect.top
    } else {
      // For horizontal connections between cards 1-2-3
      // Start from the center right of the first card
      startX = startRect.right - parentRect.left
      startY = startRect.top + startRect.height / 2 - parentRect.top

      // End at the center left of the second card
      endX = endRect.left - parentRect.left
      endY = endRect.top + endRect.height / 2 - parentRect.top
    }

    // Initialize particles
    const particleCount = 50
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        size: 1 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.7,
      }))
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the base connection line
      ctx.beginPath()
      ctx.moveTo(startX, startY)

      // For the first to fourth connection or bottom to fourth, add a curve
      if (isFirstToFourthConnection || isBottomToFourthConnection) {
        // Create a curved path
        const controlX1 = isFirstToFourthConnection ? startX : startX
        const controlY1 = isFirstToFourthConnection ? startY + (endY - startY) * 0.3 : startY + (endY - startY) * 0.3
        const controlX2 = isFirstToFourthConnection ? startX + (endX - startX) * 0.7 : endX
        const controlY2 = isFirstToFourthConnection ? endY - (endY - startY) * 0.3 : startY + (endY - startY) * 0.7

        ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY)
      } else {
        ctx.lineTo(endX, endY)
      }

      ctx.strokeStyle = "rgba(147, 51, 234, 0.2)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw particles
      particlesRef.current.forEach((particle) => {
        // Update particle position along the line
        particle.progress += particle.speed
        if (particle.progress > 1) {
          particle.progress = 0
          particle.size = 1 + Math.random() * 3
          particle.opacity = 0.3 + Math.random() * 0.7
        }

        // Calculate position on the line
        const t = particle.progress
        let x, y

        if (isFirstToFourthConnection || isBottomToFourthConnection) {
          // For curved path, calculate position along the bezier curve
          const mt = 1 - t
          const controlX1 = isFirstToFourthConnection ? startX : startX
          const controlY1 = isFirstToFourthConnection ? startY + (endY - startY) * 0.3 : startY + (endY - startY) * 0.3
          const controlX2 = isFirstToFourthConnection ? startX + (endX - startX) * 0.7 : endX
          const controlY2 = isFirstToFourthConnection ? endY - (endY - startY) * 0.3 : startY + (endY - startY) * 0.7

          // Bezier curve formula
          x = mt * mt * mt * startX + 3 * mt * mt * t * controlX1 + 3 * mt * t * t * controlX2 + t * t * t * endX
          y = mt * mt * mt * startY + 3 * mt * mt * t * controlY1 + 3 * mt * t * t * controlY2 + t * t * t * endY
        } else {
          // Linear interpolation for straight lines
          x = startX + (endX - startX) * t
          y = startY + (endY - startY) * t
        }

        // Draw the particle with glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 3)
        gradient.addColorStop(0, `rgba(180, 100, 255, ${particle.opacity})`)
        gradient.addColorStop(0.5, `rgba(140, 60, 255, ${particle.opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(100, 20, 255, 0)")

        ctx.beginPath()
        ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [startRef, endRef, index, isLoaded, isFourthConnection, isFirstToFourthConnection, isBottomToFourthConnection])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />
}

// SectionWrapper HOC (simplified version)
const SectionWrapper = (Component: React.FC, idName: string) =>
  function HOC() {
    return (
      <section id={idName} className="max-w-7xl mx-auto relative z-0 px-4 sm:px-6 lg:px-8 py-20">
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </section>
    )
  }

// Main Projects Component
const Works = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [cardRefs, setCardRefs] = useState<
    {
      card: HTMLDivElement | null
      leftNode?: HTMLDivElement | null
      bottomNode?: HTMLDivElement | null
    }[]
  >([{ card: null, leftNode: null, bottomNode: null }, { card: null }, { card: null }, { card: null }])
  const connectionsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const setCardRef = (
    index: number,
    cardRef: HTMLDivElement,
    leftNodeRef?: HTMLDivElement | null,
    bottomNodeRef?: HTMLDivElement | null,
  ) => {
    setCardRefs((prev) => {
      const newRefs = [...prev]
      newRefs[index] = {
        card: cardRef,
        leftNode: leftNodeRef || prev[index]?.leftNode,
        bottomNode: bottomNodeRef || prev[index]?.bottomNode,
      }
      return newRefs
    })
  }

  return (
    <>
      <motion.div variants={textVariant()} initial="hidden" animate={isLoaded ? "show" : "hidden"}>
        <p className="text-[#dfd9ff] font-medium lg:text-[18px] sm:text-[16px] xs:text-[14px] text-[12px] uppercase tracking-wider">
          My work
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="mt-3 text-gray-300 text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through real-world examples of my work. Each project is
          briefly described with links to code repositories and live demos. These projects reflect my ability to solve
          complex problems, work with different technologies, and manage projects effectively.
        </motion.p>
      </div>

      <div ref={connectionsContainerRef} className="mt-20 relative">
        {/* Top row with first 3 cards */}
        <div className="flex flex-wrap gap-7 justify-center mb-20">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              {...project}
              setCardRef={setCardRef}
              isFourthCard={false}
            />
          ))}
        </div>

        {/* Bottom row with 4th card */}
        <div className="flex justify-center">
          <ProjectCard key="project-3" index={3} {...projects[3]} setCardRef={setCardRef} isFourthCard={true} />
        </div>

        {/* Energy connections */}
        {isLoaded && cardRefs.every((ref) => ref.card !== null) && (
          <>
            {/* Connections between cards 1-2-3 */}
            {[0, 1].map((index) => (
              <EnergyConnection
                key={`connection-${index}`}
                startRef={cardRefs[index].card}
                endRef={cardRefs[index + 1].card}
                index={index}
                isLoaded={isLoaded}
                isFourthConnection={false}
              />
            ))}

            {/* Connection from card 3 to card 4 (below) */}
            <EnergyConnection
              key="connection-3-to-4"
              startRef={cardRefs[2].card}
              endRef={cardRefs[3].card}
              index={2}
              isLoaded={isLoaded}
              isFourthConnection={true}
            />

            {/* Connection from left side of card 1 to card 4 */}
            <EnergyConnection
              key="connection-left-1-to-4"
              startRef={cardRefs[0].leftNode}
              endRef={cardRefs[3].card}
              index={3}
              isLoaded={isLoaded}
              isFirstToFourthConnection={true}
            />

            {/* Removed the bottom connection from card 1 to card 4 as requested */}
          </>
        )}
      </div>
    </>
  )
}

export default SectionWrapper(Works, "projects")
