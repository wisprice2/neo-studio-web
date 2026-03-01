import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Manifesto() {
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Split text reveal effect without using SplitText plugin (simulating it with lines)
            gsap.from('.manifesto-line', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'power3.out'
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            id="vision"
            className="relative py-40 px-8 md:px-16 bg-charcoal text-white overflow-hidden"
        >
            {/* Organic Parallax Texture inside */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 mix-blend-screen scale-110"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop")',
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-12 font-sans tracking-tight">
                <div className="overflow-hidden pb-4">
                    <h3 className="manifesto-line text-3xl md:text-5xl text-white font-bold tracking-normal drop-shadow-md">
                        Lo normal es preguntar: ¿qué va mal?
                    </h3>
                </div>

                <div className="overflow-hidden">
                    <h2 className="manifesto-line text-4xl md:text-7xl font-bold text-cream">
                        Nosotros preguntamos: <br />
                        <span className="font-serif italic text-moss text-5xl md:text-8xl pl-8 leading-relaxed">
                            ¿qué se puede optimizar?
                        </span>
                    </h2>
                </div>
            </div>
        </section>
    )
}
