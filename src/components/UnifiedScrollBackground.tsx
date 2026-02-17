
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const UnifiedScrollBackground = () => {
    const { scrollYProgress } = useScroll();
    const smooth = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // --- Primary growing lines ---
    const growDown = useTransform(smooth, [0, 1], ['0%', '100%']);
    const growUp = useTransform(smooth, [0, 1], ['0%', '100%']);
    const growSlow = useTransform(smooth, [0, 1], ['0%', '70%']);
    const growFast = useTransform(smooth, [0, 1], ['0%', '120%']);

    // --- Opacity pulses ---
    const fadeInOut = useTransform(smooth, [0, 0.5, 1], [0.2, 0.8, 0.2]);
    const fadeMid = useTransform(smooth, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);
    const fadeLatePeak = useTransform(smooth, [0, 0.6, 0.85, 1], [0, 0, 0.7, 0.1]);
    const fadeEarlyPeak = useTransform(smooth, [0, 0.15, 0.4, 1], [0.1, 0.7, 0, 0]);

    // --- Floating segment positions ---
    const float1 = useTransform(smooth, [0, 1], ['5%', '85%']);
    const float2 = useTransform(smooth, [0, 1], ['90%', '10%']);
    const float3 = useTransform(smooth, [0, 1], ['20%', '70%']);
    const float4 = useTransform(smooth, [0, 1], ['75%', '25%']);
    const float5 = useTransform(smooth, [0, 1], ['50%', '95%']);
    const float6 = useTransform(smooth, [0, 1], ['60%', '5%']);

    // --- Horizontal line animations ---
    const hLineWidth1 = useTransform(smooth, [0, 0.3, 0.6, 1], ['0%', '60%', '60%', '0%']);
    const hLineWidth2 = useTransform(smooth, [0, 0.4, 0.7, 1], ['0%', '0%', '80%', '40%']);
    const hLineWidth3 = useTransform(smooth, [0, 0.2, 0.5, 0.8, 1], ['0%', '40%', '100%', '40%', '0%']);
    const hLineTop1 = useTransform(smooth, [0, 1], ['20%', '35%']);
    const hLineTop2 = useTransform(smooth, [0, 1], ['55%', '45%']);
    const hLineTop3 = useTransform(smooth, [0, 1], ['80%', '70%']);

    // --- Diagonal segment ---
    const diagRotate = useTransform(smooth, [0, 1], [15, 45]);
    const diagY = useTransform(smooth, [0, 1], ['10%', '80%']);
    const diagX = useTransform(smooth, [0, 1], ['20%', '60%']);

    // --- Crosshair / node dots ---
    const dot1Y = useTransform(smooth, [0, 1], ['15%', '50%']);
    const dot2Y = useTransform(smooth, [0, 1], ['85%', '40%']);
    const dot3X = useTransform(smooth, [0, 1], ['30%', '70%']);
    const dotScale = useTransform(smooth, [0, 0.5, 1], [0, 1, 0]);

    return (
        <div className="fixed inset-0 z-[-1] bg-[#050505] pointer-events-none overflow-hidden">

            {/* ========== LAYER 1: Static Faint Grid ========== */}
            <div className="absolute inset-0 opacity-[0.015]">
                {/* Vertical */}
                {[8, 16, 25, 33, 42, 50, 58, 67, 75, 83, 92].map((pos) => (
                    <div key={`sv-${pos}`} className="absolute top-0 w-px h-full bg-white" style={{ left: `${pos}%` }} />
                ))}
                {/* Horizontal */}
                {[10, 25, 40, 55, 70, 85].map((pos) => (
                    <div key={`sh-${pos}`} className="absolute left-0 w-full h-px bg-white" style={{ top: `${pos}%` }} />
                ))}
            </div>

            {/* ========== LAYER 2: Vertical Growing Lines ========== */}

            {/* Line 1 — Left edge, grows down */}
            <motion.div
                style={{ height: growDown, opacity: fadeInOut }}
                className="absolute top-0 left-[8%] w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent"
            />

            {/* Line 2 — 25% from left, grows down slowly */}
            <motion.div
                style={{ height: growSlow, opacity: fadeMid }}
                className="absolute top-0 left-[25%] w-px bg-gradient-to-b from-white/15 via-white/5 to-transparent"
            />

            {/* Line 3 — Center, grows down fast */}
            <motion.div
                style={{ height: growFast, opacity: fadeInOut }}
                className="absolute top-0 left-[50%] w-px bg-gradient-to-b from-white/20 via-white/8 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.05)]"
            />

            {/* Line 4 — 75% from left, grows UP from bottom */}
            <motion.div
                style={{ height: growUp, opacity: fadeInOut }}
                className="absolute bottom-0 left-[75%] w-px bg-gradient-to-t from-white/25 via-white/8 to-transparent"
            />

            {/* Line 5 — Right edge, grows UP slowly */}
            <motion.div
                style={{ height: growSlow, opacity: fadeMid }}
                className="absolute bottom-0 left-[92%] w-px bg-gradient-to-t from-white/15 via-white/5 to-transparent"
            />

            {/* ========== LAYER 3: Floating Vertical Segments ========== */}

            {/* Segment A — drifts down on left */}
            <motion.div
                style={{ top: float1, opacity: fadeMid }}
                className="absolute left-[16%] h-24 w-px bg-white/10 blur-[0.5px] hidden md:block"
            />

            {/* Segment B — drifts up on center-left */}
            <motion.div
                style={{ top: float2, opacity: fadeMid }}
                className="absolute left-[33%] h-20 w-px bg-white/8 blur-[0.5px] hidden md:block"
            />

            {/* Segment C — drifts down on center-right */}
            <motion.div
                style={{ top: float3, opacity: fadeLatePeak }}
                className="absolute left-[58%] h-28 w-px bg-white/12 blur-[0.5px] hidden md:block"
            />

            {/* Segment D — drifts up on right */}
            <motion.div
                style={{ top: float4, opacity: fadeEarlyPeak }}
                className="absolute left-[67%] h-16 w-px bg-white/8 blur-[0.5px] hidden md:block"
            />

            {/* Segment E — drifts down far right */}
            <motion.div
                style={{ top: float5, opacity: fadeMid }}
                className="absolute left-[83%] h-32 w-px bg-white/6 blur-[0.5px] hidden md:block"
            />

            {/* Segment F — counter-drift left side */}
            <motion.div
                style={{ top: float6, opacity: fadeLatePeak }}
                className="absolute left-[42%] h-20 w-px bg-white/10 blur-[0.5px] hidden md:block"
            />

            {/* ========== LAYER 4: Horizontal Scroll Lines ========== */}

            {/* H-Line 1 — expands from left, drifts vertically */}
            <motion.div
                style={{ width: hLineWidth1, top: hLineTop1, opacity: fadeMid }}
                className="absolute left-0 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent"
            />

            {/* H-Line 2 — expands from right, drifts vertically */}
            <motion.div
                style={{ width: hLineWidth2, top: hLineTop2, opacity: fadeLatePeak }}
                className="absolute right-0 h-px bg-gradient-to-l from-white/15 via-white/5 to-transparent"
            />

            {/* H-Line 3 — center, breathes in and out */}
            <motion.div
                style={{ width: hLineWidth3, top: hLineTop3, opacity: fadeMid }}
                className="absolute left-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            {/* ========== LAYER 5: Diagonal Accent ========== */}
            <motion.div
                style={{
                    top: diagY,
                    left: diagX,
                    rotate: diagRotate,
                    opacity: fadeLatePeak
                }}
                className="absolute w-px h-40 bg-gradient-to-b from-transparent via-white/8 to-transparent origin-center hidden md:block"
            />

            {/* Secondary diagonal — opposite direction */}
            <motion.div
                style={{
                    top: useTransform(smooth, [0, 1], ['60%', '20%']),
                    left: useTransform(smooth, [0, 1], ['70%', '30%']),
                    rotate: useTransform(smooth, [0, 1], [-20, -50]),
                    opacity: fadeEarlyPeak
                }}
                className="absolute w-px h-32 bg-gradient-to-b from-transparent via-white/6 to-transparent origin-center hidden md:block"
            />

            {/* ========== LAYER 6: Animated Dot Nodes ========== */}

            {/* Dot 1 — drifts vertically on left column */}
            <motion.div
                style={{ top: dot1Y, scale: dotScale, opacity: fadeMid }}
                className="absolute left-[25%] w-1 h-1 bg-white/30 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.15)] hidden md:block"
            />

            {/* Dot 2 — drifts vertically on right column */}
            <motion.div
                style={{ top: dot2Y, scale: dotScale, opacity: fadeMid }}
                className="absolute left-[75%] w-1 h-1 bg-white/30 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.15)] hidden md:block"
            />

            {/* Dot 3 — drifts horizontally at center */}
            <motion.div
                style={{ left: dot3X, scale: dotScale, opacity: fadeLatePeak }}
                className="absolute top-[50%] w-1.5 h-1.5 bg-white/20 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)] hidden md:block"
            />

            {/* ========== LAYER 7: Ambient Glows ========== */}
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-white/[0.015] rounded-full blur-[180px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-white/[0.015] rounded-full blur-[150px]" />
            <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-white/[0.01] rounded-full blur-[120px]" />

            {/* ========== LAYER 8: Grain Texture ========== */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        </div>
    );
};

export default UnifiedScrollBackground;
