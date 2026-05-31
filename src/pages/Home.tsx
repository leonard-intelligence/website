import { Hero } from '../components/layout/Hero';
import { ConstruitSur } from '../components/layout/ConstruitSur';
import { SectionIntro, SectionMethod, SectionCapabilities, SectionServices, SectionCTA, FooterV2 } from '../components/layout/Sections';
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
                <ConstruitSur />
                <SectionIntro />
                <SectionMethod />
                <SectionCapabilities />
                <SectionServices />
                <SectionCTA />
                <FooterV2 />
            </main>
        </BeadPxProvider>
    );
}

export default Home;
