import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        text: "The speed of execution was terrifyingly fast. They didn't just build our MVP; they architected a scalable platform that handled our Series A traffic without a glitch.",
        author: "Roman Korzhak",
        role: "CEO, Blago",
        stats: { velocity: "2.4x Faster", reliability: "99.99%" },
        image: "/testimonials/2.webp"
    },
    {
        id: 2,
        text: "Most agencies give you a team of juniors. 44fingers gave us engineering leverage. Their code quality is what I'd expect from a FAANG senior team.",
        author: "Olexiy Zozulya",
        role: "CEO, Riel",
        stats: { quality: "Top 1%", efficiency: "+40%" },
        image: "/testimonials/5.webp"
    },
    {
        id: 3,
        text: "We were burning $20k/mo on cloud costs. They optimized our infrastructure and cut it by 60% in two weeks. The ROI was immediate.",
        author: "Yaroslav Voznyak",
        role: "COO, Avalon",
        stats: { savings: "60% Monthly", roi: "30 Days" },
        image: "/testimonials/1.webp"
    },
    {
        id: 4,
        text: "They understand real estate data better than we do. The predictive model they built is now our core IP.",
        author: "Jarosław Szanajca",
        role: "CEO, Dom Development",
        stats: { accuracy: "94.2%", data: "12M Points" },
        image: "/testimonials/3.webp"
    },
    {
        id: 5,
        text: "Strategic engineering at its best. They didn't just write code; they solved complex business challenges we hadn't even identified yet.",
        author: "Ella Vodopianova",
        role: "Founder, ElEstate",
        stats: { strategy: "High Impact", value: "∞" },
        image: "/testimonials/4.webp"
    },
    {
        id: 6,
        text: "The bridge between vision and reality. Their ability to translate vague requirements into high-performance architecture is unparalleled.",
        author: "Kostyantyn Pysarenko",
        role: "Founder, THE CAPITAL",
        stats: { vision: "10/10", arch: "Serverless" },
        image: "/testimonials/6.webp"
    }
];

interface TestimonialsSectionProps {
    onContactClick: () => void;
}

const TestimonialsSection = ({ onContactClick }: TestimonialsSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header Reveal
            gsap.fromTo(".tm-header > *",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".tm-header",
                        start: "top 85%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            // Card Reveal Logic
            const cards = gsap.utils.toArray<HTMLElement>('.tm-card');
            cards.forEach((card, i) => {
                const isEven = i % 2 === 0;
                const inner = card.querySelector('.tm-card-inner');
                const quoteIcon = card.querySelector('.tm-quote-icon');
                const content = card.querySelector('.tm-content');
                const bgText = card.querySelector('.tm-bg-number');

                // Reveal timeline for each card
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 20%",
                        scrub: 0.6,
                        // This makes it bidirectional automatically
                    }
                });

                tl.fromTo(inner,
                    {
                        opacity: 0,
                        y: 100,
                        scale: 0.95,
                        skewY: isEven ? 2 : -2
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        skewY: 0,
                        duration: 1
                    }, 0
                );

                tl.fromTo(bgText,
                    { opacity: 0, scale: 0.8, x: isEven ? -50 : 50 },
                    { opacity: 0.05, scale: 1, x: 0, duration: 1 }, 0.2
                );

                if (quoteIcon) {
                    tl.fromTo(quoteIcon,
                        { rotate: -30, opacity: 0 },
                        { rotate: 0, opacity: 1, duration: 0.5 }, 0.4
                    );
                }

                if (content) {
                    tl.fromTo(content,
                        { filter: "blur(10px)", opacity: 0 },
                        { filter: "blur(0px)", opacity: 1, duration: 0.8 }, 0.3
                    );
                }
            });

            // Parallax scroll for the title marquee
            gsap.to(".tm-marquee", {
                xPercent: -20,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="testimonials"
            ref={containerRef}
            className="relative py-24 lg:py-48 overflow-hidden bg-transparent"
        >

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

                {/* Section Header */}
                <div className="tm-header max-w-4xl mb-24 lg:mb-40">
                    <div className="flex items-center gap-6 mb-10">
                        <span className="text-[10px] text-white/30 uppercase tracking-[1.2em] font-light">testimonials</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.02] lowercase">
                        engineering <br />
                        <span className="italic text-white/40">leverage.</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-white/40 font-light mt-8 max-w-xl lowercase leading-relaxed">
                        we don't just deliver features. we architect competitive advantages for some of the world's most ambitious companies.
                    </p>
                </div>

                {/* Testimonial List */}
                <div className="grid grid-cols-1 gap-12 lg:gap-32">
                    {testimonials.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`tm-card relative flex flex-col ${idx % 2 === 0 ? 'items-start' : 'items-end'}`}
                        >
                            {/* Decorative Background Number */}
                            <div className="tm-bg-number absolute top-0 -translate-y-1/2 text-[15rem] font-black text-white select-none pointer-events-none z-0">
                                0{idx + 1}
                            </div>

                            <div className="tm-card-inner group relative w-full lg:w-[85%] bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-16 lg:p-20 backdrop-blur-md hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700">

                                <div className="tm-content relative z-10 space-y-10 lg:space-y-16">
                                    <div className="tm-quote-icon inline-block text-white/50">
                                        <Quote size={56} strokeWidth={1} />
                                    </div>

                                    <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 leading-[1.15] tracking-tight">
                                        "{item.text}"
                                    </p>

                                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pt-12 border-t border-white/5">
                                        <div className="flex items-center gap-8">
                                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10">
                                                <img
                                                    src={item.image}
                                                    alt={item.author}
                                                    className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-light text-white tracking-tighter">{item.author}</h4>
                                                <p className="text-white/50 text-[12px] mt-1 opacity-70">{item.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Corner Decal */}
                                <div className="absolute top-12 right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-white/20">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="mt-48 lg:mt-64 flex flex-col items-center text-center space-y-12">
                    <div className="w-px h-32 bg-gradient-to-b from-indigo-500 to-transparent" />
                    <h3 className="text-4xl md:text-6xl font-light text-white/30 lowercase tracking-tight">
                        ready to scale <br /> your <span className="text-white italic">vision?</span>
                    </h3>
                    <button
                        onClick={onContactClick}
                        className="px-10 py-5 rounded-full border border-white/10 bg-white text-black text-[11px] uppercase font-bold tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
                    >
                        get in touch
                    </button>
                </div>
            </div>

            <style>{`
                .tm-card {
                    will-change: transform, opacity;
                }
                .tm-card-inner {
                    will-change: transform, opacity, background-color, border-color;
                }
                .tm-bg-number {
                    will-change: transform, opacity;
                }
                .tm-marquee {
                    will-change: transform;
                }
            `}</style>
        </section>
    );
};

export default TestimonialsSection;
