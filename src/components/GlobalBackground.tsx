import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollRef = useRef(0);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // 1. SCROLL TRACKING WITH LERP
        let targetScroll = 0;
        let currentScroll = 0;

        const trigger = ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                targetScroll = self.progress;
            }
        });

        // 2. SHAPE SETTINGS (Muted Shadows)
        const shapes = [
            { x: 0.2, y: 0.3, size: 0.6, opacity: 0.4, speed: 0.0005 },
            { x: 0.8, y: 0.2, size: 0.8, opacity: 0.3, speed: 0.0003 },
            { x: 0.5, y: 0.7, size: 0.7, opacity: 0.4, speed: 0.0004 },
            { x: 0.1, y: 0.8, size: 0.5, opacity: 0.3, speed: 0.0006 }
        ];

        const animate = () => {
            timeRef.current += 0.005;

            // Smoothly interpolate scroll
            currentScroll += (targetScroll - currentScroll) * 0.05;

            // Clear to the base dark neutral
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            // DRAW: TOPOGRAPHIC SHADOWS
            shapes.forEach((shape, i) => {
                const x = (shape.x + Math.sin(timeRef.current * shape.speed * 100 + i) * 0.05) * width;
                const y = (shape.y + Math.cos(timeRef.current * shape.speed * 80 + i * 0.5) * 0.05) * height;

                const scrollY = (currentScroll * (0.2 + i * 0.1)) * height;
                const finalY = (y - scrollY) % (height * 1.5);

                const radius = shape.size * width;
                const grad = ctx.createRadialGradient(x, finalY, 0, x, finalY, radius);
                grad.addColorStop(0, `rgba(15, 15, 20, ${shape.opacity * 0.5})`);
                grad.addColorStop(0.5, `rgba(10, 10, 12, ${shape.opacity * 0.2})`);
                grad.addColorStop(1, 'rgba(5, 5, 5, 0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, finalY, radius, 0, Math.PI * 2);
                ctx.fill();

                // Infinite wrap
                ctx.beginPath();
                ctx.arc(x, finalY + height * 1.5, radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, finalY - height * 1.5, radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // DRAW: DYNAMIC 3D PERSPECTIVE GRID
            const perspective = 400;
            const focalLength = 300;
            const vanishingX = width / 2;
            const vanishingY = height / 2;

            ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 + currentScroll * 0.05})`;
            ctx.lineWidth = 0.5;

            const gridSize = 100;
            // Vertical structural lines (converging to center)
            for (let i = -10; i <= 10; i++) {
                const xStart = vanishingX + (i * gridSize * 10);
                const yStart = height;

                ctx.beginPath();
                ctx.moveTo(vanishingX, vanishingY);
                ctx.lineTo(xStart, yStart);
                ctx.stroke();
            }

            // Horizontal planes (moving toward viewer)
            const speedMultiplier = 10;
            const scrollWarp = Math.abs(targetScroll - currentScroll) * 1000;

            for (let i = 0; i < 20; i++) {
                const z = ((i * 50 + currentScroll * 2000) % 1000);
                const scale = focalLength / (focalLength + z);

                const y = vanishingY + (height / 2) * scale;
                const w = width * scale * 4;

                // Add a warping sine wave logic to horizontal lines
                ctx.beginPath();
                for (let xPos = -w / 2; xPos <= w / 2; xPos += 50) {
                    const wave = Math.sin(xPos * 0.01 + currentScroll * 10) * scrollWarp * scale * 0.1;
                    const drawX = vanishingX + xPos;
                    const drawY = y + wave;

                    if (xPos === -w / 2) ctx.moveTo(drawX, drawY);
                    else ctx.lineTo(drawX, drawY);
                }

                // Line opacity based on distance (Z)
                const opacity = (1 - z / 1000) * 0.1;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.stroke();
            }

            // DRAW: KINETIC LIGHT STREAKS
            const streaks = [
                { x: 0.15, color: 'rgba(79, 70, 229, 0.5)', speed: 3.5 },
                { x: 0.85, color: 'rgba(147, 51, 234, 0.5)', speed: 2.5 },
                { x: 0.5, color: 'rgba(56, 189, 248, 0.3)', speed: 4.5 }
            ];

            streaks.forEach((streak) => {
                const x = width * streak.x;
                const offset = (currentScroll * height * streak.speed) % (height * 3);
                const y = offset - height;

                const grad = ctx.createLinearGradient(x, y, x, y + 600);
                grad.addColorStop(0, 'transparent');
                grad.addColorStop(0.5, streak.color);
                grad.addColorStop(1, 'transparent');

                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + 600);
                ctx.stroke();
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            trigger.kill();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505] overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute inset-0 bg-[#050505] opacity-20 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-80" />
        </div>
    );
};

export default GlobalBackground;
