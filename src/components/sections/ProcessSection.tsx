
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: '01',
        title: 'Audit & Discovery',
        description: 'We deconstruct your current workflows to find friction points. No assumptions—just data-driven analysis of your real estate operations.',
        icon: Search,
        tags: ['Stakeholder Interviews', 'Tech Audit', 'User Personas']
    },
    {
        id: '02',
        title: 'Architecture & UX',
        description: 'Blueprinting the solution. We design high-fidelity prototypes that solve specific problems before writing a single line of code.',
        icon: PenTool,
        tags: ['System Design', 'Figma Prototypes', 'Database Schema']
    },
    {
        id: '03',
        title: 'Agile Engineering',
        description: 'Production-grade development in two-week sprints. You see progress every 14 days, not at the finish line.',
        icon: Code2,
        tags: ['React/Next.js', 'Go/Python', 'CI/CD Pipelines']
    },
    {
        id: '04',
        title: 'Launch & Scale',
        description: 'Seamless deployment with zero downtime. We train your team, hand over documentation, and monitor performance.',
        icon: Rocket,
        tags: ['Cloud Deployment', 'Team Training', 'SLA Support']
    }
];

const ProcessSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const section = sectionRef.current;
            if (!section) return;

            // 1. Central Line Drawing Animation
            gsap.fromTo(lineRef.current,
                { height: '0%' },
                {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1,
                    }
                }
            );

            // HEADER TEXT REVEAL
            gsap.fromTo(".process-header > *",
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
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play reverse play reverse",
                    }
                }
            );

            // 2. Step Cards Animation
            const cards = gsap.utils.toArray<HTMLElement>('.process-card');
            cards.forEach((card, i) => {
                const direction = i % 2 === 0 ? -1 : 1;

                // Initial set
                gsap.set(card, {
                    opacity: 0,
                    x: direction * 50,
                    rotateY: direction * 10
                });

                gsap.to(card, {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: 1,
                    }
                });
            });

            // 3. Node Activation (The dots on the line)
            const nodes = gsap.utils.toArray<HTMLElement>('.process-node');
            nodes.forEach((node) => {
                gsap.fromTo(node,
                    { scale: 0, boxShadow: '0 0 0 rgba(255,255,255,0)' },
                    {
                        scale: 1,
                        boxShadow: '0 0 20px rgba(255,255,255,0.5)',
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: node,
                            start: 'top 60%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            });

            // Background Parallax
            gsap.to(".process-bg-text", {
                x: -300,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            // Architectural grid reveal
            gsap.fromTo(".process-grid-line-v",
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

            gsap.fromTo(".process-grid-line-h",
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

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="process" ref={sectionRef} className="relative py-32 overflow-hidden bg-transparent">
            {/* Architectural Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="process-grid-line-v absolute left-1/3 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="process-grid-line-v absolute left-2/3 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="process-grid-line-h absolute top-1/2 left-0 w-full h-px bg-white/5 origin-left" />
            </div>

            {/* Background Parallax Narrative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full overflow-hidden">
                <span className="process-bg-text text-[30vw] font-bold text-white/[0.01] leading-none whitespace-nowrap lowercase italic inline-block">
                    our // execution // layer
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="process-header text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight lowercase mb-6">
                        how we <span className="text-white/40 italic">execute.</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg lowercase font-light">
                        a transparent, military-grade process designed to eliminate risk and guarantee delivery.
                    </p>
                </div>

                <div className="relative">
                    {/* The Central Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 md:translate-x-0 h-full">
                        <div ref={lineRef} className="w-full bg-gradient-to-b from-indigo-500 via-white to-indigo-500 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    </div>

                    <div className="space-y-24">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={step.id} className={`flex items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col ml-12 md:ml-0`}>

                                    {/* The Card (Content) */}
                                    <div className="process-card flex-1 w-full relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white group-hover:scale-110 transition-transform duration-300">
                                                    <step.icon size={24} />
                                                </div>
                                                <span className="text-4xl font-bold text-white/10 select-none">{step.id}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3 lowercase">{step.title}</h3>
                                            <p className="text-white/60 font-light leading-relaxed mb-6 lowercase text-sm md:text-base">
                                                {step.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {step.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] uppercase tracking-widest text-white/40">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* The Node (Center Point) */}
                                    <div className="relative z-20 flex-shrink-0 absolute left-[-29px] md:static md:left-auto">
                                        <div className="process-node w-3 h-3 md:w-4 md:h-4 bg-[#050505] border-2 border-white rounded-full relative">
                                            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                                        </div>
                                    </div>

                                    {/* Empty Space for alignment */}
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
