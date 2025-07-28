import React from 'react';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Navigate to projects section on home page
  const goBack = () => {
    navigate('/', { state: { scrollTo: 'projects' } });
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const features = [
    {
      icon: "📊",
      title: "Real-time Productivity Tracking",
      description: "Chrome Extension and Electron App capture user activity including websites visited, app usage, and idle time with timestamped logs."
    },
    {
      icon: "🤖",
      title: "AI Behavior Classification",
      description: "Custom-trained AI model classifies behavior as productive, neutral, or distracting using labeled behavioral data."
    },
    {
      icon: "🏗️",
      title: "Robust Backend Architecture",
      description: "Built with Node.js and FastAPI (Python), storing behavioral logs in MongoDB with Docker deployment."
    },
    {
      icon: "📈",
      title: "User Insights Dashboard",
      description: "Provides daily/weekly productivity scores with visual graphs, recommendations, and focus improvement alerts."
    },
    {
      icon: "⚡",
      title: "Cross-Platform Integration",
      description: "Seamless integration between Chrome Extension and Electron desktop app for comprehensive activity monitoring."
    },
    {
      icon: "🔒",
      title: "Privacy-Focused Design",
      description: "Local data processing with secure behavioral analysis while maintaining user privacy and data control."
    }
  ];

  const technologies = [
    { name: "Electron.js", description: "Cross-platform desktop application framework" },
    { name: "Chrome Extension", description: "Browser-based activity tracking" },
    { name: "Node.js", description: "Backend server and API development" },
    { name: "FastAPI (Python)", description: "High-performance API framework for AI integration" },
    { name: "MongoDB", description: "NoSQL database for behavioral logs storage" },
    { name: "Custom AI Model", description: "Behavior classification and analysis" },
    { name: "Docker", description: "Containerization for deployment and scaling" }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white overflow-hidden relative">
        {/* Background Glowing Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main background glow */}
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 80%)",
              animationDuration: "4s"
            }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 80%)",
              animationDuration: "3.5s",
              animationDelay: "1.5s"
            }}
          />
          {/* Floating accent glows */}
          <div
            className="absolute top-1/5 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse"
            style={{
              background: "rgba(147, 51, 234, 0.2)",
              animationDuration: "2.8s",
              animationDelay: "0.8s"
            }}
          />
          <div
            className="absolute bottom-1/5 right-1/3 w-24 h-24 rounded-full blur-xl animate-pulse"
            style={{
              background: "rgba(168, 85, 247, 0.2)",
              animationDuration: "3.2s",
              animationDelay: "2.2s"
            }}
          />
        </div>

        {/* Back Button with glow */}
        <div className="fixed top-6 left-6 z-50" data-aos="fade-down">
          <button 
            onClick={goBack} 
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 border border-purple-500/40"
            style={{
              boxShadow: "0 0 15px rgba(147, 51, 234, 0.3)"
            }}
          >
            <FaArrowLeft />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Header with glow */}
        <header className="relative z-10 flex justify-center items-center p-6 md:p-8 pt-20 bg-black/50 backdrop-blur-md border-b border-purple-500/30" data-aos="fade-down" data-aos-delay="200">
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg flex items-center justify-center"
              style={{
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)"
              }}
            >
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-xl font-bold">FocusAI – Productive Assistant</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8" data-aos="fade-up">
              <span 
                className="bg-purple-600/20 border border-purple-500/40 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  boxShadow: "0 0 10px rgba(147, 51, 234, 0.3)"
                }}
              >
                May 2025 – June 2025
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-400 to-white bg-clip-text text-transparent" data-aos="fade-up" data-aos-delay="200">
              FocusAI – Productive Assistant
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
              An intelligent productivity assistant that uses real-time activity tracking and AI behavior
              classification to help users improve focus and productivity through comprehensive insights and recommendations.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-12" data-aos="fade-up" data-aos-delay="600">
              {["Electron.js", "Chrome Extension", "Node.js", "FastAPI", "MongoDB", "AI/ML"].map((tech, index) => (
                <span 
                  key={tech} 
                  className="bg-white/10 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full text-sm"
                  style={{
                    boxShadow: "0 0 8px rgba(147, 51, 234, 0.2)"
                  }}
                  data-aos="zoom-in"
                  data-aos-delay={600 + index * 100}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Project highlight card with glow */}
            <div 
              className="bg-purple-600/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto"
              style={{
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)"
              }}
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🎯</div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Productivity Insights</h3>
                  <p className="text-gray-300">
                    Built by Ramji and Navaneethalkrishnan, FocusAI combines real-time activity tracking
                    with custom AI behavior classification to provide personalized productivity insights.
                    The system monitors user behavior across web and desktop applications, delivering
                    actionable recommendations to enhance focus and work efficiency.
                  </p>
                </div>
              </div>
            </div>

            {/* Project links with glow */}
            <div className="flex flex-wrap gap-4 justify-center mb-12" data-aos="fade-up" data-aos-delay="1000">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-700/80 px-6 py-3 rounded-full transition-all duration-300 border border-purple-500/30"
                style={{
                  boxShadow: "0 0 15px rgba(147, 51, 234, 0.3)"
                }}
              >
                <FaGithub className="text-xl" />
                <span>View on GitHub</span>
              </a>
              <a 
                href="#"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-3 rounded-full hover:from-purple-500 hover:to-purple-300 transition-all duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)"
                }}
              >
                <FaExternalLinkAlt />
                <span>View Live Demo</span>
              </a>
            </div>

            {/* Project image with glow */}
            <div className="mb-16" data-aos="zoom-in" data-aos-delay="1200">
              <img 
                src="/assets/focusai-dashboard.png"
                alt="FocusAI Dashboard"
                className="w-full max-h-[600px] object-contain object-center rounded-xl shadow-xl border border-purple-500/40"
                style={{
                  boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)"
                }}
              />
            </div>
          </section>

          {/* Features Grid with glow */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  style={{
                    boxShadow: "0 0 15px rgba(147, 51, 234, 0.1)"
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies Section */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="flex items-center space-x-3 mb-8" data-aos="fade-up">
              <div className="text-2xl">🔧</div>
              <h2 className="text-2xl md:text-3xl font-bold">Technologies Used</h2>
            </div>
            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4"
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <div 
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    style={{
                      boxShadow: "0 0 8px rgba(147, 51, 234, 0.6)"
                    }}
                  ></div>
                  <span className="font-semibold text-white">{tech.name}</span>
                  <span className="text-gray-400">–</span>
                  <span className="text-gray-300">{tech.description}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;