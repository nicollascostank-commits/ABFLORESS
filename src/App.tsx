import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandManifesto } from './components/BrandManifesto';
import { CatalogSection } from './components/CatalogSection';
import { FullCatalogModal } from './components/FullCatalogModal';
import { CartDrawer } from './components/CartDrawer';
import { AboutArley } from './components/AboutArley';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { FounderSignature } from './components/FounderSignature';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { VitrinesPage } from './components/VitrinesPage';
import { VitrineHighlight } from './components/VitrineHighlight';
import { CartProvider } from './context/CartContext';

export type AppRoute =
  | { page: 'home' }
  | { page: 'vitrines'; slug: string | null };

export function parseRouteFromLocation(
  pathname: string = window.location.pathname,
  hash: string = window.location.hash
): AppRoute {
  let cleanPath = pathname.replace(/\/+$/, '') || '/';
  if (hash && hash.startsWith('#/vitrines-inspiracoes')) {
    cleanPath = hash.slice(1).replace(/\/+$/, '');
  }

  if (cleanPath === '/vitrines-inspiracoes') {
    return { page: 'vitrines', slug: null };
  }

  if (cleanPath.startsWith('/vitrines-inspiracoes/')) {
    const rawSlug = cleanPath.slice('/vitrines-inspiracoes/'.length).split('/')[0];
    const slug = rawSlug ? decodeURIComponent(rawSlug) : null;
    return { page: 'vitrines', slug };
  }

  return { page: 'home' };
}

function scrollToHomeSection(sectionId: string) {
  if (sectionId === 'hero' || sectionId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(sectionId);
  if (el) {
    const navOffset = 80;
    const pos = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: pos - navOffset,
      behavior: 'smooth',
    });
  }
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseRouteFromLocation());
  const [targetCategory, setTargetCategory] = useState<string | undefined>(undefined);
  const [isFullCatalogOpen, setIsFullCatalogOpen] = useState(false);

  useEffect(() => {
    const syncRoute = () => {
      setRoute(parseRouteFromLocation());
    };
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  const navigateToHomeSection = useCallback(
    (sectionId: string = 'hero', categoryId?: string) => {
      if (categoryId) {
        setTargetCategory(categoryId);
      }

      if (route.page !== 'home') {
        const targetUrl = sectionId && sectionId !== 'hero' ? `/#${sectionId}` : '/';
        window.history.pushState({}, '', targetUrl);
        setRoute({ page: 'home' });
        requestAnimationFrame(() => {
          setTimeout(() => {
            scrollToHomeSection(sectionId);
          }, 60);
        });
      } else {
        scrollToHomeSection(sectionId);
      }
    },
    [route.page]
  );

  const handleNavigateToCatalog = useCallback(
    (categoryId?: string) => {
      navigateToHomeSection('catalogo', categoryId);
    },
    [navigateToHomeSection]
  );

  const handleNavigateToVitrines = useCallback((slug?: string | null) => {
    const targetUrl = slug
      ? `/vitrines-inspiracoes/${encodeURIComponent(slug)}`
      : '/vitrines-inspiracoes';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    setRoute({ page: 'vitrines', slug: slug ?? null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenFullCatalog = () => {
    setIsFullCatalogOpen(true);
  };

  const handleCloseFullCatalog = () => {
    setIsFullCatalogOpen(false);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#faf8f5] text-[#1f2518] selection:bg-[#748a54]/30 selection:text-[#38432a]">
        {/* 1. Header Fixo & Elegante com Carrinho de Compras */}
        <Header
          isVitrinesPage={route.page === 'vitrines'}
          onNavigateToCatalog={handleNavigateToCatalog}
          onNavigateToSection={(sectionId) => navigateToHomeSection(sectionId)}
          onNavigateToVitrines={() => handleNavigateToVitrines(null)}
          onOpenFullCatalog={handleOpenFullCatalog}
        />

        {route.page === 'vitrines' ? (
          <VitrinesPage
            selectedCollectionSlug={route.slug}
            onSelectCollection={(slug) => handleNavigateToVitrines(slug)}
            onNavigateHome={() => navigateToHomeSection('hero')}
            onNavigateCatalog={() => handleNavigateToCatalog('buques-boxes')}
          />
        ) : (
          <main>
            {/* 2. Hero Cinematográfico com Abertura e Fotografia de Protagonista */}
            <Hero onExploreCatalog={() => handleNavigateToCatalog()} />

            {/* 3. Manifesto & Filosofia da Marca */}
            <BrandManifesto />

            {/* Destaque compacto da Vitrine Atual com acesso direto a Vitrines & Inspirações */}
            <VitrineHighlight onOpenVitrines={() => handleNavigateToVitrines(null)} />

            {/* 4. Catálogo na Página Inicial: Exatamente 6 Produtos (Linha 1: 3 produtos, Linha 2: 3 produtos) + Botão "VER MAIS PRODUTOS" */}
            <CatalogSection
              initialCategory={targetCategory}
              onOpenFullCatalog={handleOpenFullCatalog}
            />

            {/* 5. Seção Editorial Exclusiva: Conheça Arley Borges */}
            <AboutArley />

            {/* 6. Galeria Visual Editorial & Portfólio sem Duplicações */}
            <GallerySection />

            {/* 7. Contato, Encomendas & Conversão */}
            <ContactSection />

            {/* 9. Animação Exclusiva da Assinatura do Fundador: "Por Arley Borges…" com Caneta e Pétalas Naturais */}
            <FounderSignature />
          </main>
        )}

        {/* 10. Rodapé Institucional */}
        <Footer
          onNavigateToCatalog={handleNavigateToCatalog}
          onNavigateToSection={(sectionId) => navigateToHomeSection(sectionId)}
          onNavigateToVitrines={() => handleNavigateToVitrines(null)}
        />

        {/* 11. Botão Flutuante de WhatsApp Oficial (85) 99239-5959 */}
        <FloatingWhatsApp />

        {/* 12. Modal do Catálogo Completo Inspirado na Organização Alexa Flores */}
        <FullCatalogModal
          isOpen={isFullCatalogOpen}
          onClose={handleCloseFullCatalog}
        />

        {/* 13. Carrinho Funcional com Fechamento via WhatsApp do Sr. Arley */}
        <CartDrawer onNavigateToCatalog={handleOpenFullCatalog} />
      </div>
    </CartProvider>
  );
}
