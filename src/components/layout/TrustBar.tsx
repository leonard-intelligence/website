import mistralLogo from '@/assets/images/partners/mistral.svg';
import ovhLogo from '@/assets/images/partners/ovhcloud.svg';
import huggingFaceLogo from '@/assets/images/partners/huggingface.svg';
import metaLogo from '@/assets/images/partners/meta.svg';
import nvidiaLogo from '@/assets/images/partners/nvidia.svg';
import anthropicLogo from '@/assets/images/partners/anthropic.svg';
import openaiLogo from '@/assets/images/partners/openai.svg';
import assemblyaiLogo from '@/assets/images/partners/assemblyai.svg';

export function TrustBar() {
    // Sovereign-first ordering: French/EU partners prominently featured (like Artefact & Sia Partners)
    const logos = [
        { name: 'Mistral AI', src: mistralLogo, sovereign: true },
        { name: 'OVHcloud', src: ovhLogo, sovereign: true },
        { name: 'Hugging Face', src: huggingFaceLogo, sovereign: true },
        { name: 'Meta Llama', src: metaLogo },
        { name: 'NVIDIA', src: nvidiaLogo },
        { name: 'Anthropic', src: anthropicLogo },
        { name: 'OpenAI', src: openaiLogo },
        { name: 'AssemblyAI', src: assemblyaiLogo },
    ];

    // Triple for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <section id="section-trustbar" className="bg-black w-full relative overflow-hidden" aria-label="Technologies et modèles partenaires">
            <div className="flex w-full overflow-hidden">
                <div className="relative z-10 bg-black text-white px-6 py-6 text-sm border-r border-white/10 dark:text-white flex items-center whitespace-nowrap">
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
