import { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Internship {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
  image: string;
  skills: string[];
  route: string;
  bgColor: string;
  current?: boolean;
  type?: string;
}

interface InternshipCardProps {
  internship: Internship;
  index: number;
}

export const InternshipCard: FC<InternshipCardProps> = ({ internship, index }) => {
  // Generate a unique color for each internship
  const getInternshipColor = (company: string, type: string = 'internship'): string => {
    if (company === "Society for Cyber Intelligent Systems") return "#4169E1"; // Royal Blue
    if (company === "Oodser Technologies") return "#8A2BE2"; // Blue Violet
    if (company === "Luxor Holiday Homes") return "#FF8C00"; // Dark Orange
    
    // Default colors based on type
    return type === 'freelance' ? "#FF7F50" : "#00BFFF"; // Coral or Default Blue
  };

  const cardColor = getInternshipColor(internship.company, internship.type);

  return (
    <div 
      className="group flex flex-col h-full rounded-2xl bg-[#151030]/80 backdrop-blur-sm p-5 border border-[#00BFFF]/20 hover:shadow-xl transition-all duration-300 cursor-pointer internship-card"
      style={{
        '--card-color': cardColor,
        '--glow-x': '50%', 
        '--glow-y': '50%',
        '--glow-opacity': '0'
      } as React.CSSProperties}
      onMouseMove={(e) => {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        e.currentTarget.style.setProperty('--glow-x', `${x}%`);
        e.currentTarget.style.setProperty('--glow-y', `${y}%`);
        e.currentTarget.style.setProperty('--glow-opacity', '0.3'); // Reduced from 0.4 to 0.3
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty('--glow-opacity', '0');
      }}
    >
      {/* Card content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Increased image size and changed layout */}
        <div className="w-full h-44 mb-4 rounded-xl overflow-hidden border border-[var(--card-color)]/20">
          <img 
            src={internship.image}
            alt={internship.company}
            className="w-full h-full object-cover"
          />
          
          {internship.current && (
            <div className="absolute top-3 right-3">
              <span className="bg-[var(--card-color)]/70 text-white text-xs px-3 py-1 rounded-full flex items-center shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1.5"></span>
                {internship.type === 'freelance' ? 'Active Project' : 'Current'}
              </span>
            </div>
          )}
        </div>
        
        <h3 className="text-white font-bold text-xl mb-1">{internship.title}</h3>
        <p className="text-[var(--card-color)] font-medium mb-3">{internship.company}</p>
        <p className="text-gray-400 text-sm mb-2">{internship.duration}</p>
        
        <p className="text-gray-300 mb-4 flex-grow">{internship.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {internship.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="px-3 py-1 bg-[var(--card-color)]/10 text-[var(--card-color)] text-xs rounded-full border border-[var(--card-color)]/20">
              {skill}
            </span>
          ))}
          {internship.skills.length > 3 && (
            <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-full">
              +{internship.skills.length - 3}
            </span>
          )}
        </div>
        
        <Link 
          to={internship.route}
          className="mt-auto flex justify-between items-center w-full text-sm text-[var(--card-color)] hover:text-white group-hover:text-white transition-colors duration-300"
        >
          <span>View details</span>
          <div className="w-8 h-8 rounded-full bg-[var(--card-color)]/10 flex items-center justify-center transform group-hover:bg-[var(--card-color)] group-hover:translate-x-1 transition-all duration-300">
            <FaArrowRight size={14} />
          </div>
        </Link>
      </div>
      
      {/* Glow effect - reduced opacity and increased transparency */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-2xl z-0"
        style={{
          background: `radial-gradient(circle at var(--glow-x) var(--glow-y), var(--card-color) 0%, transparent 90%)`, // Increased transparency (90% instead of 85%)
          opacity: 'var(--glow-opacity)',
          transition: 'opacity 0.3s ease',
        }}
      ></div>
      
      <style>{`
        .internship-card {
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
          transition: all 0.3s ease;
          min-height: 500px; /* Increased card minimum height */
        }
        
        .internship-card:hover {
          transform: translateY(-3px); /* Reduced from -5px to -3px */
          box-shadow: 
            0 10px 20px -8px rgba(0, 0, 0, 0.3), /* Reduced shadow intensity */
            0 0 5px rgba(var(--card-color-rgb, 0, 191, 255), 0.1), /* Reduced from 8px to 5px and 0.15 to 0.1 */
            0 0 10px rgba(var(--card-color-rgb, 0, 191, 255), 0.05); /* Reduced from 15px to 10px and 0.1 to 0.05 */
          border-color: rgba(var(--card-color-rgb, 0, 191, 255), 0.4); /* Reduced from 0.5 to 0.4 */
        }
        
        /* Glow border effect on hover - reduced opacity */
        .internship-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px; /* Kept at 1px */
          border-radius: 16px;
          background: linear-gradient(
            to bottom right,
            var(--card-color) 0%,
            transparent 70%, /* More transparent gradient (60% to 70%) */
            var(--card-color) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .internship-card:hover::after {
          opacity: 0.3; /* Reduced from 0.4 to 0.3 */
        }
      `}</style>
    </div>
  );
};

export default InternshipCard;
