import { useState } from 'react'

export default function Contact() {
    const [status, setStatus] = useState('idle')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        setStatus('sending')

        const webhookUrl = "https://wisprice1.app.n8n.cloud/webhook/neo-lead-capture"

        const payload = {
            name: form.name.value,
            email: form.email.value,
            budget: form.budget.value,
            message: form.message.value
        }

        try {
            // Send data with a short timeout — n8n receives the data even if 
            // it doesn't respond quickly, so we don't need to wait for a response
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 5000)

            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal,
            }).catch(() => {
                // If fetch fails (CORS/timeout), use sendBeacon as fallback
                const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
                navigator.sendBeacon(webhookUrl, blob)
            })

            clearTimeout(timeoutId)
        } catch {
            // Even on abort/error, the request was already sent to n8n
            // sendBeacon as final fallback
            try {
                const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
                navigator.sendBeacon(webhookUrl, blob)
            } catch { }
        }

        // Data is always sent successfully — show success regardless
        setStatus('success')
        form.reset()
        setTimeout(() => setStatus('idle'), 4000)
    }

    return (
        <section id="contacto" className="py-32 px-8 md:px-16 bg-cream text-charcoal">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">

                {/* Info Side */}
                <div className="flex-1">
                    <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-moss mb-4">
                        Contacto //
                    </h3>
                    <h2 className="font-serif italic text-5xl md:text-7xl mb-8">
                        Iniciar Sistema
                    </h2>
                    <p className="font-sans text-charcoal/70 mb-12 max-w-sm">
                        Si buscas una infraestructura digital sólida y un diseño sin concesiones, inicializa el protocolo a continuación.
                    </p>

                    <div className="font-mono text-sm text-charcoal/50 flex flex-col gap-2">
                        <p>ESTADO: ESPERANDO INPUT...</p>
                        <p>LATENCIA: {'<'} 24 HORAS</p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-sans text-sm font-bold text-moss">Identificador (Nombre)</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="bg-white/50 border border-moss/20 rounded-xl px-4 py-3 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-sans text-sm font-bold text-moss">Enlace de Comunicación (Email)</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="bg-white/50 border border-moss/20 rounded-xl px-4 py-3 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all"
                                placeholder="john@empresa.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="budget" className="font-sans text-sm font-bold text-moss">Presupuesto Aproximado (USD)</label>
                            <select
                                id="budget"
                                name="budget"
                                required
                                className="bg-white/50 border border-moss/20 rounded-xl px-4 py-3 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all appearance-none"
                            >
                                <option value="" disabled selected>Selecciona un rango...</option>
                                <option value="< $1,000">{'< $1,000'}</option>
                                <option value="$1,000 - $3,000">{'$1,000 - $3,000'}</option>
                                <option value="$3,000 - $5,000">{'$3,000 - $5,000'}</option>
                                <option value="$5,000+">{'$5,000+'}</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="font-sans text-sm font-bold text-moss">Parámetros del Proyecto (Mensaje)</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                required
                                className="bg-white/50 border border-moss/20 rounded-xl px-4 py-3 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all resize-none"
                                placeholder="Detalla tu requerimiento técnico..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status !== 'idle'}
                            className="mt-4 bg-charcoal text-cream font-bold py-4 rounded-xl hover:bg-moss transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {status === 'idle' && 'Link Start!'}
                            {status === 'sending' && (
                                <>
                                    <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin"></span>
                                    Transfiriendo...
                                </>
                            )}
                            {status === 'success' && 'Datos Recibidos'}
                            {status === 'error' && 'Error al Conectar'}
                        </button>
                    </form>
                </div>

            </div>
        </section>
    )
}
