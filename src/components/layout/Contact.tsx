import { useState, useEffect, useRef } from 'react';
import { contactSignal } from '@/lib/contactSignal';
import { clsx } from 'clsx';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { DotIcon, leonardIcons } from '@/components/ui/LeonardIcons';
import { CalendlyWidget } from '@/components/ui/CalendlyWidget';
import { Modal } from '@/components/ui/Modal';

const MAILERLITE_FORM_URL =
    import.meta.env.VITE_MAILERLITE_FORM_URL ||
    'https://assets.mailerlite.com/jsonp/2086225/forms/178403057009166301/subscribe';
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/leonard-intelligence/30min';

// Rate limiting: minimum 10 seconds between submissions
const SUBMIT_COOLDOWN_MS = 10_000;

const contactSchema = z.object({
    fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caracteres'),
    email: z.string().email('Veuillez entrer un email valide'),
    company: z.string().optional(),
    message: z
        .string()
        .min(10, 'Le message doit contenir au moins 10 caracteres')
        .max(2000, 'Le message est trop long'),
});

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const lastSubmitRef = useRef(0);

    // UI State
    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');

    // Validation with Zod
    const validation = contactSchema.safeParse({ fullName, email, company, message });
    const isValid = validation.success;

    const interests = [
        'Visual Intelligence',
        'Language & Process',
        'Audio & Signal',
        'Video Intelligence',
        'Stratégie IA',
    ];

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        );
    };

    useEffect(() => {
        return contactSignal.subscribe((subject) => {
            // 1. Scroll to contact section
            const contactSection = document.getElementById('section-contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }

            // 2. Open form view
            setShowForm(true);

            // 3. Select the interest tag
            setSelectedInterests((prev) => {
                if (!prev.includes(subject)) {
                    return [...prev, subject];
                }
                return prev;
            });
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldErrors({});
        setError(null);

        // Validate with Zod
        const result = contactSchema.safeParse({ fullName, email, company, message });
        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                errors[field] = issue.message;
            });
            setFieldErrors(errors);
            return;
        }

        // Rate limiting
        const now = Date.now();
        if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
            setError('Veuillez patienter quelques secondes avant de renvoyer.');
            return;
        }
        lastSubmitRef.current = now;

        setIsSubmitting(true);

        try {
            // Split full name for MailerLite (simple split by first space)
            const nameParts = fullName.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            // Build form data for MailerLite
            // Note: 'country' and 'city' are used as custom field proxies for
            // 'interests' and 'message' respectively, because MailerLite's JSONP
            // endpoint only supports default subscriber fields. To use proper
            // custom fields, migrate to the MailerLite API with a backend proxy.
            const formData = new FormData();
            formData.append('fields[email]', email);
            formData.append('fields[name]', firstName);
            formData.append('fields[last_name]', lastName);
            formData.append('fields[company]', company || '');
            formData.append('fields[country]', selectedInterests.join(', ')); // proxy: interests
            formData.append('fields[city]', message); // proxy: message

            await fetch(MAILERLITE_FORM_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors',
            });

            setIsSent(true);

            // Reset form
            setFullName('');
            setEmail('');
            setCompany('');
            setMessage('');
            setSelectedInterests([]);
        } catch (err) {
            console.error('Submission error:', err);
            setError("Impossible d'envoyer le message. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="section-contact" className="py-24 bg-black relative border-t border-white/10 reveal-up">
            {/* Calendly Modal (pre-rendered hidden via persist mode) */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fullScreen persist>
                <CalendlyWidget
                    className="mt-0 h-full"
                    style={{ minWidth: '320px', height: '100%' }}
                    url={CALENDLY_URL}
                    active={isModalOpen}
                />
            </Modal>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Contact Info */}
                <div className="lg:col-span-5">
                    <h2
                        id="contact-heading"
                        className="text-4xl md:text-5xl font-normal font-mono uppercase text-white mb-6"
                    >
                        Avançons <br />
                        <span className="text-[#E67E22]">ensemble.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 leading-relaxed font-sans">
                        Transformation IA, valorisation de vos données, déploiement souverain ? Décrivez-nous votre
                        situation, un consultant vous répond sous 24h.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4 group">
                            <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                <DotIcon icon={leonardIcons.emailsTries} size={24} fillColor="#E67E22" />
                            </div>
                            <div>
                                <h3 className="text-white font-normal mb-1 font-mono uppercase">Email</h3>
                                <p className="text-gray-400 text-sm">hello@leonardintelligence.com</p>
                                <p className="text-gray-400 text-xs mt-1">Réponse sous 24h.</p>
                            </div>
                        </div>

                        {/* Compliance Badges */}
                        <div className="pt-12 border-t border-white/5 mt-12">
                            <p className="text-xs text-gray-400 mb-6 uppercase tracking-wider">Conformité</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                    <DotIcon icon={leonardIcons.aiActReady} size={16} fillColor="#E67E22" />
                                    <span className="text-xs">AI ACT READY</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                    <DotIcon icon={leonardIcons.rgpdCompliant} size={16} fillColor="#E67E22" />
                                    <span className="text-xs">RGPD COMPLIANT</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                    <DotIcon icon={leonardIcons.hdsReady} size={16} fillColor="#E67E22" />
                                    <span className="text-xs">HDS COMPATIBLE</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                    <DotIcon icon={leonardIcons.hebergementUE} size={16} fillColor="#E67E22" />
                                    <span className="text-xs">HÉBERGEMENT UE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Choices or Form */}
                <div id="contact-form-wrapper" className="lg:col-span-7 relative min-h-[500px] flex flex-col justify-center">
                    {!showForm && !isSent ? (
                        <div className="grid grid-cols-2 gap-4 sm:gap-8 group/container mt-8">
                            {/* Option 1: Visio - The Direct Path */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="relative flex flex-col items-center justify-between p-6 sm:p-16 text-center transition-all duration-500 bg-[#3D2314]/[0.15] border border-[#3D2314]/40 hover:border-[#3D2314]/80 hover:-translate-y-1 cursor-pointer group/item1 opacity-100 group-hover/container:opacity-60 hover:!opacity-100 shadow-2xl hover:shadow-[#3D2314]/30"
                            >
                                {/* Accent Border Bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#3D2314]/0 group-hover/item1:bg-[#3D2314]/100 transition-all duration-500" />

                                <div className="relative z-10 w-full flex flex-col items-center space-y-8">
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="relative">
                                            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-[#3D2314]/30 overflow-hidden mb-2 group-hover/item1:border-[#3D2314]/60 transition-colors duration-500">
                                                <img
                                                    src="/assets/images/team/melvin.webp"
                                                    alt="Guillaume"
                                                    width={96}
                                                    height={96}
                                                    className="w-full h-full object-cover grayscale-[0.2] group-hover/item1:grayscale-0 transition-all duration-500 scale-110 group-hover/item1:scale-100"
                                                />
                                            </div>
                                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-black border border-[#3D2314]/20 rounded-full flex items-center justify-center">
                                                <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                                            </div>
                                        </div>

                                        <div className="text-center space-y-1">
                                            <p className="text-white font-mono text-sm uppercase tracking-wider">
                                                Guillaume
                                            </p>
                                            <p className="text-[#E67E22] text-[10px] font-mono uppercase tracking-widest">
                                                Consultant IA
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm sm:text-2xl font-mono uppercase font-normal tracking-[0.2em] text-white group-hover/item1:text-white transition-colors leading-tight">
                                            Parlons <br /> ensemble
                                        </h4>
                                        <div className="h-[1px] w-10 mx-auto bg-[#3D2314]/30 group-hover/item1:w-14 group-hover/item1:bg-[#3D2314]/60 transition-all duration-500" />
                                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] text-gray-400 group-hover/item1:text-[#B1937F] transition-colors leading-relaxed">
                                            Visio gratuite <br /> de 30 minutes
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 sm:mt-12 relative z-10 text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 group-hover/item1:text-[#E67E22] transition-colors flex items-center gap-2">
                                    <span>Je prends rendez-vous</span>
                                    <DotIcon
                                        icon={leonardIcons.arrowRight}
                                        size={12}
                                        className="text-[#3D2314] group-hover/item1:text-[#E67E22]"
                                    />
                                </div>
                            </button>

                            {/* Option 2: Message - The Thoughtful Path */}
                            <button
                                onClick={() => setShowForm(true)}
                                className="relative flex flex-col items-center justify-between p-6 sm:p-16 text-center transition-all duration-500 bg-white/[0.03] border border-white/25 hover:border-white/40 hover:-translate-y-1 cursor-pointer group/item2 opacity-100 group-hover/container:opacity-50 hover:!opacity-100 shadow-2xl"
                            >
                                {/* Accent Border Bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/0 group-hover/item2:bg-white/40 transition-all duration-500" />

                                <div className="relative z-10 w-full flex flex-col items-center space-y-8">
                                    <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center text-white/60 group-hover/item2:text-white transition-all duration-500">
                                        <DotIcon
                                            icon={leonardIcons.solutionConversation}
                                            size={40}
                                            className="sm:size-[56px] group-hover/item2:translate-y-[-4px] transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm sm:text-2xl font-mono uppercase font-normal tracking-[0.2em] text-white/80 group-hover/item2:text-white transition-colors">
                                            Message
                                        </h4>
                                        <div className="h-[1px] w-10 mx-auto bg-white/20 group-hover/item2:w-14 group-hover/item2:bg-white/50 transition-all duration-500" />
                                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] text-gray-300 group-hover/item2:text-gray-200 transition-colors">
                                            Réponse sous 24h
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 sm:mt-12 relative z-10 text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 group-hover/item2:text-white transition-colors flex items-center gap-2">
                                    <span>Envoyer ma demande</span>
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                </div>
                            </button>
                        </div>
                    ) : isSent ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <DotIcon icon={leonardIcons.check} size={64} fillColor="#E67E22" className="mb-6" />
                            <h3 className="text-2xl font-normal font-mono text-white mb-2 uppercase">Message envoyé</h3>
                            <p className="text-gray-400 font-sans">
                                Merci de nous avoir contactés. Nous reviendrons vers vous très rapidement.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-8 border-white/20 text-white hover:bg-white/10 rounded-none uppercase"
                                onClick={() => setIsSent(false)}
                            >
                                Envoyer un autre message
                            </Button>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <button
                                onClick={() => setShowForm(false)}
                                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm uppercase tracking-wide transition-colors"
                            >
                                ← Retour
                            </button>
                            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-gray-300 uppercase text-xs">
                                        Nom complet
                                    </Label>
                                    <Input
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Thomas Anderson"
                                        required
                                        aria-invalid={!!fieldErrors.fullName}
                                        aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] focus-visible:ring-2 focus-visible:ring-[#E67E22] focus-visible:ring-offset-1 focus-visible:ring-offset-black rounded-none h-12 input-animate"
                                    />
                                    {fieldErrors.fullName && (
                                        <p id="fullName-error" className="text-red-400 text-xs" role="alert">
                                            {fieldErrors.fullName}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-300 uppercase text-xs">
                                        Email professionnel
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="t.anderson@metacortex.com"
                                        required
                                        aria-invalid={!!fieldErrors.email}
                                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] focus-visible:ring-2 focus-visible:ring-[#E67E22] focus-visible:ring-offset-1 focus-visible:ring-offset-black rounded-none h-12 input-animate"
                                    />
                                    {fieldErrors.email && (
                                        <p id="email-error" className="text-red-400 text-xs" role="alert">
                                            {fieldErrors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-gray-300 uppercase text-xs">
                                        Entreprise
                                    </Label>
                                    <Input
                                        id="company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder="MetaCortex"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] focus-visible:ring-2 focus-visible:ring-[#E67E22] focus-visible:ring-offset-1 focus-visible:ring-offset-black rounded-none h-12 input-animate"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-gray-300 uppercase text-xs">Je suis intéressé par</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {interests.map((interest) => (
                                            <button
                                                key={interest}
                                                type="button"
                                                onClick={() => toggleInterest(interest)}
                                                className={clsx(
                                                    'text-xs px-3 py-2 border transition-all duration-200 uppercase tracking-wide cursor-pointer',
                                                    selectedInterests.includes(interest)
                                                        ? 'bg-[#D35400] border-[#D35400] text-white font-semibold'
                                                        : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
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
                                    <Label htmlFor="message" className="text-gray-300 uppercase text-xs">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Je cherche à automatiser un flux complexe : extraction de données sur documents scannés (LLM), analyse et qualification des photos jointes (Vision), et injection propre en base de données SQL. Le volume devient ingérable manuellement..."
                                        className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E67E22] focus-visible:ring-2 focus-visible:ring-[#E67E22] focus-visible:ring-offset-1 focus-visible:ring-offset-black rounded-none input-animate"
                                        required
                                        aria-invalid={!!fieldErrors.message}
                                        aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                                    />
                                    {fieldErrors.message && (
                                        <p id="message-error" className="text-red-400 text-xs" role="alert">
                                            {fieldErrors.message}
                                        </p>
                                    )}
                                </div>

                                {error && (
                                    <div
                                        className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className={clsx(
                                        'w-full font-medium h-14 text-sm uppercase rounded-none tracking-wider border transition-all',
                                        isValid
                                            ? 'bg-white text-[#3D2314] hover:bg-[#F5F5F5] border-[#3D2314]'
                                            : 'bg-white/10 text-white/60 border-white/20 cursor-not-allowed'
                                    )}
                                    disabled={isSubmitting || !isValid}
                                >
                                    {isSubmitting ? (
                                        'ENVOI EN COURS...'
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            ENVOYER LE MESSAGE{' '}
                                            <DotIcon icon={leonardIcons.arrowRight} size={16} fillColor="#3D2314" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
