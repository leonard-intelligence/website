import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import abstractFinance from '../../assets/images/illustrations/illustration-doc-matrix-03.png';
import abstractNetwork from '../../assets/images/illustrations/illustration-video-element.png';

export function SectionROI() {
    // Animated counters for stats
    const counterCosts = useAnimatedCounter(6, { suffix: 'h', duration: 2000, startOnView: false });
    const counterProd = useAnimatedCounter(159, { prefix: '+', suffix: '%', duration: 2000, startOnView: false });
    const counterROI = useAnimatedCounter(12, { prefix: '< ', suffix: ' mois', duration: 1500, startOnView: false });

    return (
        <section
            id="section-roi"
            className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black overflow-hidden"
            aria-labelledby="roi-heading"
        >
            <div className="flex flex-col gap-[1px] bg-white/10">

                {/* ROW 1: COÛTS (Title Left, Card Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-white/10">
                    {/* Large Title Block with Image */}
                    <div className="lg:col-span-2 bg-black relative overflow-hidden group reveal-left min-h-[300px] flex flex-col justify-center p-8 md:p-12">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <TechIllustration
                                src={abstractFinance}
                                alt=""
                                className="w-full h-full"
                                overlayGradient="bg-gradient-to-r from-black via-black/80 to-transparent"
                                imageClassName="opacity-40 group-hover:opacity-60"
                                aspectRatio=""
                            />
                        </div>

                        <div className="relative z-10 max-w-xl">
                            <div className="bg-[#E67E22]/20 backdrop-blur-sm w-fit px-3 py-1 rounded-full mb-6 border border-[#E67E22]/30">
                                <span className="text-[#E67E22] text-xs uppercase tracking-wider">Optimisation</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono text-white leading-tight uppercase tracking-[-0.03em]">
                                Réduisez<br />vos coûts
                            </h2>
                            <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-md">
                                L'IA absorbe la gestion répétitive pour libérer vos équipes sur des missions à valeur ajoutée.
                            </p>
                        </div>
                    </div>

                    {/* Mini Card Block */}
                    <div className="bg-black flex flex-col justify-between p-8 md:p-12 border-l border-white/10 reveal-up stagger-1 group hover:bg-white/5 transition-colors">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-[#E67E22] icon-bounce">
                            <DotIcon icon={leonardIcons.saisieAutomatisee} size={24} fillColor="#E67E22" />
                        </div>
                        <div>
                            <div ref={counterCosts.ref} className="text-5xl md:text-6xl font-mono font-medium text-[#E67E22] mb-2 tracking-tighter">
                                {counterCosts.displayValue}
                            </div>
                            <div className="text-sm text-white uppercase tracking-widest mb-1">
                                Par collaborateur
                            </div>
                            <div className="text-xs text-zinc-500 uppercase tracking-widest">
                                Libérées / semaine
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* MIDDLE BAR: ROI GLOBAL */}
            <div className="bg-zinc-900 border-y border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 reveal-up relative z-20">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E67E22] flex items-center justify-center shadow-[0_0_20px_rgba(230,126,34,0.3)] animate-pulse-glow">
                        <DotIcon icon={leonardIcons.roi} size={24} fillColor="#000000" />
                    </div>
                    <div>
                        <div className="text-white uppercase text-sm tracking-widest mb-1">Rentabilité</div>
                        <div className="text-zinc-400 text-xs">Retour sur investissement rapide constaté</div>
                    </div>
                </div>

                <div className="flex items-baseline gap-3" ref={counterROI.ref}>
                    <span className="text-4xl md:text-5xl font-mono font-medium text-white tracking-tighter">{counterROI.displayValue}</span>
                    <span className="text-[#E67E22] text-sm uppercase tracking-widest">pour être rentable</span>
                </div>
            </div>

            {/* ROW 2: PRODUCTIVITÉ (Card Left, Title Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-white/10">
                {/* Mini Card Block (Staggered to Left) */}
                <div className="bg-black flex flex-col justify-between p-8 md:p-12 border-r border-white/10 reveal-up stagger-1 group order-2 lg:order-1 hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-[#E67E22] icon-bounce">
                        <DotIcon icon={leonardIcons.productivite} size={24} fillColor="#E67E22" />
                    </div>
                    <div>
                        <div ref={counterProd.ref} className="text-5xl md:text-6xl font-mono font-medium text-white mb-2 tracking-tighter">
                            {counterProd.displayValue}
                        </div>
                        <div className="text-sm text-white uppercase tracking-widest mb-1">
                            ROI Médian
                        </div>
                        <div className="text-xs text-zinc-500 uppercase tracking-widest">
                            Sur 12 mois
                        </div>
                    </div>
                </div>

                {/* Large Title Block with Image */}
                <div className="lg:col-span-2 bg-black relative overflow-hidden group reveal-right order-1 lg:order-2 min-h-[300px] flex flex-col justify-center p-8 md:p-12">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <TechIllustration
                            src={abstractNetwork}
                            alt=""
                            className="w-full h-full"
                            overlayGradient="bg-gradient-to-l from-black via-black/80 to-transparent"
                            imageClassName="opacity-40 group-hover:opacity-60"
                            aspectRatio=""
                        />
                    </div>

                    <div className="relative z-10 max-w-xl lg:ml-auto lg:text-right">
                        <div className="bg-white/10 backdrop-blur-sm w-fit px-3 py-1 rounded-full mb-6 border border-white/10 lg:ml-auto">
                            <span className="text-zinc-300 text-xs uppercase tracking-wider">Croissance</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight uppercase tracking-[-0.03em]">
                            Augmentez votre<br /><span className="text-zinc-500">productivité</span>
                        </h2>
                        <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-md lg:ml-auto">
                            Des gains constatés sur plus de 200 déploiements. L'IA transforme vos opérations en levier de croissance.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
}
