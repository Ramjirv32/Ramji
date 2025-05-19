import StarsCanvas from './components/Animations/Star';
import HeroContent from './components/Hero';
import Navbar from './components/Navbar';
import "./App.css"
import "./styles/globals.css"
import Skills from './components/skills';
import About from './components/About';
import Projects from './components/Projects';
const App = () => {
  return (
    <main className="min-h-screen w-full bg-[#030014] overflow-x-hidden">
      <Navbar/>
      <StarsCanvas />
      <HeroContent />
      <Skills/>
      <Projects/>
      <About/>
    </main>
  )
}

export default App
