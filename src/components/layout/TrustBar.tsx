export function TrustBar() {
    // Sovereign-first ordering: French/EU partners prominently featured (like Artefact & Sia Partners)
    const logos = [
        { name: 'Mistral AI', src: '/assets/logos/mistral.svg', sovereign: true },
        { name: 'OVHcloud', src: '/assets/logos/ovhcloud.svg', sovereign: true },
        { name: 'Hugging Face', src: '/assets/logos/huggingface.svg', sovereign: true },
        { name: 'Meta Llama', src: '/assets/logos/meta.svg' },
        { name: 'NVIDIA', src: '/assets/logos/nvidia.svg' },
        { name: 'Anthropic', src: '/assets/logos/anthropic.svg' },
        { name: 'OpenAI', src: '/assets/logos/openai.svg' },
        { name: 'AssemblyAI', src: '/assets/logos/assemblyai.svg' },
    ];

    // Triple for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <section id="section-trustbar" className="bg-black w-full relative overflow-hidden" aria-label="Technologies et modèles partenaires">
            <div className="flex w-full overflow-hidden">
                <div className="relative z-10 bg-black text-white px-6 py-6 font-mono text-sm border-r border-white/10 dark:text-white flex items-center whitespace-nowrap">
                    Partenaires technologiques
                </div>
                <div
                    className="flex flex-1 overflow-hidden items-center"
                    role="list"
                >
                    <div className="flex flex-shrink-0 w-max items-center animate-[scroll-rtl_30s_linear_infinite]" aria-hidden="false">
                        {duplicatedLogos.map((logo, index) => (
                            <div
                                key={`${logo.name}-${index}`}
                                className="flex-shrink-0 w-[150px] h-[80px] flex items-center justify-center hover:bg-white/5 transition-colors"
                                title={logo.name}
                                role="listitem"
                                aria-label={logo.name}
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity"
                                    style={{ filter: 'brightness(0) invert(1)' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
