import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('button, a, input, textarea, [role="button"], .cursor-pointer, .glass-card, .btn-neon, .btn-glass');
      setIsHovering(isInteractive);
    };

    // Add event listeners
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-all duration-150 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`transition-all duration-200 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
      >
        <img
          src="/click.png"
          alt="Custom cursor"
          className="w-6 h-6 drop-shadow-lg"
          style={{
            filter: isHovering 
              ? 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))' 
              : 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))'
          }}
          onError={(e) => {
            // Fallback to a simple colored circle if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = `w-6 h-6 rounded-full transition-all duration-200 ${
              isHovering ? 'bg-cyan-400 scale-150' : 'bg-orange-400 scale-100'
            }`;
            fallback.style.boxShadow = isHovering 
              ? '0 0 20px rgba(0, 255, 255, 0.8)' 
              : '0 0 10px rgba(255, 165, 0, 0.6)';
            target.parentNode?.appendChild(fallback);
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
