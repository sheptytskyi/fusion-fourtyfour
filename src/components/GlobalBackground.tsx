import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

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

        const shapes = isMobile ? [
            { x: 0.2, y: 0.3, size: 0.6, opacity: 0.15, speed: 0.0005 },
            { x: 0.8, y: 0.7, size: 0.7, opacity: 0.15, speed: 0.0004 }
        ] : [
            { x: 0.2, y: 0.3, size: 0.6, opacity: 0.2, speed: 0.0005 },
            { x: 0.8, y: 0.2, size: 0.8, opacity: 0.15, speed: 0.0003 },
            { x: 0.5, y: 0.7, size: 0.7, opacity: 0.2, speed: 0.0004 }
        ];

        let animationId: number;
        const animate = () => {
            timeRef.current += 0.005;
            currentScroll += (targetScroll - currentScroll) * 0.08;

            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            shapes.forEach((shape, i) => {
                const x = (shape.x + Math.sin(timeRef.current * shape.speed * 100 + i) * 0.05) * width;
                const y = (shape.y + Math.cos(timeRef.current * shape.speed * 80 + i * 0.5) * 0.05) * height;
                const scrollY = (currentScroll * (0.2 + i * 0.1)) * height;
                const finalY = (y - scrollY) % (height * 1.5);
                const radius = shape.size * width;

                const grad = ctx.createRadialGradient(x, finalY, 0, x, finalY, radius);
                grad.addColorStop(0, `rgba(15, 15, 20, ${shape.opacity})`);
                grad.addColorStop(1, 'rgba(5, 5, 5, 0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, finalY, radius, 0, Math.PI * 2);
                ctx.fill();
            });

            const vX = width / 2;
            const vY = height / 2;
            const fL = 300;
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.01 + currentScroll * 0.02})`;
            ctx.lineWidth = 0.5;

            const gS = isMobile ? 200 : 150;
            const lC = isMobile ? 5 : 8;

            for (let i = -lC; i <= lC; i++) {
                ctx.beginPath();
                ctx.moveTo(vX, vY);
                ctx.lineTo(vX + (i * gS * 10), height);
                ctx.stroke();
            }

            const hC = isMobile ? 8 : 15;
            for (let i = 0; i < hC; i++) {
                const z = ((i * (isMobile ? 120 : 70) + currentScroll * 2000) % 1000);
                const s = fL / (fL + z);
                const y = vY + (height / 2) * s;
                const w = width * s * 4;
                ctx.beginPath();
                ctx.moveTo(vX - w / 2, y);
                ctx.lineTo(vX + w / 2, y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - z / 1000) * (isMobile ? 0.02 : 0.05)})`;
                ctx.stroke();
            }

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            trigger.kill();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505] overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-80" />
        </div>
    );
};

export default GlobalBackground;
