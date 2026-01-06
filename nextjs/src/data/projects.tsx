import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowDownUpIcon, ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
  SiVite,
  SiNetlify,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiApachemaven,
  SiCplusplus,
  SiArduino,
  SiTensorflow,
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiOpencv,
  SiJupyter,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import css from "styled-jsx/css";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          View
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <>
          {repo === "Coming Soon" ? (
            <Button variant={"outline"} size={"sm"} disabled className="cursor-not-allowed">
              GitHub - Coming Soon
            </Button>
          ) : (
            <Link
              className="font-mono underline flex gap-2"
              rel="noopener"
              target="_new"
              href={repo}
            >
              <Button variant={"default"} size={"sm"}>
                Github
                <ArrowUpRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  tsx: {
    title: "TypeScript (TSX)",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  // +
  vite: {
    title: "Vite",
    bg: "black",
    fg: "white",
    icon: <SiVite />,
  },
  openai: {
    title: "OpenAI",
    bg: "black",
    fg: "white",
    icon: <img src="assets/icons/openai-svgrepo-com_white.svg" alt="OpenAI" />,
  },
  netlify: {
    title: "Netlify",
    bg: "black",
    fg: "white",
    icon: <SiNetlify />,
  },
  html: {
    title: "HTML5",
    bg: "black",
    fg: "white",
    icon: <SiHtml5 />,
  },
  css: {
    title: "CSS3",
    bg: "black",
    fg: "white",
    icon: <SiCss3 />,
  },
  bootstrap: {
    title: "Bootstrap",
    bg: "black",
    fg: "white",
    icon: <SiBootstrap />,
  },
  maven: {
    title: "Maven",
    bg: "black",
    fg: "white",
    icon: <SiApachemaven />,
  },
  java: {
    title: "Java",
    bg: "black",
    fg: "white",
    icon: <img src="assets/icons/icons8-java.svg" alt="Java" />,
  },
  cplusplus: {
    title: "C++",
    bg: "black",
    fg: "white",
    icon: <SiCplusplus />,
  },
  arduino: {
    title: "Arduino",
    bg: "black",
    fg: "white",
    icon: <SiArduino />,
  },
  tensorflow: {
    title: "TensorFlow",
    bg: "black",
    fg: "white",
    icon: <SiTensorflow />,
  },
  pytorch: {
    title: "PyTorch",
    bg: "black",
    fg: "white",
    icon: <SiPytorch />,
  },
  pandas: {
    title: "Pandas",
    bg: "black",
    fg: "white",
    icon: <SiPandas />,
  },
  numpy: {
    title: "NumPy",
    bg: "black",
    fg: "white",
    icon: <SiNumpy />,
  },
  scikitlearn: {
    title: "Scikit-learn",
    bg: "black",
    fg: "white",
    icon: <SiScikitlearn />,
  },
  opencv: {
    title: "OpenCV",
    bg: "black",
    fg: "white",
    icon: <SiOpencv />,
  },
  jupyter: {
    title: "Jupyter",
    bg: "black",
    fg: "white",
    icon: <SiJupyter />,
  },
  c: {
    title: "C",
    bg: "black",
    fg: "white",
    icon: <span className="text-2xl font-bold">C</span>,
  },
  fastapi: {
    title: "FastAPI",
    bg: "black",
    fg: "white",
    icon: <span className="text-xl font-bold">FastAPI</span>,
  },
  jenkins: {
    title: "Jenkins",
    bg: "black",
    fg: "white",
    icon: <span className="text-xl font-bold">Jenkins</span>,
  },
  kubernetes: {
    title: "Kubernetes",
    bg: "black",
    fg: "white",
    icon: <span className="text-xl font-bold">K8s</span>,
  },
  aws: {
    title: "AWS",
    bg: "black",
    fg: "white",
    icon: <span className="text-xl font-bold">AWS</span>,
  },
  esp32: {
    title: "ESP32",
    bg: "black",
    fg: "white",
    icon: <SiArduino />,
  },
  iot: {
    title: "IoT",
    bg: "black",
    fg: "white",
    icon: <span className="text-xl font-bold">IoT</span>,
  },
  ml: {
    title: "Machine Learning",
    bg: "black",
    fg: "white",
    icon: <span className="text-xl font-bold">ML</span>,
  },
  microservices: {
    title: "Microservices",
    bg: "black",
    fg: "white",
    icon: <span className="text-xl font-bold">μS</span>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  date: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  { // Vehicle Rental System
    id: "vehicle-rental-system",
    category: "System Programming",
    title: "Vehicle Rental System",
    date: "2023",
    src: "/assets/grs.webp",
    screenshots: [],
    live: "https://github.com/Ramjirv32/Vehicle-Rental-System",
    github: "https://github.com/Ramjirv32/Vehicle-Rental-System",
    skills: {
      frontend: [PROJECT_SKILLS.c],
      backend: [PROJECT_SKILLS.c],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Developed a comprehensive vehicle rental management system in C with user authentication
            and booking functionality using file handling. The system implements efficient data
            structures and memory management for optimal performance.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>User authentication and authorization system</li>
            <li>Vehicle booking and management</li>
            <li>File-based data persistence</li>
            <li>Efficient memory management and data structures</li>
          </ul>
        </div>
      );
    },
  },
  { // FocusAI Productive Assistant
    id: "focusai",
    category: "AI & Productivity",
    title: "FocusAI Productive Assistant",
    date: "2024",
    src: "/personal/focus.webp",
    screenshots: [],
    live: "https://www.linkedin.com/posts/ramji-b-613539308_ai-focusai-opensource-activity-7364137389616709632-UskY?utm_source=share&utm_medium=member_desktop",
    github: "Coming Soon",
    skills: {
      frontend: [PROJECT_SKILLS.tsx, PROJECT_SKILLS.react],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo, PROJECT_SKILLS.python, PROJECT_SKILLS.fastapi, PROJECT_SKILLS.docker, PROJECT_SKILLS.ml],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Trained a custom AI model for behavior classification in collaboration with Navaneethalkrishnan.
            The system captures real-time behavioral data with Node.js and Python backend, storing it in MongoDB.
            Features interactive dashboards with visual summaries for daily, weekly, and category-wise usage tracking.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Key Technologies</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Custom AI model for behavior classification</li>
            <li>Real-time data capture with Node.js and Python</li>
            <li>MongoDB for data persistence</li>
            <li>Interactive dashboards with usage analytics</li>
            <li>Docker containerization for deployment</li>
          </ul>
        </div>
      );
    },
  },
  { // Atmospheric Water Generator (AWG)
    id: "awg",
    category: "IoT & Embedded Systems",
    title: "Atmospheric Water Generator (AWG)",
    date: "2024",
    src: "/personal/awg.webp",
    screenshots: [],
    live: "https://www.linkedin.com/feed/update/urn:li:activity:7401172181214416897/",
    github: "https://www.linkedin.com/feed/update/urn:li:activity:7401172181214416897/",
    skills: {
      frontend: [PROJECT_SKILLS.react],
      backend: [PROJECT_SKILLS.esp32, PROJECT_SKILLS.python, PROJECT_SKILLS.iot, PROJECT_SKILLS.ml],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Designed IoT-enabled device to extract clean drinking water from atmospheric humidity using Peltier
            thermoelectric cooling. Integrated ESP32 microcontroller with DHT22, Ultrasonic, pH, TDS sensors
            for real-time monitoring and AI-based predictions. Built web/mobile dashboard for performance
            analytics, water quality tracking, and emergency alerts with UV purification.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Peltier thermoelectric cooling for water extraction</li>
            <li>ESP32 with multiple sensors (DHT22, Ultrasonic, pH, TDS)</li>
            <li>Real-time monitoring and AI predictions</li>
            <li>Web/mobile dashboard for analytics</li>
            <li>UV purification and water quality tracking</li>
          </ul>
        </div>
      );
    },
  },
  { // CI/CD Pipeline
    id: "cicd-pipeline",
    category: "DevOps",
    title: "Full Stack CI/CD Pipeline",
    date: "2025",
    src: "/assets/cloud1.webp",
    screenshots: [],
    live: "https://www.linkedin.com/posts/ramji-b-613539308_devops-kubernetes-argocd-activity-7376837414972968960-HNOr?utm_source=share&utm_medium=member_desktop",
    github: "https://github.com/Ramjirv32/complete-CICD.git",
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.docker],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo, PROJECT_SKILLS.jenkins, PROJECT_SKILLS.docker, PROJECT_SKILLS.kubernetes, PROJECT_SKILLS.aws],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Built a complete CI/CD pipeline for full-stack applications with automated testing, building,
            and deployment. Implements Jenkins for automation, Docker for containerization, Kubernetes for
            orchestration, and AWS for cloud deployment. Supports frontend (React), backend (Node.js),
            and database (MongoDB) with Git-based version control.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Technology Stack</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Jenkins for CI/CD automation</li>
            <li>Docker for containerization</li>
            <li>Kubernetes for container orchestration</li>
            <li>AWS for cloud infrastructure</li>
            <li>Git for version control</li>
            <li>Automated testing and deployment</li>
          </ul>
        </div>
      );
    },
  },
  { // Full DevOps Automation
    id: "devops-automation",
    category: "DevOps & Cloud",
    title: "Full DevOps Automation with Kubernetes",
    date: "2025 - Current",
    src: "/assets/cloud.webp",
    screenshots: [],
    live: "#",
    github: "#",
    skills: {
      frontend: [PROJECT_SKILLS.react],
      backend: [PROJECT_SKILLS.microservices, PROJECT_SKILLS.kubernetes, PROJECT_SKILLS.docker, PROJECT_SKILLS.aws, PROJECT_SKILLS.jenkins],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            <span className="text-purple-500 font-bold">🚀 Coming Soon!</span> Complete DevOps automation
            solution featuring Kubernetes auto-scaling, microservices architecture, and full CI/CD pipeline
            integration. This project will demonstrate enterprise-level infrastructure automation with
            monitoring, logging, and security best practices.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">Planned Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Kubernetes auto-scaling and load balancing</li>
            <li>Microservices architecture with service mesh</li>
            <li>Complete CI/CD pipeline with Jenkins</li>
            <li>AWS cloud infrastructure with Terraform</li>
            <li>Monitoring with Prometheus and Grafana</li>
            <li>Centralized logging with ELK stack</li>
            <li>Security scanning and compliance automation</li>
          </ul>
          <div className="mt-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
            <p className="text-purple-400 font-mono text-sm">
              ⚡ Status: In Development | Expected Completion: Q2 2026
            </p>
          </div>
        </div>
      );
    },
  },
];
export default projects;
