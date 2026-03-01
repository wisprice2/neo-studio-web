import { useEffect, useState, useRef } from 'react'
import { Activity, Database, Zap, MousePointer2 } from 'lucide-react'

// Sub-component: Diagnostic Deck (Stacking Cards)
function DiagnosticDeck() {
    const [activeIndex, setActiveIndex] = useState(0)
    const cards = [
        { title: "Arquitectura Modular", desc: "Sistemas desacoplados y escalables.", icon: Database },
        { title: "Métricas en Tiempo Real", desc: "Monitorización de performance constante.", icon: Activity },
        { title: "Automatización", desc: "Integración continua y despliegue rápido.", icon: Zap },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % cards.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [cards.length])

    return (
        <div className="relative h-64 w-full max-w-sm mx-auto perspective-1000">
            {cards.map((card, i) => {
                const Icon = card.icon
                const isActive = i === activeIndex
                // Position offset logic based on active index
                const diff = (i - activeIndex + cards.length) % cards.length

                return (
                    <div
                        key={i}
                        className={`absolute top-0 left-0 w-full p-6 glass rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                        style={{
                            transform: `translateY(${diff * 1.5}rem) scale(${1 - diff * 0.05})`,
                            opacity: isActive ? 1 : 1 - (diff * 0.3),
                            zIndex: cards.length - diff,
                            borderTop: isActive ? '2px solid #CC5833' : '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <Icon size={24} className={isActive ? "text-clay" : "text-moss"} />
                        <h4 className="font-sans font-bold text-xl mt-4 text-moss">{card.title}</h4>
                        <p className="font-sans text-sm text-charcoal/70 mt-2">{card.desc}</p>
                    </div>
                )
            })}
        </div>
    )
}

// Sub-component: Live Telemetry
function LiveTelemetry() {
    const [text, setText] = useState("")
    const [msgIndex, setMsgIndex] = useState(0)
    const messages = [
        "Optimizando tu embudo...",
        "Generando landing de alto impacto...",
        "Ajustando conversiones en tiempo real...",
        "Compilación exitosa."
    ]

    useEffect(() => {
        const currentMsg = messages[msgIndex]

        if (text.length < currentMsg.length) {
            const timeout = setTimeout(() => {
                setText(currentMsg.slice(0, text.length + 1))
            }, 50)
            return () => clearTimeout(timeout)
        } else {
            const timeout = setTimeout(() => {
                setMsgIndex((prev) => (prev + 1) % messages.length)
                setText("")
            }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [text, msgIndex, messages])

    return (
        <div className="bg-[#1A1A1A] text-[#F2F0E9] p-6 rounded-3xl border border-white/10 font-mono text-sm relative overflow-hidden h-40 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-clay animate-pulse"></div>
                <span className="text-clay text-xs tracking-widest uppercase">Sistema Activo</span>
            </div>
            <p className="text-green-400">
                <span className="text-gray-500 mr-2">{'>'}</span>
                {text}
                <span className="inline-block w-2 bg-clay ml-1 animate-ping h-[1em] align-middle" />
            </p>
        </div>
    )
}

// Sub-component: Protocol Grid
function ProtocolGrid() {
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
    const containerRef = useRef(null)

    // A CSS-only animation approach for the cursor to keep things lightweight
    // Alternatively GSAP can be used, but keyframes on a specific class work perfectly for a loop

    return (
        <div className="p-6 bg-white rounded-3xl border border-moss/10 relative overflow-hidden h-64 group">
            <h4 className="font-sans font-bold text-moss mb-4">Protocolo</h4>
            <div className="grid grid-cols-7 gap-2" ref={containerRef}>
                {days.map((day, i) => (
                    <div key={day} className={`aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-colors duration-300
            ${i === 2 ? 'bg-moss text-white shadow-lg' : 'bg-cream text-charcoal/50'}
          `}>
                        {day}
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <button className="bg-charcoal text-white text-xs px-4 py-2 flex items-center gap-2 rounded-full cursor-not-allowed">
                    Guardar Selección
                </button>
            </div>

            {/* Automated SVG Cursor */}
            <MousePointer2
                size={24}
                className="absolute w-6 h-6 text-clay fill-clay/20 pointer-events-none drop-shadow-md z-10 hidden group-hover:block
        animate-[cursor-demo_4s_ease-in-out_infinite]"
                style={{ transformOrigin: 'top left' }}
            />
            <style>{`
        @keyframes cursor-demo {
          0% { top: 90%; left: 90%; transform: scale(1); }
          30% { top: 4rem; left: 35%; transform: scale(1); }
          35% { top: 4rem; left: 35%; transform: scale(0.8); }
          40% { top: 4rem; left: 35%; transform: scale(1); }
          70% { top: 70%; left: 70%; transform: scale(1); }
          100% { top: 90%; left: 90%; transform: scale(1); }
        }
      `}</style>
        </div>
    )
}

export default function Features() {
    return (
        <section id="features" className="py-32 px-4 md:px-16 bg-cream relative z-20">
            <div className="max-w-7xl mx-auto">
                <h3 className="font-serif italic text-4xl text-moss mb-16 text-center">
                    Artefactos de Ingeniería
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <DiagnosticDeck />
                    <LiveTelemetry />
                    <ProtocolGrid />
                </div>
            </div>
        </section>
    )
}
