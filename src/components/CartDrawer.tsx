import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getCartWhatsAppUrl, DISPLAY_WHATSAPP_PHONE } from '../utils/whatsapp';
import { OptimizedImage } from './OptimizedImage';
import { acquireBodyScrollLock } from '../utils/scrollLock';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  ArrowRight,
  Info,
} from 'lucide-react';

interface CartDrawerProps {
  onNavigateToCatalog?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateToCatalog }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    formattedTotalText,
    hasConsultationItems,
    customerName,
    setCustomerName,
  } = useCart();

  // Close on Escape key (topmost layer only) and lock background scroll via ref-count
  useEffect(() => {
    if (!isCartOpen) return;
    return acquireBodyScrollLock();
  }, [isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  // Prepare order items for WhatsApp helper
  const orderLineItems = cart.map((item) => {
    const unitPrice =
      typeof item.product.price === 'number' && item.product.price > 0
        ? `R$ ${item.product.price.toFixed(2).replace('.', ',')}`
        : 'Preço a consultar';

    const subtotal =
      typeof item.product.price === 'number' && item.product.price > 0
        ? `R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}`
        : 'Preço a consultar';

    return {
      name: item.product.name,
      quantity: item.quantity,
      unitPriceText: unitPrice,
      subtotalText: subtotal,
    };
  });

  const whatsappOrderUrl = getCartWhatsAppUrl(
    orderLineItems,
    formattedTotalText,
    customerName
  );

  const handleContinueShopping = () => {
    closeCart();
    if (onNavigateToCatalog) {
      onNavigateToCatalog();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div className="fixed inset-y-0 right-0 flex justify-end w-full h-dvh max-h-full pl-3 sm:pl-6 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md h-full max-h-dvh bg-[#faf8f5] shadow-2xl border-l border-[#748a54]/25 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 px-4 py-3.5 sm:px-6 sm:py-5 border-b border-[#748a54]/20 bg-[#f5f1e8]/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#38432a] text-[#faf8f5] flex items-center justify-center shadow-xs shrink-0">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#c29d59]" />
              </div>
              <div className="min-w-0">
                <h2 id="cart-title" className="font-brand font-bold text-base sm:text-lg text-[#38432a] truncate">
                  Seu Carrinho
                </h2>
                <p className="text-[11px] sm:text-xs text-[#748a54] font-medium truncate">
                  {totalItems === 0
                    ? 'Nenhum item selecionado'
                    : totalItems === 1
                    ? '1 criação selecionada'
                    : `${totalItems} criações selecionadas`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="w-9 h-9 rounded-full bg-[#faf8f5] hover:bg-[#e8e3d7] text-[#38432a] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items or Empty State */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-3.5 sm:px-6 sm:py-4 space-y-3 sm:space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 sm:py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#e8e3d7]/60 text-[#748a54] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h3 className="font-brand font-bold text-lg text-[#38432a] mb-2">
                  Seu carrinho está vazio
                </h3>
                <p className="text-xs text-[#5d6650] leading-relaxed max-w-xs mx-auto mb-6">
                  Selecione buquês, boxes e arranjos exclusivos do ateliê AB Flores para presentear ou decorar.
                </p>
                <button
                  type="button"
                  onClick={handleContinueShopping}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#38432a] hover:bg-[#748a54] transition-all shadow-sm cursor-pointer"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-3.5 pb-1">
                {cart.map((item) => {
                  const unitPriceText =
                    typeof item.product.price === 'number' && item.product.price > 0
                      ? `R$ ${item.product.price.toFixed(2).replace('.', ',')}`
                      : 'Preço a consultar';

                  const itemSubtotal =
                    typeof item.product.price === 'number' && item.product.price > 0
                      ? `R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}`
                      : 'A consultar';

                  return (
                    <div
                      key={item.product.id}
                      className="bg-[#faf8f5] p-3 sm:p-3.5 rounded-2xl border border-[#748a54]/20 shadow-2xs flex gap-3 sm:gap-3.5 items-center"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-16 h-18 sm:w-18 sm:h-20 rounded-xl overflow-hidden bg-[#e8e3d7] shrink-0 border border-[#748a54]/15">
                        <OptimizedImage
                          src={item.product.image}
                          alt={item.product.name}
                          variant="thumb"
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-brand font-bold text-xs sm:text-sm text-[#38432a] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#5d6650] hover:text-[#b8222b] p-1 transition-colors cursor-pointer shrink-0"
                            title="Remover produto do carrinho"
                            aria-label={`Remover ${item.product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-[11px] text-[#748a54] mt-0.5 mb-2">
                          <span>Unitário: {unitPriceText}</span>
                        </div>

                        {/* Quantity Counter & Subtotal */}
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#748a54]/10">
                          <div className="flex items-center gap-1 sm:gap-1.5 bg-[#f5f1e8] rounded-lg p-0.5 border border-[#748a54]/20 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#38432a] hover:bg-[#faf8f5] transition-colors cursor-pointer"
                              aria-label={`Diminuir quantidade de ${item.product.name}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-[#38432a] tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#38432a] hover:bg-[#faf8f5] transition-colors cursor-pointer"
                              aria-label={`Aumentar quantidade de ${item.product.name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right min-w-0">
                            <span className="text-[10px] text-[#5d6650] block">Subtotal</span>
                            <span className="font-brand font-bold text-xs sm:text-sm text-[#38432a] tabular-nums">
                              {itemSubtotal}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] text-[#5d6650] hover:text-[#b8222b] transition-colors cursor-pointer"
                  >
                    Esvaziar carrinho
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer: Order Summary & WhatsApp Checkout */}
          {cart.length > 0 && (
            <div className="shrink-0 max-h-[55dvh] sm:max-h-none overflow-y-auto overscroll-contain px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-6 sm:pt-5 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-[#748a54]/20 bg-[#f5f1e8]/95 space-y-2.5 sm:space-y-4 shadow-[0_-4px_16px_rgba(31,37,24,0.06)]">
              {/* Customer Name Input */}
              <div>
                <label
                  htmlFor="customer-name-input"
                  className="block text-[11px] sm:text-xs font-semibold text-[#38432a] mb-1 sm:mb-1.5"
                >
                  Seu nome (para atendimento personalizado)
                </label>
                <input
                  id="customer-name-input"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Ana Beatriz Cavalcante"
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#faf8f5] border border-[#748a54]/25 text-xs text-[#38432a] placeholder-[#5d6650]/60 focus:outline-none focus:ring-2 focus:ring-[#748a54]"
                />
              </div>

              {/* Consultation Note if needed */}
              {hasConsultationItems && (
                <div className="flex items-start gap-2 p-2 sm:p-2.5 rounded-xl bg-[#faf8f5] border border-[#748a54]/20 text-[10px] sm:text-[11px] text-[#5d6650]">
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#748a54] shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    Itens com preço a consultar terão valores e opções de personalização informados diretamente pelo Sr. Arley.
                  </p>
                </div>
              )}

              {/* Total Row */}
              <div className="flex items-baseline justify-between gap-2 pt-1.5 sm:pt-2 border-t border-[#748a54]/15">
                <div className="shrink-0">
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#5d6650] block">
                    Total do Pedido
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#748a54]">
                    ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                  </span>
                </div>
                <span className="font-brand font-bold text-base sm:text-2xl text-[#38432a] tabular-nums text-right leading-tight">
                  {formattedTotalText}
                </span>
              </div>

              {/* WhatsApp Checkout CTA */}
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#38432a] hover:bg-[#748a54] transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Finalizar pedido pelo WhatsApp</span>
              </a>

              <p className="text-[10px] sm:text-[11px] text-center text-[#5d6650]">
                Atendimento humano oficial com Sr. Arley Borges: {DISPLAY_WHATSAPP_PHONE}
              </p>

              <button
                type="button"
                onClick={handleContinueShopping}
                className="w-full text-center text-[11px] sm:text-xs font-semibold text-[#5d6650] hover:text-[#38432a] transition-colors py-0.5 sm:py-1 cursor-pointer"
              >
                Continuar escolhendo produtos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
