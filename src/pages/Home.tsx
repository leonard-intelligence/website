import { Hero } from '../components/layout/Hero';
import { SectionIntro, SectionExpertise, SectionMethod, SectionCapabilities, SectionStatement, SectionCTA, FooterV2 } from '../components/layout/Sections';
import { LayerModeles, LayerHarnais, LayerDonnees, LayerContexte, LayerProduits, LayerSecurite } from '../components/layout/SystemSections';
import { SEO } from '../components/seo/SEO';
import { JsonLd } from '../components/seo/JsonLd';
import { BeadPxProvider } from '../components/pixels/BeadPxContext';

export function Home() {
    return (
        <BeadPxProvider>
            <main id="main-content">
                <SEO />
                <JsonLd />
                <Hero />
                <SectionIntro />
                <SectionExpertise />
                <SectionCapabilities />
                <LayerDonnees />
                <LayerModeles />
                <LayerHarnais />
                <LayerContexte />
                <LayerProduits />
                <LayerSecurite />
                <SectionMethod />
                <SectionStatement />
                <SectionCTA />
                <FooterV2 />
            </main>
        </BeadPxProvider>
    );
}

export default Home;
