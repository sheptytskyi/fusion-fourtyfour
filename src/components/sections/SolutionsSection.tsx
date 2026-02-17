import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingDown, Zap, Clock, ArrowRight, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
    {
        id: "01",
        title: "Multi-Portal Listing Sync",
        image: "/solutions/1.jpg",
        losing: "agents re-enter listings on 5+ portals manually. price mismatches and 30-minute update delays lose buyer trust and create legal exposure.",
        solved: "a single-source listing engine that pushes updates to all major portals in under 60 seconds — photos, floor plans, pricing, and availability, always in sync.",
        impact: "zero listing discrepancies",
        timeline: "4-6 Weeks",
    },
    {
        id: "02",
        title: "AI-Powered Lead Qualification",
        image: "/solutions/2.jpg",
        losing: "sales teams spend 60% of their day chasing cold leads. without behavioral scoring, every inquiry gets the same priority — and hot prospects go cold.",
        solved: "a neural scoring engine that ranks every lead by purchase intent, browsing patterns, and financial readiness — so agents only call prospects who are ready to act.",
        impact: "3.2× faster conversion",
        timeline: "6-8 Weeks",
    },
    {
        id: "03",
        title: "Interactive Property Walkthroughs",
        image: "/solutions/3.jpg",
        losing: "static photos fail to convey spatial scale. 40% of scheduled viewings are cancelled because buyers can't gauge the property remotely.",
        solved: "WebGL-based 3D navigation that lets buyers walk through properties from their phone — complete with measurement tools, daylight simulation, and furniture staging.",
        impact: "68% fewer wasted viewings",
        timeline: "4 Weeks",
    },
    {
        id: "04",
        title: "Digital Lease & e-KYC Platform",
        image: "/solutions/4.jpg",
        losing: "paper-based applications cause a 15% tenant drop-off. manual identity checks delay move-ins by 5–10 business days.",
        solved: "end-to-end digital leasing with automated e-KYC verification, credit scoring, and legally binding e-signatures — tenants onboarded in under 24 hours.",
        impact: "90% faster tenant onboarding",
        timeline: "8 Weeks",
    },
    {
        id: "05",
        title: "Smart Building IoT Management",
        image: "/solutions/5.jpg",
        losing: "reactive maintenance and blind energy consumption cost commercial landlords up to 30% of their operational budget annually.",
        solved: "a mesh-sensor network with predictive maintenance alerts, real-time energy dashboards, and contactless access control — managed from a unified web and mobile platform.",
        impact: "25% lower operating costs",
        timeline: "10-12 Weeks",
    },
    {
        id: "06",
        title: "Investment Analytics & Yield Forecasting",
        image: "/solutions/6.jpg",
        losing: "investors rely on outdated quarterly reports. without real-time market data, they miss pricing windows and misjudge rental yield potential.",
        solved: "a live analytics engine that aggregates urban development permits, migration trends, and comparable transactions to forecast ROI with 94% accuracy.",
        impact: "12% higher rental yield",
        timeline: "8 Weeks",
    }
];

interface SolutionsSectionProps {
    onContactClick: () => void;
}

const SolutionsSection = ({ onContactClick }: SolutionsSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Background Parallax
            gsap.to(".solutions-bg-text", {
                xPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // HEADER TEXT REVEAL
            gsap.fromTo(".solutions-header > *",
                { opacity: 0, y: 50, rotateX: -20, filter: 'blur(10px)', transformPerspective: 1000 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play reverse play reverse",
                    }
                }
            );

            // Card entrance with stagger
            gsap.fromTo('.solution-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    z: 0.01,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".solutions-grid",
                        start: "top 80%",
                        once: true
                    }
                }
            );

            // ARCHITECTURAL GRID REVEAL
            gsap.fromTo(".solutions-grid-line-v",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );

            gsap.fromTo(".solutions-grid-line-h",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );


        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="solutions"
            ref={sectionRef}
            className="relative py-32 lg:py-60 overflow-hidden bg-transparent"
        >
            {/* Architectural Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="solutions-grid-line-v absolute left-1/4 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="solutions-grid-line-v absolute left-3/4 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="solutions-grid-line-h absolute top-1/2 left-0 w-full h-px bg-white/5 origin-left" />
            </div>

            {/* Background Parallax Narrative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full overflow-hidden">
                <span className="solutions-bg-text text-[30vw] font-bold text-white/[0.01] leading-none whitespace-nowrap lowercase italic inline-block">
                    solving // for // scale
                </span>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
                {/* Header Block */}
                <div className="solutions-header max-w-4xl mb-32 relative">
                    <div className="flex items-center gap-6 mb-12">
                        <span className="text-[10px] text-white/40 uppercase tracking-[1em] font-light">what we solve</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                    </div>

                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-[1] lowercase mb-12">
                        real estate problems, <br />
                        <span className="italic text-white/40 font-light">engineered away.</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl leading-relaxed lowercase">
                        every solution below was born from a real bottleneck we've seen — and fixed — for agencies, developers, and property managers across 12 markets.
                    </p>

                </div>

                {/* Bento-style Grid of Frozen White Cards */}
                <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                    {solutions.map((item, idx) => {
                        const isWide = (idx === 0 || idx === 3 || idx === 5);
                        return (
                            <div
                                key={idx}
                                className={`solution-card group relative flex flex-col ${isWide ? 'lg:col-span-2 lg:flex-row' : 'lg:col-span-1'} bg-white/[0.08] backdrop-blur-[60px] border border-white/20 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.12] hover:border-white/40 transition-all duration-700 active:scale-[0.98] shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_20px_50px_rgba(0,0,0,0.5)]`}
                            >
                                {/* Card Image Area */}
                                <div className={`relative overflow-hidden shrink-0 h-64 ${isWide ? 'lg:w-[45%] lg:h-full lg:min-h-[320px]' : ''}`}>
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-out"
                                        alt={item.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                                    <div className="absolute top-8 left-8 flex items-center gap-3">
                                        <span className="px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[9px] text-white font-bold tracking-widest">{item.id}</span>
                                    </div>
                                </div>

                                {/* Content Block */}
                                <div className={`flex-1 p-8 flex flex-col justify-between ${isWide ? 'lg:p-12' : ''} space-y-10`}>
                                    <div className="space-y-8">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight lowercase leading-[1.1] italic">
                                            {item.title}
                                        </h3>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">friction</div>
                                                <p className="text-sm text-white/60 font-medium leading-relaxed lowercase italic border-l border-white/20 pl-5">
                                                    {item.losing}
                                                </p>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">transformation</div>
                                                <div className="flex items-start gap-4">
                                                    <Zap className="w-4 h-4 text-white/80 mt-1 shrink-0" />
                                                    <p className="text-sm text-white/80 font-medium leading-relaxed lowercase">
                                                        {item.solved}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center gap-8">
                                        <div className="flex items-center gap-5">
                                            <div className="h-10 w-px bg-white/10 hidden sm:block" />
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold mb-1">Impact</span>
                                                <span className="text-xs text-white/60 font-medium lowercase italic leading-none">{item.impact}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={onContactClick}
                                            className="flex-1 py-4 px-8 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.2em]"
                                        >
                                            <span>explore solution</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Frost Shimmer */}
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms] ease-out" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .solution-card {
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                    backface-visibility: hidden;
                    transform: translateZ(0);
                }
                .solution-card:hover {
                    box-shadow: 0 40px 100px -20px rgba(255,255,255,0.02), 0 0 40px -10px rgba(255,255,255,0.05);
                }
            `}</style>
        </section>
    );
};

export default SolutionsSection;
