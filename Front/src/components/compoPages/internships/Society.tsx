import { FaArrowLeft, FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCode, FaLightbulb, FaShieldAlt, FaGlobe } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Society = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 200,
      once: true,
      offset: 100,
    });
  }, []);

  const goBack = () => {
    navigate('/', { state: { scrollTo: 'works' } });
    setTimeout(() => {
      const worksSection = document.getElementById('works');
      if (worksSection) {
        worksSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const achievements = [
    {
      icon: "🌐",
      title: "Full-Stack Website Development",
      description: "Developed and deployed the complete societycis.org website using React, TypeScript, Node.js, and MongoDB with modern responsive design."
    },
    {
      icon: "🔒",
      title: "Cybersecurity Implementation",
      description: "Implemented robust security features focusing on intelligent systems security, ensuring proper user authentication and data protection."
    },
    {
      icon: "☁️",
      title: "Cloud Infrastructure Management",
      description: "Managed cloud deployment using Cloudflare, GoDaddy, and Vercel, ensuring optimal performance, security, and scalability."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Collaborated with Mathan M in developing various components of the website and worked closely with Dr. Vishnukumar to meet project requirements."
    },
    {
      icon: "📚",
      title: "Technical Content Management",
      description: "Implemented and managed content systems using WordPress and OJS (Open Journal Systems) for academic publications and community resources."
    },
    {
      icon: "🎨",
      title: "UI/UX Design & Implementation",
      description: "Created intuitive, responsive user interfaces with modern design principles to enhance user experience across desktop and mobile devices."
    }
  ];

  const activities = [
    { name: "Web Development", description: "Built responsive and secure website components with React and TypeScript" },
    { name: "Backend Development", description: "Created robust API endpoints and database integration with Node.js and MongoDB" },
    { name: "Security Implementation", description: "Implemented user authentication, data encryption, and secure communication channels" },
    { name: "Content Management", description: "Set up and configured academic publishing systems through OJS platform" },
    { name: "Cloud Management", description: "Configured and managed cloud hosting, CDN, and deployment pipelines" },
    { name: "Technical Documentation", description: "Created comprehensive technical documentation for future maintenance and updates" }
  ];

  const timeline = [
    {
      date: "2023",
      title: "Project Initiation",
      description: "Started the internship at Society for Cyber Intelligent Systems under Dr. Vishnukumar's guidance to develop societycis.org."
    },
    {
      date: "2023",
      title: "Website Development & Launch",
      description: "Developed and launched societycis.org using full-stack technologies, creating a comprehensive platform for Melange Publications."
    },
    {
      date: "2024",
      title: "Cloud Infrastructure & Security",
      description: "Implemented robust cloud infrastructure with Cloudflare security, GoDaddy hosting, and Vercel deployment for optimal performance."
    },
    {
      date: "2024",
      title: "Feature Enhancement & Maintenance",
      description: "Added new features, maintained the platform, and provided technical support for ongoing operations."
    }
  ];

  const techStack = [
    { name: "React & TypeScript", description: "Frontend development with modern React patterns and TypeScript for type safety" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for responsive and modern UI design" },
    { name: "Node.js & MongoDB", description: "Backend API development and NoSQL database management" },
    { name: "Cloudflare & Security", description: "CDN, DDoS protection, and advanced security configurations" },
    { name: "GoDaddy & Vercel", description: "Domain management and seamless deployment pipeline" },
    { name: "Git & GitHub", description: "Version control and collaborative development workflows" },
    { name: "WordPress & OJS", description: "Content management and academic journal publishing systems" },
    { name: "Cybersecurity Tools", description: "Security auditing, penetration testing, and threat analysis tools" }
  ];

  return (
    <>
      <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
        {/* Background Glowing Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, rgba(0, 191, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "4s"
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(30, 144, 255, 0.25) 0%, rgba(30, 144, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "3.5s",
              animationDelay: "1.5s"
            }}
          />
        </div>

        {/* Back Button */}
        <div className="fixed top-6 left-6 z-50" data-aos="fade-down">
          <button
            onClick={goBack}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 border border-[#00BFFF]/40"
            style={{
              boxShadow: "0 0 15px rgba(0, 191, 255, 0.3)"
            }}
          >
            <FaArrowLeft />
            <span>Back to Journey</span>
          </button>
        </div>

        {/* Header */}
        <header className="relative z-10 flex justify-center items-center p-6 md:p-8 pt-20 bg-black/50 backdrop-blur-md border-b border-[#00BFFF]/30" data-aos="fade-down" data-aos-delay="200">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-lg flex items-center justify-center"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.6)"
              }}
            >
              <FaShieldAlt className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold">Society for Cyber Intelligent Systems</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8" data-aos="fade-up">
              <span
                className="bg-[#00BFFF]/20 border border-[#00BFFF]/40 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  boxShadow: "0 0 10px rgba(0, 191, 255, 0.3)"
                }}
              >
                2023 - 2024
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#00BFFF] to-white bg-clip-text text-transparent" data-aos="fade-up" data-aos-delay="100">
              🔒 Society for CIS Website
            </h1>

            <div className="flex items-center justify-center space-x-6 mb-8" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center space-x-2 text-gray-300">
                <FaGlobe className="text-[#00BFFF]" />
                <span>societycis.org</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaCalendarAlt className="text-[#00BFFF]" />
                <span>Internship Project</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaCode className="text-[#00BFFF]" />
                <span>Full-Stack Developer</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              During my internship at KPRIET CSE Department under Dr. Vishnukumar, I worked with Mathan M to develop the 
              complete societycis.org platform for Melange Publications in Pondicherry. This freelance-style project involved 
              using modern full-stack technologies to create a comprehensive academic publishing platform.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12" data-aos="fade-up" data-aos-delay="400">
              {["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Cloudflare", "Cybersecurity", "OJS"].map((skill, index) => (
                <span
                  key={skill}
                  className="bg-white/10 backdrop-blur-sm border border-[#00BFFF]/30 px-4 py-2 rounded-full text-sm"
                  style={{
                    boxShadow: "0 0 8px rgba(0, 191, 255, 0.2)"
                  }}
                  data-aos="zoom-in"
                  data-aos-delay={400 + index * 50}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Highlight Card */}
            <div
              className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
              }}
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🌐</div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">🚀 Full-Stack Development Project</h3>
                  <p className="text-gray-300">
                    Developed the complete societycis.org website from scratch for Melange Publications in Pondicherry as part of an 
                    internship with Dr. Vishnukumar from the KPRIET CSE Department. Implemented the platform using React, TypeScript, 
                    Node.js, and MongoDB with robust security measures, Cloudflare integration, and academic publishing systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Website Link */}
            <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="600">
              <a
                href="https://societycis.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] px-6 py-3 rounded-full hover:from-[#1E90FF] hover:to-[#00BFFF] transition-all duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(0, 191, 255, 0.5)"
                }}
              >
                <FaExternalLinkAlt />
                <span>Visit societycis.org</span>
              </a>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" data-aos="fade-up">📈 Development Journey</h2>
            <div className="space-y-6">
              {timeline.map((phase, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-[#00BFFF]/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  style={{
                    boxShadow: "0 0 15px rgba(0, 191, 255, 0.1)"
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="bg-[#00BFFF] text-white px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        boxShadow: "0 0 10px rgba(0, 191, 255, 0.5)"
                      }}
                    >
                      {phase.date}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-white">{phase.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Grid */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" data-aos="fade-up">Key Achievements & Contributions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-[#00BFFF]/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  style={{
                    boxShadow: "0 0 15px rgba(0, 191, 255, 0.1)"
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-3xl mb-4">{achievement.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{achievement.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="flex items-center space-x-3 mb-8" data-aos="fade-up">
              <div className="text-2xl">🛠️</div>
              <h2 className="text-2xl md:text-3xl font-bold">Technology Stack</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-800 hover:border-[#00BFFF]/30 transition-colors"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <h4 className="font-medium text-[#00BFFF] mb-2">{tech.name}</h4>
                  <p className="text-sm text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Activities Section */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="flex items-center space-x-3 mb-8" data-aos="fade-up">
              <div className="text-2xl">🎯</div>
              <h2 className="text-2xl md:text-3xl font-bold">Development Activities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-800 hover:border-[#00BFFF]/30 transition-colors"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <h4 className="font-medium text-[#00BFFF] mb-2">{activity.name}</h4>
                  <p className="text-sm text-gray-300">{activity.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Developed Section */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" data-aos="fade-up">🚀 Skills Developed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Technical Skills */}
              <div
                className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-8"
                style={{
                  boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
                }}
                data-aos="fade-right"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">💻</div>
                  <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
                  <ul className="text-gray-300 space-y-2 text-left">
                    <li>• Full-Stack Web Development</li>
                    <li>• Cloud Infrastructure & Security</li>
                    <li>• Database Design & Management</li>
                    <li>• DevOps & Deployment Pipelines</li>
                    <li>• Content Management Systems</li>
                  </ul>
                </div>
              </div>

              {/* Project Skills */}
              <div
                className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-8"
                style={{
                  boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
                }}
                data-aos="fade-left"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">👨‍💻</div>
                  <h3 className="text-xl font-semibold mb-4">Project & Soft Skills</h3>
                  <ul className="text-gray-300 space-y-2 text-left">
                    <li>• Collaborative Development</li>
                    <li>• Client Communication</li>
                    <li>• Project Planning & Execution</li>
                    <li>• Technical Documentation</li>
                    <li>• Problem-Solving & Troubleshooting</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Team & Mentorship */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" data-aos="fade-up">Team & Mentorship</h2>
            <div
              className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-8"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
              }}
              data-aos="fade-up"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍🏫</div>
                <h3 className="text-xl font-semibold mb-4">Project Team</h3>
                <p className="text-gray-300 mb-4">
                  This project was developed under the guidance of <span className="text-[#00BFFF] font-semibold">Dr. Vishnukumar</span> from 
                  the KPRIET CSE Department, in collaboration with <span className="text-[#00BFFF] font-semibold">Mathan M</span> as part of 
                  our internship. We worked together to create a comprehensive solution for Melange Publications in Pondicherry.
                </p>
                <p className="text-gray-300">
                  The experience taught me valuable lessons in client-focused development, team collaboration, and creating real-world solutions 
                  that meet specific business requirements.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Society;






