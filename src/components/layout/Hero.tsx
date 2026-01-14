
import { FxImage } from '../fx/FxImage';
import { useFxConfig } from '../fx/FxContext';

export function Hero() {
    const config = useFxConfig();

    return (
        <section className="hero-section reveal">
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <FxImage
                    src={config.heroImage || '/assets/hero_background.webp'}
                    alt="Fond abstrait représentant le flux de données dans un réseau de neurones artificiels"
                    style={{ width: '100%', height: '100%' }}
                    imgStyle={{ height: '100%', objectFit: 'cover' }}
                    config={{
                        interaction: {
                            enabled: true,
                            mode: 'shape',
                            variant: 'push',
                            radius: 0.3,
                            softness: 0,
                            activeSize: 10
                        }
                    }}
                />
            </div>

            <div className="hero-content-wrapper z-10 relative">
                <h1 className="hero-headline">
                    Expertise en IA Générative et Data pour<br />
                    <span className="gradient-text">Entreprises Innovantes</span>
                </h1>

                <p className="hero-subtext">
                    Texte, image, audio, vidéo. Automatisez vos opérations et fiabilisez l'analyse,
                    sans exposer vos données (Local ou Cloud UE).
                </p>

                <div className="action-group">
                    <a href="#contact" className="hero-cta">
                        PARLER À UN EXPERT →
                    </a>
                </div>
            </div>
        </section>
    );
}
