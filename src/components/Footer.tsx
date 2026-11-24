import React from 'react';
import { OfficialLogo } from './OfficialLogo';
import { Instagram, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { getWhatsAppUrl, DISPLAY_WHATSAPP_PHONE } from '../utils/whatsapp';

interface FooterProps {
  onNavigateToCatalog?: (category?: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
  onNavigateToVitrines?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToCatalog,
  onNavigateToSection,
  onNavigateToVitrines,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (e: React.MouseEvent, catId: string) => {
    e.preventDefault();
    if (onNavigateToCatalog) {
      onNavigateToCatalog(catId);
      return;
    }
    const el = document.getElementById('catalogo');
    if (el) {
      const pos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - 80, behavior: 'smooth' });
    }
  };

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const pos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - 80, behavior: 'smooth' });
    }
  };

  const handleVitrinesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateToVitrines) {
      onNavigateToVitrines();
    }
  };

  return (
    <footer className="bg-[#242c1b] text-[#e8e3d7] pt-16 pb-10 border-t border-[#38432a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <OfficialLogo variant="light" size="lg" className="mb-5" />
            <p className="text-xs sm:text-sm text-[#e8e3d7]/80 leading-relaxed max-w-sm mb-6">
              Arte floral contemporânea e presente afetivo. Composições botânicas autorais criadas a partir do ciclo natural — da semente ao desabrochar da flor, sob direção criativa de Arley Borges.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/abfloress"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#748a54] text-[#faf8f5] flex items-center justify-center transition-colors"
                aria-label="Seguir @abfloress no Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl('Olá! Gostaria de falar com o atendimento da AB Flores & Decoração.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#748a54] text-[#faf8f5] flex items-center justify-center transition-colors"
                aria-label="Conversar pelo WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-3">
            <h4 className="font-brand font-bold text-xs uppercase tracking-[0.2em] text-[#faf8f5] mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-[#e8e3d7]/80">
              <li>
                <a
                  href="/#hero"
                  onClick={(e) => handleSectionClick(e, 'hero')}
                  className="hover:text-white transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/#manifesto"
                  onClick={(e) => handleSectionClick(e, 'manifesto')}
                  className="hover:text-white transition-colors"
                >
                  A Marca & Valores
                </a>
              </li>
              <li>
                <a
                  href="/#catalogo"
                  onClick={(e) => handleCategoryClick(e, 'buques-boxes')}
                  className="hover:text-white transition-colors"
                >
                  Buquês & Box Florais
                </a>
              </li>
              <li>
                <a
                  href="/#catalogo"
                  onClick={(e) => handleCategoryClick(e, 'assinaturas')}
                  className="hover:text-white transition-colors"
                >
                  Assinatura Floral
                </a>
              </li>
              <li>
                <a
                  href="/#arley"
                  onClick={(e) => handleSectionClick(e, 'arley')}
                  className="hover:text-white transition-colors"
                >
                  Sobre Arley Borges
                </a>
              </li>
              <li>
                <a
                  href="/#galeria"
                  onClick={(e) => handleSectionClick(e, 'galeria')}
                  className="hover:text-white transition-colors"
                >
                  Galeria de Trabalhos
                </a>
              </li>
              <li>
                <a
                  href="/vitrines-inspiracoes"
                  onClick={handleVitrinesClick}
                  className="hover:text-white transition-colors"
                >
                  Vitrines & Inspirações
                </a>
              </li>
              <li>
                <a
                  href="/#contato"
                  onClick={(e) => handleSectionClick(e, 'contato')}
                  className="hover:text-white transition-colors"
                >
                  Atendimento & Encomendas
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="font-brand font-bold text-xs uppercase tracking-[0.2em] text-[#faf8f5] mb-4">
              Coleções & Serviços
            </h4>
            <ul className="space-y-2.5 text-xs text-[#e8e3d7]/80">
              <li>
                <a
                  href="/#catalogo"
                  onClick={(e) => handleCategoryClick(e, 'buques-boxes')}
                  className="hover:text-white transition-colors"
                >
                  Buquês & Box para Presentear (31)
                </a>
              </li>
              <li>
                <a
                  href="/#catalogo"
                  onClick={(e) => handleCategoryClick(e, 'assinaturas')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Assinatura Floral</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#c29d59]">
                    Corporativo
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/#catalogo"
                  onClick={(e) => handleCategoryClick(e, 'eventos')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Decorações de Eventos</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#c29d59]">
                    Personalizado
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/#galeria"
                  onClick={(e) => handleSectionClick(e, 'galeria')}
                  className="hover:text-white transition-colors"
                >
                  Portfólio & Cenografia Floral
                </a>
              </li>
              <li>
                <a
                  href="/vitrines-inspiracoes"
                  onClick={handleVitrinesClick}
                  className="hover:text-white transition-colors"
                >
                  Vitrines & Inspirações
                </a>
              </li>
            </ul>
          </div>

          {/* Commercial & Contact info */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="font-brand font-bold text-xs uppercase tracking-[0.2em] text-[#faf8f5] mb-4">
                Atendimento
              </h4>
              <p className="text-xs text-[#e8e3d7]/80 leading-relaxed mb-2">
                WhatsApp Oficial:
              </p>
              <a
                href={getWhatsAppUrl('Olá! Vim pelo site da AB Flores.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#faf8f5] font-semibold hover:text-[#c29d59] transition-colors block mb-3"
              >
                {DISPLAY_WHATSAPP_PHONE}
              </a>
              <p className="text-xs text-[#748a54] font-medium">
                Instagram: @abfloress
              </p>
              <p className="text-[11px] text-[#e8e3d7]/60 mt-2">
                Fortaleza, Ceará
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 text-xs text-[#e8e3d7]/70 hover:text-white transition-colors self-start cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Voltar ao topo</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#e8e3d7]/60">
          <p>© 2026 AB Flores & Decoração. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Direção artística Arley de Souza Borges · Identidade Visual Oficial</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

