"use client";
import Image from "next/image";
import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import Link from "next/link";


import SmoothScroll from "../smooth-scroll";
import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full md:max-w-7xl md:mx-auto px-6 sm:px-6 md:px-0 py-8 sm:py-12 md:py-0">
      <Link href={"#projects"}>
        <h2 className="text-white font-thin text-3xl sm:text-4xl md:text-7xl lg:text-8xl">
          Projects.
        </h2>
        <p
          className="mt-4 text-zinc-500 text-xs sm:text-sm md:text-base font-thin max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </p>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-4 md:gap-6 px-12 sm:px-0">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Link
        href={`/projects/${project.id}`}
        className="relative w-full max-w-[280px] mx-auto h-[240px] sm:h-[240px] md:h-[267px] sm:max-w-none rounded-lg overflow-hidden border-2 border-zinc-800 hover:border-zinc-600 transition-all duration-300 group"
      >

        <Image
          className="object-cover group-hover:scale-[1.05] transition-all"
          src={project.src}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 350px, 400px"
        />

        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-10">
          <div className="flex flex-col h-full items-start justify-end p-4 sm:p-5 md:p-6">
            <div className="text-sm sm:text-base md:text-lg text-left font-thin">{project.title}</div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <div className="text-[10px] sm:text-xs bg-white text-black rounded-lg w-fit px-2 py-0.5 font-bold uppercase tracking-wider">
                {project.category}
              </div>
              <div className="text-[10px] sm:text-xs bg-zinc-700 text-white rounded-lg w-fit px-2 py-0.5">
                {project.date}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectsSection;
