import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 200,
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
      <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
        {/* Background Glowing Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main background glow */}
          <div
            className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, rgba(0, 191, 255, 0.1) 50%, transparent 80%)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(30, 144, 255, 0.25) 0%, rgba(30, 144, 255, 0.1) 50%, transparent 80%)",
            }}
          />
          {/* Floating accent glows */}
          <div
            className="absolute top-1/6 right-1/6 w-32 h-32 rounded-full blur-2xl animate-pulse"
            style={{
              background: "rgba(0, 191, 255, 0.2)",
            }}
          />
          <div
            className="absolute bottom-1/5 left-1/5 w-24 h-24 rounded-full blur-xl animate-pulse"
            style={{
              background: "rgba(30, 144, 255, 0.2)",
            }}
          />
        </div>

        {/* Back Button with glow */}
        <div className="fixed top-6 left-6 z-50" data-aos="fade-down">
          <button 
            onClick={goBack} 
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 border border-[#00BFFF]/40"
            style={{
              boxShadow: "0 0 15px rgba(0, 191, 255, 0.3)"
            }}
          >
            <FaArrowLeft />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Header with glow */}
        <header className="relative z-10 flex justify-center items-center p-6 md:p-8 pt-20 bg-black/50 backdrop-blur-md border-b border-[#00BFFF]/30" data-aos="fade-down">
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-lg flex items-center justify-center"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.6)"
              }}
            >
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold">Smart Parking System</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24" data-aos="fade-up">
            <div className="mb-8">
              <span 
                className="bg-[#00BFFF]/20 border border-[#00BFFF]/40 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  boxShadow: "0 0 10px rgba(0, 191, 255, 0.3)"
                }}
              >
                April 2023 - July 2023
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#00BFFF] to-white bg-clip-text text-transparent" data-aos="fade-up">
              Smart Parking System
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up">
              A full-stack parking management platform that integrates IoT technology for real-time
              tracking of parking spaces, allowing users to find, book, and pay for parking spots seamlessly.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-12" data-aos="fade-up">
              {["React", "Node.js", "IoT", "PostgreSQL"].map((tech, index) => (
                <span 
                  key={tech} 
                  className="bg-white/10 backdrop-blur-sm border border-[#00BFFF]/30 px-4 py-2 rounded-full text-sm"
                  style={{
                    boxShadow: "0 0 8px rgba(0, 191, 255, 0.2)"
                  }}
                  data-aos="zoom-in"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Project highlight card with glow */}
            <div 
              className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto" 
              data-aos="fade-up"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
              }}
            >
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

            {/* Project links with glow */}
            <div className="flex flex-wrap gap-4 justify-center mb-12" data-aos="fade-up">
              <a 
                href="https://github.com/Ramjirv32/Smart-Parking-System" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-700/80 px-6 py-3 rounded-full transition-all duration-300 border border-[#00BFFF]/30"
                style={{
                  boxShadow: "0 0 15px rgba(0, 191, 255, 0.3)"
                }}
              >
                <FaGithub className="text-xl" />
                <span>View on GitHub</span>
              </a>
              <a 
                href="https://parking-orcin-tau.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] px-6 py-3 rounded-full hover:from-[#1E90FF] hover:to-[#00BFFF] transition-all duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(0, 191, 255, 0.5)"
                }}
              >
                <FaExternalLinkAlt />
                <span>View Live Demo</span>
              </a>
            </div>

            {/* Project image with glow */}
            <div className="mb-16" data-aos="zoom-in">
              <img 
                src="/assets/aadhya.png"
                alt="Smart Parking System"
                className="w-full max-h-[600px] object-contain object-center rounded-xl shadow-xl border border-[#00BFFF]/40"
                style={{
                  boxShadow: "0 0 30px rgba(0, 191, 255, 0.3)"
                }}
              />
            </div>
          </section>

          {/* Features Grid with glow */}
          <section className="max-w-6xl mx-auto py-16" data-aos="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-[#00BFFF]/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105" 
                  data-aos="fade-up"
                  style={{
                    boxShadow: "0 0 15px rgba(0, 191, 255, 0.1)"
                  }}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies Section */}
          <section className="max-w-6xl mx-auto py-16" data-aos="fade-up">
            <div className="flex items-center space-x-3 mb-8">
              <div className="text-2xl">🔧</div>
              <h2 className="text-2xl md:text-3xl font-bold">Technologies Used</h2>
            </div>
            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4" 
                  data-aos="fade-right"
                >
                  <div 
                    className="w-2 h-2 bg-[#00BFFF] rounded-full"
                    style={{
                      boxShadow: "0 0 8px rgba(0, 191, 255, 0.6)"
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