import { Hero } from '../components/layout/Hero';
import { ConstruitSur } from '../components/layout/ConstruitSur';
import { SectionIntro, SectionMethod, SectionCapabilities, SectionCTA, FooterV2 } from '../components/layout/Sections';
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
                <ConstruitSur />
                <LayerModeles />
                <LayerHarnais />
                <LayerDonnees />
                <LayerContexte />
                <SectionCapabilities />
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
