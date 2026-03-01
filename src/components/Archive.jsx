import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const ARCHIVE_DATA = [
    {
        id: "01",
        title: "Motor de Búsqueda Kntcl",
        tech: "React / Python / ChromaDB",
        animationType: "helix",
    },
    {
        id: "02",
        title: "Sistema de Telemetría",
        tech: "Next.js / WebGL / Node",
        animationType: "laser",
    },
    {
        id: "03",
        title: "Protocolo de Conversión",
        tech: "Vite / GSAP / Tailwind",
        animationType: "waveform",
    }
]

export default function Archive() {
    const containerRef = useRef(null)
    const cardsRef = useRef([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Loop through all cards except the last one
            cardsRef.current.forEach((card, index) => {
                if (index === cardsRef.current.length - 1) return; // Last card doesn't need to shrink

                gsap.to(card, {
                    scale: 0.9,
                    opacity: 0.5,
                    filter: "blur(20px)",
                    scrollTrigger: {
                        trigger: cardsRef.current[index + 1],
                        start: "top bottom", // Starts when the next card enters from the bottom
                        end: "top top",     // Ends when the next card reaches the top
                        scrub: true,
                    }
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} id="proyectos" className="relative w-full bg-charcoal text-cream pb-32">
            <div className="pt-32 pb-16 px-8 md:px-16 max-w-7xl mx-auto">
                <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-moss mb-4">
                    Archivo //
                </h3>
                <h2 className="font-serif italic text-5xl md:text-7xl">
                    Visualización de Proyectos
                </h2>
            </div>

            <div className="relative w-full px-4 md:px-8 mt-12 flex flex-col gap-[10dvh] pb-[20dvh]">
                {ARCHIVE_DATA.map((project, i) => (
                    <div
                        key={project.id}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className="sticky top-[10dvh] h-[80dvh] w-full max-w-6xl mx-auto rounded-[3rem] overflow-hidden border border-white/10 flex items-center justify-center
            bg-moss/10 backdrop-blur-3xl transform-gpu will-change-transform"
                    >
                        {/* Inner Content */}
                        <div className="absolute inset-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">

                            {/* Left Side: Data */}
                            <div className="flex-1 p-12 flex flex-col justify-between">
                                <div className="font-mono text-clay text-sm flex items-center justify-between">
                                    <span>EXP. {project.id}</span>
                                    <span className="animate-pulse w-2 h-2 rounded-full bg-clay block" />
                                </div>
                                <div>
                                    <h3 className="font-sans text-4xl md:text-5xl font-bold mb-4">{project.title}</h3>
                                    <p className="font-mono text-white/50">{project.tech}</p>
                                </div>
                            </div>

                            {/* Right Side: Abstract Animation based on type */}
                            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black/20">
                                {project.animationType === 'helix' && (
                                    <div className="w-64 h-64 border-4 border-dashed border-moss rounded-full animate-[spin_10s_linear_infinite]" />
                                )}
                                {project.animationType === 'laser' && (
                                    <div className="w-full h-full relative">
                                        <div className="absolute inset-0 border-[1px] border-moss/30" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, rgba(46,64,54,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(46,64,54,0.1) 1px, transparent 1px)' }} />
                                        <div className="w-full h-1 bg-clay/80 absolute top-0 animate-[move-down_3s_linear_infinite]" />
                                    </div>
                                )}
                                {project.animationType === 'waveform' && (
                                    <div className="flex items-center gap-2 h-32">
                                        {[...Array(15)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-2 bg-moss rounded-full animate-pulse"
                                                style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <style>{`
        @keyframes move-down {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
        </section>
    )
}
