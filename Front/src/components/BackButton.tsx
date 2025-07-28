import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate('/#projects')}
      className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-full hover:bg-black/70 transition-all duration-300 group"
    >
      <span className="text-cyan-500 text-xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
      <span className="text-white">Back to Projects</span>
    </button>
  );
};

export default BackButton;