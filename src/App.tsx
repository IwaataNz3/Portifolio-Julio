import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { setLenis } from './lib/lenis'

import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import ExperienceSection from './sections/ExperienceSection'
import ContactSection from './sections/ContactSection'
import DownloadSection from './sections/DownloadSection'
import OffCodeSection from './sections/OffCodeSection'
import NoiseOverlay from './components/NoiseOverlay'
import CustomCursor from './components/CustomCursor'
import CommandPalette from './components/CommandPalette'

function App() {
  useEffect(() => {
    const lenis = new Lenis()
    setLenis(lenis)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <Navbar />
      <CommandPalette />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <OffCodeSection />
        <DownloadSection />
      </main>
    </>
  )
}

export default App
