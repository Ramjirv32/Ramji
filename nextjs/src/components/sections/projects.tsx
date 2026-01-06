"use client";
import Image from "next/image";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../ui/animated-modal";
import { FloatingDock } from "../ui/floating-dock";
import Link from "next/link";

import SmoothScroll from "../smooth-scroll";
import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full md:max-w-7xl md:mx-auto px-3 sm:px-6 md:px-0 py-8 sm:py-12 md:py-0">
      <Link href={"#projects"}>
        <h2
          className={cn(
            "bg-clip-text text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-center text-transparent pt-4 sm:pt-8 md:pt-16",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 mb-4 sm:mb-16 md:mb-32"
          )}
        >
          Projects
        </h2>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-4 md:gap-6 px-4 sm:px-0">
        {projects.map((project, index) => (
          <Modall key={project.src} project={project} />
        ))}
      </div>
    </section>
  );
};
const Modall = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center group/modal-btn w-full p-0">
          <div
            className="relative w-full sm:w-[350px] md:w-[400px] h-[200px] sm:h-[240px] md:h-[267px] rounded-lg overflow-hidden border-2 border-zinc-800 hover:border-zinc-600 transition-all duration-300"
          >
            <Image
              className="object-cover hover:scale-[1.05] transition-all"
              src={project.src}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 350px, 400px"
            />
            <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-10">
              <div className="flex flex-col h-full items-start justify-end p-4 sm:p-5 md:p-6">
                <div className="text-sm sm:text-base md:text-lg text-left">{project.title}</div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <div className="text-[10px] sm:text-xs bg-white text-black rounded-lg w-fit px-2 py-0.5">
                    {project.category}
                  </div>
                  <div className="text-[10px] sm:text-xs bg-zinc-700 text-white rounded-lg w-fit px-2 py-0.5">
                    {project.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="max-w-[92vw] sm:max-w-md md:max-w-lg max-h-[85vh] overflow-auto">
          <SmoothScroll isInsideModal={true}>
            <ModalContent className="p-4 md:p-6">
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ProjectsSection;

const ProjectContents = ({ project }: { project: Project }) => {
  return (
    <div className="text-[13px] md:text-sm leading-relaxed">
      <h4 className="text-base md:text-xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-6">
        {project.title}
      </h4>
      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible scale-90">
        <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-xl mb-6">
          <p className="text-[10px] md:text-xs mt-1 text-neutral-600 dark:text-neutral-500 uppercase tracking-widest">
            Frontend
          </p>
          {project.skills.frontend?.length > 0 && (
            <FloatingDock items={project.skills.frontend} />
          )}
        </div>
        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-xl mb-6">
            <p className="text-[10px] md:text-xs mt-1 text-neutral-600 dark:text-neutral-500 uppercase tracking-widest">
              Backend
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
      <div className="project-detail-content">
        {project.content}
      </div>
    </div>
  );
};
