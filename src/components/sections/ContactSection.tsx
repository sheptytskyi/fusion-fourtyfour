import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Zap, Mail, Globe, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Configuration ───────────────────────────────────────────────────────────
const FORM_SUBMIT_URL = 'https://wf-backend.vercel.app/api/v1/leads/44/contact';

const PROJECT_TYPES = [
    'Web Application',
    'Mobile App',
    'MVP / Prototype',
    'System Architecture',
    'Performance Audit',
    'Other',
];

const BUDGET_RANGES = [
    '< $5k',
    '$5k – $20k',
    '$20k – $50k',
    '$50k – $100k',
    '$100k+',
    'Let\'s discuss',
];

// ─── Types ───────────────────────────────────────────────────────────────────
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
    name: string;
    email: string;
    company: string;
    projectType: string;
    budget: string;
    message: string;
}

// ─── Component ───────────────────────────────────────────────────────────────
const ContactSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: '',
    });

    // ── Animations ──────────────────────────────────────────────────────────
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current) return;

            gsap.fromTo('.contact-header-reveal',
                { opacity: 0, x: -100, filter: 'blur(10px)' },
                {
                    opacity: 1, x: 0, filter: 'blur(0px)',
                    scrollTrigger: {
                        trigger: '.contact-header-reveal',
                        start: 'top 90%', end: 'top 40%', scrub: 1,
                    },
                }
            );

            gsap.fromTo('.founder-card-3d',
                { rotateY: -15, rotateX: 10, scale: 0.9, opacity: 0 },
                {
                    rotateY: 0, rotateX: 0, scale: 1, opacity: 1,
                    scrollTrigger: {
                        trigger: '.founder-card-3d',
                        start: 'top 95%', end: 'center center', scrub: 1.5,
                    },
                }
            );

            gsap.fromTo('.contact-form-reveal',
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0,
                    scrollTrigger: {
                        trigger: '.contact-form-reveal',
                        start: 'top 85%', end: 'top 50%', scrub: 1,
                    },
                }
            );

            const items = gsap.utils.toArray<HTMLElement>('.contact-info-card');
            items.forEach((item, i) => {
                const isEven = i % 2 === 0;
                gsap.fromTo(item,
                    { opacity: 0, x: isEven ? -50 : 50, scale: 0.9 },
                    {
                        opacity: 1, x: 0, scale: 1,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 90%', end: 'top 60%', scrub: 1,
                        },
                    }
                );
            });

            gsap.fromTo('.contact-line-v',
                { scaleY: 0, opacity: 0 },
                {
                    scaleY: 1, opacity: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%', end: 'bottom 20%', scrub: 1,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ── ARIA invalid sync ────────────────────────────────────────────────────
    useLayoutEffect(() => {
        const form = formRef.current;
        if (!form) return;

        const syncAria = (el: EventTarget | null) => {
            if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) return;
            el.setAttribute('aria-invalid', el.matches(':user-invalid') ? 'true' : 'false');
        };

        const onBlur = (e: FocusEvent) => syncAria(e.target);
        const onInput = (e: Event) => {
            if ((e.target as HTMLElement)?.hasAttribute('aria-invalid')) syncAria(e.target);
        };

        form.addEventListener('blur', onBlur, true);
        form.addEventListener('input', onInput);
        return () => {
            form.removeEventListener('blur', onBlur, true);
            form.removeEventListener('input', onInput);
        };
    }, []);

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === 'submitting') return;

        // Sync aria-invalid on all required fields at submit time
        formRef.current?.querySelectorAll('[required]').forEach(el => {
            if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
                el.setAttribute('aria-invalid', el.checkValidity() ? 'false' : 'true');
            }
        });

        if (!formRef.current?.checkValidity()) {
            formRef.current?.reportValidity();
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch(FORM_SUBMIT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error(`Server responded with ${res.status}`);

            setStatus('success');
            setFormData({ name: '', email: '', company: '', projectType: '', budget: '', message: '' });
        } catch (err) {
            setStatus('error');
            setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        }
    };

    const contactLinks = [
        { icon: <Mail className="w-5 h-5" />, label: 'Direct Channel', value: 'hello@44fingers.tech', href: 'mailto:hello@44fingers.tech' },
        { icon: <Globe className="w-5 h-5" />, label: 'Location', value: 'Kyiv, Ukraine', href: '#' },
    ];

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-24 lg:py-48 overflow-hidden bg-transparent"
        >
            {/* Architectural Grid Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="contact-line-v absolute left-[10%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent origin-top" />
                <div className="contact-line-v absolute left-[90%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent origin-top" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-y-24 lg:gap-x-24 items-start">

                    {/* TOP ROW: Heading */}
                    <div className="lg:col-span-7">
                        <div className="contact-header-reveal space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] text-white/30 uppercase tracking-[0.8em] font-medium">initiate contact</span>
                                <div className="h-px w-12 bg-gradient-to-r from-white/20 to-transparent" />
                            </div>
                            <h2 className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tighter leading-[0.9] lowercase">
                                build your <br />
                                <span className="italic text-white/40">next legacy.</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-white/45 font-light max-w-xl leading-relaxed lowercase">
                                from architecture to delivery — we're your engineering alpha. skip the fluff, ship the performance.
                            </p>
                        </div>
                    </div>

                    {/* TOP ROW: Founder Image */}
                    <div className="lg:col-span-5">
                        <div className="founder-card-3d relative group">
                            <div className="relative overflow-hidden rounded-[3rem] bg-[#0a0a0a] border border-white/10 shadow-2xl aspect-[4/5]">
                                <img
                                    src="/founder.webp"
                                    alt="Dmytro Sheptytskyi"
                                    loading="lazy"
                                    className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-8 left-8 right-8 p-6 rounded-[2rem] bg-white/[0.05] backdrop-blur-xl border border-white/10 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-light text-white tracking-tight">Dmytro Sheptytskyi</h3>
                                        <span className="text-[9px] text-white/30 uppercase tracking-widest block mt-1">Founding Partner</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white border border-black flex items-center justify-center text-black">
                                        <Zap size={18} fill="currentColor" className="opacity-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM LEFT: Contact Form */}
                    <div className="lg:col-span-7 contact-form-reveal">
                        <div className="rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md p-8 md:p-10">

                            {/* Form header */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white/50">
                                    <Send className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Send a message</p>
                                    <p className="text-sm text-white/50 font-light">We respond within 24 hours</p>
                                </div>
                            </div>

                            {/* ── Success State ─────────────────────────────── */}
                            {status === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-light text-white mb-2">Message sent.</h3>
                                        <p className="text-white/40 text-sm font-light">We'll be in touch within 24 hours.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStatus('idle')}
                                        className="mt-2 text-xs text-white/30 uppercase tracking-widest hover:text-white/60 transition-colors"
                                    >
                                        Send another
                                    </button>
                                </div>
                            ) : (
                                /* ── Form ──────────────────────────────────── */
                                <form
                                    ref={formRef}
                                    id="contact-form"
                                    onSubmit={handleSubmit}
                                    noValidate
                                    className="space-y-5"
                                >
                                    {/* Row 1: Name + Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="cf-field">
                                            <label htmlFor="cf-name" className="cf-label">
                                                Full Name <span aria-hidden="true" className="text-white/30">*</span>
                                            </label>
                                            <input
                                                id="cf-name"
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                autoComplete="name"
                                                placeholder="Jane Smith"
                                                className="cf-input"
                                                aria-errormessage="cf-name-error"
                                            />
                                            <div id="cf-name-error" role="alert" className="cf-error">
                                                <span aria-hidden="true">⚠</span> This field is required.
                                            </div>
                                        </div>

                                        <div className="cf-field">
                                            <label htmlFor="cf-email" className="cf-label">
                                                Email <span aria-hidden="true" className="text-white/30">*</span>
                                            </label>
                                            <input
                                                id="cf-email"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                autoComplete="email"
                                                placeholder="jane@company.com"
                                                className="cf-input"
                                                aria-errormessage="cf-email-error"
                                            />
                                            <div id="cf-email-error" role="alert" className="cf-error">
                                                <span aria-hidden="true">⚠</span> Enter a valid email address.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2: Company */}
                                    <div className="cf-field">
                                        <label htmlFor="cf-company" className="cf-label">Company / Organization</label>
                                        <input
                                            id="cf-company"
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            autoComplete="organization"
                                            placeholder="Acme Inc."
                                            className="cf-input"
                                        />
                                    </div>

                                    {/* Row 3: Project Type + Budget */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="cf-field">
                                            <label htmlFor="cf-project-type" className="cf-label">
                                                Project Type <span aria-hidden="true" className="text-white/30">*</span>
                                            </label>
                                            <select
                                                id="cf-project-type"
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleChange}
                                                required
                                                className="cf-input cf-select"
                                                aria-errormessage="cf-project-error"
                                            >
                                                <option value="" disabled>Select type…</option>
                                                {PROJECT_TYPES.map(t => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                            <div id="cf-project-error" role="alert" className="cf-error">
                                                <span aria-hidden="true">⚠</span> Please select a project type.
                                            </div>
                                        </div>

                                        <div className="cf-field">
                                            <label htmlFor="cf-budget" className="cf-label">Budget Range</label>
                                            <select
                                                id="cf-budget"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="cf-input cf-select"
                                            >
                                                <option value="" disabled>Select range…</option>
                                                {BUDGET_RANGES.map(b => (
                                                    <option key={b} value={b}>{b}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 4: Message */}
                                    <div className="cf-field">
                                        <label htmlFor="cf-message" className="cf-label">
                                            Message <span aria-hidden="true" className="text-white/30">*</span>
                                        </label>
                                        <textarea
                                            id="cf-message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Tell us about your project, goals, and timeline…"
                                            className="cf-input cf-textarea"
                                            aria-errormessage="cf-message-error"
                                        />
                                        <div id="cf-message-error" role="alert" className="cf-error">
                                            <span aria-hidden="true">⚠</span> Please describe your project.
                                        </div>
                                    </div>

                                    {/* API error banner */}
                                    {status === 'error' && (
                                        <div role="alert" className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        id="cf-submit"
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="group relative flex items-center justify-between w-full p-6 md:p-8 bg-white rounded-[1.5rem] overflow-hidden transition-all duration-500 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <div className="absolute inset-0 bg-neutral-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                                        <div className="relative z-10 flex flex-col items-start">
                                            <span className="text-[10px] text-black/40 font-bold uppercase tracking-widest mb-1">
                                                {status === 'submitting' ? 'Sending…' : 'Send message'}
                                            </span>
                                            <span className="text-2xl md:text-3xl font-light text-black tracking-tight leading-none lowercase">
                                                Let's build together
                                            </span>
                                        </div>
                                        <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:rotate-45 duration-700 shrink-0">
                                            {status === 'submitting'
                                                ? <Loader2 size={22} className="animate-spin" />
                                                : <ArrowUpRight size={26} />
                                            }
                                        </div>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* BOTTOM RIGHT: Info Cards + Calendar CTA */}
                    <div className="lg:col-span-5 h-full flex items-end">
                        <div className="w-full space-y-6">
                            {/* Contact info cards */}
                            <div className="grid grid-cols-1 gap-4">
                                {contactLinks.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : '_self'}
                                        rel="noopener noreferrer"
                                        className="contact-info-card group p-6 rounded-[1.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 flex items-center gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors shrink-0">
                                            {link.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold block">{link.label}</span>
                                            <div className="text-base text-white/70 font-light truncate group-hover:text-white transition-colors">{link.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Calendar CTA */}
                            <a
                                href="https://calendly.com/channektoshka/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-between w-full p-8 md:p-10 bg-white rounded-[2.5rem] overflow-hidden transition-transform active:scale-95 duration-500"
                            >
                                <div className="absolute inset-0 bg-neutral-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                                <div className="relative z-10 flex flex-col items-start translate-y-0">
                                    <span className="text-[10px] text-black/40 font-bold uppercase tracking-widest mb-2">schedule session</span>
                                    <span className="text-3xl md:text-4xl font-light text-black tracking-tight leading-none lowercase">Book a discovery call</span>
                                </div>
                                <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:rotate-45 duration-700">
                                    <ArrowUpRight size={32} />
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                /* ── Layout ── */
                .cf-field { display: flex; flex-direction: column; gap: 0.375rem; }

                /* ── Label ── */
                .cf-label {
                    font-size: 0.6875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    font-weight: 600;
                    color: rgba(255,255,255,0.25);
                }

                /* ── Input base ── */
                .cf-input {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 1rem;
                    padding: 0.875rem 1.125rem;
                    font-size: 0.9375rem;
                    font-weight: 300;
                    color: rgba(255,255,255,0.85);
                    outline: none;
                    transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
                    font-family: inherit;
                }
                .cf-input::placeholder { color: rgba(255,255,255,0.2); }
                .cf-input:focus {
                    border-color: rgba(255,255,255,0.35);
                    background: rgba(255,255,255,0.07);
                    box-shadow: 0 0 0 3px rgba(255,255,255,0.05);
                }

                /* ── Select ── */
                .cf-select {
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    padding-right: 2.5rem;
                    cursor: pointer;
                }
                .cf-select option {
                    background: #0a0a0a;
                    color: rgba(255,255,255,0.8);
                }

                /* ── Textarea ── */
                .cf-textarea { resize: vertical; min-height: 120px; }

                /* ── Validation: :user-invalid (Baseline Widely Available) ── */
                .cf-input:user-invalid {
                    border-color: rgba(239,68,68,0.6);
                    background: rgba(239,68,68,0.05);
                }
                .cf-input:user-valid:not(:placeholder-shown) {
                    border-color: rgba(52,211,153,0.4);
                }

                /* ── Error message ── */
                .cf-error {
                    display: none;
                    font-size: 0.75rem;
                    color: rgba(248,113,113,0.9);
                    padding-left: 0.25rem;
                    gap: 0.25rem;
                }
                .cf-input:user-invalid ~ .cf-error { display: flex; align-items: center; }

                /* ── GSAP will-change hints ── */
                .contact-info-card,
                .founder-card-3d,
                .contact-header-reveal,
                .contact-form-reveal { will-change: transform, opacity; }
                .founder-card-3d { perspective: 1200px; }
                .contact-line-v { will-change: transform; }
                .contact-header-reveal { will-change: transform, opacity, filter; }
            `}</style>
        </section>
    );
};

export default ContactSection;