import React from 'react';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Navbar from "../../Navbar";
import Footer from "../../Footer";

const Index = () => {
  // Use the global function to go back
  const goBack = () => {
    if (typeof window.closeProjectDetails === 'function') {
      window.closeProjectDetails();
    } else {
      // Fallback if global function isn't available
      window.location.reload();
    }
  };
  
  // Features and technologies remain the same...
  const features = [
    {
      icon: "🚗",
      title: "Real-time Tracking",
      description: "IoT integration for tracking available parking spaces in real-time."
    },
    {
      icon: "🔖",
      title: "Reservation System",
      description: "Advanced booking system with time slots and automated confirmation."
    },
    {
      icon: "💳",
      title: "Payment Integration",
      description: "Secure payment processing for parking reservations."
    },
    {
      icon: "📱",
      title: "Responsive UI",
      description: "Mobile-optimized interface for on-the-go booking and management."
    },
    {
      icon: "📊",
      title: "Admin Dashboard",
      description: "Comprehensive analytics and management tools for parking operators."
    },
    {
      icon: "🔐",
      title: "User Authentication",
      description: "Secure user accounts with profile management and booking history."
    }
  ];

  const technologies = [
    { name: "React", description: "Frontend framework for UI components" },
    { name: "Node.js", description: "Backend server architecture" },
    { name: "IoT", description: "Sensors and hardware integration" },
    { name: "PostgreSQL", description: "Database for user and reservation data" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-6 md:p-8 bg-black/50 backdrop-blur-md border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold">Smart Parking System</span>
          </div>
          
          <button 
            onClick={goBack} 
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-300"
          >
            <FaArrowLeft />
            <span>Back to Projects</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8">
              <span className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full text-sm font-medium">
                April 2023 - July 2023
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
              Smart Parking System
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              A full-stack parking management platform that integrates IoT technology for real-time 
              tracking of parking spaces, allowing users to find, book, and pay for parking spots seamlessly.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {["React", "Node.js", "IoT", "PostgreSQL"].map((tech) => (
                <span key={tech} className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>

            {/* Project highlight card */}
            <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🚦</div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">IoT-Enabled Solution</h3>
                  <p className="text-gray-300">
                    This system combines hardware sensors with a sophisticated web platform to create a 
                    comprehensive parking management solution. Users can view available spaces in real-time,
                    make reservations, and access the facility with automated entry/exit systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Project links */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a 
                href="https://github.com/Ramjirv32/Smart-Parking-System" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-300"
              >
                <FaGithub className="text-xl" />
                <span>View on GitHub</span>
              </a>
              <a 
                href="https://parking-orcin-tau.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 rounded-full hover:from-green-700 hover:to-blue-700 transition-all duration-300"
              >
                <FaExternalLinkAlt />
                <span>View Live Demo</span>
              </a>
            </div>

            {/* Project image */}
            <div className="mb-16">
              <img 
                src="/assets/aadhya.png"
                alt="Smart Parking System"
                className="w-full max-h-[600px] object-contain object-center rounded-xl shadow-xl border border-green-500/20"
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
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <span className="font-semibold text-white">{tech.name}</span>
                  <span className="text-gray-400">–</span>
                  <span className="text-gray-300">{tech.description}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-16 text-gray-400">
            <p className="mb-4">July 2023</p>
            <p>&copy; 2023 Ramji. Built with React, Node.js, and IoT technologies.</p>
          </footer>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;
