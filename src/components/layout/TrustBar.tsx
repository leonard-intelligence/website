export function TrustBar() {
    const logos = [
        { name: 'Mistral AI', src: '/assets/logos/mistral.svg' },
        { name: 'OpenAI', src: '/assets/logos/openai.svg' },
        { name: 'Meta', src: '/assets/logos/meta.svg' },
        { name: 'Anthropic', src: '/assets/logos/anthropic.svg' },
        { name: 'Gemini', src: '/assets/logos/gemini.svg' },
        { name: 'Hugging Face', src: '/assets/logos/huggingface.svg' },
        { name: 'NVIDIA', src: '/assets/logos/nvidia.svg' },
        { name: 'AssemblyAI', src: '/assets/logos/assemblyai.svg' },
    ];

    // Duplicate logos for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos];

    return (
        <section id="section-trustbar" className="backers-bar trustbar reveal delay-100" aria-label="Technologies et modèles partenaires">
            <div className="backers-grid trustbar__container">
                <div className="backer-label trustbar__label" id="trustbar-label">Propulsé par les meilleurs modèles.</div>
                <div
                    className="logos-scroll-container trustbar__scroll"
                    role="list"
                    aria-labelledby="trustbar-label"
                >
                    <div className="logos-scroll-track trustbar__track" aria-hidden="false">
                        {duplicatedLogos.map((logo, index) => (
                            <div
                                key={`${logo.name}-${index}`}
                                className="backer-item trustbar__item"
                                title={logo.name}
                                role="listitem"
                                aria-label={logo.name}
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="h-8 w-auto trustbar__logo"
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
