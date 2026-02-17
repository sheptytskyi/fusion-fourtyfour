import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
    onGrowWithUsClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGrowWithUsClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax and fade effects linked to scroll
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);

    // Creative Wordmark Animations
    const wordmarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
    const wordmarkBlur = useTransform(scrollYProgress, [0, 0.5], ['blur(0px)', 'blur(20px)']);
    const wordmarkSpacing = useTransform(scrollYProgress, [0, 1], ['-0.05em', '0.2em']);

    // Bottom Content Animations
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const contentBlur = useTransform(scrollYProgress, [0, 0.3], ['blur(0px)', 'blur(10px)']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative w-full h-[100svh] overflow-hidden flex items-end"
        >
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 w-full h-full select-none"
            >
                <video
                    src="/video.mp4"
                    poster="/1.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                />
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            </motion.div>

            {/* Centered Agency Wordmark */}
            <motion.div
                style={{ opacity, y: wordmarkY, filter: wordmarkBlur }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="text-center"
                >
                    <motion.h1
                        style={{ letterSpacing: wordmarkSpacing }}
                        className="text-6xl md:text-[9rem] lg:text-[12rem] font-bold text-white/90 leading-none lowercase will-change-transform"
                    >
                        44fingers
                    </motion.h1>
                    <div className="flex items-center justify-center gap-4 mt-4 md:mt-8">
                        <div className="h-px w-8 md:w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        <span className="text-[10px] md:text-sm uppercase tracking-[0.8em] text-white/100 font-light">
                            proptech engineering studio
                        </span>
                        <div className="h-px w-8 md:w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: contentOpacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute left-1/2 bottom-12 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent animate-scroll-shimmer" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-light">scroll</span>
            </motion.div>

            {/* Bottom Content Container */}
            <motion.div
                style={{ y: contentY, opacity: contentOpacity, filter: contentBlur }}
                className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 pb-[8vh] md:pb-[12vh] flex flex-col md:flex-row items-center md:items-end justify-between gap-8 md:gap-0"
            >

                {/* Large lowercase text in Left Bottom Corner */}
                <motion.div
                    initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="order-1 md:order-1 text-center md:text-left max-w-sm md:max-w-3xl"
                >
                    <p className="text-4xl md:text-7xl lowercase tracking-tighter font-light text-white leading-[1] mix-blend-overlay">
                        digital infrastructure <br className="hidden md:block" /> for modern real estate
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="order-2 md:order-2"
                >
                    <button
                        onClick={onGrowWithUsClick}
                        className="group relative overflow-hidden px-10 py-4 rounded-full text-base font-light tracking-[0.2em] text-white transition-all duration-700 active:scale-95"
                    >
                        {/* Glass logic */}
                        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/20 rounded-full transition-all duration-500 group-hover:bg-white/10 group-hover:scale-105" />

                        <span className="relative z-10 uppercase text-[10px] md:text-xs font-bold">
                            schedule discovery call
                        </span>
                    </button>
                </motion.div>
            </motion.div>

            {/* Global Styled Keyframes for the customized Scroll Indicator */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scroll-shimmer {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-shimmer {
          animation: scroll-shimmer 2.5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
      `}} />
        </section>
    );
};

export default HeroSection;
