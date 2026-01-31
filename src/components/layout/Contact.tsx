
import { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSent(true);
        console.log("Form submitted");
    };

    return (
        <section id="section-contact" className="py-24 bg-black relative border-t border-white/10 reveal-up">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Contact Info */}
                <div>
                    <h2 id="contact-heading" className="text-4xl md:text-5xl font-semibold font-mono uppercase text-white mb-6">
                        Parlons de <span className="text-[#E67E22]">votre projet.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 leading-relaxed font-sans">
                        Transformation IA, valorisation de vos données, déploiement souverain ?
                        Décrivez-nous votre situation, un consultant vous répond sous 24h.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4 group">
                            <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                <DotIcon icon={leonardIcons.emailsTries} size={24} fillColor="#E67E22" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1 font-mono uppercase">Email</h3>
                                <p className="text-gray-400 font-mono text-sm">hello@leonardintelligence.com</p>
                                <p className="text-gray-500 text-xs mt-1 font-mono">Réponse garantie sous 24h.</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Contact Form */}
                <div id="contact-form-wrapper" className="bg-black border border-white/10 p-8 relative">
                    {/* Decorative Corner Markers */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50 corner-animate"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50 corner-animate" style={{ animationDelay: '0.1s' }}></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50 corner-animate" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50 corner-animate" style={{ animationDelay: '0.3s' }}></div>

                    {isSent ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <DotIcon icon={leonardIcons.check} size={64} fillColor="#E67E22" className="mb-6" />
                            <h3 className="text-2xl font-semibold font-mono text-white mb-2 uppercase">Message envoyé</h3>
                            <p className="text-gray-400 font-sans">
                                Merci de nous avoir contactés. Nous reviendrons vers vous très rapidement.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-8 border-white/20 text-white hover:bg-white/10 rounded-none font-mono uppercase"
                                onClick={() => setIsSent(false)}
                            >
                                Envoyer un autre message
                            </Button>
                        </div>
                    ) : (
                        <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-gray-300 font-mono uppercase text-xs">Prénom</Label>
                                    <Input id="firstName" placeholder="JEAN" required className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none h-12 font-mono input-animate" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-300 font-mono uppercase text-xs">Nom</Label>
                                    <Input id="name" placeholder="DUPONT" required className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none h-12 font-mono input-animate" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-300 font-mono uppercase text-xs">Email professionnel</Label>
                                <Input id="email" type="email" placeholder="JEAN.DUPONT@ENTREPRISE.COM" required className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none h-12 font-mono input-animate" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-gray-300 font-mono uppercase text-xs">Entreprise</Label>
                                <Input id="company" placeholder="VOTRE SOCIÉTÉ" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none h-12 font-mono input-animate" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-gray-300 font-mono uppercase text-xs">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="DÉCRIVEZ VOTRE PROJET..."
                                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none font-mono input-animate"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-white text-[#3D2314] hover:bg-[#F5F5F5] font-semibold font-mono h-14 text-sm uppercase rounded-none tracking-wider border border-[#3D2314] transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    "ENVOI EN COURS..."
                                ) : (
                                    <span className="flex items-center gap-2">
                                        ENVOYER LE MESSAGE <DotIcon icon={leonardIcons.arrowRight} size={16} fillColor="#3D2314" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

