import React from 'react';
import { Flower2, Sparkles, PackageCheck, HeartHandshake } from 'lucide-react';

export const BrandManifesto: React.FC = () => {
  const pillars = [
    {
      icon: <Flower2 className="w-5 h-5 text-[#748a54]" />,
      title: 'Botânica Fresca Diária',
      description: 'Flores nobres de corte selecionadas no ponto ideal de maturação para máxima durabilidade e perfumação.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#748a54]" />,
      title: 'Design Floral Autoral',
      description: 'Composições contemporâneas e orgânicas que fogem do lugar-comum e expressam sofisticação.',
    },
    {
      icon: <PackageCheck className="w-5 h-5 text-[#748a54]" />,
      title: 'Embalagens Nobres & Eco',
      description: 'Papéis kraft de alta gramatura, jutas naturais, seda e fitas de cetim institucionais com selo de autenticidade.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#748a54]" />,
      title: 'Afeto em Cada Entrega',
      description: 'Dedicatórias em tags impressas e manuseio delicado para que sua surpresa chegue perfeita ao destino.',
    },
  ];

  return (
    <section id="manifesto" className="py-20 bg-[#f5f1e8] border-y border-[#748a54]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Manifesto Prose */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#748a54] block mb-3">
              Origem & Filosofia
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#38432a] leading-tight mb-6">
              Da semente ao desabrochar da flor.
            </h2>
            <blockquote className="text-lg text-[#38432a] font-editorial italic pl-4 border-l-2 border-[#748a54] mb-6 leading-relaxed">
              “Uma marca simples, com elementos do universo floral. Se mistura com elementos físicos orgânicos que se transformam.”
            </blockquote>
            <p className="text-sm sm:text-base text-[#5d6650] leading-relaxed">
              Na <strong>AB Flores & Decoração</strong>, entendemos que uma flor não é apenas um presente; é um mensageiro vivo de afeto, gratidão e aconchego. Cada composição é desenvolvida com sensibilidade botânica para celebrar as histórias que marcam vidas.
            </p>
          </div>

          {/* Right: 4 Value Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#faf8f5] p-6 rounded-xl border border-[#748a54]/15 shadow-xs hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-[#e8e3d7]/60 flex items-center justify-center mb-4">
                  {pillar.icon}
                </div>
                <h3 className="font-brand font-bold text-sm text-[#38432a] uppercase tracking-wider mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5d6650] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
