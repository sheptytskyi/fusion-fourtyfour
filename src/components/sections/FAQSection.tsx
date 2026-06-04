import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, HelpCircle, MessageCircle, CornerRightUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        id: 1,
        question: "Why does your automation cost $10,000 if I can buy a CRM subscription for $50?",
        answer: "A CRM subscription is an empty box. We don’t sell access to software, we build a lead capture and processing system. Our clients typically recoup their investment in 2–4 months simply by stopping the loss of after-hours leads. You’re not buying a program, you’re buying guaranteed response speed that converts into deals."
    },
    {
        id: 2,
        question: "What real ROI can I expect in the first year?",
        answer: "On average, our clients see a 20–35% increase in booked property viewings without increasing ad spend. If your average commission is €5,000, saving just one additional lead per month brings €60,000 per year. Automation math is always on your side."
    },
    {
        id: 3,
        question: "How much of my personal time will this require?",
        answer: "We operate on a done-for-you basis. We need only two 60-minute calls from you: one for process audit and one for final approval. Everything else, from technical setup to agent training, is handled by us. You run the business, we run the infrastructure."
    },
    {
        id: 4,
        question: "How quickly will the system be live?",
        answer: "Our base automation package (for example, The 5-Minute Responder) is deployed within 14–21 days. More complex network-level solutions take 30–60 days. We don’t drag projects out for years. You see results in the first month."
    },
    {
        id: 5,
        question: "Can you automate lead collection from all European portals (Idealista, Otodom, Imovirtual, etc.)?",
        answer: "Yes. We set up direct integrations or parsing from any portal that sends email notifications or provides an API. All inquiries from Facebook, Instagram, and listing aggregators are consolidated into one dashboard in under 10 seconds."
    },
    {
        id: 6,
        question: "My agents are conservative and don’t want to use complex software. What then?",
        answer: "That’s exactly why “naked” CRMs fail. We make automation invisible. Agents don’t need to fill out 20 fields. The system automatically creates the contact record, messages the client on WhatsApp, and sends the agent a push notification: “Client waiting for a call. Here’s the request.” When agents see they’re closing more deals with less effort, resistance disappears."
    },
    {
        id: 7,
        question: "Do you train my team?",
        answer: "Mandatory. We run workshops and prepare short video guides for your staff. The goal is for every agent to operate in the new ecosystem at 100% from day one after launch."
    },
    {
        id: 8,
        question: "What about GDPR? Is our data secure?",
        answer: "We operate strictly within EU regulations. All data is stored on secure servers with properly regulated access. Automation increases security. Data no longer lives in agents’ notebooks or personal Excel files. It belongs to the company."
    }
];

const FAQSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current) return;

            // 1. BACKGROUND MARQUEE - Bidirectional Scroll
            gsap.to(".faq-marquee", {
                xPercent: -30,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // 2. HEADER REVEAL - Bidirectional
            gsap.fromTo(".faq-header-content > *",
                { opacity: 0, x: -50, filter: "blur(10px)" },
                {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".faq-header-content",
                        start: "top 85%",
                        end: "top 30%",
                        scrub: 1,
                    }
                }
            );

            // 3. FAQ ITEMS - Bidirectional Fade & Scale
            const items = gsap.utils.toArray<HTMLElement>('.faq-item-reveal');
            items.forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 100, scale: 0.9, filter: "blur(5px)" },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 95%",
                            end: "top 60%",
                            scrub: 1,
                        }
                    }
                );
            });

            // 4. ARCHITECTURAL LINES
            gsap.fromTo(".faq-line-v",
                { scaleY: 0, opacity: 0 },
                {
                    scaleY: 1,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 1,
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="faq"
            ref={sectionRef}
            className="relative py-24 lg:py-48 bg-transparent"
        >

            {/* Grid Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="faq-line-v absolute left-[5%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent origin-top" />
                <div className="faq-line-v absolute left-[95%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent origin-top" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Sticky Header Column */}
                    <div className="lg:col-span-5 h-full">
                        <div className="lg:sticky lg:top-32 faq-header-content space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white-400">
                                    <HelpCircle size={20} />
                                </div>
                                <span className="text-[10px] text-white/30 uppercase tracking-[0.8em] font-medium">knowledge base</span>
                            </div>

                            <h2 className="text-6xl md:text-8xl font-light text-white tracking-tighter leading-[0.95] lowercase">
                                clarity through <br />
                                <span className="italic text-white/40">engineering.</span>
                            </h2>

                            <p className="text-xl text-white/40 font-light max-w-sm leading-relaxed lowercase">
                                we operate with radical transparency. here's how we architect success, scope projects, and deliver performance.
                            </p>

                            <div className="pt-8 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050505] bg-neutral-800 overflow-hidden">
                                            <img src={`/testimonials/${i}.webp`} className="w-full h-full object-cover" alt="Team" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[11px] text-white/30 uppercase tracking-widest font-bold">
                                    Trusted by <br /> 10+ partners
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Items Column */}
                    <div className="lg:col-span-7 space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="faq-item-reveal group"
                            >
                                <div className={`relative rounded-[2rem] border transition-all duration-700 overflow-hidden ${openIndex === index
                                    ? 'bg-white/[0.05] border-white/20 backdrop-blur-xl'
                                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                                    }`}>
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full p-8 md:p-10 flex items-center justify-between text-left focus:outline-none"
                                    >
                                        <span className={`text-xl md:text-2xl font-light tracking-tight transition-all duration-500 ${openIndex === index ? 'text-white translate-x-1' : 'text-white/60 group-hover:text-white'
                                            }`}>
                                            {faq.question}
                                        </span>
                                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${openIndex === index
                                            ? 'bg-white text-black border-white rotate-180'
                                            : 'bg-transparent text-white/20 border-white/10 group-hover:border-white/30 group-hover:text-white'
                                            }`}>
                                            {openIndex === index ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <div className="px-8 md:px-10 pb-10">
                                                    <div className="h-px w-full bg-white/5 mb-8" />
                                                    <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-2xl">
                                                        {faq.answer}
                                                    </p>
                                                    <div className="mt-8 flex items-center gap-4 text-white/20 text-[10px] uppercase tracking-widest font-bold">
                                                        <MessageCircle size={14} />
                                                        <span>Need more details? Let's discuss.</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}

                        {/* Final CTA in FAQ list */}
                        <div className="faq-item-reveal pt-12 text-center lg:text-left">
                            <p className="text-white/20 text-xs uppercase tracking-[0.4em] font-medium mb-4">still have questions?</p>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-4 text-white hover:text-indigo-400 transition-colors duration-500 group"
                            >
                                <span className="text-2xl font-light lowercase border-b border-white/10 group-hover:border-indigo-400/50">reach out to our engineering team</span>
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all duration-500">
                                    <CornerRightUp size={18} />
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .faq-item-reveal {
                    will-change: transform, opacity, filter;
                }
                .faq-header-content {
                    will-change: transform, opacity, filter;
                }
                .faq-marquee {
                    will-change: transform;
                }
                .faq-line-v {
                    will-change: transform;
                }
            `}</style>
        </section>
    );
};

export default FAQSection;
