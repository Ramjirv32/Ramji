import { FaArrowLeft, FaExternalLinkAlt, FaCalendarAlt, FaServer, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LuxorHoliday = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
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
      icon: "🏡",
      title: "Full-Stack Development",
      description: "Developed a complete homestay booking platform with React.js frontend and Node.js/Express backend, ensuring seamless user experience and robust performance."
    },
    {
      icon: "🔒",
      title: "Security Implementation",
      description: "Integrated Cloudflare protection, SSL encryption, and custom middleware to ensure top-notch security for user data and transactions."
    },
    {
      icon: "💳",
      title: "Payment Integration",
      description: "Successfully implemented Razorpay payment gateway for secure and smooth booking transactions."
    },
    {
      icon: "🌐",
      title: "Deployment & Optimization",
      description: "Deployed frontend on Vercel and configured custom domain with optimized performance and SEO best practices."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Ensured the platform is fully responsive and provides excellent user experience across all device sizes."
    },
    {
      icon: "🔄",
      title: "Real-time Updates",
      description: "Implemented real-time booking status updates and notifications for both guests and property owners."
    }
  ];

  const technologies = [
    { name: "React.js", description: "Frontend development with modern React hooks and context API" },
    { name: "Node.js & Express", description: "Robust backend server with RESTful API endpoints" },
    { name: "MongoDB", description: "NoSQL database for flexible data storage and retrieval" },
    { name: "Razorpay", description: "Secure payment processing integration" },
    { name: "Cloudflare", description: "Security, DDoS protection, and performance optimization" },
    { name: "Vercel", description: "Frontend deployment and hosting" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for responsive design" },
    { name: "JWT", description: "Secure authentication and authorization" }
  ];

  const projectPhases = [
    {
      date: "Q1 2024",
      title: "Project Conception",
      description: "Identified the need for a modern homestay booking platform and planned the technical architecture."
    },
    {
      date: "Q2 2024",
      title: "Core Development",
      description: "Developed the core booking functionality, user authentication, and property management features."
    },
    {
      date: "Q3 2024",
      title: "Payment Integration",
      description: "Integrated Razorpay payment gateway and implemented secure transaction flows."
    },
    {
      date: "Q3 2024",
      title: "Security & Deployment",
      description: "Added Cloudflare protection, SSL, and deployed the application on Vercel with custom domain."
    }
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
              background: "radial-gradient(circle, rgba(0, 150, 255, 0.2) 0%, rgba(0, 150, 255, 0.05) 50%, transparent 80%)",
              animationDuration: "6s",
              animationDelay: "1s"
            }}
          />
        </div>

        {/* Navigation */}
        <div className="relative z-10" data-aos="fade-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={goBack}
              className="flex items-center text-gray-300 hover:text-white transition-colors mb-8 group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
              Luxor Holiday Homestay
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              A full-stack homestay booking platform with secure payments and real-time availability
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center text-sm bg-gray-800/50 px-4 py-2 rounded-full">
                <FaCalendarAlt className="mr-2 text-[#00BFFF]" />
                <span>2024 - Present</span>
              </div>
              <div className="flex items-center text-sm bg-gray-800/50 px-4 py-2 rounded-full">
                <FaServer className="mr-2 text-[#00BFFF]" />
                <span>Full Stack Development</span>
              </div>
              <div className="flex items-center text-sm bg-gray-800/50 px-4 py-2 rounded-full">
                <FaServer className="mr-2 text-[#00BFFF]" />
                <span>Secure Payments</span>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-4" data-aos="fade-up" data-aos-delay="400">
              <div
                className="flex items-center px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-medium cursor-default"
              >
                <FaLock className="mr-2" />
                Website Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Overview */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-800" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-[#00BFFF]">Project Overview</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg">
                Luxor Holiday Homestay is a comprehensive booking platform that connects travelers with unique homestay experiences.
                As a co-founder and lead developer, I was responsible for architecting and implementing the entire technology stack,
                from the responsive frontend to the secure backend infrastructure.
              </p>
              <p className="mt-4">
                The platform features real-time availability, secure online payments, and an intuitive admin dashboard for property management.
                We've prioritized security and performance, implementing Cloudflare protection, SSL encryption, and optimized asset delivery.
              </p>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">
              Key <span className="text-[#00BFFF]">Achievements</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#00BFFF]/30 transition-all hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-300">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">
              Technologies <span className="text-[#00BFFF]">Used</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-800 hover:border-[#00BFFF]/30 transition-colors"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <h4 className="font-medium text-[#00BFFF]">{tech.name}</h4>
                  <p className="text-sm text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">
              Project <span className="text-[#00BFFF]">Timeline</span>
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 w-1 h-full bg-gray-800 transform -translate-x-1/2"></div>
              {projectPhases.map((phase, index) => (
                <div
                  key={index}
                  className={`relative mb-8 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}
                  style={{ marginLeft: index % 2 === 0 ? '0' : '50%' }}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={index * 200}
                >
                  <div
                    className="absolute top-0 w-4 h-4 bg-[#00BFFF] rounded-full transform -translate-y-1/2"
                    style={{ [index % 2 === 0 ? 'right' : 'left']: '-2px' }}
                  ></div>
                  <div className={`bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 max-w-lg ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                    <div className="text-amber-400 font-medium mb-1">{phase.date}</div>
                    <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                    <p className="text-gray-300">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section (Instead of Gallery) */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">
              Key <span className="text-[#00BFFF]">Features</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Secure Booking System", description: "End-to-end encrypted booking flow with payment protection" },
                { title: "Property Management", description: "Comprehensive dashboard for property owners to manage listings and bookings" },
                { title: "User Profiles", description: "Personalized user accounts with booking history and preferences" },
                { title: "Instant Confirmations", description: "Real-time availability updates and booking confirmations" },
                { title: "Advanced Search", description: "Filter properties by location, amenities, price range, and availability" },
                { title: "Review System", description: "Verified guest reviews to maintain quality and trust" }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#00BFFF]/30 transition-all"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#00BFFF]">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Project Status */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800" data-aos="fade-up">
            <div className="flex items-center mb-4">
              <div className="h-4 w-4 rounded-full bg-amber-400 animate-pulse mr-3"></div>
              <h2 className="text-2xl font-bold">Project Status: In Development</h2>
            </div>
            <p className="text-gray-300">
              The Luxor Holiday Homestay platform is currently in active development with core features implemented.
              We're working on final testing, content population, and performance optimization before the official launch.
              Stay tuned for the public release soon.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LuxorHoliday;