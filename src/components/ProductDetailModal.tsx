import React, { useEffect } from 'react';
import { Product } from '../data/products';
import { X, MessageCircle, Sparkles, PackageCheck, ShoppingBag } from 'lucide-react';
import { getProductWhatsAppUrl, DISPLAY_WHATSAPP_PHONE } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import { OptimizedImage } from './OptimizedImage';
import { acquireBodyScrollLock } from '../utils/scrollLock';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, isCartOpen } = useCart();

  useEffect(() => {
    if (!product) return;
    return acquireBodyScrollLock();
  }, [product]);

  useEffect(() => {
    if (!product || isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [product, isCartOpen, onClose]);

  if (!product) return null;

  const whatsappUrl =
    product.whatsAppUrl || getProductWhatsAppUrl(product.name, product.formattedPrice);

  const handleAddToCart = () => {
    onClose();
    addToCart(product, 1);
  };

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#faf8f5] rounded-2xl shadow-2xl overflow-hidden border border-[#748a54]/20 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#faf8f5]/90 hover:bg-[#e8e3d7] text-[#38432a] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54]"
          aria-label="Fechar detalhes do produto"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image: Enquadramento com contain para preservar o arranjo e embalagem inteiros sem cortes */}
        <div className="w-full md:w-1/2 relative bg-[#f5f1e8] shrink-0 min-h-[300px] md:min-h-[440px] flex items-center justify-center p-3">
          <OptimizedImage
            src={product.image}
            alt={product.name}
            variant="lightbox"
            sizes="(max-width: 768px) 90vw, 340px"
            className="w-full h-full max-h-[460px] object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-wider bg-[#38432a] text-[#faf8f5] px-2.5 py-1 rounded shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#748a54] uppercase tracking-wider mb-2">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>AB Flores Oficial</span>
            </div>

            <h3 id="modal-product-title" className="font-brand font-bold text-xl sm:text-2xl text-[#38432a] leading-tight mb-3">
              {product.name}
            </h3>

            {product.formattedPrice && (
              <div
                className={`mb-4 ${
                  product.formattedPrice !== 'Preço a consultar' &&
                  product.formattedPrice !== 'Preço sob consulta'
                    ? 'text-2xl font-bold font-brand text-[#38432a] tabular-nums'
                    : 'text-sm font-semibold uppercase tracking-wider text-[#748a54] bg-[#748a54]/10 inline-block px-3 py-1 rounded-full'
                }`}
              >
                {product.formattedPrice}
              </div>
            )}

            <p className="text-sm text-[#5d6650] leading-relaxed mb-6">
              {product.fullDescription || product.shortDescription}
            </p>

            {/* Botanical Composition */}
            <div className="bg-[#f5f1e8] p-4 rounded-xl border border-[#748a54]/15 mb-6 text-xs text-[#5d6650] flex flex-col gap-2.5">
              {product.components && (
                <>
                  <div className="flex items-center gap-2 font-semibold text-[#38432a]">
                    <Sparkles className="w-4 h-4 text-[#748a54]" />
                    <span>Composição & Detalhes:</span>
                  </div>
                  <p className="leading-relaxed pl-6">{product.components}</p>
                </>
              )}

              <div className="flex items-center gap-2 font-semibold text-[#38432a] mt-1">
                <PackageCheck className="w-4 h-4 text-[#748a54]" />
                <span>Embalagem & Acabamento:</span>
              </div>
              <p className="leading-relaxed pl-6">
                Montagem autoral do ateliê AB Flores com papéis nobres, fita personalizada e tag institucional para sua dedicatória.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer bg-[#38432a] hover:bg-[#748a54] text-white"
            >
              <ShoppingBag className="w-4 h-4 text-[#c29d59]" />
              <span>Adicionar ao Carrinho</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-xs font-semibold tracking-wide text-[#38432a] bg-[#e8e3d7]/60 hover:bg-[#e8e3d7] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#748a54]" />
              <span>
                {product.formattedPrice &&
                product.formattedPrice !== 'Preço a consultar' &&
                product.formattedPrice !== 'Preço sob consulta'
                  ? 'Comprar direto no WhatsApp'
                  : 'Consultar Valor no WhatsApp'}
              </span>
            </a>
            <p className="text-[11px] text-center text-[#5d6650] mt-1">
              Atendimento direto: WhatsApp {DISPLAY_WHATSAPP_PHONE}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
