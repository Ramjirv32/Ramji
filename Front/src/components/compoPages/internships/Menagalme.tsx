import React from 'react';
import { FaArrowLeft, FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Menagalme: React.FC = () => {
  return (
    <div className="bg-primary text-white min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Back button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-[#00BFFF] hover:text-[#0099cc] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        {/* Header */}
        <div className="mb-10 border-b border-gray-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Web Developer Intern</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-gray-300">
            <div className="flex items-center">
              <span className="text-[#00BFFF] font-semibold text-xl md:text-2xl mr-2">Mehalang</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-[#00BFFF]" />
              <span>May 2023 - June 2023</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#00BFFF]">About The Internship</h2>
              <p className="mb-4 text-gray-300 leading-relaxed">
                During my 1.5-month internship at Mehalang, I contributed to web development projects 
                focusing on frontend implementation and responsive design. I worked with modern frameworks 
                to create user-friendly interfaces and improved my skills in web technologies.
              </p>
              <p className="mb-4 text-gray-300 leading-relaxed">
                This internship provided valuable experience in building responsive web applications 
                and helped me develop my skills in React and modern UI/UX design principles.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#00BFFF]">Key Responsibilities</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center mr-2 mt-0.5">
                    <div className="w-2 h-2 bg-[#00BFFF] rounded-full"></div>
                  </div>
                  <span>Developed responsive user interfaces using React and CSS frameworks</span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center mr-2 mt-0.5">
                    <div className="w-2 h-2 bg-[#00BFFF] rounded-full"></div>
                  </div>
                  <span>Collaborated with designers to implement UI/UX improvements</span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center mr-2 mt-0.5">
                    <div className="w-2 h-2 bg-[#00BFFF] rounded-full"></div>
                  </div>
                  <span>Assisted in optimizing website performance and user experience</span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center mr-2 mt-0.5">
                    <div className="w-2 h-2 bg-[#00BFFF] rounded-full"></div>
                  </div>
                  <span>Participated in code reviews and implementation planning</span>
                </li>
              </ul>
            </section>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-[#00BFFF]">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React', 'CSS', 'Responsive Design', 'UI/UX', 'Frontend Development'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-[#00BFFF] mt-8">Skills Gained</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#00BFFF] rounded-full mr-2"></div>
                  <span>Frontend Development</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#00BFFF] rounded-full mr-2"></div>
                  <span>Responsive Web Design</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#00BFFF] rounded-full mr-2"></div>
                  <span>UI/UX Implementation</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#00BFFF] rounded-full mr-2"></div>
                  <span>Cross-browser Compatibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menagalme;