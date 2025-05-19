"use client"

import { useEffect, useRef } from "react"

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create cosmic black hole effect
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) * 0.2

    // Animation variables
    let time = 0
    const animationSpeed = 0.001

    const drawCosmicEffect = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Black hole center (dark circle)
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = "black"
      ctx.fill()

      // Accretion disk (glowing ring)
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.5)

      gradient.addColorStop(0, "rgba(80, 0, 120, 0.8)")
      gradient.addColorStop(0.5, "rgba(180, 100, 255, 0.6)")
      gradient.addColorStop(1, "rgba(100, 20, 255, 0)")

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Horizontal light beam
      ctx.beginPath()
      ctx.moveTo(0, centerY)
      ctx.lineTo(canvas.width, centerY)
      ctx.lineWidth = 4
      ctx.strokeStyle = "rgba(220, 180, 255, 0.8)"
      ctx.stroke()

      // Pulsating glow effect
      const pulseSize = 1 + Math.sin(time * 2) * 0.1

      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.8 * pulseSize,
        centerX,
        centerY,
        radius * 2.5 * pulseSize,
      )

      outerGlow.addColorStop(0, "rgba(180, 100, 255, 0.4)")
      outerGlow.addColorStop(0.5, "rgba(140, 60, 255, 0.2)")
      outerGlow.addColorStop(1, "rgba(100, 20, 255, 0)")

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 2.5 * pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = outerGlow
      ctx.fill()

      // Update time
      time += animationSpeed

      requestAnimationFrame(drawCosmicEffect)
    }

    drawCosmicEffect()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
}
