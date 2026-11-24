import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';

interface Petal {
  id: number;
  x: number; // percentage across container (4% to 94%)
  size: number;
  color: string;
  veinColor: string;
  delay: number;
  duration: number;
  swayDistance: number;
  startRotation: number;
}

export const FounderSignature: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const guidePathRef = useRef<SVGPathElement>(null);

  const [hasPlayed, setHasPlayed] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0); // 0 to 1
  const [penCoords, setPenCoords] = useState<{ x: number; y: number }>({ x: 42, y: 70 });
  const [isPenVisible, setIsPenVisible] = useState(false);
  const [isPenLifting, setIsPenLifting] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [showDedication, setShowDedication] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Exact required signature string
  const signatureText = 'Por Arley Borges…';

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 18 Botanical Roses: refined harmonious palette of deep elegant greens and lighter luminous greens
  const petals: Petal[] = useRef([
    { id: 1, x: 5, size: 23, color: '#1b3a2b', veinColor: 'rgba(215,245,210,0.4)', delay: 0.1, duration: 4.8, swayDistance: 26, startRotation: 18 },
    { id: 2, x: 15, size: 26, color: '#8ca869', veinColor: 'rgba(255,255,255,0.5)', delay: 0.35, duration: 5.4, swayDistance: -30, startRotation: -22 },
    { id: 3, x: 25, size: 20, color: '#244b38', veinColor: 'rgba(215,245,210,0.45)', delay: 0.2, duration: 5.0, swayDistance: 22, startRotation: 42 },
    { id: 4, x: 35, size: 25, color: '#9bb874', veinColor: 'rgba(255,255,255,0.55)', delay: 0.65, duration: 5.6, swayDistance: -25, startRotation: -38 },
    { id: 5, x: 45, size: 28, color: '#2e4d3b', veinColor: 'rgba(205,240,200,0.42)', delay: 0.25, duration: 4.9, swayDistance: 32, startRotation: 28 },
    { id: 6, x: 55, size: 21, color: '#748a54', veinColor: 'rgba(255,255,255,0.5)', delay: 0.55, duration: 5.2, swayDistance: -20, startRotation: -58 },
    { id: 7, x: 65, size: 26, color: '#1e3929', veinColor: 'rgba(215,245,210,0.45)', delay: 0.18, duration: 5.1, swayDistance: 28, startRotation: 24 },
    { id: 8, x: 75, size: 22, color: '#a8c280', veinColor: 'rgba(255,255,255,0.55)', delay: 0.45, duration: 5.5, swayDistance: -32, startRotation: -70 },
    { id: 9, x: 85, size: 27, color: '#244b38', veinColor: 'rgba(215,245,210,0.4)', delay: 0.75, duration: 4.8, swayDistance: 24, startRotation: 48 },
    { id: 10, x: 12, size: 19, color: '#829e5e', veinColor: 'rgba(255,255,255,0.5)', delay: 1.05, duration: 5.3, swayDistance: -18, startRotation: -28 },
    { id: 11, x: 30, size: 24, color: '#274332', veinColor: 'rgba(215,245,210,0.45)', delay: 1.25, duration: 5.0, swayDistance: 26, startRotation: 38 },
    { id: 12, x: 50, size: 22, color: '#9bb874', veinColor: 'rgba(255,255,255,0.55)', delay: 0.95, duration: 5.7, swayDistance: -28, startRotation: -48 },
    { id: 13, x: 70, size: 26, color: '#1b3a2b', veinColor: 'rgba(205,240,200,0.42)', delay: 1.35, duration: 4.9, swayDistance: 30, startRotation: 32 },
    { id: 14, x: 82, size: 20, color: '#a8c280', veinColor: 'rgba(255,255,255,0.55)', delay: 1.15, duration: 5.4, swayDistance: -24, startRotation: -42 },
    { id: 15, x: 20, size: 25, color: '#38432a', veinColor: 'rgba(215,245,210,0.4)', delay: 1.55, duration: 5.1, swayDistance: 24, startRotation: 58 },
    { id: 16, x: 62, size: 21, color: '#748a54', veinColor: 'rgba(255,255,255,0.5)', delay: 1.45, duration: 4.9, swayDistance: -22, startRotation: -32 },
    { id: 17, x: 92, size: 23, color: '#244b38', veinColor: 'rgba(215,245,210,0.45)', delay: 1.65, duration: 5.2, swayDistance: 18, startRotation: 42 },
    { id: 18, x: 40, size: 19, color: '#8ca869', veinColor: 'rgba(255,255,255,0.55)', delay: 1.75, duration: 5.5, swayDistance: -26, startRotation: -52 },
  ]).current;

  // The master motion trajectory path for the calligraphy pen:
  // Spans precisely across "Por Arley Borges…" in viewBox 0 0 760 170
  // P (45->82) -> o (85->118) -> r (120->152) ->
  // A (182->228) -> r (232->256) -> l (260->292) -> e (296->322) -> y (326->372) ->
  // B (400->452) -> o (456->488) -> r (492->518) -> g (522->564) -> e (568->592) -> s (596->630) ->
  // … (dot1: 652, dot2: 672, dot3: 692)
  const penMotionGuide =
    // "Por"
    'M 46 68 C 48 90, 52 116, 54 118 C 56 118, 58 84, 60 62 C 64 50, 78 48, 80 62 C 82 74, 70 86, 56 86 ' +
    'C 70 86, 86 94, 94 94 C 104 94, 114 84, 108 98 C 102 104, 94 100, 100 92 C 106 84, 118 90, 126 94 ' +
    'C 134 86, 142 86, 146 94 C 150 102, 142 104, 154 102 ' +
    // Transition to "Arley"
    'C 166 100, 176 86, 186 64 C 194 48, 204 46, 210 60 C 218 80, 226 102, 228 106 ' +
    'C 220 90, 202 88, 218 86 C 226 86, 234 94, 240 94 C 248 86, 254 86, 256 94 C 258 102, 252 104, 260 102 ' +
    'C 264 96, 274 66, 280 46 C 284 40, 288 44, 286 58 C 282 80, 284 102, 290 102 ' +
    'C 298 94, 308 86, 312 92 C 316 98, 308 104, 320 102 ' +
    'C 328 94, 338 88, 344 94 C 348 98, 350 104, 354 94 C 358 84, 362 90, 360 104 C 356 122, 348 144, 340 144 C 334 144, 332 136, 342 124 C 352 112, 366 104, 376 102 ' +
    // Transition to "Borges" (B - o - r - g - e - s)
    'C 390 100, 400 82, 408 56 C 412 44, 418 46, 420 58 C 424 78, 422 104, 424 114 ' +
    'C 426 114, 430 78, 436 62 C 444 54, 456 56, 452 72 C 448 82, 436 86, 426 86 C 442 86, 460 90, 456 104 C 452 114, 436 116, 422 114 ' +
    'C 436 114, 458 98, 468 94 C 478 94, 484 86, 480 98 C 476 104, 468 100, 474 92 C 480 84, 492 90, 500 94 ' +
    'C 508 86, 514 86, 516 94 C 518 102, 512 104, 522 102 ' +
    'C 530 94, 540 88, 544 94 C 548 100, 544 104, 538 102 C 532 100, 532 90, 542 86 C 550 82, 558 90, 556 102 C 552 120, 544 144, 536 144 C 530 144, 528 136, 538 124 C 548 112, 562 104, 572 102 ' +
    'C 580 94, 588 88, 592 94 C 594 100, 586 104, 598 102 ' +
    'C 606 94, 614 86, 618 90 C 622 96, 616 104, 626 102 C 632 100, 638 98, 642 96 ' +
    // Three graceful ink dots: "…"
    'C 648 98, 652 102, 654 102 ' +
    'C 662 100, 672 102, 674 102 ' +
    'C 682 100, 692 102, 694 102';

  // Animation trigger logic
  const runAnimation = useCallback(() => {
    if (prefersReducedMotion) {
      setAnimationProgress(1);
      setIsPenVisible(false);
      setShowPetals(true);
      setShowDedication(true);
      setHasPlayed(true);
      return;
    }

    // Reset states
    setAnimationProgress(0);
    setIsPenVisible(true);
    setIsPenLifting(false);
    setShowPetals(false);
    setShowDedication(false);

    const guidePath = guidePathRef.current;
    if (!guidePath) return;

    const totalLen = guidePath.getTotalLength() || 2400;
    const duration = 3600; // 3.6 seconds of authentic calligraphy writing
    const startTime = performance.now();

    // Trigger rose petals falling softly mid-way through writing
    const petalsTimer = setTimeout(() => {
      setShowPetals(true);
    }, 900);

    let rafId: number;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth custom ease-in-out for calligraphy cadence
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
      setAnimationProgress(eased);

      try {
        const point = guidePath.getPointAtLength(eased * totalLen);
        if (point) {
          setPenCoords({ x: point.x, y: point.y });
        }
      } catch {
        // Fallback calculation across width if path sampling fails
        const fallbackX = 45 + eased * 650;
        setPenCoords({ x: fallbackX, y: 98 });
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        // Writing completed: fountain pen lifts gracefully up and fades away
        setIsPenLifting(true);
        setTimeout(() => {
          setIsPenVisible(false);
          setShowDedication(true);
          setHasPlayed(true);
        }, 550);
      }
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(petalsTimer);
    };
  }, [prefersReducedMotion]);

  // Observer to trigger when section enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasPlayed) {
          runAnimation();
        }
      },
      { threshold: 0.25 }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [hasPlayed, runAnimation]);

  const handleReplay = (e: React.MouseEvent) => {
    e.preventDefault();
    setHasPlayed(false);
    runAnimation();
  };

  // The dynamic clip width that reveals the exact text "Por Arley Borges…"
  // It opens smoothly up to 760px, following the pen tip leading edge.
  const clipWidth = prefersReducedMotion || hasPlayed
    ? 760
    : Math.max(0, Math.min(760, penCoords.x + 12));

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-gradient-to-b from-[#faf8f5] via-[#f5f1e8] to-[#e8e3d7]/50 relative overflow-hidden border-t border-[#748a54]/20"
      aria-label="Assinatura manuscrita oficial: Por Arley Borges…"
    >
      {/* Decorative subtle botanical corner accents */}
      <div className="absolute top-6 left-8 text-[#748a54]/15 pointer-events-none select-none hidden sm:block">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
          <path d="M12 52 C 24 40, 36 28, 52 12 C 40 24, 28 36, 12 52 Z M 20 32 C 26 24, 38 20, 44 26 C 36 32, 28 36, 20 32 Z" />
        </svg>
      </div>

      <div className="absolute bottom-6 right-8 text-[#748a54]/15 pointer-events-none select-none hidden sm:block transform rotate-180">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
          <path d="M12 52 C 24 40, 36 28, 52 12 C 40 24, 28 36, 12 52 Z M 20 32 C 26 24, 38 20, 44 26 C 36 32, 28 36, 20 32 Z" />
        </svg>
      </div>

      {/* Gentle Floating Natural Rose Petals Layer (No balloons, no confetti, true botanical petals) */}
      {showPetals && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
          {petals.map((petal) => (
            <span
              key={petal.id}
              className="absolute block animate-rose-petal"
              style={{
                left: `${petal.x}%`,
                top: '-45px',
                width: `${petal.size}px`,
                height: `${petal.size * 1.35}px`,
                animationDelay: `${petal.delay}s`,
                animationDuration: `${petal.duration}s`,
                opacity: 0.9,
              }}
            >
              <svg
                viewBox="0 0 32 42"
                className="w-full h-full drop-shadow-xs"
                style={{
                  transform: `rotate(${petal.startRotation}deg)`,
                }}
              >
                {/* Organic botanical rose petal with curved apex, gentle side lobes, and tapered base */}
                <path
                  d="M 16 2 C 24 6, 31 16, 27 28 C 23 38, 18 41, 16 41 C 14 41, 9 38, 5 28 C 1 16, 8 6, 16 2 Z"
                  fill={petal.color}
                />
                {/* Soft interior natural vein curve for authentic depth */}
                <path
                  d="M 16 8 C 17 18, 18 28, 16 38"
                  fill="none"
                  stroke={petal.veinColor}
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
                {/* Delicate secondary branch vein */}
                <path
                  d="M 16 18 C 21 21, 23 25, 23 27"
                  fill="none"
                  stroke={petal.veinColor}
                  strokeWidth="0.55"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        {/* Editorial Subtitle / Header */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#748a54] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#c29d59]" />
          <span>Direção Criativa & Arte Floral</span>
        </div>

        {/* Master Signature Canvas: Exclusively and precisely "Por Arley Borges…" */}
        <div className="relative max-w-2xl mx-auto min-h-[170px] sm:min-h-[210px] flex items-center justify-center">
          <svg
            viewBox="0 0 760 170"
            className="w-full h-auto overflow-visible select-none"
            aria-label="Por Arley Borges…"
          >
            <defs>
              {/* Progressive rectangular mask that reveals the signature from left to right */}
              <clipPath id="signature-reveal-clip">
                <rect x="0" y="0" width={clipWidth} height="170" />
              </clipPath>

              {/* Hidden motion guide path used by getPointAtLength */}
              <path
                id="pen-guide-path"
                ref={guidePathRef}
                d={penMotionGuide}
                fill="none"
                stroke="transparent"
              />

              {/* Subtle gold foil gradient for nib */}
              <linearGradient id="gold-nib-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3e0aa" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa8323" />
              </linearGradient>

              {/* Ink drop shadow filter */}
              <filter id="ink-shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#000" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* The Handwritten Signature: Rendered with true, pristine typography "Por Arley Borges…" */}
            <g clipPath="url(#signature-reveal-clip)">
              {/* Underlying smooth ink connector flow for authentic fountain-pen bleed */}
              <path
                d={penMotionGuide}
                fill="none"
                stroke="#244B38"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.45"
              />

              {/* Main Calligraphic Text in sophisticated forest green (#244B38) */}
              <text
                x="45"
                y="108"
                fill="#244B38"
                style={{
                  fontFamily: "'Alex Brush', 'Great Vibes', 'Playfair Display', cursive, serif",
                  fontSize: '66px',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
                filter="url(#ink-shadow)"
              >
                {signatureText}
              </text>
            </g>

            {/* Stylized Fountain Pen: Sleek Black Lacquer with Calligraphy Gold Nib */}
            {isPenVisible && (
              <g
                transform={`translate(${penCoords.x}, ${penCoords.y}) rotate(-26) ${
                  isPenLifting ? 'translate(0, -38)' : 'translate(0, 0)'
                }`}
                className={`transition-all duration-500 ease-out ${
                  isPenLifting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                style={{ pointerEvents: 'none' }}
              >
                {/* Soft natural contact shadow on paper directly under the nib */}
                <ellipse cx="2" cy="3.5" rx="4.5" ry="2" fill="rgba(0,0,0,0.22)" />

                {/* Micro wet ink droplet touching the paper right at the nib */}
                <circle cx="0" cy="0" r="1.4" fill="#244B38" />

                {/* Fine Gold Calligraphy Nib Tip pointing precisely at (0, 0) */}
                <polygon
                  points="0,0 -3.2,-15 3.2,-15"
                  fill="url(#gold-nib-gradient)"
                  stroke="#8e6d1a"
                  strokeWidth="0.4"
                />
                {/* Nib Breather Hole & Central Slit */}
                <line x1="0" y1="-2" x2="0" y2="-13" stroke="#3b2d07" strokeWidth="0.4" />
                <circle cx="0" cy="-9" r="0.6" fill="#3b2d07" />

                {/* Gold Nib Collar Band */}
                <rect x="-3.6" y="-19" width="7.2" height="4" fill="#c29d59" rx="0.5" />

                {/* Lacquered Deep Black Pen Barrel */}
                <rect x="-4.2" y="-80" width="8.4" height="61" rx="2" fill="#11140e" />

                {/* Glossy Polished Reflection Stripe along the barrel */}
                <line
                  x1="-1.6"
                  y1="-76"
                  x2="-1.6"
                  y2="-23"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                />

                {/* Gold Finial Cap at top of barrel */}
                <circle cx="0" cy="-80" r="3.2" fill="#c29d59" />
              </g>
            )}
          </svg>
        </div>

        {/* Closing Dedication Line: Fades in smoothly after signature finishes */}
        <div
          className={`mt-4 sm:mt-6 transition-all duration-1000 ${
            showDedication || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <p className="font-editorial italic text-lg sm:text-2xl text-[#38432a] tracking-wide mb-2 flex items-center justify-center gap-2">
            <span>Com carinho, AB Flores.</span>
            <Heart className="w-4 h-4 text-[#8b1419] fill-[#8b1419]/25 inline-block" />
          </p>

          <p className="text-xs sm:text-sm text-[#748a54] font-medium tracking-wider uppercase">
            Arte Floral Contemporânea & Decoração Afetiva · Fortaleza, Ceará
          </p>
        </div>

        {/* Subtle Replay Interaction (discreet and non-intrusive) */}
        {(showDedication || hasPlayed) && !prefersReducedMotion && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#5d6650] hover:text-[#38432a] bg-[#faf8f5]/80 hover:bg-[#faf8f5] border border-[#748a54]/20 transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer group"
              title="Rever animação da assinatura"
              aria-label="Rever animação da assinatura de Arley Borges"
            >
              <RotateCcw className="w-3 h-3 text-[#748a54] group-hover:-rotate-45 transition-transform" />
              <span>Rever assinatura</span>
            </button>
          </div>
        )}
      </div>

      {/* Global CSS for Organic Rose Petal Falling Keyframes */}
      <style>{`
        @keyframes rosePetalFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0) scale(0.9);
            opacity: 0;
          }
          12% {
            opacity: 0.95;
          }
          45% {
            transform: translateY(115px) rotate(110deg) translateX(28px) scale(1);
          }
          75% {
            opacity: 0.85;
            transform: translateY(185px) rotate(210deg) translateX(-18px) scale(0.95);
          }
          100% {
            transform: translateY(270px) rotate(320deg) translateX(12px) scale(0.9);
            opacity: 0;
          }
        }
        .animate-rose-petal {
          animation-name: rosePetalFall;
          animation-timing-function: cubic-bezier(0.38, 0, 0.22, 1);
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
};
