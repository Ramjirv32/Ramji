import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File, Github, Linkedin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin, SiLeetcode } from "react-icons/si";
import { config } from "@/data/config";
import RotatingTechIcons from "../rotating-tech-icons";

const HeroSection = () => {
  return (
    <section id="hero" className={cn("relative w-full min-h-fit md:min-h-screen md:h-screen md:mb-0")}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className={cn(
            "md:h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-16 sm:pt-20 md:pt-0 px-4 sm:px-8 md:px-24 pb-10 md:pb-32 lg:px-40 lg:pb-0 xl:px-48"
          )}
        >
          <div className="">
            <BlurIn delay={0.7} as="div">
              <p
                className={cn(
                  "md:self-start mt-2 sm:mt-4 font-thin text-xs sm:text-sm md:text-base text-slate-500 dark:text-zinc-400 ml-2 sm:ml-3",
                  "cursor-default font-display bg-clip-text"
                )}
              >
                Hi, I am
                <br className="md:hidden" />
              </p>
            </BlurIn>
            <BlurIn delay={1} as="div">
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <h1
                    className={cn(
                      "font-thin text-3xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl text-transparent text-slate-800 ml-1 text-left whitespace-nowrap",
                      "cursor-default text-edge-outline font-display"
                    )}
                  >
                    {config.author}
                  </h1>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="dark:bg-white dark:text-black text-xs md:text-sm"
                >
                  theres something waiting for you in devtools
                </TooltipContent>
              </Tooltip>
            </BlurIn>
            {/* <div className="md:block hidden bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 w-screen h-px animate-fade-right animate-glow" /> */}
            <BlurIn delay={1.2} as="div">
              <p
                className={cn(
                  "md:self-start mt-1.5 sm:mt-3 font-thin text-xs sm:text-sm md:text-base text-slate-500 dark:text-zinc-400 ml-2 sm:ml-3",
                  "cursor-default font-display bg-clip-text"
                )}
              >
                FullStack Developer | DevOps | AI Engineer
              </p>
            </BlurIn>
          </div>
          <div className="mt-4 sm:mt-6 md:ml-2 flex flex-col items-center md:items-start gap-1.5 sm:gap-2 md:gap-3 w-full sm:w-auto">
            <Link
              href={
                "/com/Ramji.pdf"
              }
              target="_blank"
              className="w-fit"
            >
              <BoxReveal delay={2} width="fit-content" >
                <Button className="flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto text-[11px] sm:text-xs md:text-sm px-4 sm:px-6 md:px-8 py-1.5 sm:py-2">
                  <File size={14} className="sm:w-4 sm:h-4 md:w-6 md:h-6" />
                  <p>Resume</p>
                </Button>
              </BoxReveal>
            </Link>
            <div className="md:self-start flex gap-1.5 sm:gap-2 md:gap-2 w-full justify-center md:justify-start">
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link href={"#contact"} className="w-fit">
                    <Button
                      variant={"outline"}
                      className="block w-full md:w-auto overflow-hidden text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2"
                    >
                      Reach Me
                    </Button>
                  </Link>
                </TooltipTrigger>
              </Tooltip>
              <Link
                href={config.social.github}
                target="_blank"
                className="w-fit"
              >
                <Button variant={"outline"} className="w-full md:w-auto px-3 sm:px-3 md:px-4 py-1.5 sm:py-2">
                  <SiGithub size={14} className="sm:w-4 sm:h-4 md:w-6 md:h-6" />
                </Button>
              </Link>
              <Link
                href={config.social.linkedin}
                target="_blank"
                className="w-fit"
              >
                <Button variant={"outline"} className="w-full md:w-auto px-3 sm:px-3 md:px-4 py-1.5 sm:py-2">
                  <SiLinkedin size={14} className="sm:w-4 sm:h-4 md:w-6 md:h-6" />
                </Button>
              </Link>
              <Link
                href={config.social.leetcode}
                target="_blank"
                className="w-fit"
              >
                <Button variant={"outline"} className="w-full md:w-auto px-3 sm:px-3 md:px-4 py-1.5 sm:py-2">
                  <SiLeetcode size={14} className="sm:w-4 sm:h-4 md:w-6 md:h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:flex col-span-1 w-full items-center justify-center mt-0 sm:mt-12 md:mt-0">
          <RotatingTechIcons />
        </div>
      </div>
      <div className="hidden md:block absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </section >
  );
};

export default HeroSection;
