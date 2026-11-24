import React from 'react';
import { Award, GraduationCap, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppUrl, DISPLAY_WHATSAPP_PHONE } from '../utils/whatsapp';
import { OptimizedImage } from './OptimizedImage';

export const AboutArley: React.FC = () => {
  const whatsappUrl = getWhatsAppUrl(
    'Olá, Arley! Gostaria de conversar sobre um projeto floral personalizado para uma ocasião especial.'
  );

  // Real, authentic photographs of Arley Borges
  const primaryPortrait = '/assets/aistudio/71814976-1434-40c4-aae7-6cf2285c2091_450bf97b.jpeg';
  const secondaryDesignPortrait = '/assets/aistudio/339328d6-4a39-468e-a20d-2cdcf12868c7_42a3957f.jpeg';

  return (
    <section id="arley" className="py-24 bg-gradient-to-b from-[#f5f1e8] to-[#faf8f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#faf8f5] rounded-3xl border border-[#748a54]/25 shadow-xl p-6 sm:p-10 lg:p-14 relative">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#748a54] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#c29d59]" />
              <span>Direção Criativa & Fundador</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#38432a] leading-tight mb-2">
              Arley Borges
            </h2>
            <p className="text-xs sm:text-sm font-brand font-semibold text-[#748a54] tracking-wider uppercase">
              Artista Visual · Designer Floral · Fundador da AB Flores
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Authentic Photographs Composition with Pristine Headroom */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Main Authentic Portrait: enquadramento com respiro no topo para não cortar a cabeça */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#748a54]/25 bg-[#38432a] aspect-[3/4] group">
                <OptimizedImage
                  src={primaryPortrait}
                  alt="Arley Borges - Artista Visual e Designer Floral da AB Flores em Fortaleza"
                  sizes="(max-width: 1024px) 92vw, 480px"
                  className="w-full h-full object-cover object-[center_6%] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Recognition Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#1e2518]/92 backdrop-blur-md text-[#faf8f5] p-3.5 rounded-xl border border-white/10 shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#c29d59] shrink-0" />
                    <span className="font-brand font-semibold text-xs tracking-wider uppercase text-[#faf8f5]">
                      1º Lugar na Copa Brasileira de Arte Floral
                    </span>
                  </div>
                  <p className="text-[11px] text-[#e8e3d7] mt-0.5 pl-6">
                    Academia Brasileira de Arte Floral (ABAF)
                  </p>
                </div>
              </div>

              {/* Secondary Visual Accent: Contemporary Art & Design Focus com enquadramento correto */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#f5f1e8] p-4 rounded-xl border border-[#748a54]/20">
                <div className="sm:col-span-4 rounded-lg overflow-hidden aspect-[4/5] bg-[#38432a]">
                  <OptimizedImage
                    src={secondaryDesignPortrait}
                    alt="Arley Borges e a pesquisa estética de design com vasos de luxo"
                    sizes="(max-width: 640px) 90vw, 180px"
                    className="w-full h-full object-cover object-[center_12%]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="sm:col-span-8 text-xs text-[#5d6650] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-[#38432a]">
                    <GraduationCap className="w-4 h-4 text-[#748a54]" />
                    <span>Graduado em Artes Visuais</span>
                  </div>
                  <p className="leading-relaxed">
                    Universidade da Amazônia (UNAMA) · 4 anos de especialização em São Paulo com grandes mestres da arte e decoração.
                  </p>
                  <p className="text-[11px] text-[#748a54] font-medium">
                    Ateliê oficial sediado em Fortaleza, Ceará.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Narrative (Resumo inteligente e sofisticado da biografia oficial) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Quote from Arley */}
              <blockquote className="font-editorial italic text-lg sm:text-2xl text-[#38432a] leading-relaxed pl-5 border-l-2 border-[#748a54] mb-8">
                “A natureza não é apenas uma fonte de inspiração, mas a protagonista viva de cada criação.”
              </blockquote>

              {/* Narrative Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#5d6650] leading-relaxed mb-8">
                <p>
                  <strong>Arley Borges</strong> construiu sua trajetória artística unindo sensibilidade visual, conhecimento técnico e espírito empreendedor. Graduado em Artes Visuais pela <em>Universidade da Amazônia (UNAMA)</em>, desenvolveu desde cedo uma ligação profunda com a harmonia estética, o rigor das proporções e as formas orgânicas da natureza.
                </p>
                <p>
                  Sua identidade criativa foi enriquecida durante quatro anos de vivência em São Paulo, onde ampliou conhecimentos em cursos, ateliês e colaborações com decoradores e artistas de renome, além de experiência prévia na área de planejamento e gestão no Pará. Essa bagagem confere às suas composições liberdade criativa, refinamento e forte identidade autoral.
                </p>
                <p>
                  Consagrado com o <strong>1º lugar na Copa Brasileira de Arte Floral (ABAF)</strong>, Arley escolheu Fortaleza (Ceará) para consolidar a <strong>AB Flores</strong>. Mais do que uma floricultura, o estúdio é o espaço onde a botânica se transforma em arte viva — criando conexões verdadeiras e experiências afetivas memoráveis.
                </p>
              </div>

              {/* Scope of Work Highlights */}
              <div className="bg-[#f5f1e8] p-5 rounded-2xl border border-[#748a54]/20 mb-8">
                <h3 className="font-brand font-bold text-xs uppercase tracking-wider text-[#38432a] mb-3">
                  Atuação Autoral AB Flores
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5d6650]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#748a54]" />
                    <span>Buquês & Box Florais para Presentear</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#748a54]" />
                    <span>Assinaturas residenciais e corporativas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#748a54]" />
                    <span>Decoração de eventos e cerimônias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#748a54]" />
                    <span>Composições tropicais e brasilidade</span>
                  </div>
                </div>
              </div>

              {/* Signature Block & WhatsApp CTA with Official Phone */}
              <div className="pt-6 border-t border-[#748a54]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#38432a] text-[#faf8f5] flex items-center justify-center font-brand font-bold text-xs">
                    AB
                  </div>
                  <div>
                    <h4 className="font-brand font-bold text-base text-[#38432a]">
                      Arley Borges
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-[#748a54]">
                      <MapPin className="w-3 h-3" />
                      <span>Fortaleza, Ceará · WhatsApp {DISPLAY_WHATSAPP_PHONE}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#38432a] hover:bg-[#748a54] transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Conversar com Arley</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
