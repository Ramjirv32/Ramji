"use client";

import React from "react";
import { cn } from "@/lib/utils";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import Works from "@/components/sections/works";
import Certifications from "@/components/sections/certifications";

function MainPage() {
  return (
    <>
      <main className={cn("bg-white")}>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <Works />
        <Certifications />
        <ContactSection />
      </main>
    </>
  );
}

export default MainPage;
