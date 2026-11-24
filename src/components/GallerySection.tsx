import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/products';
import { OptimizedImage } from './OptimizedImage';
import { useCart } from '../context/CartContext';
import { acquireBodyScrollLock } from '../utils/scrollLock';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ChevronUp,
} from 'lucide-react';

const INITIAL_GALLERY_COUNT = 4;

export const GallerySection: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isCartOpen } = useCart();

  const displayedItems = isExpanded
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.slice(0, INITIAL_GALLERY_COUNT);

  useEffect(() => {
    if (activePhotoIndex === null) return;
    return acquireBodyScrollLock();
  }, [activePhotoIndex]);

  useEffect(() => {
    if (activePhotoIndex === null || isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setActivePhotoIndex(null);
      }
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [activePhotoIndex, isCartOpen]);

  return (
    <section id="galeria" className="py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#748a54] block mb-2">
            Portfólio Visual & Bastidores
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#38432a] leading-tight mb-4">
            Galeria de Trabalhos AB Flores
          </h2>
          <p className="text-sm sm:text-base text-[#5d6650] leading-relaxed">
            Fotografias reais das criações autorais, fachada do ateliê em Fortaleza e Arley Borges em pleno processo criativo com botânica fresca.
          </p>
        </div>

        {/* Photo Grid: 2 columns across mobile and desktop (2x2 initially) */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {displayedItems.map((item, index) => {
            const isContain = item.imageFit === 'contain';
            return (
              <div
                key={item.id}
                onClick={() => setActivePhotoIndex(index)}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer border border-[#748a54]/20 shadow-xs hover:shadow-xl transition-all duration-300 ${
                  isContain ? 'bg-[#f5f1e8]' : 'bg-[#e8e3d7]'
                }`}
              >
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full transition-transform duration-700 ${
                    isContain
                      ? 'object-contain p-1.5 sm:p-2 group-hover:scale-103'
                      : `object-cover ${item.objectPosition || 'object-center'} group-hover:scale-105`
                  }`}
                  sizes="(max-width: 640px) 46vw, 480px"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-5">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#e8e3d7] font-semibold mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-brand font-semibold text-xs sm:text-sm text-[#faf8f5] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#faf8f5]/80 line-clamp-2 mt-1 hidden sm:block">
                    {item.caption}
                  </p>

                  <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Independent VER MAIS / Ver menos button */}
        {GALLERY_ITEMS.length > INITIAL_GALLERY_COUNT && (
          <div className="mt-10 sm:mt-14 text-center">
            <button
              type="button"
              onClick={() => {
                const willExpand = !isExpanded;
                setIsExpanded(willExpand);
                if (!willExpand) {
                  document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white bg-[#38432a] hover:bg-[#748a54] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-102 active:scale-98 cursor-pointer group"
              aria-label={isExpanded ? 'Ver menos fotografias da galeria' : 'Ver mais fotografias da galeria'}
            >
              <span>{isExpanded ? 'Ver menos' : 'VER MAIS'}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#c29d59] group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#c29d59] group-hover:translate-x-1 transition-transform" />
              )}
            </button>
            <p className="text-xs text-[#5d6650] mt-3">
              {isExpanded
                ? `Exibindo todas as ${GALLERY_ITEMS.length} fotografias da Galeria de Trabalhos.`
                : `Exibindo ${INITIAL_GALLERY_COUNT} de ${GALLERY_ITEMS.length} fotografias da Galeria de Trabalhos.`}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar galeria"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) =>
                prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
              );
            }}
            className="absolute left-4 sm:left-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) =>
                prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null
              );
            }}
            className="absolute right-4 sm:right-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Display */}
          <div
            className="max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <OptimizedImage
              src={GALLERY_ITEMS[activePhotoIndex].image}
              alt={GALLERY_ITEMS[activePhotoIndex].title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              variant="lightbox"
              sizes="(max-width: 768px) 95vw, 850px"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white max-w-xl px-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#c29d59] block mb-1">
                {GALLERY_ITEMS[activePhotoIndex].category} · {activePhotoIndex + 1} de {GALLERY_ITEMS.length}
              </span>
              <h4 className="font-brand font-bold text-lg sm:text-xl">
                {GALLERY_ITEMS[activePhotoIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#e8e3d7] mt-1 leading-relaxed">
                {GALLERY_ITEMS[activePhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

