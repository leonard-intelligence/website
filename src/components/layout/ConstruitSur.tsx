const LOGOS: { src: string; name: string }[] = [
    { src: '/assets/logos/anthropic.svg', name: 'Anthropic' },
    { src: '/assets/logos/openai.svg', name: 'OpenAI' },
    { src: '/assets/logos/mistral.svg', name: 'Mistral' },
    { src: '/assets/logos/gemini.svg', name: 'Gemini' },
    { src: '/assets/logos/meta.svg', name: 'Meta · Llama' },
    { src: '/assets/logos/nvidia.svg', name: 'Nvidia' },
    { src: '/assets/logos/huggingface.svg', name: 'Hugging Face' },
    { src: '/assets/logos/ovhcloud.svg', name: 'OVHcloud' },
];

export function ConstruitSur() {
    return (
        <section
            id="section-construit-sur"
            className="relative"
            style={{ backgroundColor: '#F7F7F5', paddingBlock: '56px', paddingInline: '32px' }}
            aria-label="Construit sur"
        >
            <div className="max-w-[1100px] mx-auto">
                <div
                    className="font-mono text-center"
                    style={{ fontSize: 12, letterSpacing: '0.22em', color: 'rgba(23,23,23,0.5)' }}
                >
                    CONSTRUIT SUR
                </div>

                <ul
                    className="mt-8 flex flex-wrap items-end justify-center"
                    style={{ gap: '40px 56px', listStyle: 'none', padding: 0 }}
                >
                    {LOGOS.map((l) => (
                        <li key={l.name} className="flex flex-col items-center" style={{ gap: 8 }}>
                            <img
                                src={l.src}
                                alt={l.name}
                                style={{ height: 22, width: 'auto', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.7 }}
                            />
                            <span
                                className="font-mono"
                                style={{ fontSize: 10, letterSpacing: '0.04em', color: 'rgba(23,23,23,0.4)' }}
                            >
                                {l.name}
                            </span>
                        </li>
                    ))}
                </ul>

                <p
                    className="font-mono text-center mx-auto"
                    style={{ marginTop: 28, fontSize: 11, lineHeight: 1.5, color: 'rgba(23,23,23,0.35)', maxWidth: '60ch' }}
                >
                    Les marques sont la propriété de leurs titulaires respectifs. Leonard Intelligence n'est ni partenaire officiel ni revendeur agréé.
                </p>
            </div>
        </section>
    );
}
