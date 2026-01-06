"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
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
      <SmoothScroll>
        <main className={cn("bg-slate-100 dark:bg-transparent")}>
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <Works />
          <Certifications />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}

export default MainPage;
