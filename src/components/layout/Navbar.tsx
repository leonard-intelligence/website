export function Navbar() {
    return (
        <nav id="section-navbar" className="agency-nav navbar reveal delay-100">
            <div className="nav-left navbar__left">
                <div className="nav-brand navbar__brand">
                    <div className="brand-logo navbar__logo">MELIES<span className="text-light navbar__logo-suffix">.ai</span></div>
                </div>
            </div>

            <div className="nav-tabs-container navbar__tabs">
                <a href="#section-solutions" className="nav-tab navbar__tab navbar__tab--active active">
                    <span className="tab-label navbar__tab-label">SOLUTIONS</span>
                    <span className="tab-number navbar__tab-number">01</span>
                </a>

                <a href="#section-expertises" className="nav-tab navbar__tab">
                    <span className="tab-label navbar__tab-label">EXPERTISES</span>
                    <span className="tab-number navbar__tab-number">02</span>
                </a>

                <a href="#section-methodology" className="nav-tab navbar__tab">
                    <span className="tab-label navbar__tab-label">MÉTHODOLOGIE</span>
                    <span className="tab-number navbar__tab-number">03</span>
                </a>
            </div>

            <div className="nav-right navbar__right">
                <a href="#section-contact" id="navbar-cta" className="nav-cta navbar__cta">CONTACT →</a>
            </div>
        </nav>
    );
}
