import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        id: 1,
        question: "How fast can you deliver an MVP?",
        answer: "Typically 4-6 weeks. We use a modular architecture that allows us to assemble core features rapidly while focusing custom engineering on your unique value proposition."
    },
    {
        id: 2,
        question: "Do you handle post-launch support?",
        answer: "Yes. We offer tiered retainer packages for infrastructure monitoring, security updates, and feature iteration. You build it, we keep it running."
    },
    {
        id: 3,
        question: "What is your tech stack?",
        answer: "We are agnostic but opinionated. For web: Next.js/React. For backend: Go or Python (FastAPI). For mobile: React Native or Swift/Kotlin. Infrastructure: AWS or GCP."
    },
    {
        id: 4,
        question: "How do you handle IP rights?",
        answer: "You own 100% of the code upon final payment. We do not retain any rights to your custom business logic or data."
    },
    {
        id: 5,
        question: "Can you audit our existing codebase?",
        answer: "Absolutely. We perform deep-dive architectural reviews to identify security vulnerabilities, performance bottlenecks, and scalability issues."
    }
];

const FAQSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            const section = sectionRef.current;

            // 1. Header Entrance (Slide Left)
            gsap.fromTo(".faq-header",
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    }
                }
            );

            // Background Parallax
            gsap.to(".faq-bg-text", {
                x: -200,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            // Architectural grid reveal
            gsap.fromTo(".faq-grid-line-v",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );

            gsap.fromTo(".faq-grid-line-h",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );

            // 2. Questions Stagger (Slide Up)
            gsap.fromTo(".faq-item",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".faq-list",
                        start: "top 80%",
                    }
                }
            );

            // 3. Decorative Elements (Parallax - All Directions)
            gsap.to(".faq-deco-1", {
                y: -100,
                x: 50,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            gsap.to(".faq-deco-2", {
                y: 150,
                x: -50,
                rotate: 90,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="faq" ref={sectionRef} className="relative py-32 lg:py-48 overflow-hidden bg-transparent">
            {/* Architectural Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="faq-grid-line-v absolute left-1/4 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="faq-grid-line-v absolute left-3/4 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="faq-grid-line-h absolute top-1/2 left-0 w-full h-px bg-white/5 origin-left" />
            </div>

            {/* Background Parallax Narrative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full overflow-hidden">
                <span className="faq-bg-text text-[30vw] font-bold text-white/[0.01] leading-none whitespace-nowrap lowercase italic inline-block">
                    transparency // first
                </span>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                {/* Header Column */}
                <div className="lg:col-span-4 faq-header">
                    <div className="sticky top-32 space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-bold">inquiries</span>
                            <div className="h-px w-12 bg-indigo-500/30" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.9] lowercase">
                            common <br />
                            <span className="text-white/40 italic">questions.</span>
                        </h2>
                        <p className="text-white/60 font-light text-lg leading-relaxed max-w-sm">
                            Everything you need to know about our process, pricing, and deliverables.
                        </p>
                    </div>
                </div>

                {/* FAQ List Column */}
                <div className="lg:col-span-8 faq-list space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className={`faq-item group relative border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] ${openIndex === index ? 'border-indigo-500/30 bg-white/[0.04]' : ''}`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                            >
                                <span className={`text-xl md:text-2xl font-light tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${openIndex === index ? 'border-indigo-500 text-indigo-400 rotate-90' : 'border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white'}`}>
                                    {openIndex === index ? <Minus size={14} /> : <Plus size={14} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-8 pb-8 pt-0">
                                            <p className="text-white/50 font-light leading-relaxed text-lg border-t border-white/5 pt-6">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
