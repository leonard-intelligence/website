export function StackSection() {
    return (
        <section id="section-stack" className="py-24 bg-black border-b border-white/10 relative z-10" aria-labelledby="stack-heading">
            <div className="absolute inset-0 bg-black z-0"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-16">
                    <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4 block">
                        Infrastructure
                    </span>
                    <h2 id="stack-heading" className="text-4xl font-bold font-serif text-white">
                        Stack Technique & Intégrations
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* 1. Langages & Frameworks */}
                    <div>
                        <h4 className="text-white font-mono text-sm uppercase tracking-wider mb-6 border-b border-white/10 pb-2">Langages & Frameworks</h4>
                        <div className="flex flex-col gap-3 font-mono text-sm text-gray-400">
                            <span>Python</span>
                            <span>n8n</span>
                            <span>Make</span>
                            <span>LangChain</span>
                        </div>
                    </div>

                    {/* 2. Modèles LLM */}
                    <div>
                        <h4 className="text-white font-mono text-sm uppercase tracking-wider mb-6 border-b border-white/10 pb-2">Modèles LLM</h4>
                        <div className="flex flex-col gap-3 font-mono text-sm text-gray-400">
                            <span>HuggingFace</span>
                            <span>Mistral</span>
                            <span>OpenAI</span>
                            <span>Anthropic</span>
                        </div>
                    </div>

                    {/* 3. Image & Video */}
                    <div>
                        <h4 className="text-white font-mono text-sm uppercase tracking-wider mb-6 border-b border-white/10 pb-2">Image & Video</h4>
                        <div className="flex flex-col gap-3 font-mono text-sm text-gray-400">
                            <span>Stable Diffusion</span>
                            <span>Midjourney</span>
                            <span>Flux</span>
                            <span>ComfyUI</span>
                        </div>
                    </div>

                    {/* 4. Infrastructure */}
                    <div>
                        <h4 className="text-white font-mono text-sm uppercase tracking-wider mb-6 border-b border-white/10 pb-2">Infrastructure</h4>
                        <div className="flex flex-col gap-3 font-mono text-sm text-gray-400">
                            <span>AWS</span>
                            <span>OVH</span>
                            <span>Azure</span>
                            <span className="text-emerald-500">SecNumCloud</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
