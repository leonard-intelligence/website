import { Hero } from '../components/layout/Hero';
import { SectionIntro, SectionExpertise, SectionSystem, SectionDeploy, SectionMethod, SectionCapabilities, SectionCTA, BeadSection, SectionPhases, SectionFonts, FooterV2 } from '../components/layout/Sections';
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
                <SectionDeploy />
                <BeadSection
                    eyebrow="INTELLIGENCE CULTIVÉE"
                    title="Organique × machine."
                    body="Nous cultivons des systèmes agentiques pour votre métier : précis, gouvernés, branchés à votre réalité."
                />
                <SectionPhases />
                <SectionMethod />
                <SectionCTA />
                <SectionFonts />
                <FooterV2 />
            </main>
        </BeadPxProvider>
    );
}

export default Home;
