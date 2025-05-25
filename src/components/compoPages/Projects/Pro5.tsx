import React from 'react';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Navbar from "../../Navbar";
import Footer from "../../Footer";

const Index = () => {
  
  const goBack = () => {
    if (typeof window.closeProjectDetails === 'function') {
      window.closeProjectDetails();
    } else {
      // Fallback if global function isn't available
      window.location.reload();
    }
  };

  const features = [
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Multiple AI services integrated for enhanced functionality."
    },
    {
      icon: "💬",
      title: "Conversational UI",
      description: "Natural language processing for intuitive user interactions."
    },
    {
      icon: "✨",
      title: "Modern Design",
      description: "Clean and intuitive UI/UX focused on user experience."
    },
    {
      icon: "📊",
      title: "Data Visualization",
      description: "Interactive charts and graphs for data representation."
    },
    {
      icon: "🔄",
      title: "Real-time Processing",
      description: "Instant AI responses with minimal latency."
    },
    {
      icon: "📱",
      title: "Responsive Layout",
      description: "Optimized for all devices from mobile to desktop."
    }
  ];

  const technologies = [
    { name: "React", description: "Frontend UI library" },
    { name: "AI APIs", description: "Various artificial intelligence services" },
    { name: "Node.js", description: "Backend server architecture" },
    { name: "PostgreSQL", description: "Relational database for data storage" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white overflow-hidden">
        {/* Header */}
       
          
      
      

        {/* Main Content */}
        <main className="relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8">
              <span className="bg-indigo-500/20 border border-indigo-500/30 px-4 py-2 rounded-full text-sm font-medium">
                October 2023 - Present
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
              AI-Integrated Application
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              A comprehensive platform that leverages multiple AI technologies to provide advanced 
              features like natural language processing, image recognition, and predictive analytics
              in a seamless user experience.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {["React", "AI APIs", "Node.js", "PostgreSQL"].map((tech) => (
                <span key={tech} className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>

            {/* Project highlight card */}
            <div className="bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🧠</div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">AI at Your Fingertips</h3>
                  <p className="text-gray-300">
                    This application brings powerful AI capabilities to users in an accessible interface.
                    From natural language processing to advanced data analysis, the platform demonstrates
                    how AI technologies can be integrated to create useful and intuitive applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Project links */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a 
                href="https://github.com/Ramjirv32/AI-Intergrated-Application" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-300"
              >
                <FaGithub className="text-xl" />
                <span>View on GitHub</span>
              </a>
              <a 
                href="https://ai-intergrated-application-qwuv.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
              >
                <FaExternalLinkAlt />
                <span>View Live Demo</span>
              </a>
            </div>

            {/* Project image */}
            <div className="mb-16">
              <img 
                src="/assets/ai.png"
                alt="AI-Integrated Application"
                className="w-full max-h-[600px] object-contain object-center rounded-xl shadow-xl border border-indigo-500/20"
              />
            </div>
          </section>

          {/* Features Grid */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
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
            <div className="flex items-center space-x-3 mb-8">
              <div className="text-2xl">🔧</div>
              <h2 className="text-2xl md:text-3xl font-bold">Technologies Used</h2>
            </div>
            
            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full"></div>
                  <span className="font-semibold text-white">{tech.name}</span>
                  <span className="text-gray-400">–</span>
                  <span className="text-gray-300">{tech.description}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-16 text-gray-400">
            <p className="mb-4">October 2023 - Present</p>
            <p>&copy; 2023 Ramji. Built with React and AI technologies.</p>
          </footer>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;
