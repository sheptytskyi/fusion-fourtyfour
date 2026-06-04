
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code2, Rocket, FileChartColumnIncreasing, SquareActivity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: '01',
        title: 'Audit & Discovery',
        description: 'A deep dive into current operations. We deconstruct the customer journey (from the first ad click to key handover) and the property lifecycle. We identify bottlenecks where agents lose time or owners lose money',
        result: 'A documented process map of “As-Is” and “To-Be” states with clearly defined automation points.',
        icon: Search,
        tags: ['#Stakeholder Interviews', '#Tech Audit', '#User Personas']
    },
    {
        id: '02',
        title: 'Architecture & UX',
        description: 'Selection of the technology stack and design of system interaction logic. We define how data flows between CRM, website, listing portals, and messaging platforms. We design the database schema and integration architecture (APIs, Webhooks)',
        result: 'A Business/Functional Requirements Document (BRD/FRD) and system architecture diagram aligned with business objectives.',
        icon: PenTool,
        tags: ['#System Design', '#Figma Prototypes', '#Database Schema']
    },
    {
        id: '03',
        title: 'Development & Integration Build',
        description: 'Active technical implementation phase. Workspace setup, custom script development, CRM pipeline configuration, bot creation, and automated messaging flows. Integration of third-party services into a unified ecosystem',
        result: 'A fully functional system prototype deployed in a sandbox (test) environment.',
        icon: Code2,
        tags: ['#AgileDev', '#SoftwareBuilding', '#AutomationBuild', '#SystemIntegration']
    },
    {
        id: '04',
        title: 'Stress Testing & Lead Simulation',
        description: 'Simulation of real-world business scenarios, from peak loads (multiple simultaneous leads) to edge-case user behavior. Verification of data integrity across services and proper execution of all automated triggers.',
        result: 'A validated QA report and a system ready for live data.',
        icon: FileChartColumnIncreasing,
        tags: ['#QA', '#StressTesting', '#UserAcceptance', '#DataIntegrity']
    },
    {
        id: '05',
        title: 'Deployment & Adoption',
        description: 'Transition to production environment. The most critical component is team training. We demonstrate to agents how automation removes routine work, and to administrators how to manage the system. User roles and access permissions are configured.',
        result: 'A live system operating on real data and a trained team capable of using it effectively.',
        icon: Rocket,
        tags: ['#Deployment', '#UserOnboarding', '#ChangeManagement', '#GoLive']
    },
    {
        id: '06',
        title: 'Hyper-Care & Monitoring',
        description: 'Intensive post-launch support period. We collect real-time agent feedback, resolve minor UX friction points, and ensure all processes remain stable during the first weeks of operation.',
        result: 'Stable system performance with zero critical failures and a high adoption rate.',
        icon: SquareActivity,
        tags: ['#PostLaunchSupport', '#Monitoring', '#CustomerSuccess', '#HyperCare']
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

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="process-header text-center mb-24">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05] lowercase">
                 how we <br />
                <span className="italic text-white/40">execute.</span>
              </h2>
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
                                                <span className="text-4xl font-light text-white/10 select-none">{step.id}</span>
                                            </div>
                                            <h3 className="text-2xl font-light text-white mb-3 lowercase">{step.title}</h3>
                                            <p className="text-white/60 font-light leading-relaxed lowercase mb-6 text-sm md:text-base">
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
