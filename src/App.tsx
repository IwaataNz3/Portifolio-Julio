import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import ExperienceSection from './sections/ExperienceSection'
import ContactSection from './sections/ContactSection'
import DownloadSection from './sections/DownloadSection'
import NoiseOverlay from './components/NoiseOverlay'
import CustomCursor from './components/CustomCursor'

function App() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <DownloadSection />
      </main>
    </>
  )
}

export default App
