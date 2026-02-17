import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const section = sectionRef.current;
            if (!section) return;

            // 1. PRISM REVEAL - FOUNDER IMAGE (Desktop Only)
            let mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                gsap.fromTo(".founder-image-container",
                    {
                        scale: 1.1,
                        filter: "blur(5px)", // Reduced blur further
                        y: 30,
                        opacity: 0, // Restore fade-in for "appear" effect
                    },
                    {
                        scale: 1,
                        filter: "blur(0px)",
                        y: 0,
                        opacity: 1, // Restore fade-in
                        duration: 1.5,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: ".founder-image-container", // Target specific element
                            start: "top 80%", // Start earlier
                            end: "center center",
                            scrub: 1,
                        }
                    }
                );
            });

            // 2. TEXT REVEAL (Updated Selectors)
            const textElements = gsap.utils.toArray<HTMLElement>([
                ".contact-title > *",
                ".contact-secondary > *"
            ]);

            gsap.fromTo(textElements,
                {
                    y: 50,
                    opacity: 0,
                    filter: "blur(10px)",
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section, // Keep section trigger for general text flow or change to indiv
                        start: "top 70%",
                    }
                }
            );

            // 3. BACKGROUND PARALLAX TEXT
            gsap.to(".contact-bg-text", {
                x: -150,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

            // 4. ARCHITECTURAL GRID REVEAL
            gsap.fromTo(".contact-grid-line-v",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "center center",
                        scrub: true,
                    }
                }
            );

            gsap.fromTo(".contact-grid-line-h",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "center center",
                        scrub: true,
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-32 lg:py-60 overflow-hidden bg-transparent"
        >
            {/* Architectural Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="contact-grid-line-v absolute left-1/4 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="contact-grid-line-v absolute left-3/4 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="contact-grid-line-h absolute top-1/2 left-0 w-full h-px bg-white/5 origin-left" />
            </div>

            {/* Background Parallax Narrative */}
            <div className="absolute top-1/2 left-0 w-full pointer-events-none opacity-[0.01] select-none z-0">
                <div className="contact-bg-text text-[30vw] font-bold text-white whitespace-nowrap leading-none tracking-tighter lowercase italic">
                    let's build // your platform
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-x-32 lg:gap-y-12 items-start">

                    {/* 1. TITLE (Mobile First, Desktop Top-Right) */}
                    <div className="contact-title order-1 lg:col-start-2 lg:row-start-1 relative z-10">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] lowercase mb-8">
                            let's talk <br />
                            <span className="text-white/40">proptech.</span>
                        </h2>
                    </div>

                    {/* 2. FOUNDER IMAGE (Mobile Second, Desktop Left Full Height) */}
                    <div className="founder-image-container relative aspect-[3/4] group order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2">
                        {/* Frozen Frame */}
                        <div className="absolute -inset-4 border border-white/5 rounded-[3rem] pointer-events-none" />

                        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
                            <img
                                src="/founder.webp"
                                alt="Dmytro Sheptytskyi"
                                className="w-full h-full object-cover brightness-110 contrast-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                            {/* Crystalline Badge */}
                            <div className="absolute bottom-5 left-5 right-5 md:right-auto md:bottom-10 md:left-10 p-5 md:p-8 rounded-3xl md:rounded-[2rem] bg-white/[0.08] backdrop-blur-[40px] border border-white/30 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                                <div className="flex items-center gap-3 mb-2 md:mb-3">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                    <span className="text-[9px] md:text-[10px] font-bold text-white tracking-[0.2em] md:tracking-[0.4em] uppercase">founder</span>
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tighter leading-none">
                                    Dmytro Sheptytskyi
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* 3. SECONDARY CONTENT (Mobile Third, Desktop Bottom-Right) */}
                    <div className="contact-secondary order-3 lg:col-start-2 lg:row-start-2 space-y-16 lg:pr-12 pt-8 lg:pt-0">
                        <p className="text-xl md:text-2xl font-light text-white/50 leading-relaxed max-w-xl lowercase">
                            whether you need a listing portal, tenant app, analytics dashboard, or IoT backend — we'll scope it, architect it, and ship it. no middlemen, no surprises.
                        </p>

                        <div className="space-y-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                                <div className="space-y-4">
                                    <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">direct channel</span>
                                    <div className="text-lg font-light text-white/80 lowercase">hello@44fingers.tech</div>
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">presence</span>
                                    <div className="text-lg font-light text-white/80">Kyiv, Ukraine</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-8 items-center pt-8">
                                <a
                                    href="https://calendly.com/channektoshka/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center gap-10 px-12 py-7 bg-white text-black font-bold tracking-[0.2em] uppercase text-[11px] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                                >
                                    <span>schedule a call</span>
                                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </a>

                                <div className="flex items-center gap-4 text-white/30 hover:text-white/60 transition-colors cursor-default">
                                    <Zap className="w-4 h-4 shrink-0" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">avg. 4-week mvp delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;