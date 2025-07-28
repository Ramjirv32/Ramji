export interface Internship {
  id: string;
  title: string;
  company: string;
  duration: string;
  date: string;
  description: string;
  skills: string[];
  image: string;
  bgColor: string;
  route: string;
}

export interface InternshipCardProps {
  internship: Internship;
  index: number;
}

export const internships: Internship[] = [
  {
    id: "luxor-holiday",
    title: "Full Stack Developer & Co-founder",
    company: "Luxor Holiday Homestay",
    duration: "Ongoing",
    date: "2024 - Present",
    description: "Co-founded and developed a full-stack homestay booking platform with secure payment integration. Implemented features like property listings, booking management, and admin dashboard with a focus on security and user experience.",
    skills: ["React.js", "Node.js", "Express", "MongoDB", "Razorpay", "Cloudflare", "SSL", "Vercel"],
    image: "/luxor-holiday.png",
    bgColor: "from-amber-500/20 to-orange-500/20",
    route: "/internship/luxor-holiday"
  },
  {
    id: "oodser",
    title: "Full Stack Developer Intern",
    company: "Oodser Ltd",
    duration: "3 months",
    date: "Jan 20 - Apr 2025",
    description: "Worked on an innovative AI-integrated platform similar to LinkedIn. Gained experience with React, TypeScript, Node.js enterprise architecture, and real-world problem-solving.",
    skills: ["React (JSX & TSX)", "TypeScript", "Node.js", "Supabase", "REST APIs"],
    image: "/oodser.png",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    route: "/internship/oodser"
  },
  {
    id: "menagalme",
    title: "Software Development Intern", 
    company: "Menagalme Publication",
    duration: "1.5 months",
    date: "May 1 - June 17, 2025",
    description: "Contributed to software development projects and gained experience in publication technology solutions and content management systems.",
    skills: ["JavaScript", "Web Development", "Content Management", "Database"],
    image: "/menagalme.png",
    bgColor: "from-purple-500/20 to-pink-500/20",
    route: "/internship/menagalme"
  }
];
