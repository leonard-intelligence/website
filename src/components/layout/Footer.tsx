export function Footer() {
    return (
        <footer id="section-footer" className="footer bg-black py-20 border-t border-white/10 text-sm">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 footer__container">

                <div className="col-span-1 md:col-span-1 footer__column footer__column--brand">
                    <h3 className="font-display font-bold text-2xl text-white mb-6 tracking-tighter">ANTIGRAVITY</h3>
                    <p className="text-gray-500 mb-6">
                        Agence de conseil en Intelligence Artificielle Souveraine.
                        <br />Paris, France.
                    </p>
                    <div className="font-mono text-xs text-brand-blue">
                        © 2026 Antigravity.
                    </div>
                </div>

                <div className="footer__column footer__column--services">
                    <h4 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-wider">Services</h4>
                    <ul className="space-y-3 text-gray-500 font-mono text-xs">
                        <li className="hover:text-white cursor-pointer transition-colors">RAG Documentaire</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Agents Autonomes</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Computer Vision</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Audit & Conseil</li>
                    </ul>
                </div>

                <div className="footer__column footer__column--company">
                    <h4 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-wider">Entreprise</h4>
                    <ul className="space-y-3 text-gray-500 font-mono text-xs">
                        <li className="hover:text-white cursor-pointer transition-colors">À propos</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Carrières</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Blog R&D</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                    </ul>
                </div>

                <div className="footer__column footer__column--legal">
                    <h4 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-wider">Légal</h4>
                    <ul className="space-y-3 text-gray-500 font-mono text-xs">
                        <li className="hover:text-white cursor-pointer transition-colors">Mentions Légales</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Politique de Confidentialité</li>
                        <li className="hover:text-white cursor-pointer transition-colors">CGV</li>
                    </ul>
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <span id="footer-status" className="flex items-center gap-2 text-green-500 font-mono text-xs footer__status footer__status--online">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            All Systems Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
