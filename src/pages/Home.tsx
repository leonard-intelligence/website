import { Hero } from '../components/layout/Hero';
import { EmbossFilters, SectionIntro, SectionExpertise, SectionMethod, SectionCapabilities, SectionStatement, SectionCTA, FooterV2 } from '../components/layout/Sections';
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
                <EmbossFilters />{/* filtres SVG d'ombre interne des titres (emboss) */}
                <Hero />
                <SectionIntro />
                <SectionExpertise />
                <SectionCapabilities />
                <LayerDonnees />
                <LayerModeles />
                <LayerProduits />
                <LayerHarnais />
                <LayerContexte />
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
