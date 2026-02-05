import { Link } from 'react-router-dom';
import logo from '../../assets/images/logos/leonard-logo-white.png';

export function Footer() {
    return (
        <footer id="section-footer" className="bg-black py-20 border-t border-white/10 text-sm reveal-up relative z-10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Section: Brand + Tagline */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 mb-12 border-b border-white/10">
                    <div>
                        <img
                            src={logo}
                            alt="Leonard Intelligence"
                            className="h-8 mb-2"
                        />
                        <p className="text-[#E67E22] text-xs uppercase tracking-wider">
                            L'Intelligence Opérationnelle.
                        </p>
                    </div>
                    {/* Sovereign positioning statement like Onepoint */}
                    <div className="mt-4 md:mt-0 text-right">
                        <a href="mailto:hello@leonardintelligence.com" className="text-white hover:text-[#E67E22] transition-colors text-sm block mb-1 animated-underline">
                            hello@leonardintelligence.com
                        </a>
                        <p className="text-gray-500 text-[10px]">France 🇫🇷</p>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

                    {/* Expertise */}
                    <nav aria-label="Expertises" className="flex flex-col">
                        <h4 className="font-mono font-normal text-white mb-6 uppercase text-xs tracking-wider">Expertises</h4>
                        <ul className="space-y-3 text-gray-500 text-xs">
                            <li><Link to="/#section-expertises" className="hover:text-white transition-colors">Visual Intelligence</Link></li>
                            <li><Link to="/#section-expertises" className="hover:text-white transition-colors">Language & Process</Link></li>
                            <li><Link to="/#section-expertises" className="hover:text-white transition-colors">Audio & Signal</Link></li>
                            <li><Link to="/#section-methodology" className="hover:text-white transition-colors">Architecture</Link></li>
                        </ul>
                    </nav>

                    {/* Industries */}
                    <nav aria-label="Secteurs" className="flex flex-col">
                        <h4 className="font-mono font-normal text-white mb-6 uppercase text-xs tracking-wider">Secteurs</h4>
                        <ul className="space-y-3 text-gray-500 text-xs">
                            <li><Link to="/#section-solutions" className="hover:text-white transition-colors">Retail & E-commerce</Link></li>
                            <li><Link to="/#section-solutions" className="hover:text-white transition-colors">Industrie & Qualité</Link></li>
                            <li><Link to="/#section-solutions" className="hover:text-white transition-colors">Service & B2B</Link></li>
                        </ul>
                    </nav>

                    {/* Resources */}
                    <nav aria-label="Liens utiles" className="flex flex-col">
                        <h4 className="font-mono font-normal text-white mb-6 uppercase text-xs tracking-wider">Liens</h4>
                        <ul className="space-y-3 text-gray-500 text-xs">
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/leonard-intelligence"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                    aria-label="Notre page LinkedIn"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
                            </li>
                            <li>
                                <Link to="/cgv" className="hover:text-white transition-colors">CGV</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Company */}
                    <div className="flex flex-col">
                        <h4 className="font-mono font-normal text-white mb-6 uppercase text-xs tracking-wider">Audit</h4>
                        <p className="text-gray-500 text-xs mb-4">
                            Identification des opportunités d'automatisation pour votre entreprise.
                        </p>
                        <a href="#contact" className="inline-block border border-white/20 hover:bg-white hover:text-black hover:border-white text-center text-white text-xs px-4 py-2 uppercase transition-all">
                            Parlons de votre projet
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-xs text-gray-500">
                        © 2025 Leonard Intelligence. Tous droits réservés.
                    </div>
                    <div className="flex items-center gap-6">
                        <span id="footer-status" className="flex items-center gap-2 text-[#E67E22] text-xs">
                            <span className="w-2 h-2 bg-[#E67E22] rounded-full animate-pulse"></span>
                            Systèmes opérationnels
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
