"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const SkillsSkeleton = () => (
  <section id="skills" className="w-full py-20 relative bg-transparent">
    <div className="w-full flex flex-col items-center justify-center gap-6 py-16">
      <div className="h-12 w-48 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`skills-skeleton-${index}`}
            className="h-12 rounded-full border border-zinc-800 bg-zinc-900/70 animate-pulse"
          />
        ))}
      </div>
    </div>
  </section>
)

const LazySkillsContent = dynamic(() => import("./SkillsContent"), {
  loading: () => <SkillsSkeleton />,
  ssr: false,
})

const Skills = () => {
  const [shouldRender, setShouldRender] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (shouldRender) {
      return
    }

    const element = containerRef.current

    if (!element || typeof IntersectionObserver === "undefined") {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: "350px 0px" }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [shouldRender])

  useEffect(() => {
    if (shouldRender) {
      return
    }

    const fallback = window.setTimeout(() => {
      setShouldRender(true)
    }, 4000)

    return () => {
      window.clearTimeout(fallback)
    }
  }, [shouldRender])

  return (
    <div ref={containerRef} className="w-full">
      {shouldRender ? <LazySkillsContent /> : <SkillsSkeleton />}
    </div>
  )
}

export default Skills