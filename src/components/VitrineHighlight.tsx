import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  CURRENT_VITRINE_HIGHLIGHT,
  CurrentVitrineHighlight,
} from '../data/vitrines';
import { OptimizedImage } from './OptimizedImage';

interface VitrineHighlightProps {
  onOpenVitrines: () => void;
  highlight?: CurrentVitrineHighlight;
}

type OpeningPhase = 'idle' | 'opening' | 'revealing' | 'done';

interface NatalParticle {
  id: number;
  kind: 'snowflake' | 'star' | 'glow';
  left: string;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
  rot: number;
  rotEnd: number;
}

// Quantidade limitada de elementos natalinos leves para animação finita (~2,5s)
const NATAL_PARTICLES: NatalParticle[] = [
  { id: 1, kind: 'snowflake', left: '12%', size: 13, duration: 2450, delay: 40, sway: 10, opacity: 0.85, rot: 45, rotEnd: 110 },
  { id: 2, kind: 'glow', left: '24%', size: 4, duration: 2150, delay: 180, sway: -8, opacity: 0.75, rot: 0, rotEnd: 0 },
  { id: 3, kind: 'star', left: '36%', size: 11, duration: 2350, delay: 90, sway: 7, opacity: 0.9, rot: 25, rotEnd: 75 },
  { id: 4, kind: 'glow', left: '48%', size: 5, duration: 2250, delay: 320, sway: -11, opacity: 0.7, rot: 0, rotEnd: 0 },
  { id: 5, kind: 'snowflake', left: '61%', size: 14, duration: 2550, delay: 140, sway: -9, opacity: 0.8, rot: -40, rotEnd: -105 },
  { id: 6, kind: 'star', left: '74%', size: 10, duration: 2200, delay: 260, sway: 9, opacity: 0.88, rot: 35, rotEnd: 95 },
  { id: 7, kind: 'glow', left: '85%', size: 4, duration: 2300, delay: 60, sway: -7, opacity: 0.78, rot: 0, rotEnd: 0 },
  { id: 8, kind: 'snowflake', left: '19%', size: 11, duration: 2500, delay: 440, sway: 12, opacity: 0.72, rot: 50, rotEnd: 120 },
  { id: 9, kind: 'glow', left: '31%', size: 5, duration: 2100, delay: 520, sway: -6, opacity: 0.65, rot: 0, rotEnd: 0 },
  { id: 10, kind: 'star', left: '53%', size: 12, duration: 2400, delay: 410, sway: 8, opacity: 0.85, rot: -30, rotEnd: -90 },
  { id: 11, kind: 'glow', left: '67%', size: 4, duration: 2250, delay: 480, sway: -10, opacity: 0.72, rot: 0, rotEnd: 0 },
  { id: 12, kind: 'snowflake', left: '79%', size: 12, duration: 2600, delay: 340, sway: 9, opacity: 0.76, rot: 38, rotEnd: 100 },
  { id: 13, kind: 'star', left: '90%', size: 10, duration: 2350, delay: 540, sway: -8, opacity: 0.8, rot: 20, rotEnd: 80 },
  { id: 14, kind: 'glow', left: '42%', size: 4, duration: 2200, delay: 600, sway: 7, opacity: 0.68, rot: 0, rotEnd: 0 },
];

const OPENING_DURATION_MS = 2050;
const REVEAL_TRANSITION_MS = 950;
const IMAGE_READY_FALLBACK_MS = 4000;

