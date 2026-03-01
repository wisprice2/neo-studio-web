import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle } from 'lucide-react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Manifesto from './components/Manifesto'
import Archive from './components/Archive'
import Footer from './components/Footer'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

function App() {

  // Set up global scroll smoothing/config if necessary
  useLayoutEffect(() => {
    // This context ensures GSAP animations are cleaned up on unmount
    const ctx = gsap.context(() => {
      // Global GSAP stuff here if needed later
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Global Noise Overlay */}
      <div className="noise-overlay pointer-events-none" />

      {/* Global WhatsApp Floating Button */}
      <a
        href="https://wa.me/56937278183?text=Hola,%20vengo%20desde%20tu%20p%C3%A1gina%20web.%20Estoy%20interesado%20en%20crear%20una%20p%C3%A1gina%20para%20mi%20negocio%20y%20quisiera%20saber%20disponibilidad,%20tiempos%20y%20valores%20aproximados."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#20bd5a] transition-all duration-300 group"
      >
        <MessageCircle size={32} />
        {/* Ping Animation Indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white/50 border border-white"></span>
        </span>
      </a>

      {/* Primary App Container */}
      <main className="relative w-full overflow-hidden bg-cream selection:bg-moss selection:text-white">
        <Navbar />
        <Hero />
        <Features />
        <Manifesto />
        <Archive />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
