import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaBuilding } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import type { Internship } from "../types/internship";

interface InternshipCardProps {
  internship: Internship;
  index: number;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship, index }) => {
  const navigate = useNavigate();
  
  const fadeIn = (direction: string, type: string, delay: number, duration: number) => {
    return {
      hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };

  const handleCardClick = () => {
    console.log("🚀 Navigating to:", internship.route);
    navigate(internship.route);
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className="w-full h-full cursor-pointer flex justify-center"
      onClick={handleCardClick}
    >
      <div className="w-full max-w-2xl bg-[#030014]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 transition-all duration-300 transform hover:scale-[1.02] h-full flex flex-col group">
        {/* Background glow effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${internship.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
          style={{
            boxShadow: "0 0 30px rgba(0, 191, 255, 0.2)"
          }}
        />
        
        {/* Image Section */}
        <div className="relative w-full h-[200px] overflow-hidden">
          <img
            src={internship.image}
            alt={internship.company}
            className="w-full h-full object-contain bg-[#030014] group-hover:scale-110 transition-transform duration-300"
            style={{
              padding: "20px"
            }}
            onError={(e) => {
              e.currentTarget.src = '/fallback-image.png'
              console.error('Failed to load image:', internship.image)
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent"></div>
          
          {/* Company icon */}
          <div 
            className="absolute bottom-4 left-4 p-3 rounded-full border border-[#00BFFF]/40"
            style={{
              background: "rgba(0, 191, 255, 0.1)",
              boxShadow: "0 0 15px rgba(0, 191, 255, 0.3)"
            }}
          >
            <FaBuilding className="text-[#00BFFF] text-xl" />
          </div>
          
          {/* External link indicator */}
          <div className="absolute top-4 right-4">
            <div 
              className="p-2 rounded-full border border-[#00BFFF]/40 backdrop-blur-sm"
              style={{
                background: "rgba(0, 191, 255, 0.1)",
                boxShadow: "0 0 10px rgba(0, 191, 255, 0.2)"
              }}
            >
              <FaExternalLinkAlt className="text-[#00BFFF] text-sm" />
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-8 flex-1 flex flex-col items-center text-center">
          <div className="w-full flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-400">{internship.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <FaBuilding className="text-sm" />
              <span className="text-sm">{internship.company}</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">{internship.title}</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">{internship.description}</p>
          
          {/* Skills */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {internship.skills.slice(0, 4).map((skill: string, i: number) => (
                <span 
                  key={`skill-${i}`}
                  className="px-3 py-1 text-xs rounded-full border border-[#00BFFF]/30 text-[#00BFFF]"
                  style={{
                    background: "rgba(0, 191, 255, 0.1)",
                    boxShadow: "0 0 5px rgba(0, 191, 255, 0.2)"
                  }}
                >
                  {skill}
                </span>
              ))}
              {internship.skills.length > 4 && (
                <span 
                  className="px-3 py-1 text-xs rounded-full border border-[#00BFFF]/30 text-[#00BFFF]"
                  style={{
                    background: "rgba(0, 191, 255, 0.1)"
                  }}
                >
                  +{internship.skills.length - 4}
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#00BFFF] group-hover:text-white transition-colors">
                Click to explore →
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
