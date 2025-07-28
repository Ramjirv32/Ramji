import { FaArrowLeft, FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";

const Society = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/', { state: { scrollTo: 'works' } });
    
    setTimeout(() => {
      const worksSection = document.getElementById('works');
      if (worksSection) {
        worksSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
        {/* Back Button */}
        <div className="fixed top-6 left-6 z-50">
          <button 
            onClick={goBack} 
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 border border-[#00BFFF]/40"
          >
            <FaArrowLeft />
            <span>Back to Journey</span>
          </button>
        </div>

        {/* Add your content here similar to other internship pages */}
        {/* ... */}
      </div>
      <Footer />
    </>
  );
};

export default Society;