import { useLayoutEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'

const PROJECTS = [
    {
        id: "01",
        title: "Motor de Búsqueda Kntcl",
        description: "Sistema de búsqueda inteligente con IA",
        tech: "React / Python / ChromaDB",
        link: "#",
    },
    {
        id: "02", 
        title: "Sistema de Telemetría",
        description: "Dashboard en tiempo real con visualizaciones",
        tech: "Next.js / WebGL / Node",
        link: "#",
    },
    {
        id: "03",
        title: "Sabores del Mar",
        description: "Restaurant Fine Dining - Landing page completa",
        tech: "HTML / CSS / Vercel",
        link: "https://sabores-del-mar.vercel.app",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    },
    {
        id: "04",
        title: "Café Aromas",
        description: "Cafetería specialty - Landing page cálida y elegante",
        tech: "HTML / CSS / Vercel",
        link: "https://cafe-aromas.vercel.app",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    },
    {
        id: "05",
        title: "Protocolo de Conversión",
        description: "Optimización de embudos de venta",
        tech: "Vite / GSAP / Tailwind",
        link: "#",
    }
]

export default function Archive() {
    const containerRef = useRef(null)

    return (
        <section ref={containerRef} id="proyectos" className="relative w-full bg-charcoal text-cream py-32">
            <div className="px-8 md:px-16 max-w-7xl mx-auto">
                <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-moss mb-4">
                    Portafolio //
                </h3>
                <h2 className="font-serif italic text-5xl md:text-7xl mb-20">
                    Proyectos Realizados
                </h2>
            </div>

            <div className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PROJECTS.map((project, i) => (
                        <a 
                            key={project.id}
                            href={project.link}
                            target={project.link.startsWith('http') ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="group relative bg-moss/5 border border-white/10 rounded-3xl overflow-hidden hover:border-moss/40 transition-all duration-500"
                        >
                            {/* Image if exists */}
                            {project.image && (
                                <div className="h-64 overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            )}

                            <div className={`p-8 ${!project.image ? 'h-full min-h-[280px] flex flex-col justify-between' : ''}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <span className="font-mono text-moss text-sm">EXP. {project.id}</span>
                                    {project.link.startsWith('http') && (
                                        <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-clay transition-colors" />
                                    )}
                                </div>
                                
                                <div>
                                    <h3 className="font-sans text-2xl md:text-3xl font-bold mb-2 group-hover:text-clay transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/50 mb-4">{project.description}</p>
                                    <p className="font-mono text-xs text-white/30">{project.tech}</p>
                                </div>

                                {/* Hover effect line */}
                                <div className="absolute bottom-0 left-0 h-1 bg-clay transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    )
}
