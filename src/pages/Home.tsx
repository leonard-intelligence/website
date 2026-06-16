import { Hero } from '../components/layout/Hero';
import { SectionIntro, SectionExpertise, SectionSystem, SectionMethod, SectionCapabilities, SectionCTA, FooterV2 } from '../components/layout/Sections';
import { LayerModeles, LayerHarnais, LayerDonnees, LayerContexte, LayerProduits, LayerSecurite } from '../components/layout/SystemSections';
import { SEO } from '../components/seo/SEO';
import { JsonLd } from '../components/seo/JsonLd';
import { BeadPxProvider } from '../components/pixels/BeadPxContext';
import { DevTools } from '../components/dev/DevTools';

export function Home() {
    return (
        <BeadPxProvider>
            <main id="main-content">
                <SEO />
                <JsonLd />
                {import.meta.env.DEV && <DevTools />}
                <Hero />
                <SectionIntro />
                <SectionExpertise />
                <SectionSystem />
                <SectionCapabilities />
                <LayerModeles />
                <LayerHarnais />
                <LayerDonnees />
                <LayerContexte />
                <LayerProduits />
                <LayerSecurite />
                <SectionMethod />
                <SectionCTA />
                <FooterV2 />
            </main>
        </BeadPxProvider>
    );
}

export default Home;
