
import { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

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
        <section id="section-contact" className="py-24 bg-black relative border-t border-white/10 contact">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 contact__container">

                {/* Contact Info */}
                <div className="contact__info">
                    <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold font-mono uppercase text-white mb-6 contact__heading">
                        Parlons <span className="text-brand-blue">Données.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 leading-relaxed font-sans">
                        Vous avez un projet d'IA générative ou besoin d'un audit de souveraineté ?
                        Nos experts sont là pour vous accompagner.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4 group">
                            <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                <Mail className="w-6 h-6 text-brand-blue" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1 font-mono uppercase">Email</h3>
                                <p className="text-gray-400 font-mono text-sm">contact@mel-conseil.com</p>
                                <p className="text-gray-500 text-xs mt-1 font-mono">Réponse sous 24h ouvrées.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                            <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                <MapPin className="w-6 h-6 text-brand-blue" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1 font-mono uppercase">Bureaux</h3>
                                <p className="text-gray-400 font-mono text-sm">Paris, France</p>
                                <p className="text-gray-500 text-xs mt-1 font-mono">Disponibles en visio ou en présentiel.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div id="contact-form-wrapper" className="bg-black border border-white/10 p-8 relative contact__form-wrapper">
                    {/* Decorative Corner Markers */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50"></div>

                    {isSent ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                            <h3 className="text-2xl font-bold font-mono text-white mb-2 uppercase">Message envoyé</h3>
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
                        <form id="contact-form" onSubmit={handleSubmit} className="space-y-6 contact__form">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-gray-300 font-mono uppercase text-xs">Prénom</Label>
                                    <Input id="firstName" placeholder="JEAN" required className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-brand-blue rounded-none h-12 font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-300 font-mono uppercase text-xs">Nom</Label>
                                    <Input id="name" placeholder="DUPONT" required className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-brand-blue rounded-none h-12 font-mono" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-300 font-mono uppercase text-xs">Email professionnel</Label>
                                <Input id="email" type="email" placeholder="JEAN.DUPONT@ENTREPRISE.COM" required className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-brand-blue rounded-none h-12 font-mono" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-gray-300 font-mono uppercase text-xs">Entreprise</Label>
                                <Input id="company" placeholder="VOTRE SOCIÉTÉ" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-brand-blue rounded-none h-12 font-mono" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-gray-300 font-mono uppercase text-xs">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="DÉCRIVEZ VOTRE PROJET..."
                                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-brand-blue rounded-none font-mono"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200 font-bold font-mono h-14 text-sm uppercase rounded-none tracking-wider"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    "ENVOI EN COURS..."
                                ) : (
                                    <span className="flex items-center gap-2">
                                        ENVOYER LE MESSAGE <Send className="w-4 h-4" />
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
