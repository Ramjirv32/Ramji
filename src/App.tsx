import StarsCanvas from './components/Animations/Star';
import HeroContent from './components/Hero';
import Navbar from './components/Navbar';
// import Planet from './components/Planet';
import "./App.css"
import Skills from './components/skills';
import About from './components/About';
const App = () => {
  return (
    <main className="min-h-screen w-full bg-[#030014] overflow-x-hidden">
      <Navbar/>
      <StarsCanvas />
      <HeroContent />
      <Skills/>
      <About/>
      {/* <Planet /> */}
    </main>
  )
}

export default App
