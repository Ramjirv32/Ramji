import Works from '../components/Works';
import StarsCanvas from '../components/Animations/Star';
import Navbar from '../components/Navbar';

const InternshipsPage = () => {
  return (
    <div className="bg-[#030014]">
      <Navbar activeSection="" setActiveSection={() => {}} isScrollingProgrammatically={{ current: false }} />
      <StarsCanvas />
      <div className="pt-20">
        <Works />
      </div>
    </div>
  );
};

export default InternshipsPage;
