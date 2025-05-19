"use client"

import Projects from "./Projects"
import CosmicBackground from "./cosmic"

export default function Page() {
  return (
    <main className="relative">
      <CosmicBackground />
      <Projects />
    </main>
  )
}
