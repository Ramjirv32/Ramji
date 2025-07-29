import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaPlane, FaHotel, FaCalendarAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Pro5 = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
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
      icon: "✈️",
      title: "AI-Powered Recommendations",
      description: "Smart travel suggestions based on user preferences, past bookings, and current trends."
    },
    {
      icon: "🔍",
      title: "Real-Time Search Integration",
      description: "Live data from Serper API to provide up-to-date information on flights, hotels, and attractions."
    },
    {
      icon: "📱",
      title: "Seamless Booking Experience",
      description: "Intuitive interface for booking flights, hotels, and activities with automated confirmation."
    },
    {
      icon: "📧",
      title: "Email Notifications",
      description: "Automated email confirmations, reminders, and travel updates for booked itineraries."
    },
    {
      icon: "👨‍💼",
      title: "Admin Dashboard",
      description: "Comprehensive management panel for monitoring bookings, user activity, and platform analytics."
    },
    {
      icon: "🔄",
      title: "Dynamic Pricing",
      description: "Real-time price updates and comparison to ensure competitive rates for travelers."
    }
  ];

  const technologies = [
    { name: "React & TypeScript", description: "Frontend framework with type safety" },
    { name: "Node.js & Express", description: "Backend server architecture" },
    { name: "Serper API", description: "Real-time travel data integration" },
    { name: "MongoDB", description: "Database for user profiles and bookings" },
    { name: "JWT Authentication", description: "Secure user and admin access" },
    { name: "Nodemailer", description: "Email notification system" },
    { name: "OpenAI API", description: "AI-powered recommendations and assistance" },
    { name: "Redux Toolkit", description: "State management for complex workflows" }
  ];

  return (
    <>
      <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
        {/* Background Glowing Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main background glow */}
          <div
            className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, rgba(255, 107, 107, 0.1) 50%, transparent 80%)",
              animationDuration: "4s"
            }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(0, 191, 255, 0.25) 0%, rgba(0, 191, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "3.5s",
              animationDelay: "1.5s"
            }}
          />
          {/* Floating accent glows */}
          <div
            className="absolute top-1/5 left-1/5 w-32 h-32 rounded-full blur-2xl animate-pulse"
            style={{
              background: "rgba(255, 107, 107, 0.2)",
              animationDuration: "2.8s",
              animationDelay: "0.8s"
            }}
          />
          <div
            className="absolute bottom-1/6 right-1/6 w-24 h-24 rounded-full blur-xl animate-pulse"
            style={{
              background: "rgba(0, 191, 255, 0.2)",
              animationDuration: "3.2s",
              animationDelay: "2.2s"
            }}
          />
        </div>

        {/* Back Button with glow */}
        <div className="fixed top-6 left-6 z-50" data-aos="fade-down">
          <button 
            onClick={goBack} 
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 border border-[#FF6B6B]/40"
            style={{
              boxShadow: "0 0 15px rgba(255, 107, 107, 0.3)"
            }}
          >
            <FaArrowLeft />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Header with glow */}
        <header className="relative z-10 flex justify-center items-center p-6 md:p-8 pt-20 bg-black/50 backdrop-blur-md border-b border-[#FF6B6B]/30" data-aos="fade-down" data-aos-delay="200">
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-lg flex items-center justify-center"
              style={{
                boxShadow: "0 0 20px rgba(255, 107, 107, 0.6)"
              }}
            >
              <FaPlane className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold">Wistravel</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8" data-aos="fade-up">
              <span 
                className="bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  boxShadow: "0 0 10px rgba(255, 107, 107, 0.3)"
                }}
              >
                July 2024
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#FF6B6B] to-white bg-clip-text text-transparent" data-aos="fade-up" data-aos-delay="200">
              Wistravel
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
              An AI-powered travel booking platform that simplifies trip planning with real-time data,
              personalized recommendations, and a seamless booking experience.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-12" data-aos="fade-up" data-aos-delay="600">
              {["React", "TypeScript", "Node.js", "MongoDB", "Serper API", "OpenAI"].map((tech, index) => (
                <span 
                  key={tech} 
                  className="bg-white/10 backdrop-blur-sm border border-[#FF6B6B]/30 px-4 py-2 rounded-full text-sm"
                  style={{
                    boxShadow: "0 0 8px rgba(255, 107, 107, 0.2)"
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
              className="bg-[#FF6B6B]/10 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto"
              style={{
                boxShadow: "0 0 20px rgba(255, 107, 107, 0.2)"
              }}
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🌍</div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Revolutionizing Travel Planning</h3>
                  <p className="text-gray-300">
                    Wistravel transforms how people plan and book their travels by leveraging AI and real-time data.
                    The platform analyzes user preferences, market trends, and available options to recommend
                    personalized travel plans, while automating the booking process and providing comprehensive
                    travel management tools.
                  </p>
                </div>
              </div>
            </div>

            {/* Project links with glow - Coming Soon */}
            <div className="flex flex-wrap gap-4 justify-center mb-12" data-aos="fade-up" data-aos-delay="1000">
              <div 
                className="flex items-center space-x-2 bg-gray-800/80 px-6 py-3 rounded-full border border-[#FF6B6B]/30 cursor-not-allowed opacity-90"
                style={{
                  boxShadow: "0 0 15px rgba(255, 107, 107, 0.3)"
                }}
              >
                <FaGithub className="text-xl" />
                <span>GitHub - Coming Soon</span>
              </div>
              <div 
                className="flex items-center space-x-2 bg-gradient-to-r from-[#FF6B6B]/80 to-[#FF8E53]/80 px-6 py-3 rounded-full cursor-not-allowed opacity-90"
                style={{
                  boxShadow: "0 0 20px rgba(255, 107, 107, 0.5)"
                }}
              >
                <FaExternalLinkAlt />
                <span>Live Demo - Coming Soon</span>
              </div>
            </div>

            {/* Project mockup with glow */}
            <div className="mb-16" data-aos="zoom-in" data-aos-delay="1200">
              <img 
                src="/assets/wistravel-mockup.png" 
                alt="Wistravel Platform Mockup"
                className="w-full max-h-[600px] object-contain object-center rounded-xl shadow-xl border border-[#FF6B6B]/40"
                style={{
                  boxShadow: "0 0 30px rgba(255, 107, 107, 0.3)"
                }}
              />
            </div>
          </section>

          {/* Key Features Grid with glow */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" data-aos="fade-up">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-[#FF6B6B]/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  style={{
                    boxShadow: "0 0 15px rgba(255, 107, 107, 0.1)"
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

          {/* Platform Overview */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6" data-aos="fade-right">
                <h2 className="text-2xl md:text-3xl font-bold">User Journey</h2>
                <div className="space-y-4">
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B6B]/20">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF6B6B] flex items-center justify-center text-xs font-bold mr-3">1</div>
                      <h3 className="font-semibold">Profile Creation & Preferences</h3>
                    </div>
                    <p className="text-sm text-gray-300 pl-9">Users set up their profiles with travel preferences, budget constraints, and favorite destinations.</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B6B]/20">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF6B6B] flex items-center justify-center text-xs font-bold mr-3">2</div>
                      <h3 className="font-semibold">AI-Powered Search</h3>
                    </div>
                    <p className="text-sm text-gray-300 pl-9">The platform uses Serper API to gather real-time travel data and applies AI to filter and rank options.</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B6B]/20">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF6B6B] flex items-center justify-center text-xs font-bold mr-3">3</div>
                      <h3 className="font-semibold">Personalized Recommendations</h3>
                    </div>
                    <p className="text-sm text-gray-300 pl-9">Users receive tailored travel suggestions based on their preferences and current travel trends.</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B6B]/20">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF6B6B] flex items-center justify-center text-xs font-bold mr-3">4</div>
                      <h3 className="font-semibold">One-Click Booking</h3>
                    </div>
                    <p className="text-sm text-gray-300 pl-9">Streamlined booking process with automated confirmation emails and travel documentation.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6" data-aos="fade-left">
                <h2 className="text-2xl md:text-3xl font-bold">Admin Features</h2>
                <div className="space-y-4">
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B6B]/20">
                    <div className="flex items-center mb-2">
                      <FaCalendarAlt className="text-[#FF6B6B] mr-3" />
                      <h3 className="font-semibold">Booking Management</h3>
                    </div>
                    <p className="text-sm text-gray-300 pl-9">Comprehensive dashboard to view, modify, and manage all user bookings.</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B6B]/20">
                    <div className="flex items-center mb-2">
                      <FaHotel className="text-[#FF6B6B] mr-3" />
                      <h3 className="font-semibold">Inventory Control</h3>
                    </div>
                    <p className="text-sm text-gray-300 pl-9">Tools to manage available flights, accommodations, and activities in real-time.</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B6B]/20">
                    <div className="flex items-center mb-2">
                      <FaMapMarkedAlt className="text-[#FF6B6B] mr-3" />
                      <h3 className="font-semibold">Analytics Dashboard</h3>
                    </div>
                    <p className="text-sm text-gray-300 pl-9">Detailed metrics on bookings, user behavior, and revenue with visual reporting.</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B6B]/20">
                    <div className="flex items-center mb-2">
                      <FaPlane className="text-[#FF6B6B] mr-3" />
                      <h3 className="font-semibold">Travel Package Creator</h3>
                    </div>
                    <p className="text-sm text-gray-300 pl-9">Tools for creating and promoting special travel packages and deals.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technologies Section */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="flex items-center space-x-3 mb-8" data-aos="fade-up">
              <div className="text-2xl">⚙️</div>
              <h2 className="text-2xl md:text-3xl font-bold">Technology Stack</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B6B]/20 hover:border-[#FF6B6B]/40 transition-colors"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <h4 className="font-medium text-[#FF6B6B] mb-2">{tech.name}</h4>
                  <p className="text-sm text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Development Status */}
          <section className="max-w-6xl mx-auto py-16">
            <div 
              className="bg-[#FF6B6B]/10 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-8"
              style={{
                boxShadow: "0 0 20px rgba(255, 107, 107, 0.2)"
              }}
              data-aos="fade-up"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-3 w-3 bg-[#FF6B6B] rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold">Project Status: In Development</h2>
              </div>
              <p className="text-gray-300 mb-4">
                Wistravel is currently in active development with core features being implemented and tested.
                The platform is being built with scalability and performance in mind, designed to handle
                thousands of simultaneous users and integrate with multiple travel service providers.
              </p>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Coming in Next Release:</h3>
                <ul className="text-gray-300 space-y-1 list-disc list-inside">
                  <li>Mobile application for iOS and Android</li>
                  <li>Integration with additional payment gateways</li>
                  <li>Expanded AI-powered recommendation engine</li>
                  <li>Multi-language support for global travelers</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
        
      </div>
      <Footer />
    </>
  );
};

export default Pro5;