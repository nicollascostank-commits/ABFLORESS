import React, { useState, useEffect } from 'react';
import { OfficialLogo } from './OfficialLogo';
import { Menu, X, MessageCircle, ShoppingBag } from 'lucide-react';
import { getWhatsAppUrl, DISPLAY_WHATSAPP_PHONE } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import { acquireBodyScrollLock } from '../utils/scrollLock';

interface HeaderProps {
  isVitrinesPage?: boolean;
  onNavigateToCatalog?: (categoryId?: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
  onNavigateToVitrines?: () => void;
  onOpenFullCatalog?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isVitrinesPage = false,
  onNavigateToCatalog,
  onNavigateToSection,
  onNavigateToVitrines,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, totalItems, isCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    return acquireBodyScrollLock();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen || isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isMobileMenuOpen, isCartOpen]);

  const useSolidStyle = isScrolled || isVitrinesPage;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (targetId === 'catalogo' && onNavigateToCatalog) {
      onNavigateToCatalog('buques-boxes');
      return;
    }

    if (targetId === 'assinaturas' && onNavigateToCatalog) {
      onNavigateToCatalog('assinaturas');
      return;
    }

    if (onNavigateToSection) {
      onNavigateToSection(targetId);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleVitrinesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onNavigateToVitrines) {
      onNavigateToVitrines();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          useSolidStyle
            ? 'bg-[#faf8f5]/95 backdrop-blur-md shadow-md border-b border-[#748a54]/20 py-3.5'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 xl:gap-8">
            {/* Zone 1: Brand Wordmark / Official Logo */}
            <a
              href="/#hero"
              onClick={(e) => handleLinkClick(e, 'hero')}
              className="group flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54] rounded"
              aria-label="AB Flores & Decoração - Voltar ao início"
            >
              <OfficialLogo variant={useSolidStyle ? 'dark' : 'light'} size="md" />
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav
              className={`hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium transition-colors duration-300 ${
                useSolidStyle ? 'text-[#38432a]' : 'text-[#faf8f5]'
              }`}
              aria-label="Navegação Principal"
            >
              <a
                href="/#hero"
                onClick={(e) => handleLinkClick(e, 'hero')}
                className="relative py-1 hover:text-[#c29d59] transition-colors whitespace-nowrap shrink-0 group"
              >
                Início
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c29d59] transition-all duration-300 group-hover:w-full" />
              </a>

              <a
                href="/#catalogo"
                onClick={(e) => handleLinkClick(e, 'catalogo')}
                className="relative py-1 hover:text-[#c29d59] transition-colors whitespace-nowrap shrink-0 group"
              >
                Catálogo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c29d59] transition-all duration-300 group-hover:w-full" />
              </a>

              <a
                href="/#assinaturas"
                onClick={(e) => handleLinkClick(e, 'assinaturas')}
                className="relative py-1 hover:text-[#c29d59] transition-colors whitespace-nowrap shrink-0 group"
              >
                Assinatura Floral
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c29d59] transition-all duration-300 group-hover:w-full" />
              </a>

              <a
                href="/#arley"
                onClick={(e) => handleLinkClick(e, 'arley')}
                className="relative py-1 hover:text-[#c29d59] transition-colors whitespace-nowrap shrink-0 group"
              >
                Sobre Arley
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c29d59] transition-all duration-300 group-hover:w-full" />
              </a>

              <a
                href="/#galeria"
                onClick={(e) => handleLinkClick(e, 'galeria')}
                className="relative py-1 hover:text-[#c29d59] transition-colors whitespace-nowrap shrink-0 group"
              >
                Galeria
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c29d59] transition-all duration-300 group-hover:w-full" />
              </a>

              <a
                href="/vitrines-inspiracoes"
                onClick={handleVitrinesClick}
                className={`relative py-1 hover:text-[#c29d59] transition-colors whitespace-nowrap shrink-0 group ${
                  isVitrinesPage ? 'text-[#c29d59]' : ''
                }`}
              >
                Vitrines & Inspirações
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#c29d59] transition-all duration-300 ${
                    isVitrinesPage ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>

              <a
                href="/#contato"
                onClick={(e) => handleLinkClick(e, 'contato')}
                className="relative py-1 hover:text-[#c29d59] transition-colors whitespace-nowrap shrink-0 group"
              >
                Contato
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c29d59] transition-all duration-300 group-hover:w-full" />
              </a>
            </nav>

            {/* Zone 3: Primary Action, Cart Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={openCart}
                className={`relative inline-flex items-center gap-2 px-3 sm:px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer ${
                  useSolidStyle
                    ? 'text-[#38432a] bg-[#e8e3d7]/70 hover:bg-[#e8e3d7]'
                    : 'text-[#faf8f5] bg-white/20 hover:bg-white/30 backdrop-blur-xs'
                }`}
                aria-label={`Ver carrinho com ${totalItems} itens`}
              >
                <ShoppingBag className="w-4 h-4 text-[#c29d59]" />
                <span className="hidden xl:inline">Carrinho</span>
                {totalItems > 0 && (
                  <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold bg-[#c29d59] text-[#1f2518]">
                    {totalItems}
                  </span>
                )}
              </button>

              <a
                href={getWhatsAppUrl('Olá! Vim pelo site da AB Flores e gostaria de conhecer as opções disponíveis.')}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden sm:inline-flex items-center gap-2 px-3.5 xl:px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0 ${
                  useSolidStyle
                    ? 'text-[#faf8f5] bg-[#38432a] hover:bg-[#748a54]'
                    : 'text-[#1f2518] bg-[#faf8f5] hover:bg-[#e8e3d7]'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp ({DISPLAY_WHATSAPP_PHONE})</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54] ${
                  useSolidStyle ? 'text-[#38432a] hover:bg-[#e8e3d7]/50' : 'text-[#faf8f5] hover:bg-white/20'
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        >
          <div
            className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-[#faf8f5] border-l border-[#748a54]/20 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#748a54]/20">
                <OfficialLogo variant="dark" size="sm" />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded text-[#38432a] hover:bg-[#e8e3d7]"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-3 pt-6 text-base font-medium text-[#38432a]" aria-label="Navegação Mobile">
                <a
                  href="/#hero"
                  onClick={(e) => handleLinkClick(e, 'hero')}
                  className="py-2.5 px-3 rounded hover:bg-[#e8e3d7]/60 transition-colors"
                >
                  Início
                </a>
                <a
                  href="/#catalogo"
                  onClick={(e) => handleLinkClick(e, 'catalogo')}
                  className="py-2.5 px-3 rounded hover:bg-[#e8e3d7]/60 transition-colors"
                >
                  Catálogo de Criações
                </a>
                <a
                  href="/#assinaturas"
                  onClick={(e) => handleLinkClick(e, 'assinaturas')}
                  className="py-2.5 px-3 rounded hover:bg-[#e8e3d7]/60 transition-colors"
                >
                  Assinatura Floral
                </a>
                <a
                  href="/#arley"
                  onClick={(e) => handleLinkClick(e, 'arley')}
                  className="py-2.5 px-3 rounded hover:bg-[#e8e3d7]/60 transition-colors"
                >
                  Sobre Arley Borges
                </a>
                <a
                  href="/#galeria"
                  onClick={(e) => handleLinkClick(e, 'galeria')}
                  className="py-2.5 px-3 rounded hover:bg-[#e8e3d7]/60 transition-colors"
                >
                  Galeria de Trabalhos
                </a>
                <a
                  href="/vitrines-inspiracoes"
                  onClick={handleVitrinesClick}
                  className={`py-2.5 px-3 rounded transition-colors ${
                    isVitrinesPage
                      ? 'bg-[#e8e3d7] text-[#38432a] font-semibold'
                      : 'hover:bg-[#e8e3d7]/60'
                  }`}
                >
                  Vitrines & Inspirações
                </a>
                <a
                  href="/#contato"
                  onClick={(e) => handleLinkClick(e, 'contato')}
                  className="py-2.5 px-3 rounded hover:bg-[#e8e3d7]/60 transition-colors"
                >
                  Contato & Atendimento
                </a>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#748a54]/20 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCart();
                }}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-[#38432a] bg-[#e8e3d7] hover:bg-[#e8e3d7]/80 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#748a54]" />
                <span>Ver Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
              </button>

              <a
                href={getWhatsAppUrl('Olá! Gostaria de fazer um pedido na AB Flores & Decoração.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-[#38432a] hover:bg-[#748a54] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir no WhatsApp ({DISPLAY_WHATSAPP_PHONE})</span>
              </a>
              <p className="text-center text-xs text-[#5d6650]">
                Fortaleza, Ceará · Instagram: <span className="font-semibold">@abfloress</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

