
import { useState, useEffect } from 'react';
import { contactSignal } from '@/lib/contactSignal';
import { clsx } from 'clsx';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";

const MAILERLITE_FORM_URL = "https://assets.mailerlite.com/jsonp/2086225/forms/178403057009166301/subscribe";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    // Form State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");

    // Validation
    const isValid = firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        email.trim() !== "" &&
        message.trim() !== "";

    const interests = [
        "Visual Intelligence",
        "Language & Process",
        "Audio & Signal",
        "Video Intelligence",
        "Stratégie IA"
    ];

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    useEffect(() => {
        return contactSignal.subscribe((subject) => {
            // 1. Scroll to contact section
            const contactSection = document.getElementById('section-contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }

            // 2. Select the interest tag
            setSelectedInterests(prev => {
                if (!prev.includes(subject)) {
                    return [...prev, subject];
                }
                return prev;
            });
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Build form data for MailerLite
            // Field names must match your MailerLite form fields
            const formData = new FormData();
            formData.append('fields[email]', email);
            formData.append('fields[name]', firstName);
            formData.append('fields[last_name]', lastName);
            formData.append('fields[company]', company || '');
            formData.append('fields[country]', selectedInterests.join(', '));
            formData.append('fields[city]', message);

            await fetch(MAILERLITE_FORM_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // MailerLite doesn't support CORS, but form will still submit
            });

            // With no-cors mode, we can't read the response, but the submission goes through
            // We assume success if no network error
            setIsSent(true);

            // Reset form
            setFirstName("");
            setLastName("");
            setEmail("");
            setCompany("");
            setMessage("");
            setSelectedInterests([]);

        } catch (err) {
            console.error("Submission error:", err);
            setError("Impossible d'envoyer le message. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="section-contact" className="py-24 bg-black relative border-t border-white/10 reveal-up">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Contact Info */}
                <div>
                    <h2 id="contact-heading" className="text-4xl md:text-5xl font-medium font-mono uppercase text-white mb-6">
                        Parlons de <br /><span className="text-[#E67E22]">votre projet.</span>
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
                                <h3 className="text-white font-medium mb-1 font-mono uppercase">Email</h3>
                                <p className="text-gray-400 font-mono text-sm">hello@leonardintelligence.com</p>
                                <p className="text-gray-500 text-xs mt-1 font-mono">Réponse sous 24h.</p>
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
                            <h3 className="text-2xl font-medium font-mono text-white mb-2 uppercase">Message envoyé</h3>
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
                                    <Input
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Thomas"
                                        required
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none h-12 font-mono input-animate"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-300 font-mono uppercase text-xs">Nom</Label>
                                    <Input
                                        id="name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Anderson"
                                        required
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none h-12 font-mono input-animate"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-300 font-mono uppercase text-xs">Email professionnel</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="t.anderson@metacortex.com"
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none h-12 font-mono input-animate"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-gray-300 font-mono uppercase text-xs">Entreprise</Label>
                                <Input
                                    id="company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="MetaCortex"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none h-12 font-mono input-animate"
                                />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-gray-300 font-mono uppercase text-xs">Je suis intéressé par</Label>
                                <div className="flex flex-wrap gap-2">
                                    {interests.map((interest) => (
                                        <button
                                            key={interest}
                                            type="button"
                                            onClick={() => toggleInterest(interest)}
                                            className={clsx(
                                                "font-mono text-xs px-3 py-2 border transition-all duration-200 uppercase tracking-wide cursor-pointer",
                                                selectedInterests.includes(interest)
                                                    ? "bg-[#E67E22] border-[#E67E22] text-white"
                                                    : "bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                                            )}
                                        >
                                            {selectedInterests.includes(interest) && (
                                                <span className="mr-2 inline-block">✓</span>
                                            )}
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-gray-300 font-mono uppercase text-xs">Message</Label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Je cherche à automatiser un flux complexe : extraction de données sur documents scannés (LLM), analyse et qualification des photos jointes (Vision), et injection propre en base de données SQL. Le volume devient ingérable manuellement..."
                                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] rounded-none font-mono input-animate"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className={clsx(
                                    "w-full font-medium font-mono h-14 text-sm uppercase rounded-none tracking-wider border transition-all",
                                    isValid
                                        ? "bg-white text-[#3D2314] hover:bg-[#F5F5F5] border-[#3D2314]"
                                        : "bg-white/10 text-white/60 border-white/20 cursor-not-allowed"
                                )}
                                disabled={isSubmitting || !isValid}
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
