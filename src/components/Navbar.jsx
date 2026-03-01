import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Hexagon } from 'lucide-react'

export default function Navbar() {
    const navRef = useRef(null)

    // GSAP animation for pill state
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // The animation switches from transparent to glass/pill style on scroll
            gsap.to(navRef.current, {
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top -50px',
                    end: 'top -150px',
                    scrub: 0.5,
                },
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                color: '#2E4036', // Moss Green
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                width: '90%',
                maxWidth: '1200px',
                marginTop: '1rem',
                borderRadius: '9999px',
            });
        }, navRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-300">
            <nav
                ref={navRef}
                className="w-full max-w-full flex items-center justify-between px-8 py-4 pointer-events-auto bg-transparent text-white border-transparent"
            >
                <div className="flex items-center gap-3">
                    <svg id="v3" className="w-[120px] h-[60px]" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="neon-v3" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff0055" />
                                <stop offset="100%" stopColor="#bd00ff" />
                            </linearGradient>

                            {/* <!-- Aberración Cromática (Glitch) --> */}
                            <filter id="glitch-v3">
                                <feOffset dx="4" dy="0" in="SourceGraphic" result="red-shift" />
                                <feOffset dx="-4" dy="0" in="SourceGraphic" result="cyan-shift" />

                                <feColorMatrix in="red-shift" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.8 0" result="red-channel" />
                                <feColorMatrix in="cyan-shift" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" result="cyan-channel" />

                                <feBlend mode="screen" in="red-channel" in2="cyan-channel" result="color-split" />
                                <feBlend mode="screen" in="SourceGraphic" in2="color-split" />
                            </filter>
                        </defs>

                        {/* <!-- Anillos / Engranajes de fondo --> */}
                        <g transform="translate(400, 190)" fill="none" filter="url(#glitch-v3)">
                            <circle cx="0" cy="0" r="120" stroke="url(#neon-v3)" strokeWidth="2" strokeDasharray="10 5" opacity="0.5" />
                            <circle cx="0" cy="0" r="140" stroke="#00f0ff" strokeWidth="6" strokeDasharray="30 20 5 10" opacity="0.3" />
                            <circle cx="0" cy="0" r="155" stroke="url(#neon-v3)" strokeWidth="1" strokeDasharray="100 50" />
                        </g>

                        {/* <!-- Ruido horizontal (Screen tear) --> */}
                        <g fill="#ff0055" opacity="0.5" filter="url(#glitch-v3)">
                            <rect x="250" y="100" width="30" height="2" />
                            <rect x="450" y="240" width="80" height="3" />
                            <rect x="300" y="260" width="20" height="1" />
                        </g>

                        {/* <!-- Texto NEØ Glitch --> */}
                        <g transform="translate(230, 130)" stroke="currentColor" strokeWidth="18" strokeLinecap="square" strokeLinejoin="miter" fill="none" filter="url(#glitch-v3)">
                            <path d="M 40,120 L 40,20 L 110,120 L 110,20" />
                            <path d="M 210,20 L 150,20 L 150,120 L 210,120 M 150,70 L 195,70" />
                            <circle cx="290" cy="70" r="50" />
                            <line x1="250" y1="130" x2="330" y2="10" />
                        </g>

                        <text x="400" y="320" fontFamily="'Courier New', monospace" fontSize="20" fontWeight="bold" letterSpacing="15" fill="#bd00ff" textAnchor="middle" filter="url(#glitch-v3)">
                            S T U D I O _
                        </text>
                    </svg>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                    <a href="#vision" className="hover:text-clay transition-colors duration-300">Visión</a>
                    <a href="#proyectos" className="hover:text-clay transition-colors duration-300">Proyectos</a>
                </div>

                <a href="#contacto" className="bg-white/10 hover:bg-white text-inherit hover:text-moss text-sm font-bold px-6 py-2 rounded-full border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 inline-block text-center">
                    Conectar
                </a>
            </nav>
        </div>
    )
}
