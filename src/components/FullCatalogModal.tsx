import React, { useState, useMemo, useEffect } from 'react';
import {
  PRODUCTS_DATA,
  Product,
  CATALOG_CATEGORIES_CONFIG,
  CatalogCategory,
  BUQUES_BOXES_SUBCATEGORIES,
} from '../data/products';
import { BOX_FLOWERS_PRODUCTS, BOX_FLOWERS_SUBCATEGORIES } from '../data/boxFlowers';
import { useCart } from '../context/CartContext';
import { ProductDetailModal } from './ProductDetailModal';
import { OfficialLogo } from './OfficialLogo';
import { OptimizedImage } from './OptimizedImage';
import { SubcategoryFilterBar } from './SubcategoryFilterBar';
import { acquireBodyScrollLock } from '../utils/scrollLock';
import {
  ArrowLeft,
  Search,
  ShoppingBag,
  Eye,
  Check,
  Sparkles,
} from 'lucide-react';

interface FullCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: CatalogCategory;
}

const ALL_CATALOG_PRODUCTS: Product[] = [...PRODUCTS_DATA, ...BOX_FLOWERS_PRODUCTS];

// Em "Todos", evita exibir fotografias repetidas entre Presentes e Box Flowers, mantendo as criações canônicas de Box Flowers
const UNIQUE_CATALOG_PRODUCTS: Product[] = (() => {
  const canonicalImages = new Set(BOX_FLOWERS_PRODUCTS.map((p) => p.image));
  const seenImages = new Set<string>();
  const unique: Product[] = [];

  for (const product of ALL_CATALOG_PRODUCTS) {
    if (product.catalogCategory !== 'box-flowers' && canonicalImages.has(product.image)) {
      continue;
    }
    if (seenImages.has(product.image)) {
      continue;
    }
    seenImages.add(product.image);
    unique.push(product);
  }

  return unique;
})();

