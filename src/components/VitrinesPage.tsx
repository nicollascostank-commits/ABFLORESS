import React, { useState, useEffect, useMemo } from 'react';
import {
  VITRINE_COLLECTIONS,
  VitrineCollection,
} from '../data/vitrines';
import { OptimizedImage } from './OptimizedImage';
import { useCart } from '../context/CartContext';
import { acquireBodyScrollLock } from '../utils/scrollLock';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Store,
  X,
  ZoomIn,
} from 'lucide-react';

interface VitrinesPageProps {
  selectedCollectionSlug?: string | null;
  onSelectCollection: (slug: string | null) => void;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
}

export const VitrinesPage: React.FC<VitrinesPageProps> = ({
  selectedCollectionSlug,
  onSelectCollection,
  onNavigateHome,
  onNavigateCatalog,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeOccasion, setActiveOccasion] = useState<string>('todas');
  const { isCartOpen } = useCart();

  const activeCollectionIndex = selectedCollectionSlug
    ? VITRINE_COLLECTIONS.findIndex((c) => c.slug === selectedCollectionSlug)
    : -1;

  const activeCollection: VitrineCollection | null =
    activeCollectionIndex >= 0 ? VITRINE_COLLECTIONS[activeCollectionIndex] : null;

  const occasionTabs = useMemo(
    () => [
      { id: 'todas', label: 'Todas' },
      ...VITRINE_COLLECTIONS.map((c) => ({
        id: c.occasion,
        label: c.occasion,
      })),
    ],
    []
  );

  const displayedCollections = useMemo(() => {
    if (activeOccasion === 'todas') {
      return VITRINE_COLLECTIONS;
    }
    return VITRINE_COLLECTIONS.filter((c) => c.occasion === activeOccasion);
  }, [activeOccasion]);

  // Limpa o lightbox e reposiciona o topo suavemente ao trocar de visão/coleção
  useEffect(() => {
    setLightboxIndex(null);
    if (!selectedCollectionSlug) {
      setActiveOccasion('todas');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCollectionSlug]);

  useEffect(() => {
    if (lightboxIndex === null || !activeCollection) return;
    return acquireBodyScrollLock();
  }, [lightboxIndex, activeCollection]);

  // Suporte ao teclado (ESC e setas) dentro do lightbox
  useEffect(() => {
    if (lightboxIndex === null || !activeCollection || isCartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % activeCollection.photos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + activeCollection.photos.length) %
              activeCollection.photos.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [lightboxIndex, activeCollection, isCartOpen]);

  const currentPhoto =
    activeCollection && lightboxIndex !== null
      ? activeCollection.photos[lightboxIndex]
      : null;

  const previousCollection =
    activeCollectionIndex >= 0
      ? VITRINE_COLLECTIONS[
          (activeCollectionIndex - 1 + VITRINE_COLLECTIONS.length) %
            VITRINE_COLLECTIONS.length
        ]
      : VITRINE_COLLECTIONS[VITRINE_COLLECTIONS.length - 1];

  const nextCollection =
    activeCollectionIndex >= 0
      ? VITRINE_COLLECTIONS[
          (activeCollectionIndex + 1) % VITRINE_COLLECTIONS.length
        ]
      : VITRINE_COLLECTIONS[0];

  return (
    <main className="min-h-screen bg-[#faf8f5] pt-20 sm:pt-24 pb-16 sm:pb-20">
      {/* Cabeçalho Institucional Compacto & Editorial */}
      <section className="bg-gradient-to-b from-[#f5f1e8] to-[#faf8f5] border-b border-[#748a54]/15 py-6 sm:py-9">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barra Superior de Navegação */}
          <div className="flex items-center justify-between gap-2.5 mb-5 sm:mb-7">
            <div className="flex items-center gap-2 min-w-0">
              {activeCollection ? (
                <button
                  type="button"
                  onClick={() => onSelectCollection(null)}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold text-[#faf8f5] bg-[#38432a] hover:bg-[#748a54] transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#c29d59]" aria-hidden="true" />
                  <span>Todas as Coleções</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold text-[#38432a] bg-[#e8e3d7]/75 hover:bg-[#e8e3d7] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#4f6137]" aria-hidden="true" />
                  <span>Página Inicial</span>
                </button>
              )}

              {activeCollection && (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hidden sm:inline-flex items-center px-3 py-2 rounded-xl text-xs font-medium text-[#5d6650] hover:text-[#38432a] hover:bg-[#e8e3d7]/55 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Início</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onNavigateCatalog}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold text-[#38432a] border border-[#748a54]/25 bg-[#faf8f5] hover:bg-[#e8e3d7]/60 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54]"
            >
              <Store className="w-3.5 h-3.5 text-[#4f6137]" aria-hidden="true" />
              <span>Catálogo</span>
            </button>
          </div>

          {/* Título e Apresentação Elegante (Compacta e Equilibrada) */}
          {!activeCollection ? (
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2.5 mb-2.5" aria-hidden="true">
                <span className="w-6 h-px bg-[#c29d59]/55" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4f6137]">
                  AB Flores · Acervo Editorial
                </span>
                <span className="w-6 h-px bg-[#c29d59]/55" />
              </div>

              <h1 className="font-editorial text-2xl sm:text-4xl text-[#38432a] leading-tight mb-2.5 text-balance">
                Vitrines &amp; Inspirações
              </h1>

              <p className="font-editorial italic text-sm sm:text-base text-[#5d6650] leading-relaxed text-balance">
                “Cada coleção conta uma história. Descubra nossas criações e inspirações para momentos especiais.”
              </p>
            </div>
          ) : (
            <div className="text-center max-w-2xl mx-auto vitrine-view-enter">
              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4f6137] mb-2">
                <span>{activeCollection.occasion}</span>
                <span aria-hidden="true" className="text-[#c29d59]">·</span>
                <span className="tabular-nums">{activeCollection.year}</span>
                <span aria-hidden="true" className="text-[#c29d59]">·</span>
                <span className="tabular-nums">
                  {activeCollection.photos.length}{' '}
                  {activeCollection.photos.length === 1 ? 'fotografia' : 'fotografias'}
                </span>
              </div>

              <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[2.25rem] text-[#38432a] leading-tight mb-2.5 text-balance">
                {activeCollection.title}
              </h1>

              <p className="text-xs sm:text-sm text-[#5d6650] leading-relaxed max-w-xl mx-auto">
                {activeCollection.curatorialSubtitle}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9">
        {!activeCollection ? (
          /* VISÃO 1: GALERIA PRINCIPAL DE COLEÇÕES (2 colunas no celular, 3 colunas no computador) */
          <div className="vitrine-view-enter">
            {/* Filtro Discreto por Ocasião + Contador */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-7">
              <div
                role="tablist"
                aria-label="Filtrar coleções por ocasião"
                className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 flex-nowrap scrollbar-none lg:flex-wrap lg:overflow-visible"
              >
                {occasionTabs.map((tab) => {
                  const isActive = activeOccasion === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveOccasion(tab.id)}
                      className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54] ${
                        isActive
                          ? 'bg-[#38432a] text-[#faf8f5] shadow-xs'
                          : 'bg-[#f5f1e8] text-[#38432a] border border-[#748a54]/15 hover:bg-[#e8e3d7]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] font-medium text-[#5d6650] tabular-nums shrink-0">
                {displayedCollections.length}{' '}
                {displayedCollections.length === 1 ? 'coleção' : 'coleções'}
              </p>
            </div>

            {/* Grade Responsiva de Coleções: 2 por linha no celular, 3 por linha no desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-7">
              {displayedCollections.map((collection, index) => (
                <article
                  key={collection.id}
                  className="group rounded-2xl overflow-hidden bg-[#f5f1e8] border border-[#748a54]/20 shadow-xs hover:shadow-md hover:border-[#c29d59]/45 transition-all duration-300 flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => onSelectCollection(collection.slug)}
                    aria-label={`Abrir coleção ${collection.title}`}
                    className="w-full h-full text-left flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#748a54]"
                  >
                    {/* Fotografia de Capa com Proporção Consistente */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#242c1b]">
                      <OptimizedImage
                        src={collection.coverImage}
                        alt={collection.title}
                        className={`w-full h-full object-cover ${
                          collection.coverObjectPosition === 'top'
                            ? 'object-top'
                            : 'object-center'
                        } transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                        sizes="(max-width: 1024px) 46vw, 360px"
                        loading={index < 3 ? 'eager' : 'lazy'}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Informações Limpas e Legíveis da Coleção */}
                    <div className="p-3.5 sm:p-5 flex-1 w-full flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4f6137] mb-1.5">
                          <span className="tabular-nums">{collection.year}</span>
                          <span aria-hidden="true" className="text-[#c29d59]">·</span>
                          <span className="tabular-nums">
                            {collection.photos.length}{' '}
                            {collection.photos.length === 1 ? 'foto' : 'fotos'}
                          </span>
                          {collection.isCurrentCampaign && (
                            <>
                              <span aria-hidden="true" className="text-[#c29d59]">·</span>
                              <span className="text-[#7a5e28]">Atual</span>
                            </>
                          )}
                        </div>

                        <h2 className="font-editorial text-[15px] sm:text-lg lg:text-[1.15rem] text-[#38432a] leading-snug group-hover:text-[#4f6137] transition-colors text-balance">
                          {collection.title}
                        </h2>
                      </div>

                      <div className="pt-2.5 border-t border-[#748a54]/15 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-[#38432a]">
                        <span>Ver coleção</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c29d59] group-hover:translate-x-1 transition-transform duration-300 shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        ) : (
          /* VISÃO 2: GALERIA INDIVIDUAL DA COLEÇÃO SELECIONADA */
          <div key={activeCollection.id} className="space-y-8 sm:space-y-10 vitrine-view-enter">
            {/* Atalhos Discretos para Alternar Entre Coleções */}
            <nav
              aria-label="Alternar entre coleções"
              className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-nowrap scrollbar-none lg:flex-wrap lg:justify-center lg:overflow-visible lg:pb-0"
            >
              {VITRINE_COLLECTIONS.map((col) => {
                const isSelected = col.slug === activeCollection.slug;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => onSelectCollection(col.slug)}
                    aria-current={isSelected ? 'page' : undefined}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54] ${
                      isSelected
                        ? 'bg-[#38432a] text-[#faf8f5] shadow-xs'
                        : 'bg-[#f5f1e8] text-[#38432a] border border-[#748a54]/15 hover:bg-[#e8e3d7]'
                    }`}
                  >
                    {col.occasion}
                  </button>
                );
              })}
            </nav>

            {/* Grade Fotográfica: 2 colunas no celular, 3 no desktop (ou 2 centralizadas quando houver 2 fotos) */}
            <div
              className={`grid grid-cols-2 gap-3.5 sm:gap-5 lg:gap-6 ${
                activeCollection.photos.length === 2
                  ? 'lg:grid-cols-2 max-w-4xl mx-auto'
                  : 'lg:grid-cols-3'
              }`}
            >
              {activeCollection.photos.map((photo, index) => (
                <article
                  key={photo.id}
                  className="group rounded-2xl overflow-hidden bg-[#f5f1e8] border border-[#748a54]/20 shadow-xs hover:shadow-md hover:border-[#c29d59]/45 transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="relative aspect-[3/4] w-full overflow-hidden bg-[#242c1b] block text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#748a54]"
                    aria-label={`Ampliar ${photo.alt}`}
                  >
                    <OptimizedImage
                      src={photo.image}
                      alt={photo.alt}
                      className={`w-full h-full object-cover ${
                        photo.objectPosition === 'top'
                          ? 'object-top'
                          : 'object-center'
                      } transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                      sizes="(max-width: 1024px) 46vw, 360px"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      referrerPolicy="no-referrer"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#faf8f5]/90 text-[#38432a] flex items-center justify-center shadow-sm opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </button>
                </article>
              ))}
            </div>

            {/* Navegação de Retorno e Próxima/Anterior Coleção */}
            <div className="pt-6 border-t border-[#748a54]/15 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectCollection(previousCollection.slug)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold text-[#38432a] bg-[#f5f1e8] border border-[#748a54]/20 hover:bg-[#e8e3d7] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <ChevronLeft className="w-4 h-4 text-[#4f6137] shrink-0" aria-hidden="true" />
                  <span className="truncate max-w-[125px] sm:max-w-none">
                    {previousCollection.occasion}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCollection(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#faf8f5] bg-[#38432a] hover:bg-[#748a54] transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#c29d59]" aria-hidden="true" />
                  <span>Todas as Coleções</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCollection(nextCollection.slug)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold text-[#38432a] bg-[#f5f1e8] border border-[#748a54]/20 hover:bg-[#e8e3d7] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span className="truncate max-w-[125px] sm:max-w-none">
                    {nextCollection.occasion}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#4f6137] shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Lightbox Modal para Visualização Ampliada Sem Cortes */}
      {currentPhoto && activeCollection && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeCollection.title}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="self-end mb-3 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Fechar visualização"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative flex items-center justify-center w-full">
              {activeCollection.photos.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      ((lightboxIndex ?? 0) -
                        1 +
                        activeCollection.photos.length) %
                        activeCollection.photos.length
                    )
                  }
                  className="absolute left-1 sm:left-3 z-10 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Fotografia anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <OptimizedImage
                src={currentPhoto.image}
                alt={currentPhoto.alt}
                className="max-h-[76vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                variant="lightbox"
                sizes="(max-width: 768px) 95vw, 850px"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {activeCollection.photos.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      ((lightboxIndex ?? 0) + 1) %
                        activeCollection.photos.length
                    )
                  }
                  className="absolute right-1 sm:right-3 z-10 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Próxima fotografia"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="mt-3 text-center text-xs text-white/90 max-w-xl px-2">
              <span>{activeCollection.title}</span>
              <span className="mx-2 text-[#c29d59]">·</span>
              <span className="tabular-nums">
                {(lightboxIndex ?? 0) + 1} / {activeCollection.photos.length}
              </span>
              {currentPhoto.caption && (
                <p className="mt-1.5 text-white/75 text-xs leading-relaxed">
                  {currentPhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
