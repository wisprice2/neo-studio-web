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
        <div className="relative h-48 w-full perspective-1000">
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
                        <Icon size={20} className={isActive ? "text-clay" : "text-moss"} />
                        <h4 className="font-sans font-bold text-lg mt-2 text-moss">{card.title}</h4>
                        <p className="font-sans text-xs text-charcoal/70 mt-1">{card.desc}</p>
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
        <div className="bg-[#1A1A1A] text-[#F2F0E9] p-6 rounded-3xl border border-white/10 font-mono text-sm relative overflow-hidden h-48 flex flex-col justify-center">
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

// Sub-component: Protocol Grid with Matrix Clock
function ProtocolGrid() {
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
    const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S'] // JS Sunday=0
    const [currentTime, setCurrentTime] = useState('')
    const [currentDay, setCurrentDay] = useState(0)
    const canvasRef = useRef(null)

    // Get Chile time and update every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Santiago' }))
            const hours = now.getHours().toString().padStart(2, '0')
            const mins = now.getMinutes().toString().padStart(2, '0')
            const secs = now.getSeconds().toString().padStart(2, '0')
            setCurrentTime(`${hours}:${mins}:${secs}`)
            // Map JS day (0=Sun) to our array (0=L Monday)
            const jsDay = now.getDay()
            setCurrentDay(jsDay === 0 ? 6 : jsDay - 1)
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    // Matrix rain effect on canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        canvas.width = canvas.offsetWidth
        canvas.height = 80
        const chars = 'アイウエオカキクケコ01サシスセソタチツテト'.split('')
        const cols = Math.floor(canvas.width / 14)
        const drops = Array(cols).fill(1)

        const draw = () => {
            ctx.fillStyle = 'rgba(255,255,255,0.15)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#00ff41'
            ctx.font = '12px monospace'
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)]
                ctx.fillText(text, i * 14, drops[i] * 14)
                if (drops[i] * 14 > canvas.height && Math.random() > 0.97) drops[i] = 0
                drops[i]++
            }
        }
        const interval = setInterval(draw, 60)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="p-5 bg-white rounded-3xl border border-moss/10 relative overflow-hidden h-48 flex flex-col justify-between">
            <div>
                <h4 className="font-sans font-bold text-moss text-sm mb-2">Protocolo</h4>
                <div className="grid grid-cols-7 gap-1.5">
                    {days.map((day, i) => (
                        <div key={day} className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-500
                            ${i === currentDay
                                ? 'bg-moss text-white shadow-lg shadow-moss/30 ring-2 ring-moss/40 scale-105'
                                : 'bg-cream text-charcoal/40 hover:bg-moss/10'}`}>
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            {/* Matrix Clock */}
            {/* Matrix Clock */}
            <div className="relative bg-[#0a0a0a] rounded-xl overflow-hidden mt-2">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
                <div className="relative z-10 flex flex-col items-center justify-center py-2">
                    <span className="font-mono text-xl font-black tracking-[0.2em]"
                        style={{
                            color: '#00ff41',
                            textShadow: '0 0 8px #00ff41, 0 0 16px #00ff4180',
                            filter: 'drop-shadow(0 0 4px #00ff41)'
                        }}>
                        {currentTime}
                    </span>
                    <span className="font-mono text-[9px] text-green-500/50 tracking-[0.4em] uppercase">Santiago</span>
                </div>
            </div>
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
