import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, MoveRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        text: "The speed of execution was terrifyingly fast. They didn't just build our MVP; they architected a scalable platform that handled our Series A traffic without a glitch.",
        author: "Alex V.",
        role: "CTO, PropStream",
        image: "/solutions/1.jpg"
    },
    {
        id: 2,
        text: "Most agencies give you a team of juniors. 44fingers gave us engineering leverage. Their code quality is what I'd expect from a FAANG senior team.",
        author: "Sarah J.",
        role: "Product Lead, EstateFlow",
        image: "/solutions/2.jpg"
    },
    {
        id: 3,
        text: "We were burning $20k/mo on cloud costs. They optimized our infrastructure and cut it by 60% in two weeks. The ROI was immediate.",
        author: "Marcus D.",
        role: "Founder, BuildSmart",
        image: "/solutions/3.jpg"
    },
    {
        id: 4,
        text: "They understand real estate data better than we do. The predictive model they built is now our core IP.",
        author: "Elena R.",
        role: "Head of AI, ReVal",
        image: "/solutions/4.jpg"
    },
    {
        id: 5,
        text: "Strategic engineering at its best. They didn't just write code; they solved complex business challenges we hadn't even identified yet.",
        author: "David K.",
        role: "VP Engineering, RealCore",
        image: "/solutions/5.jpg"
    },
    {
        id: 6,
        text: "The bridge between vision and reality. Their ability to translate vague requirements into high-performance architecture is unparalleled.",
        author: "Michelle T.",
        role: "Founder, PropPulse",
        image: "/solutions/6.jpg"
    }
];

const TestimonialsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const section = sectionRef.current;

            // Header reveal
            gsap.fromTo(".header-reveal",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                    }
                }
            );

            // Background Parallax
            gsap.to(".testimonial-bg-text", {
                x: -200,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            // Architectural grid reveal
            gsap.fromTo(".testimonial-grid-line-v",
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

            gsap.fromTo(".testimonial-grid-line-h",
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

            const items = gsap.utils.toArray<HTMLElement>('.testimonial-row');

            items.forEach((item, i) => {
                const isEven = i % 2 === 0;
                const content = item.querySelector('.testimonial-content');
                const image = item.querySelector('.testimonial-image-wrapper');
                const number = item.querySelector('.testimonial-number');

                // Image Entrance Parallax
                gsap.fromTo(image,
                    {
                        clipPath: 'inset(100% 0% 0% 0%)',
                        opacity: 0,
                        scale: 1.2,
                        x: isEven ? -50 : 50
                    },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        duration: 1.5,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                        }
                    }
                );

                // Content Entrance
                gsap.fromTo(content,
                    {
                        opacity: 0,
                        y: 100,
                        filter: 'blur(10px)'
                    },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        delay: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 75%",
                        }
                    }
                );

                // Number Entrance
                gsap.fromTo(number,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        }
                    }
                );

                // Background shift on scroll
                gsap.to(image, {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="testimonials" ref={sectionRef} className="relative py-32 lg:py-64 overflow-hidden bg-transparent selection:bg-indigo-500/30">
            {/* Architectural Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="testimonial-grid-line-v absolute left-1/4 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="testimonial-grid-line-v absolute left-3/4 top-0 w-px h-full bg-white/5 origin-top" />
                <div className="testimonial-grid-line-h absolute top-1/2 left-0 w-full h-px bg-white/5 origin-left" />
            </div>

            {/* Background Parallax Narrative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full overflow-hidden">
                <span className="testimonial-bg-text text-[30vw] font-bold text-white/[0.01] leading-none whitespace-nowrap lowercase italic inline-block">
                    momentum // validated
                </span>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                {/* Minimalist Section Header */}
                <div className="mb-48">
                    <div className="header-reveal flex items-center gap-4 mb-8">
                        <div className="h-px w-10 bg-indigo-500/30" />
                        <span className="text-[10px] text-indigo-400 uppercase tracking-[0.5em] font-bold">testimonials</span>
                    </div>
                    <h2 className="header-reveal text-6xl md:text-[9rem] font-bold text-white tracking-tighter leading-[0.8] lowercase">
                        momentum <br />
                        <span className="text-white/20 italic font-light ml-8 md:ml-32">validated.</span>
                    </h2>
                </div>

                {/* Staggered Vertical Reveal Layout */}
                <div className="space-y-48 lg:space-y-96">
                    {testimonials.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`testimonial-row flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32 w-full`}
                        >
                            {/* Visual Half - Full Height/Width Split */}
                            <div className="testimonial-image-wrapper relative group w-full lg:w-1/2 aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.author}
                                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out scale-110 group-hover:scale-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                {/* Photo Mask Overlay */}
                                <div className="absolute inset-0 border border-white/5 rounded-[3rem] pointer-events-none group-hover:border-white/10 transition-colors" />
                            </div>

                            {/* Narrative Half */}
                            <div className="testimonial-content relative w-full lg:w-1/2 lg:py-12">
                                <div className="testimonial-number absolute -top-20 -left-4 text-8xl md:text-[12rem] font-black text-white/[0.02] select-none pointer-events-none">
                                    0{idx + 1}
                                </div>

                                <div className="flex flex-col gap-10">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-indigo-400/50">
                                        <Quote size={24} />
                                    </div>

                                    <p className="text-2xl md:text-4xl lg:text-5xl font-light text-white/80 leading-[1.15] tracking-tight hover:text-white transition-colors duration-500">
                                        "{item.text}"
                                    </p>

                                    <div className="pt-10 border-t border-white/5 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tighter lowercase">{item.author}</h4>
                                            <p className="text-indigo-400/60 uppercase tracking-[0.2em] text-[10px] font-bold mt-2">{item.role}</p>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-3 text-white/20 group-hover:text-white/40 transition-colors">
                                            <span className="text-[10px] uppercase font-bold tracking-widest">Explore Project</span>
                                            <MoveRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Texture Accents */}
            <div className="absolute top-0 right-0 p-32 opacity-[0.03] select-none pointer-events-none">
                <Quote size={400} />
            </div>
        </section>
    );
};

export default TestimonialsSection;
