import Project from '../components/Project';
import StarsCanvas from '../components/Animations/Star';
import Navbar from '../components/Navbar';

const ProjectsPage = () => {
  return (
    <div className="bg-[#030014]">
      <Navbar activeSection="" setActiveSection={() => {}} isScrollingProgrammatically={{ current: false }} />
      <StarsCanvas />
      <div className="pt-20">
        <Project />
      </div>
    </div>
  );
};

export default ProjectsPage;
