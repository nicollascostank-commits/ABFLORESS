import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { OptimizedImage } from './OptimizedImage';

interface HeroProps {
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Background photographic protagonist: Arley Borges in authentic creation at the AB Flores atelier
  const heroImageSrc = '/assets/aistudio/6595ed8b-0d53-4ad1-b270-941d6a9bec97_248d25e5.jpeg';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    const updateDimensions = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Subtle drifting organic petals
    const colors = [
      'rgba(194, 157, 89, 0.40)', // Warm Gold accent
      'rgba(232, 227, 215, 0.45)', // Nude / Sand
      'rgba(255, 240, 240, 0.35)', // Rose petal
      'rgba(116, 138, 84, 0.35)', // Sage Green
    ];

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      waveOffset: number;
    }

    const petals: Petal[] = Array.from({ length: 16 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 7 + 5,
      speedY: Math.random() * 0.5 + 0.25,
      speedX: Math.random() * 0.3 - 0.15,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      color: colors[Math.floor(Math.random() * colors.length)],
      waveOffset: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.005 + p.waveOffset) * 0.4 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size * 0.75, 0, 0, p.size);
        ctx.quadraticCurveTo(-p.size * 0.75, 0, 0, -p.size);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Pause on hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMouseOffset({ x: x * 6, y: y * 6 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full h-[95vh] sm:h-screen min-h-[660px] max-h-[1100px] overflow-hidden flex items-end sm:items-center bg-[#181f14]"
    >
      {/* Protagonist Full-Bleed Photograph with Framing Preserving Arley's Head and Arrangement */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <OptimizedImage
          src={heroImageSrc}
          alt="Arley Borges compondo arranjo floral no atelier AB Flores em Fortaleza"
          onLoad={() => setIsLoaded(true)}
          sizes="100vw"
          className={`w-full h-full object-cover object-[center_6%] sm:object-[center_10%] transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100 animate-cinematic-zoom' : 'opacity-0'
          }`}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />

        {/* Luxury Scrim Gradient Overlay: Preserves the entire right side of Arley and arrangement while giving high legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141a10]/95 via-[#141a10]/60 to-black/30 sm:bg-gradient-to-r sm:from-[#141a10]/90 sm:via-[#141a10]/55 sm:to-transparent" />
      </div>

      {/* Floating Botanical Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
        aria-hidden="true"
      />

      {/* Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:py-24">
        <div className="max-w-2xl text-left">
          {/* Brand Emblem & Subtitle */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#faf8f5] mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c29d59]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e8e3d7]">
              Atelier Floral & Decoração · Fortaleza, Ceará
            </span>
          </div>

          {/* Headline - Official Signature Phrase */}
          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#faf8f5] leading-[1.12] mb-5 tracking-tight text-balance">
            Mais do que flores, entregamos{' '}
            <span className="italic font-normal text-[#c29d59]">experiências florais</span>.
          </h1>

          {/* Short, Sophisticated Institutional Presentation */}
          <p className="text-sm sm:text-base text-[#e8e3d7] leading-relaxed mb-8 max-w-xl font-light">
            Arte floral contemporânea e criações botânicas autorais assinadas pelo artista visual e designer floral <strong>Arley Borges</strong>. Cada arranjo nasce do frescor orgânico e do afeto para transformar ambientes e celebrar momentos únicos.
          </p>

          {/* Action CTAs with Official WhatsApp (85) 99239-5959 */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExploreCatalog}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#1a2114] bg-[#faf8f5] hover:bg-[#c29d59] hover:text-[#1a2114] transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <span>Explorar Catálogo</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppUrl('Olá! Vim pelo site da AB Flores e gostaria de conhecer os arranjos disponíveis.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#faf8f5] bg-black/40 hover:bg-black/60 border border-white/25 hover:border-white/50 backdrop-blur-md transition-all duration-300 active:scale-[0.98] whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#c29d59]" />
              <span>WhatsApp Oficial (85) 99239-5959</span>
            </a>
          </div>

          {/* Discreet Atelier Badge */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#e8e3d7]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c29d59]" />
            <span>Arley Borges em criação autoral no estúdio AB Flores · Fortaleza, CE</span>
          </div>
        </div>
      </div>

      {/* Discrete Bottom Indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
        onClick={onExploreCatalog}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Descobrir</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
};
