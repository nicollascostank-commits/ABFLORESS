import React, { useState, useEffect, useMemo } from 'react';
import {
  PRODUCTS_DATA,
  Product,
  BUQUES_BOXES_SUBCATEGORIES,
  BuquesBoxesSubCategory,
} from '../data/products';
import {
  CORPORATE_SUBSCRIPTION_ITEMS,
  DECORATION_TIPS_ITEMS,
  CORPORATE_SUBCATEGORIES,
  CorporateSubCategory,
} from '../data/subscriptions';
import {
  RESIDENTIAL_SUBSCRIPTION_ITEMS,
  RESIDENTIAL_SUBCATEGORIES,
  ResidentialSubCategory,
} from '../data/residentialSubscriptions';
import {
  EVENT_PROJECTS_ITEMS,
  EVENTS_SUBCATEGORIES,
  EventsSubCategory,
} from '../data/events';
import { ProductDetailModal } from './ProductDetailModal';
import { useCart } from '../context/CartContext';
import { getWhatsAppUrl, DISPLAY_WHATSAPP_PHONE } from '../utils/whatsapp';
import {
  BOX_FLOWERS_ITEMS,
  BOX_FLOWERS_PRODUCTS,
  BOX_FLOWERS_SUBCATEGORIES,
  BoxFlowersSubCategory,
} from '../data/boxFlowers';
import { OptimizedImage } from './OptimizedImage';
import { SubcategoryFilterBar } from './SubcategoryFilterBar';
import { acquireBodyScrollLock } from '../utils/scrollLock';
import {
  ShoppingBag,
  Eye,
  Check,
  Gift,
  Building2,
  PartyPopper,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Home,
  Clock,
  Info,
  X,
  Lightbulb,
  Package,
} from 'lucide-react';

function buildSubCategoryCounts<T extends { subCategory?: string }>(items: T[]): Record<string, number> {
  const counts: Record<string, number> = { todos: items.length };
  for (const item of items) {
    if (item.subCategory) {
      counts[item.subCategory] = (counts[item.subCategory] ?? 0) + 1;
    }
  }
  return counts;
}

