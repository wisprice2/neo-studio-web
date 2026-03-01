import { CheckCircle2 } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="relative z-10 bg-charcoal text-cream rounded-t-[3rem] -mt-12 pt-24 pb-12 px-8 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto flex flex-col gap-24">

                {/* Pricing / Index Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="p-8 rounded-[2rem] border border-white/10 flex flex-col">
                        <h4 className="font-mono text-sm text-white/50 mb-8">01 // INICIO</h4>
                        <h3 className="font-sans text-2xl font-bold mb-4">Auditoría Técnica</h3>
                        <p className="font-sans text-sm text-white/60 mb-8 flex-1">
                            Evaluación del estado actual de tu infraestructura y performance web.
                        </p>
                        <a href="#contacto" className="w-full py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-sm font-bold text-center inline-block">
                            Solicitar Slot
                        </a>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-moss border border-moss shadow-2xl flex flex-col transform md:-translate-y-4">
                        <h4 className="font-mono text-sm text-clay mb-8">02 // CORE</h4>
                        <h3 className="font-sans text-2xl font-bold mb-4">Desarrollo Custom</h3>
                        <p className="font-sans text-sm text-cream/80 mb-8 flex-1">
                            Desarrollo de artefatos digitales de alta fidelidad. 100% código, sin plantillas.
                        </p>
                        <a href="#contacto" className="w-full py-3 rounded-full bg-clay text-white hover:bg-clay/90 transition-colors text-sm font-bold text-center inline-block">
                            Iniciar Proyecto
                        </a>
                    </div>

                    <div className="p-8 rounded-[2rem] border border-white/10 flex flex-col">
                        <h4 className="font-mono text-sm text-white/50 mb-8">03 // RETENCIÓN</h4>
                        <h3 className="font-sans text-2xl font-bold mb-4">Soporte Continuo</h3>
                        <p className="font-sans text-sm text-white/60 mb-8 flex-1">
                            Mantenimiento evolutivo y monitoreo de las métricas clave del sistema.
                        </p>
                        <a href="#contacto" className="w-full py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-sm font-bold text-center inline-block">
                            Ver Protocolo
                        </a>
                    </div>
                </div>

                {/* Bottom Footer Section */}
                <div className="flex justify-center items-center pt-8 border-t border-white/10">
                    <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="font-mono text-xs uppercase text-green-400 tracking-wider">
                            Sistema Operativo Activo
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
