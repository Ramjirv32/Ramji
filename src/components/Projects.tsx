"use client";

import { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

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
  };
};

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
  };
};

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
];

// Project Card Component
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}: any) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
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
            src={image}
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
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

// SectionWrapper HOC (simplified version)
const SectionWrapper = (Component: React.FC, idName: string) => 
  function HOC() {
    return (
      <section
        id={idName}
        className="max-w-7xl mx-auto relative z-0 px-4 sm:px-6 lg:px-8 py-20"
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </section>
    );
  };

// Main Projects Component
const Works = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <motion.div 
        variants={textVariant()} 
        initial="hidden" 
        animate={isLoaded ? "show" : "hidden"}
      >
        <p className="text-[#dfd9ff] font-medium lg:text-[18px] sm:text-[16px] xs:text-[14px] text-[12px] uppercase tracking-wider">
          My work
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Projects.
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden" 
          animate={isLoaded ? "show" : "hidden"}
          className="mt-3 text-gray-300 text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. These projects reflect my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");