export const FullCatalogModal: React.FC<FullCatalogModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'todos',
}) => {
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>(initialCategory);
  const [activeSubCategory, setActiveSubCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const { addToCart, totalItems, openCart, isCartOpen } = useCart();

  // Reset category on open and lock background scroll cleanly via ref-count
  useEffect(() => {
    if (!isOpen) return;
    setActiveCategory(initialCategory || 'todos');
    setActiveSubCategory('todos');
    return acquireBodyScrollLock();
  }, [isOpen, initialCategory]);

  // Handle ESC key only when this modal is the topmost open layer
  useEffect(() => {
    if (!isOpen || selectedProduct || isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isOpen, onClose, selectedProduct, isCartOpen]);

  const availableSubCategories = useMemo(() => {
    if (activeCategory === 'box-flowers') return BOX_FLOWERS_SUBCATEGORIES;
    if (activeCategory === 'buques' || activeCategory === 'boxes-florais' || activeCategory === 'presentes') {
      return BUQUES_BOXES_SUBCATEGORIES;
    }
    return null;
  }, [activeCategory]);

  const categorySourceProducts = useMemo(() => {
    if (activeCategory === 'todos') {
      return UNIQUE_CATALOG_PRODUCTS;
    }
    return ALL_CATALOG_PRODUCTS.filter((p) => p.catalogCategory === activeCategory);
  }, [activeCategory]);

  const subCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: categorySourceProducts.length };
    for (const p of categorySourceProducts) {
      if (p.subCategory) {
        counts[p.subCategory] = (counts[p.subCategory] ?? 0) + 1;
      }
    }
    return counts;
  }, [categorySourceProducts]);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return categorySourceProducts.filter((product) => {
      const matchesSubCategory =
        activeSubCategory === 'todos' || product.subCategory === activeSubCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        (product.components ? product.components.toLowerCase().includes(q) : false) ||
        (product.badge ? product.badge.toLowerCase().includes(q) : false);

      return matchesSubCategory && matchesSearch;
    });
  }, [categorySourceProducts, activeSubCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CatalogCategory, number> = {
      todos: UNIQUE_CATALOG_PRODUCTS.length,
      buques: 0,
      'boxes-florais': 0,
      arranjos: 0,
      presentes: 0,
      'box-flowers': 0,
    };
    ALL_CATALOG_PRODUCTS.forEach((p) => {
      if (counts[p.catalogCategory] !== undefined) {
        counts[p.catalogCategory]++;
      }
    });
    return counts;
  }, []);

  if (!isOpen) return null;

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1800);
  };

  const currentCategoryMeta = CATALOG_CATEGORIES_CONFIG.find(
    (c) => c.id === activeCategory
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-[#faf8f5] overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Catálogo Completo de Criações da AB Flores"
    >
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#748a54]/20 shadow-xs py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#38432a] hover:bg-[#e8e3d7]/60 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#748a54] group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Voltar ao Início</span>
            <span className="sm:hidden">Voltar</span>
          </button>

          {/* Center Logo */}
          <div className="flex items-center">
            <OfficialLogo variant="dark" size="sm" />
          </div>

          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#faf8f5] bg-[#38432a] hover:bg-[#748a54] transition-all shadow-xs cursor-pointer"
            aria-label={`Ver carrinho com ${totalItems} itens`}
          >
            <ShoppingBag className="w-4 h-4 text-[#c29d59]" />
            <span className="hidden sm:inline">Carrinho</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold bg-[#c29d59] text-[#1f2518]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Banner inside Catalog */}
      <div className="bg-gradient-to-b from-[#f5f1e8] to-[#faf8f5] py-10 sm:py-14 border-b border-[#748a54]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#748a54] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c29d59]" />
            <span>Coleção Completa de Criações Autorais</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#38432a] mb-4">
            Catálogo Oficial AB Flores
          </h1>
          <p className="text-xs sm:text-sm text-[#5d6650] max-w-2xl mx-auto leading-relaxed">
            Navegue por todas as categorias e selecione os arranjos produzidos no ateliê em Fortaleza.
            Adicione ao carrinho e finalize seu pedido diretamente pelo WhatsApp com o Sr. Arley.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation Bar inspired by Alexa Flores (Category pills + instant search) */}
        <div className="bg-[#f5f1e8] p-4 sm:p-5 rounded-2xl border border-[#748a54]/20 mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" role="tablist">
            {CATALOG_CATEGORIES_CONFIG.map((cat) => {
              const count = categoryCounts[cat.id] ?? 0;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveSubCategory('todos');
                  }}
                  role="tab"
                  aria-selected={isActive}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#38432a] text-[#faf8f5] shadow-xs'
                      : 'bg-[#faf8f5] text-[#38432a] hover:bg-[#e8e3d7]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`ml-1.5 text-[11px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#c29d59]/30 text-[#faf8f5]' : 'bg-[#748a54]/15 text-[#5d6650]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {availableSubCategories && (
            <div className="pt-2 border-t border-[#748a54]/10 [&>div]:mb-0">
              <SubcategoryFilterBar
                categories={availableSubCategories}
                counts={subCategoryCounts}
                activeId={activeSubCategory}
                onSelect={setActiveSubCategory}
                ariaLabel="Filtrar por subcategoria no catálogo completo"
              />
            </div>
          )}

          {/* Search Bar & Active Category Descriptor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#748a54]/15">
            <p className="text-xs text-[#5d6650]">
              <span className="font-semibold text-[#38432a]">{currentCategoryMeta?.name}: </span>
              {currentCategoryMeta?.description} · Exibindo{' '}
              <strong className="text-[#38432a]">{filteredProducts.length}</strong> criações
            </p>

            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5d6650]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por flor, estilo ou embalagem..."
                className="w-full pl-9 pr-8 py-2 bg-[#faf8f5] text-xs text-[#38432a] placeholder-[#5d6650]/70 rounded-xl border border-[#748a54]/25 focus:outline-none focus:ring-2 focus:ring-[#748a54]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#5d6650] hover:text-[#38432a]"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid: 2 columns on mobile, 3 columns on desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = justAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#748a54]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo with vertical 4/5 aspect ratio to preserve complete arrangements without cutoffs */}
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

                  {/* Card Content */}
                  <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#faf8f5] to-[#f8f5ee]">
                    <div>
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#748a54] mb-1">
                        <span>{product.categoryLabel}</span>
                      </div>

                      <h2
                        onClick={() => setSelectedProduct(product)}
                        className="font-brand font-bold text-xs sm:text-base text-[#38432a] group-hover:text-[#748a54] transition-colors leading-snug mb-1.5 sm:mb-2 cursor-pointer line-clamp-2"
                      >
                        {product.name}
                      </h2>

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
                        onClick={() => handleAddToCart(product)}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all shadow-xs hover:shadow active:scale-98 cursor-pointer ${
                          isAdded
                            ? 'bg-[#748a54] text-white'
                            : 'bg-[#38432a] hover:bg-[#748a54] text-white'
                        }`}
                        title="Adicionar produto ao carrinho"
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
        ) : (
          <div className="text-center py-16 bg-[#f5f1e8] rounded-2xl border border-[#748a54]/20 p-8">
            <Search className="w-8 h-8 text-[#748a54] mx-auto mb-3 opacity-60" />
            <h3 className="font-brand font-bold text-base text-[#38432a] mb-1">
              Nenhuma criação encontrada nesta categoria
            </h3>
            <p className="text-xs text-[#5d6650] mb-4">
              Tente buscar com outro termo ou selecionar a categoria &ldquo;Todos&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('todos');
                setActiveSubCategory('todos');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#38432a] text-white hover:bg-[#748a54] transition-colors cursor-pointer"
            >
              Exibir Todas as Criações
            </button>
          </div>
        )}

        {/* Bottom Return to Home CTA */}
        <div className="mt-14 pt-8 border-t border-[#748a54]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-brand font-bold text-base text-[#38432a]">
              Deseja um arranjo totalmente sob medida?
            </h4>
            <p className="text-xs text-[#5d6650]">
              O artista visual Arley Borges desenvolve projetos exclusivos para ocasiões especiais em Fortaleza.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#38432a] bg-[#e8e3d7]/60 hover:bg-[#e8e3d7] transition-colors cursor-pointer"
            >
              Voltar à Página Inicial
            </button>
            <button
              type="button"
              onClick={openCart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#38432a] hover:bg-[#748a54] transition-colors shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#c29d59]" />
              <span>Ver Carrinho ({totalItems})</span>
            </button>
          </div>
        </div>
      </main>

      {/* Quick View Modal inside Full Catalog */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