interface CatalogSectionProps {
  initialCategory?: string;
  onOpenFullCatalog?: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  initialCategory,
  onOpenFullCatalog,
}) => {
  // Main Tab: 'buques-boxes' (Buquês), 'box-flowers' (Box Flowers para Presentes), 'assinaturas' (Assinatura Floral), 'eventos' (Eventos)
  const [activeMainTab, setActiveMainTab] = useState<'buques-boxes' | 'box-flowers' | 'assinaturas' | 'eventos'>(
    initialCategory === 'box-flowers'
      ? 'box-flowers'
      : initialCategory === 'assinaturas'
      ? 'assinaturas'
      : initialCategory === 'eventos'
      ? 'eventos'
      : 'buques-boxes'
  );

  // Subcategories inside "Assinatura Floral": 'corporativo' (default) or 'residencial'
  const [subscriptionSubCategory, setSubscriptionSubCategory] = useState<'corporativo' | 'residencial'>('corporativo');

  // Expansion states for each category independently (initial display of 6 items each)
  const [isBuquesExpanded, setIsBuquesExpanded] = useState(false);
  const [isBoxFlowersExpanded, setIsBoxFlowersExpanded] = useState(false);
  const [isCorpExpanded, setIsCorpExpanded] = useState(false);
  const [isResExpanded, setIsResExpanded] = useState(false);
  const [isEventsExpanded, setIsEventsExpanded] = useState(false);

  // Active subcategory filter states (used only when each section is expanded via "VER MAIS")
  const [buquesSubCategory, setBuquesSubCategory] = useState<BuquesBoxesSubCategory>('todos');
  const [boxFlowersSubCategory, setBoxFlowersSubCategory] = useState<BoxFlowersSubCategory>('todos');
  const [corpSubCategory, setCorpSubCategory] = useState<CorporateSubCategory>('todos');
  const [resSubCategory, setResSubCategory] = useState<ResidentialSubCategory>('todos');
  const [eventsSubCategory, setEventsSubCategory] = useState<EventsSubCategory>('todos');

  const buquesCounts = useMemo(() => buildSubCategoryCounts(PRODUCTS_DATA), []);
  const boxFlowersCounts = useMemo(() => buildSubCategoryCounts(BOX_FLOWERS_PRODUCTS), []);
  const corpCounts = useMemo(() => buildSubCategoryCounts(CORPORATE_SUBSCRIPTION_ITEMS), []);
  const resCounts = useMemo(() => buildSubCategoryCounts(RESIDENTIAL_SUBSCRIPTION_ITEMS), []);
  const eventsCounts = useMemo(() => buildSubCategoryCounts(EVENT_PROJECTS_ITEMS), []);

  // Sliced items per category (6 initial, or filtered/all when expanded)
  const displayedBuquesProducts = useMemo(() => {
    if (!isBuquesExpanded) return PRODUCTS_DATA.slice(0, 6);
    if (buquesSubCategory === 'todos') return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter((item) => item.subCategory === buquesSubCategory);
  }, [isBuquesExpanded, buquesSubCategory]);

  const displayedBoxFlowersProducts = useMemo(() => {
    if (!isBoxFlowersExpanded) return BOX_FLOWERS_PRODUCTS.slice(0, 6);
    if (boxFlowersSubCategory === 'todos') return BOX_FLOWERS_PRODUCTS;
    return BOX_FLOWERS_PRODUCTS.filter((item) => item.subCategory === boxFlowersSubCategory);
  }, [isBoxFlowersExpanded, boxFlowersSubCategory]);

  const displayedCorporateItems = useMemo(() => {
    if (!isCorpExpanded) return CORPORATE_SUBSCRIPTION_ITEMS.slice(0, 6);
    if (corpSubCategory === 'todos') return CORPORATE_SUBSCRIPTION_ITEMS;
    return CORPORATE_SUBSCRIPTION_ITEMS.filter((item) => item.subCategory === corpSubCategory);
  }, [isCorpExpanded, corpSubCategory]);

  const displayedResidentialItems = useMemo(() => {
    if (!isResExpanded) return RESIDENTIAL_SUBSCRIPTION_ITEMS.slice(0, 6);
    if (resSubCategory === 'todos') return RESIDENTIAL_SUBSCRIPTION_ITEMS;
    return RESIDENTIAL_SUBSCRIPTION_ITEMS.filter((item) => item.subCategory === resSubCategory);
  }, [isResExpanded, resSubCategory]);

  const displayedEventsItems = useMemo(() => {
    if (!isEventsExpanded) return EVENT_PROJECTS_ITEMS.slice(0, 6);
    if (eventsSubCategory === 'todos') return EVENT_PROJECTS_ITEMS;
    return EVENT_PROJECTS_ITEMS.filter((item) => item.subCategory === eventsSubCategory);
  }, [isEventsExpanded, eventsSubCategory]);

  // Lightbox for corporate and box photos
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const { addToCart, isCartOpen } = useCart();

  useEffect(() => {
    if (!previewImage) return;
    return acquireBodyScrollLock();
  }, [previewImage]);

  useEffect(() => {
    if (!previewImage || selectedProduct || isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPreviewImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [previewImage, selectedProduct, isCartOpen]);

  // Sync tab with initialCategory when navigation occurs
  useEffect(() => {
    if (initialCategory === 'box-flowers') {
      setActiveMainTab('box-flowers');
    } else if (initialCategory === 'assinaturas') {
      setActiveMainTab('assinaturas');
    } else if (initialCategory === 'eventos') {
      setActiveMainTab('eventos');
    } else if (initialCategory === 'buques-boxes') {
      setActiveMainTab('buques-boxes');
    }
  }, [initialCategory]);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1800);
  };

  return (
    <section id="catalogo" className="py-20 sm:py-24 bg-[#faf8f5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mandatory Header & Institutional Quote */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#748a54] block mb-3">
            Coleção Autoral Ateliê AB Flores
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#38432a] leading-tight mb-5">
            Buquês & Box Florais para Presentear
          </h2>
          <div className="relative p-6 sm:p-7 rounded-2xl bg-[#f5f1e8] border border-[#748a54]/20 shadow-xs mb-6">
            <p className="font-editorial italic text-base sm:text-lg text-[#38432a] leading-relaxed">
              &ldquo;Todos os dias você pode presentear com flores. Um pedido de desculpas, um pedido de namoro, uma visita a um amigo, um simples &lsquo;lembrei de você&rsquo;, um noivado ou a chegada de uma viagem. Existem muitos momentos em que as flores se fazem presentes e tornam cada ocasião ainda mais especial.&rdquo;
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#748a54]">
              <Sparkles className="w-3.5 h-3.5 text-[#c29d59]" />
              <span>Arley Borges · Arte Floral & Decoração</span>
            </div>
          </div>
        </div>

        {/* Main Category Selector Tabs in the Catalog */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveMainTab('buques-boxes')}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeMainTab === 'buques-boxes'
                ? 'bg-[#38432a] text-[#faf8f5] shadow-md scale-102'
                : 'bg-[#e8e3d7]/60 text-[#38432a] hover:bg-[#e8e3d7]'
            }`}
          >
            <Gift className="w-4 h-4 text-[#c29d59]" />
            <span>Buquês & Boxes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('box-flowers')}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeMainTab === 'box-flowers'
                ? 'bg-[#38432a] text-[#faf8f5] shadow-md scale-102'
                : 'bg-[#e8e3d7]/60 text-[#38432a] hover:bg-[#e8e3d7]'
            }`}
          >
            <Package className="w-4 h-4 text-[#c29d59]" />
            <span>Box Flowers para Presentes</span>
            <span
              className={`ml-1 text-[11px] px-2 py-0.5 rounded-full ${
                activeMainTab === 'box-flowers'
                  ? 'bg-[#c29d59]/30 text-[#faf8f5]'
                  : 'bg-[#748a54]/15 text-[#5d6650]'
              }`}
            >
              {BOX_FLOWERS_ITEMS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('assinaturas')}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeMainTab === 'assinaturas'
                ? 'bg-[#38432a] text-[#faf8f5] shadow-md scale-102'
                : 'bg-[#e8e3d7]/60 text-[#38432a] hover:bg-[#e8e3d7]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#748a54]" />
            <span>Assinatura Floral</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('eventos')}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeMainTab === 'eventos'
                ? 'bg-[#38432a] text-[#faf8f5] shadow-md scale-102'
                : 'bg-[#e8e3d7]/60 text-[#38432a] hover:bg-[#e8e3d7]'
            }`}
          >
            <PartyPopper className="w-4 h-4 text-[#748a54]" />
            <span>Eventos</span>
            <span
              className={`ml-1 text-[11px] px-2 py-0.5 rounded-full ${
                activeMainTab === 'eventos'
                  ? 'bg-[#c29d59]/30 text-[#faf8f5]'
                  : 'bg-[#748a54]/15 text-[#5d6650]'
              }`}
            >
              {EVENT_PROJECTS_ITEMS.length}
            </span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: BUQUÊS & BOXES FLORAIS (Inicialmente 6 produtos, expansível)
           ========================================================================= */}
        {activeMainTab === 'buques-boxes' && (
          <div>
            {isBuquesExpanded && (
              <SubcategoryFilterBar
                categories={BUQUES_BOXES_SUBCATEGORIES}
                counts={buquesCounts}
                activeId={buquesSubCategory}
                onSelect={setBuquesSubCategory}
                ariaLabel="Filtrar Buquês e Boxes por subcategoria"
              />
            )}

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
              {displayedBuquesProducts.map((product) => {
                const isAdded = justAddedId === product.id;

                return (
                  <article
                    key={product.id}
                    className="group bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#748a54]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Vertical aspect-[4/5] container to ensure bouquets and boxes appear in full */}
                    <div
                      className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e3d7] cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <OptimizedImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 46vw, 390px"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {product.badge && (
                        <span className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-[#38432a]/95 text-[#faf8f5] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs backdrop-blur-xs">
                          {product.badge}
                        </span>
                      )}

                      {/* Quick view icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#faf8f5]/95 hover:bg-[#38432a] hover:text-white text-[#38432a] flex items-center justify-center shadow-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
                        title="Ver detalhes do arranjo"
                        aria-label={`Ver detalhes de ${product.name}`}
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#faf8f5] to-[#f8f5ee]">
                      <div>
                        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#748a54] mb-1">
                          {product.categoryLabel}
                        </p>

                        <h3
                          onClick={() => setSelectedProduct(product)}
                          className="font-brand font-bold text-xs sm:text-base text-[#38432a] group-hover:text-[#748a54] transition-colors leading-snug mb-1.5 sm:mb-2 cursor-pointer line-clamp-2"
                        >
                          {product.name}
                        </h3>

                        <p className="text-[11px] sm:text-xs text-[#5d6650] leading-relaxed line-clamp-2 mb-2 sm:mb-3">
                          {product.shortDescription}
                        </p>

                        <div className="text-[10px] sm:text-[11px] text-[#748a54] bg-[#e8e3d7]/40 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg mb-3 sm:mb-4 line-clamp-1">
                          <span className="font-semibold text-[#38432a]">Composição: </span>
                          {product.components}
                        </div>
                      </div>

                      {/* Price & Add to Cart Action */}
                      <div className="pt-2.5 sm:pt-3 border-t border-[#748a54]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#5d6650]">
                            Valor
                          </span>
                          <span
                            className={`font-brand font-bold ${
                              product.formattedPrice &&
                              product.formattedPrice !== 'Preço a consultar' &&
                              product.formattedPrice !== 'Preço sob consulta'
                                ? 'text-xs sm:text-lg text-[#38432a] tabular-nums'
                                : 'text-[11px] sm:text-xs text-[#748a54]'
                            }`}
                          >
                            {product.formattedPrice || 'Preço a consultar'}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all shadow-xs hover:shadow active:scale-98 cursor-pointer ${
                            isAdded
                              ? 'bg-[#748a54] text-white'
                              : 'bg-[#38432a] hover:bg-[#748a54] text-white'
                          }`}
                          title="Adicionar ao carrinho"
                          aria-label={`Adicionar ${product.name} ao carrinho`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white shrink-0" />
                              <span>Adicionado</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5 text-[#c29d59] shrink-0" />
                              <span>Adicionar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Botão Centralizado "VER MAIS" / "VER MENOS" */}
            {PRODUCTS_DATA.length > 6 && (
              <div className="mt-10 sm:mt-14 text-center">
                <button
                  type="button"
                  onClick={() => {
                    const willExpand = !isBuquesExpanded;
                    setIsBuquesExpanded(willExpand);
                    if (!willExpand) {
                      setBuquesSubCategory('todos');
                      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white bg-[#38432a] hover:bg-[#748a54] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-102 active:scale-98 cursor-pointer group"
                  aria-label={isBuquesExpanded ? 'Recolher buquês e boxes' : 'Ver mais buquês e boxes'}
                >
                  <span>{isBuquesExpanded ? 'Ver menos' : 'Ver mais'}</span>
                  {isBuquesExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#c29d59] group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#c29d59] group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
                <p className="text-xs text-[#5d6650] mt-3">
                  {isBuquesExpanded
                    ? buquesSubCategory === 'todos'
                      ? `Exibindo todas as ${PRODUCTS_DATA.length} criações florais exclusivas.`
                      : `Exibindo ${displayedBuquesProducts.length} de ${PRODUCTS_DATA.length} criações florais exclusivas.`
                    : `Exibindo 6 de ${PRODUCTS_DATA.length} criações florais exclusivas.`}
                </p>
                {onOpenFullCatalog && !isBuquesExpanded && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={onOpenFullCatalog}
                      className="text-xs text-[#748a54] hover:text-[#38432a] font-medium cursor-pointer transition-colors underline"
                    >
                      Ou abrir catálogo completo com busca e filtros
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB: BOX FLOWERS PARA PRESENTES (Inicialmente 6 produtos, expansível)
           ========================================================================= */}
        {activeMainTab === 'box-flowers' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header explicativo da categoria Box Flowers */}
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#748a54] block mb-2">
                Coleção Especial para Presentear
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#38432a] mb-3">
                Box Flowers para Presentes
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#5d6650] leading-relaxed">
                Caixas rígidas de luxo, hatboxes cilíndricos, sacolas vitrine e arranjos florais exclusivos combinados com chocolates finos Ferrero Rocher, pelúcias e detalhes devocionais para presentear em todas as ocasiões.
              </p>
            </div>

            {isBoxFlowersExpanded && (
              <SubcategoryFilterBar
                categories={BOX_FLOWERS_SUBCATEGORIES}
                counts={boxFlowersCounts}
                activeId={boxFlowersSubCategory}
                onSelect={setBoxFlowersSubCategory}
                ariaLabel="Filtrar Box Flowers por subcategoria"
              />
            )}

            {/* Grade: 3 colunas no desktop, 2 colunas no celular */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
              {displayedBoxFlowersProducts.map((product) => {
                const isAdded = justAddedId === product.id;

                return (
                  <article
                    key={product.id}
                    className="group bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#748a54]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Container vertical aspect-[4/5] para acomodar perfeitamente caixas e chapéus */}
                    <div
                      className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e3d7] cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <OptimizedImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 46vw, 390px"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {product.badge && (
                        <span className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-[#38432a]/95 text-[#faf8f5] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs backdrop-blur-xs">
                          {product.badge}
                        </span>
                      )}

                      {/* Quick view icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#faf8f5]/95 hover:bg-[#38432a] hover:text-white text-[#38432a] flex items-center justify-center shadow-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
                        title="Ver detalhes do arranjo"
                        aria-label={`Ver detalhes de ${product.name}`}
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    {/* Detalhes do Produto */}
                    <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#faf8f5] to-[#f8f5ee]">
                      <div>
                        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#748a54] mb-1">
                          {product.categoryLabel}
                        </p>

                        <h3
                          onClick={() => setSelectedProduct(product)}
                          className="font-brand font-bold text-xs sm:text-base text-[#38432a] group-hover:text-[#748a54] transition-colors leading-snug mb-1.5 sm:mb-2 cursor-pointer line-clamp-2"
                        >
                          {product.name}
                        </h3>

                        <p className="text-[11px] sm:text-xs text-[#5d6650] leading-relaxed line-clamp-2 mb-2 sm:mb-3">
                          {product.shortDescription}
                        </p>

                        {product.components && (
                          <div className="text-[10px] sm:text-[11px] text-[#748a54] bg-[#e8e3d7]/40 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg mb-3 sm:mb-4 line-clamp-1">
                            <span className="font-semibold text-[#38432a]">Composição: </span>
                            {product.components}
                          </div>
                        )}
                      </div>

                      {/* Preço "Preço a consultar", Adicionar ao Carrinho e Consulta WhatsApp */}
                      <div className="pt-2.5 sm:pt-3 border-t border-[#748a54]/15 flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                          <div className="flex flex-col">
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#5d6650]">
                              Valor
                            </span>
                            <span className="font-brand font-bold text-[11px] sm:text-sm text-[#748a54]">
                              {product.formattedPrice || 'Preço a consultar'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleAddToCart(product, e)}
                            className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all shadow-xs hover:shadow active:scale-98 cursor-pointer ${
                              isAdded
                                ? 'bg-[#748a54] text-white'
                                : 'bg-[#38432a] hover:bg-[#748a54] text-white'
                            }`}
                            title="Adicionar ao carrinho"
                            aria-label={`Adicionar ${product.name} ao carrinho`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white shrink-0" />
                                <span>Adicionado</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5 text-[#c29d59] shrink-0" />
                                <span>Adicionar</span>
                              </>
                            )}
                          </button>
                        </div>

                        {product.whatsAppUrl && (
                          <a
                            href={product.whatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center sm:justify-end gap-1.5 text-[10px] sm:text-[11px] font-medium text-[#748a54] hover:text-[#38432a] transition-colors"
                            title="Consultar direto no WhatsApp"
                            aria-label={`Consultar ${product.name} no WhatsApp`}
                          >
                            <MessageCircle className="w-3 h-3 shrink-0" />
                            <span>Consultar no WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Botão Centralizado "VER MAIS" / "VER MENOS" para Box Flowers */}
            {BOX_FLOWERS_PRODUCTS.length > 6 && (
              <div className="mt-10 sm:mt-14 text-center">
                <button
                  type="button"
                  onClick={() => {
                    const willExpand = !isBoxFlowersExpanded;
                    setIsBoxFlowersExpanded(willExpand);
                    if (!willExpand) {
                      setBoxFlowersSubCategory('todos');
                      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white bg-[#38432a] hover:bg-[#748a54] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-102 active:scale-98 cursor-pointer group"
                  aria-label={isBoxFlowersExpanded ? 'Recolher criações de Box Flowers' : 'Ver mais criações de Box Flowers'}
                >
                  <span>{isBoxFlowersExpanded ? 'Ver menos' : 'Ver mais'}</span>
                  {isBoxFlowersExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#c29d59] group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#c29d59] group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
                <p className="text-xs text-[#5d6650] mt-3">
                  {isBoxFlowersExpanded
                    ? boxFlowersSubCategory === 'todos'
                      ? `Exibindo todas as ${BOX_FLOWERS_PRODUCTS.length} criações da categoria Box Flowers para Presentes.`
                      : `Exibindo ${displayedBoxFlowersProducts.length} de ${BOX_FLOWERS_PRODUCTS.length} criações da categoria Box Flowers para Presentes.`
                    : `Exibindo 6 de ${BOX_FLOWERS_PRODUCTS.length} criações da categoria Box Flowers para Presentes.`}
                </p>
                {onOpenFullCatalog && !isBoxFlowersExpanded && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={onOpenFullCatalog}
                      className="text-xs text-[#748a54] hover:text-[#38432a] font-medium cursor-pointer transition-colors underline"
                    >
                      Ou abrir catálogo completo com busca e filtros
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3: ASSINATURA FLORAL
            Subcategorias internas: Corporativo e Residencial
           ========================================================================= */}
        {activeMainTab === 'assinaturas' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header explicativo da Assinatura Floral */}
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#748a54] block mb-2">
                Curadoria Periódica do Ateliê
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#38432a] mb-2">
                Assinatura Floral
              </h3>
              <p className="text-xs sm:text-sm text-[#5d6650] leading-relaxed">
                Arranjos botânicos vivos e exclusivos desenvolvidos sob direção artística de Arley Borges.
                Selecione abaixo a subcategoria desejada.
              </p>
            </div>

            {/* Subcategorias internas: Corporativo e Residencial seguindo o padrão visual do catálogo */}
            <div className="flex items-center justify-center gap-3 mb-8" role="tablist" aria-label="Subcategorias de Assinatura Floral">
              <button
                type="button"
                onClick={() => setSubscriptionSubCategory('corporativo')}
                role="tab"
                aria-selected={subscriptionSubCategory === 'corporativo'}
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  subscriptionSubCategory === 'corporativo'
                    ? 'bg-[#38432a] text-[#faf8f5] shadow-xs'
                    : 'bg-[#faf8f5] text-[#38432a] hover:bg-[#e8e3d7] border border-[#748a54]/20'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#c29d59]" />
                <span>Corporativo</span>
                <span
                  className={`ml-1 text-[11px] px-2 py-0.5 rounded-full ${
                    subscriptionSubCategory === 'corporativo'
                      ? 'bg-[#c29d59]/30 text-[#faf8f5]'
                      : 'bg-[#748a54]/15 text-[#5d6650]'
                  }`}
                >
                  {CORPORATE_SUBSCRIPTION_ITEMS.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSubscriptionSubCategory('residencial')}
                role="tab"
                aria-selected={subscriptionSubCategory === 'residencial'}
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  subscriptionSubCategory === 'residencial'
                    ? 'bg-[#38432a] text-[#faf8f5] shadow-xs'
                    : 'bg-[#faf8f5] text-[#38432a] hover:bg-[#e8e3d7] border border-[#748a54]/20'
                }`}
              >
                <Home className="w-4 h-4 text-[#748a54]" />
                <span>Residencial</span>
                <span
                  className={`ml-1 text-[11px] px-2 py-0.5 rounded-full ${
                    subscriptionSubCategory === 'residencial'
                      ? 'bg-[#c29d59]/30 text-[#faf8f5]'
                      : 'bg-[#748a54]/15 text-[#5d6650]'
                  }`}
                >
                  {RESIDENTIAL_SUBSCRIPTION_ITEMS.length}
                </span>
              </button>
            </div>

            {/* SUBCATEGORIA 1: CORPORATIVO */}
            {subscriptionSubCategory === 'corporativo' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="bg-[#f5f1e8] rounded-2xl p-5 sm:p-6 border border-[#748a54]/20 text-center max-w-3xl mx-auto shadow-xs">
                  <p className="text-xs sm:text-sm text-[#5d6650] leading-relaxed">
                    Fotografias reais de composições florais em ambientes corporativos e de clientes em Fortaleza —
                    recepções de clínicas, showrooms conceituais, lojas de alto padrão (como Tania Bulhões e Villa Vita Day Clinic),
                    lounges e mesas de reunião.
                  </p>
                </div>

                {isCorpExpanded && (
                  <SubcategoryFilterBar
                    categories={CORPORATE_SUBCATEGORIES}
                    counts={corpCounts}
                    activeId={corpSubCategory}
                    onSelect={setCorpSubCategory}
                    ariaLabel="Filtrar Assinatura Corporativa por subcategoria"
                  />
                )}

                {/* Grade: 3 colunas no desktop, 2 colunas no celular */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
                  {displayedCorporateItems.map((item, index) => (
                    <article
                      key={item.id}
                      className="group bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#748a54]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                      onClick={() => setPreviewImage(item.image)}
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e3d7]">
                        <OptimizedImage
                          src={item.image}
                          alt={item.caption || `Composição Floral Corporativa ${index + 1}`}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 46vw, 390px"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Identificação Corporativo no canto da respectiva foto */}
                        <span className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-[#38432a]/90 text-[#faf8f5] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs backdrop-blur-xs">
                          Corporativo
                        </span>

                        {/* Botão de ampliar fotografia */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(item.image);
                          }}
                          className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#faf8f5]/95 hover:bg-[#38432a] hover:text-white text-[#38432a] flex items-center justify-center shadow-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
                          title="Ampliar fotografia"
                          aria-label="Ampliar fotografia corporativa"
                        >
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      {item.caption && (
                        <div className="p-3 sm:p-4 bg-gradient-to-b from-[#faf8f5] to-[#f8f5ee]">
                          <p className="text-[11px] sm:text-xs text-[#38432a] font-medium leading-relaxed line-clamp-2">
                            {item.caption}
                          </p>
                        </div>
                      )}
                    </article>
                  ))}
                </div>

                {/* Botão Centralizado "VER MAIS" / "VER MENOS" para Assinatura Corporativa */}
                {CORPORATE_SUBSCRIPTION_ITEMS.length > 6 && (
                  <div className="mt-8 sm:mt-10 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        const willExpand = !isCorpExpanded;
                        setIsCorpExpanded(willExpand);
                        if (!willExpand) {
                          setCorpSubCategory('todos');
                          document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white bg-[#38432a] hover:bg-[#748a54] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-102 active:scale-98 cursor-pointer group"
                      aria-label={isCorpExpanded ? 'Recolher registros corporativos' : 'Ver mais registros corporativos'}
                    >
                      <span>{isCorpExpanded ? 'Ver menos' : 'Ver mais'}</span>
                      {isCorpExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#c29d59] group-hover:-translate-y-0.5 transition-transform" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-[#c29d59] group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                    <p className="text-xs text-[#5d6650] mt-3">
                      {isCorpExpanded
                        ? corpSubCategory === 'todos'
                          ? `Exibindo todas as ${CORPORATE_SUBSCRIPTION_ITEMS.length} composições corporativas.`
                          : `Exibindo ${displayedCorporateItems.length} de ${CORPORATE_SUBSCRIPTION_ITEMS.length} composições corporativas.`
                        : `Exibindo 6 de ${CORPORATE_SUBSCRIPTION_ITEMS.length} composições corporativas.`}
                    </p>
                  </div>
                )}

                {/* Dicas e Frases Complementares sobre Decoração */}
                <div className="pt-8 border-t border-[#748a54]/20">
                  <div className="text-center max-w-2xl mx-auto mb-6">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#748a54] block mb-1">
                      Conteúdo Educativo Oficial
                    </span>
                    <h4 className="font-editorial text-xl sm:text-2xl text-[#38432a]">
                      Dicas sobre Decoração com Flores
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {DECORATION_TIPS_ITEMS.map((tip) => (
                      <div
                        key={tip.id}
                        className="bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#748a54]/20 shadow-xs flex flex-col justify-between"
                      >
                        <div
                          className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e3d7] cursor-pointer"
                          onClick={() => setPreviewImage(tip.image)}
                        >
                          <OptimizedImage
                            src={tip.image}
                            alt={tip.title}
                            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 390px"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewImage(tip.image);
                            }}
                            className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#faf8f5]/95 text-[#38432a] flex items-center justify-center shadow-md hover:bg-[#38432a] hover:text-white"
                            title="Ver ampliado"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-4 bg-gradient-to-b from-[#faf8f5] to-[#f8f5ee]">
                          <h5 className="font-brand font-bold text-xs sm:text-sm text-[#38432a] mb-1.5">
                            {tip.title}
                          </h5>
                          <p className="font-editorial italic text-xs text-[#5d6650] leading-relaxed">
                            &ldquo;{tip.quote}&rdquo;
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botão de contato direto via WhatsApp para projeto corporativo */}
                <div className="text-center pt-4">
                  <a
                    href={getWhatsAppUrl(
                      'Olá Arley! Gostaria de conversar sobre a Assinatura Floral Corporativa da AB Flores para minha empresa/consultório.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#38432a] hover:bg-[#748a54] transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#c29d59]" />
                    <span>Solicitar Proposta de Assinatura Corporativa ({DISPLAY_WHATSAPP_PHONE})</span>
                  </a>
                </div>
              </div>
            )}

            {/* SUBCATEGORIA 2: RESIDENCIAL (Acervo Completo — 36 Registros) */}
            {subscriptionSubCategory === 'residencial' && (
              <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300">
                {/* Cabeçalho da Subcategoria Residencial */}
                <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-10 border border-[#748a54]/25 shadow-xs">
                  <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#748a54]/15 text-[#38432a] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-[#c29d59]" />
                      Curadoria Botânica para Casas & Apartamentos
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#38432a] mb-3">
                      Assinatura Floral Residencial
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5d6650] leading-relaxed max-w-2xl mx-auto mb-6">
                      Flores frescas e selecionadas entregues periodicamente no conforto do seu lar. Arranjos autorais
                      desenvolvidos com a assinatura estética de Arley Borges para ambientar salas de estar, mesas de centro,
                      halls de entrada, lavabos e varandas com vista mar.
                    </p>

                    {/* Destaques do Serviço */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-[#38432a]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#e8e3d7]/60 border border-[#748a54]/20 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#748a54]" />
                        Entregas periódicas programadas
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#e8e3d7]/60 border border-[#748a54]/20 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#748a54]" />
                        Vasos & cristais higienizados inclusos
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#e8e3d7]/60 border border-[#748a54]/20 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#748a54]" />
                        Curadoria exclusiva por Arley Borges
                      </span>
                    </div>
                  </div>
                </div>

                {isResExpanded && (
                  <SubcategoryFilterBar
                    categories={RESIDENTIAL_SUBCATEGORIES}
                    counts={resCounts}
                    activeId={resSubCategory}
                    onSelect={setResSubCategory}
                    ariaLabel="Filtrar Assinatura Residencial por subcategoria"
                  />
                )}

                {/* Grade de Imagens Residencial (Computador: 3 colunas | Celular: 2 colunas) */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
                  {displayedResidentialItems.map((item, index) => (
                    <article
                      key={item.id}
                      className="group bg-[#faf8f5] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#748a54]/20 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
                      onClick={() => setPreviewImage(item.image)}
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e3d7]">
                        <OptimizedImage
                          src={item.image}
                          alt={item.title || `Assinatura Floral Residencial ${index + 1}`}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 46vw, 390px"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Tag de identificação do ambiente / estilo */}
                        <span className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-[#38432a]/90 text-[#faf8f5] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs backdrop-blur-xs">
                          {item.badge}
                        </span>

                        {/* Botão de ampliar fotografia */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(item.image);
                          }}
                          className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#faf8f5]/95 hover:bg-[#38432a] hover:text-white text-[#38432a] flex items-center justify-center shadow-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
                          title="Ampliar fotografia"
                          aria-label={`Ampliar fotografia ${item.title}`}
                        >
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      {/* Descrições e detalhes do arranjo */}
                      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#faf8f5] to-[#f8f5ee]">
                        <div>
                          <h4 className="font-editorial font-bold text-xs sm:text-sm text-[#38432a] mb-1.5 leading-snug line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-[#5d6650] leading-relaxed line-clamp-3">
                            {item.caption}
                          </p>
                        </div>
                        {item.details && (
                          <div className="pt-2 sm:pt-2.5 mt-2 border-t border-[#748a54]/15">
                            <span className="text-[9px] sm:text-[10px] text-[#748a54] font-medium leading-snug line-clamp-1 block">
                              {item.details}
                            </span>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                {/* Botão Centralizado "VER MAIS" / "VER MENOS" para Assinatura Residencial */}
                {RESIDENTIAL_SUBSCRIPTION_ITEMS.length > 6 && (
                  <div className="mt-8 sm:mt-10 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        const willExpand = !isResExpanded;
                        setIsResExpanded(willExpand);
                        if (!willExpand) {
                          setResSubCategory('todos');
                          document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white bg-[#38432a] hover:bg-[#748a54] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-102 active:scale-98 cursor-pointer group"
                      aria-label={isResExpanded ? 'Recolher registros residenciais' : 'Ver mais registros residenciais'}
                    >
                      <span>{isResExpanded ? 'Ver menos' : 'Ver mais'}</span>
                      {isResExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#c29d59] group-hover:-translate-y-0.5 transition-transform" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-[#c29d59] group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                    <p className="text-xs text-[#5d6650] mt-3">
                      {isResExpanded
                        ? resSubCategory === 'todos'
                          ? `Exibindo todas as ${RESIDENTIAL_SUBSCRIPTION_ITEMS.length} composições residenciais.`
                          : `Exibindo ${displayedResidentialItems.length} de ${RESIDENTIAL_SUBSCRIPTION_ITEMS.length} composições residenciais.`
                        : `Exibindo 6 de ${RESIDENTIAL_SUBSCRIPTION_ITEMS.length} composições residenciais.`}
                    </p>
                  </div>
                )}

                {/* Botão de contato direto via WhatsApp para projeto residencial */}
                <div className="text-center pt-4 sm:pt-6">
                  <a
                    href={getWhatsAppUrl(
                      'Olá Arley! Gostaria de solicitar uma proposta para a Assinatura Floral Residencial da AB Flores para minha residência.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#38432a] hover:bg-[#748a54] transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#c29d59]" />
                    <span>Solicitar Proposta de Assinatura Residencial ({DISPLAY_WHATSAPP_PHONE})</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3: EVENTOS (Cenografia Floral Autoral — 26 Trabalhos)
           ========================================================================= */}
        {activeMainTab === 'eventos' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Header explicativo da categoria Eventos */}
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#748a54] block mb-2">
                Cenografia Floral Autoral
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#38432a] mb-4">
                Eventos & Celebrações Especiais
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#5d6650] leading-relaxed">
                Da intimidade de um jantar comemorativo a produções monumentais de 15 anos e casamentos na praia.
                Cenografias florais exclusivas assinadas por Arley Borges que contam histórias e transformam momentos em memórias.
              </p>
            </div>

            {isEventsExpanded && (
              <SubcategoryFilterBar
                categories={EVENTS_SUBCATEGORIES}
                counts={eventsCounts}
                activeId={eventsSubCategory}
                onSelect={setEventsSubCategory}
                ariaLabel="Filtrar Eventos por subcategoria"
              />
            )}

            {/* Grade de Imagens dos Eventos: 3 colunas no desktop, 2 colunas no celular */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
              {displayedEventsItems.map((item, index) => (
                <article
                  key={item.id}
                  className="group bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#748a54]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  onClick={() => setPreviewImage(item.image)}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e3d7]">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title || `Cenografia Floral para Evento ${index + 1}`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 46vw, 390px"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge da categoria no topo */}
                    <span className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-[#38432a]/90 text-[#faf8f5] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs backdrop-blur-xs">
                      {item.badge}
                    </span>

                    {/* Botão de ampliar fotografia */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage(item.image);
                      }}
                      className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#faf8f5]/95 hover:bg-[#38432a] hover:text-white text-[#38432a] flex items-center justify-center shadow-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
                      title="Ampliar fotografia"
                      aria-label={`Ampliar fotografia de ${item.title}`}
                    >
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#faf8f5] to-[#f8f5ee]">
                    <div>
                      <h4 className="font-brand font-bold text-xs sm:text-base text-[#38432a] group-hover:text-[#748a54] transition-colors leading-snug mb-1.5 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#5d6650] leading-relaxed line-clamp-3 mb-2">
                        {item.caption}
                      </p>
                    </div>

                    {item.details && (
                      <div className="pt-2.5 border-t border-[#748a54]/15 text-[10px] sm:text-[11px] text-[#748a54] line-clamp-1">
                        <span className="font-semibold text-[#38432a]">Destaque: </span>
                        {item.details}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Botão Centralizado "VER MAIS" / "VER MENOS" para Eventos */}
            {EVENT_PROJECTS_ITEMS.length > 6 && (
              <div className="mt-8 sm:mt-10 text-center">
                <button
                  type="button"
                  onClick={() => {
                    const willExpand = !isEventsExpanded;
                    setIsEventsExpanded(willExpand);
                    if (!willExpand) {
                      setEventsSubCategory('todos');
                      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white bg-[#38432a] hover:bg-[#748a54] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-102 active:scale-98 cursor-pointer group"
                  aria-label={isEventsExpanded ? 'Recolher projetos de eventos' : 'Ver mais projetos de eventos'}
                >
                  <span>{isEventsExpanded ? 'Ver menos' : 'Ver mais'}</span>
                  {isEventsExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#c29d59] group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#c29d59] group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
                <p className="text-xs text-[#5d6650] mt-3">
                  {isEventsExpanded
                    ? eventsSubCategory === 'todos'
                      ? `Exibindo todos os ${EVENT_PROJECTS_ITEMS.length} projetos de eventos.`
                      : `Exibindo ${displayedEventsItems.length} de ${EVENT_PROJECTS_ITEMS.length} projetos de eventos.`
                    : `Exibindo 6 de ${EVENT_PROJECTS_ITEMS.length} projetos de eventos.`}
                </p>
              </div>
            )}

            {/* Pilares dos Projetos de Eventos */}
            <div className="bg-[#f5f1e8] rounded-3xl p-6 sm:p-10 border border-[#748a54]/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                <div className="bg-[#faf8f5] rounded-2xl p-6 border border-[#748a54]/20 shadow-xs">
                  <h5 className="font-brand font-bold text-base text-[#38432a] mb-2">
                    Casamentos & Noivados
                  </h5>
                  <p className="text-xs text-[#5d6650] leading-relaxed mb-3">
                    Cerimônias na praia e em salões nobres, buquê de noiva artesanal, arcos esculturais e mesas de doces nupciais.
                  </p>
                  <span className="text-[10px] font-semibold text-[#748a54] uppercase tracking-wider block">
                    Curadoria Autoral
                  </span>
                </div>

                <div className="bg-[#faf8f5] rounded-2xl p-6 border border-[#748a54]/20 shadow-xs">
                  <h5 className="font-brand font-bold text-base text-[#38432a] mb-2">
                    15 Anos & Celebrações
                  </h5>
                  <p className="text-xs text-[#5d6650] leading-relaxed mb-3">
                    Cenografias temáticas vibrantes, como Tropical Chic, bolos monumentais, lustres e flores suspensas.
                  </p>
                  <span className="text-[10px] font-semibold text-[#748a54] uppercase tracking-wider block">
                    Design Exclusivo
                  </span>
                </div>

                <div className="bg-[#faf8f5] rounded-2xl p-6 border border-[#748a54]/20 shadow-xs">
                  <h5 className="font-brand font-bold text-base text-[#38432a] mb-2">
                    Jantares & Mesas Postas
                  </h5>
                  <p className="text-xs text-[#5d6650] leading-relaxed mb-3">
                    Centros de mesa refinados, harmonia com louças finas, taças coloridas e luz de velas para momentos inesquecíveis.
                  </p>
                  <span className="text-[10px] font-semibold text-[#748a54] uppercase tracking-wider block">
                    Produção Arley Borges
                  </span>
                </div>
              </div>

              {/* Botão de contato direto via WhatsApp para orçamentos de eventos */}
              <div className="text-center">
                <a
                  href={getWhatsAppUrl(
                    'Olá Arley! Gostaria de conversar sobre a cenografia floral para um evento especial com a AB Flores.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#38432a] hover:bg-[#748a54] transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#c29d59]" />
                  <span>Conversar com Arley Borges sobre seu Evento ({DISPLAY_WHATSAPP_PHONE})</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox / Zoom Modal para fotos corporativas */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-transparent flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar visualização"
            >
              <X className="w-6 h-6" />
            </button>
            <OptimizedImage
              src={previewImage}
              alt="Visualização ampliada do arranjo"
              className="max-h-[82vh] w-auto object-contain rounded-xl shadow-2xl"
              variant="lightbox"
              sizes="(max-width: 768px) 95vw, 850px"
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
