import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered fade-up animation for typography
            gsap.from('.hero-text', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.2
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100dvh] flex items-end pb-24 px-8 md:px-16 overflow-hidden bg-charcoal"
        >
            {/* Background Image / Atmosphere */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 mix-blend-luminosity scale-105 transform-gpu"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2000&auto=format&fit=crop")',
                }}
            />

            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-moss/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-4">
                <h1 className="hero-text text-white font-sans font-bold text-5xl md:text-7xl tracking-tighter w-full max-w-3xl leading-none">
                    Naturaleza es el
                </h1>
                <h2 className="hero-text font-serif italic text-7xl md:text-9xl text-cream leading-[0.8] tracking-tight pr-4">
                    Algoritmo.
                </h2>

                <p className="hero-text mt-8 text-cream/70 font-mono text-sm max-w-md border-l-2 border-clay pl-4">
                    SISTEMA v2.4 // INICIALIZANDO INTERFAZ DE PORFOLIO Y ARQUITECTURA DE PROYECTOS TÉCNICOS.
                </p>
            </div>
        </section>
    )
}