export const VitrineHighlight: React.FC<VitrineHighlightProps> = ({
  onOpenVitrines,
  highlight = CURRENT_VITRINE_HIGHLIGHT,
}) => {
  const photoFrameRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<OpeningPhase>(() => {
    if (typeof window === 'undefined') return 'done';
    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    return prefersReducedMotion ? 'done' : 'idle';
  });

  const [imageReady, setImageReady] = useState<boolean>(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState<boolean>(false);

  // Verifica caso a imagem já tenha concluído o carregamento do cache antes do onLoad
  useEffect(() => {
    const imgEl = photoFrameRef.current?.querySelector('img');
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setImageReady(true);
    }
  }, [highlight.image]);

  // Observa a entrada da área reservada da vitrine na viewport (executa uma única vez por carregamento)
  useEffect(() => {
    if (phase !== 'idle') return;

    const target = photoFrameRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setPhase('done');
      return;
    }

    let rafId = 0;
    const startOpening = () => {
      rafId = window.requestAnimationFrame(() => {
        setPhase((current) => (current === 'idle' ? 'opening' : current));
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            startOpening();
            break;
          }
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -16px 0px',
      }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [phase]);

  // Cronômetro mínimo (~2s) para a cena de abertura natalina + garantia de segurança para exibição da foto
  useEffect(() => {
    if (phase !== 'opening') return;

    const minTimer = window.setTimeout(() => {
      setMinTimeElapsed(true);
    }, OPENING_DURATION_MS);

    const fallbackTimer = window.setTimeout(() => {
      setImageReady(true);
    }, IMAGE_READY_FALLBACK_MS);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [phase]);

  // Dispara a transição suave da abertura para a fotografia original quando ~2s se passarem e a foto estiver pronta
  useEffect(() => {
    if (phase === 'opening' && minTimeElapsed && imageReady) {
      setPhase('revealing');
    }
  }, [phase, minTimeElapsed, imageReady]);

  // Conclui a transição e remove a camada temporária de abertura da árvore DOM
  useEffect(() => {
    if (phase !== 'revealing') return;

    const doneTimer = window.setTimeout(() => {
      setPhase('done');
    }, REVEAL_TRANSITION_MS);

    return () => {
      window.clearTimeout(doneTimer);
    };
  }, [phase]);

  const isPhotoVisible = phase === 'revealing' || phase === 'done';
  const showOpeningScene = phase !== 'done';
  const isOpeningAnimating = phase === 'opening' || phase === 'revealing';

  return (
    <section
      aria-label={`Destaque da vitrine: ${highlight.collectionName}`}
      className="pt-14 pb-10 sm:py-16 bg-[#faf8f5]"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10">
          {/* Espaço reservado da imagem de destaque: cena natalina temporária -> revelação da fotografia original */}
          <div
            ref={photoFrameRef}
            className="relative w-full max-w-[340px] md:w-[235px] lg:w-[260px] shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-md border border-[#748a54]/20 bg-[#242c1b] aspect-[9/13] max-h-[70vh] md:aspect-[899/1600] md:max-h-none"
          >
            {/* Fotografia original pré-carregada por baixo, oculta durante a abertura e revelada sem cortes nem filtros */}
            <div
              className={`w-full h-full transition-[opacity,transform] duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isPhotoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
              }`}
            >
              <OptimizedImage
                src={highlight.image}
                alt={highlight.imageAlt}
                sizes="(max-width: 768px) 340px, 260px"
                className="w-full h-full object-cover object-top md:object-center block"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onLoad={() => setImageReady(true)}
              />
            </div>

            {/* Etapa 1: Cena temporária de abertura natalina */}
            {showOpeningScene && (
              <div
                aria-hidden={phase === 'revealing'}
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-8 text-center select-none overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#354227_0%,#242c1b_58%,#181e12_100%)] transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpeningAnimating ? 'vitrine-opening-active' : ''
                } ${
                  phase === 'revealing'
                    ? 'opacity-0 scale-[1.02] pointer-events-none'
                    : 'opacity-100 scale-100'
                }`}
              >
                {/* Moldura sutil dourada evocando a identidade da fachada AB Flores */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 rounded-xl border border-[#c29d59]/25"
                />

                {/* Elementos natalinos leves em queda suave (flocos de neve, estrelas e partículas luminosas) */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                  {NATAL_PARTICLES.map((p) => {
                    const style = {
                      left: p.left,
                      top: '-16px',
                      '--p-dur': `${p.duration}ms`,
                      '--p-delay': `${p.delay}ms`,
                      '--p-sway': `${p.sway}px`,
                      '--p-opacity': `${p.opacity}`,
                      '--p-rot': `${p.rot}deg`,
                      '--p-rot-end': `${p.rotEnd}deg`,
                    } as React.CSSProperties;

                    if (p.kind === 'glow') {
                      return (
                        <span
                          key={p.id}
                          style={{
                            ...style,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                          }}
                          className="vitrine-natal-particle absolute rounded-full bg-[#f5e4bc] shadow-[0_0_8px_rgba(229,204,147,0.8)]"
                        />
                      );
                    }

                    if (p.kind === 'star') {
                      return (
                        <svg
                          key={p.id}
                          style={style}
                          width={p.size}
                          height={p.size}
                          viewBox="0 0 24 24"
                          fill="none"
                          className="vitrine-natal-particle absolute text-[#e5cc93]"
                        >
                          <path
                            d="M12 2L14.1 9.9L22 12L14.1 14.1L12 22L9.9 14.1L2 12L9.9 9.9L12 2Z"
                            fill="currentColor"
                          />
                        </svg>
                      );
                    }

                    return (
                      <svg
                        key={p.id}
                        style={style}
                        width={p.size}
                        height={p.size}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="vitrine-natal-particle absolute text-[#faf8f5]"
                      >
                        <line x1="12" y1="3" x2="12" y2="21" />
                        <line x1="4.2" y1="7.5" x2="19.8" y2="16.5" />
                        <line x1="19.8" y1="7.5" x2="4.2" y2="16.5" />
                      </svg>
                    );
                  })}
                </div>

                {/* Frase centralizada da abertura natalina */}
                <div className="vitrine-opening-phrase relative z-10 flex flex-col items-center max-w-[240px]">
                  <div className="flex items-center gap-2.5 mb-3.5" aria-hidden="true">
                    <span className="w-6 h-px bg-[#c29d59]/50" />
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#e5cc93]"
                    >
                      <path
                        d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="w-6 h-px bg-[#c29d59]/50" />
                  </div>

                  <p className="font-editorial text-[1.4rem] sm:text-2xl leading-snug text-[#faf8f5] tracking-wide text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                    A magia do Natal chegou
                  </p>

                  <span
                    aria-hidden="true"
                    className="w-10 h-px bg-[#c29d59]/55 mt-4"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Card Editorial da Vitrine Atual (mantém integralmente textos e botão aprovados) */}
          <div className="w-full max-w-[340px] sm:max-w-[440px] md:max-w-none md:flex-1 rounded-2xl bg-[#f5f1e8] border border-[#748a54]/20 shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-center items-start text-left">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4f6137] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#c29d59] shrink-0" aria-hidden="true" />
              <span>{highlight.presenter}</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-[2.1rem] text-[#38432a] leading-tight mb-2 text-balance">
              {highlight.title}
            </h2>

            <p className="w-full text-xs sm:text-[13px] font-semibold text-[#7a5e28] tracking-wide pb-3 mb-3.5 border-b border-[#c29d59]/35">
              {highlight.collectionName}
            </p>

            <p className="text-xs sm:text-sm lg:text-base text-[#5d6650] leading-relaxed mb-6 max-w-md">
              {highlight.subtitle}
            </p>

            <div className="w-full md:w-auto">
              <button
                type="button"
                onClick={onOpenVitrines}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#faf8f5] bg-[#38432a] hover:bg-[#748a54] transition-colors duration-200 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1e8]"
              >
                <span>{highlight.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#c29d59] shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
