export function Footer() {
    return (
        <footer id="section-footer" className="bg-black py-20 border-t border-white/10 text-sm">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Section: Brand + Tagline */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 mb-12 border-b border-white/10">
                    <div>
                        <h3 className="font-sans font-bold text-2xl text-white mb-2 tracking-tighter">LEONARD<span className="text-gray-500"> Intelligence</span></h3>
                        <p className="text-emerald-400 font-mono text-xs uppercase tracking-wider">
                            L'Intelligence Opérationnelle.
                        </p>
                    </div>
                    {/* Sovereign positioning statement like Onepoint */}
                    <div className="mt-4 md:mt-0 text-right">
                        <a href="mailto:hello@leonardintelligence.com" className="text-white hover:text-emerald-400 transition-colors font-mono text-sm block mb-1">
                            hello@leonardintelligence.com
                        </a>
                        <p className="text-gray-500 font-mono text-[10px]">Marseille, France</p>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

                    {/* Expertise */}
                    <nav aria-label="Expertises" className="flex flex-col">
                        <h4 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-wider">Expertises</h4>
                        <ul className="space-y-3 text-gray-500 font-mono text-xs">
                            <li className="hover:text-white cursor-pointer transition-colors">Visual Intelligence</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Language & Process</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Audio & Signal</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Architecture</li>
                        </ul>
                    </nav>

                    {/* Industries */}
                    <nav aria-label="Secteurs" className="flex flex-col">
                        <h4 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-wider">Secteurs</h4>
                        <ul className="space-y-3 text-gray-500 font-mono text-xs">
                            <li className="hover:text-white cursor-pointer transition-colors">Retail & E-commerce</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Industrie & Qualité</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Service & B2B</li>
                        </ul>
                    </nav>

                    {/* Resources */}
                    <nav aria-label="Liens utiles" className="flex flex-col">
                        <h4 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-wider">Liens</h4>
                        <ul className="space-y-3 text-gray-500 font-mono text-xs">
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
                            <li className="hover:text-white cursor-pointer transition-colors">Mentions légales</li>
                            <li className="hover:text-white cursor-pointer transition-colors">CGV</li>
                        </ul>
                    </nav>

                    {/* Company */}
                    <div className="flex flex-col">
                        <h4 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-wider">Audit</h4>
                        <p className="text-gray-500 font-mono text-xs mb-4">
                            Identification des opportunités d'automatisation pour votre entreprise.
                        </p>
                        <a href="#contact" className="inline-block border border-white/20 hover:bg-white hover:text-black hover:border-white text-center text-white font-mono text-xs px-4 py-2 uppercase transition-all">
                            Réserver un créneau
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-mono text-xs text-gray-500">
                        © 2025 Leonard Intelligence. Tous droits réservés.
                    </div>
                    <div className="flex items-center gap-6">
                        <span id="footer-status" className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                            Systèmes opérationnels
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
