import React, { useState } from 'react';
import { MessageCircle, Instagram, Clock, ShieldCheck, Send, Phone } from 'lucide-react';
import { getWhatsAppUrl, DISPLAY_WHATSAPP_PHONE } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [occasion, setOccasion] = useState('Aniversário');
  const [customNote, setCustomNote] = useState('');

  const handleStartWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Meu nome é ${customerName || 'Cliente'} e gostaria de encomendar um arranjo floral para ${occasion}.${customNote ? ` Detalhes: ${customNote}` : ''}`;
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contato" className="py-24 bg-[#faf8f5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Channels & Steps */}
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#748a54] block mb-2">
              Atendimento Exclusivo
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#38432a] leading-tight mb-6">
              Como encomendar seu arranjo
            </h2>

            <p className="text-sm sm:text-base text-[#5d6650] leading-relaxed mb-8">
              Atendemos de forma personalizada para que cada detalhe — das espécies florais às cores da fita e à dedicatória — transmita com precisão o sentimento que você deseja expressar.
            </p>

            {/* 3 Step Ordering Process */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f5f1e8] border border-[#748a54]/15">
                <span className="w-7 h-7 rounded-full bg-[#38432a] text-[#faf8f5] font-brand font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-brand font-semibold text-xs sm:text-sm text-[#38432a] uppercase tracking-wider">
                    Escolha a Composição
                  </h4>
                  <p className="text-xs text-[#5d6650] mt-0.5">
                    Selecione um dos arranjos autorais no catálogo ou solicite um projeto personalizado a Arley Borges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f5f1e8] border border-[#748a54]/15">
                <span className="w-7 h-7 rounded-full bg-[#38432a] text-[#faf8f5] font-brand font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-brand font-semibold text-xs sm:text-sm text-[#38432a] uppercase tracking-wider">
                    Personalize a Dedicatória
                  </h4>
                  <p className="text-xs text-[#5d6650] mt-0.5">
                    Envie sua mensagem que imprimimos em tag de papelaria fina oficial com laço acetinado e prendedor de madeira.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f5f1e8] border border-[#748a54]/15">
                <span className="w-7 h-7 rounded-full bg-[#38432a] text-[#faf8f5] font-brand font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-brand font-semibold text-xs sm:text-sm text-[#38432a] uppercase tracking-wider">
                    Entrega com Cuidado e Frescor
                  </h4>
                  <p className="text-xs text-[#5d6650] mt-0.5">
                    Montamos no dia da entrega em Fortaleza para garantir o frescor absoluto e a máxima durabilidade em água.
                  </p>
                </div>
              </div>
            </div>

            {/* Official Channels */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#748a54]/15">
              <a
                href={getWhatsAppUrl('Olá! Vim pelo site da AB Flores e gostaria de conhecer os arranjos disponíveis.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-[#38432a] hover:bg-[#748a54] transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {DISPLAY_WHATSAPP_PHONE}</span>
              </a>

              <a
                href="https://instagram.com/abfloress"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-[#38432a] bg-[#e8e3d7] hover:bg-[#dad2bf] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#748a54]" />
                <span>@abfloress</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Assistant */}
          <div className="lg:col-span-6 bg-[#f5f1e8] p-8 sm:p-10 rounded-3xl border border-[#748a54]/25 shadow-sm">
            <h3 className="font-brand font-bold text-xl text-[#38432a] mb-2">
              Solicitar Orçamento Personalizado
            </h3>
            <p className="text-xs text-[#5d6650] mb-6">
              Preencha os detalhes e inicie a conversa no WhatsApp oficial ({DISPLAY_WHATSAPP_PHONE}) já com seu pedido formatado.
            </p>

            <form onSubmit={handleStartWhatsApp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38432a] mb-1.5">
                  Seu Nome
                </label>
                <input
                  type="text"
                  required
                  placeholder="Como podemos te chamar?"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#faf8f5] border border-[#748a54]/30 text-xs sm:text-sm text-[#38432a] focus:outline-none focus:ring-2 focus:ring-[#748a54]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38432a] mb-1.5">
                  Ocasião
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#faf8f5] border border-[#748a54]/30 text-xs sm:text-sm text-[#38432a] focus:outline-none focus:ring-2 focus:ring-[#748a54]"
                >
                  <option value="Aniversário">Aniversário</option>
                  <option value="Romântico / Pedido de Namoro / Noivado">Romântico / Amor / Noivado</option>
                  <option value="Pedido de Desculpas">Pedido de Desculpas</option>
                  <option value="Visita a um Amigo / Lembrei de Você">Visita a Amigo / &quot;Lembrei de Você&quot;</option>
                  <option value="Chegada de Viagem / Boas-vindas">Chegada de Viagem / Boas-vindas</option>
                  <option value="Agradecimento">Agradecimento</option>
                  <option value="Maternidade / Celebração">Maternidade / Celebração</option>
                  <option value="Condolências & Pêsames">Condolências & Pêsames</option>
                  <option value="Decoração de Evento">Decoração Residencial ou Evento</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38432a] mb-1.5">
                  Preferência Floral ou Mensagem (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Gostaria de rosas vermelhas com pelúcia e Ferrero Rocher ou lírios brancos em bag com visor..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#faf8f5] border border-[#748a54]/30 text-xs sm:text-sm text-[#38432a] focus:outline-none focus:ring-2 focus:ring-[#748a54]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#38432a] hover:bg-[#748a54] transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Conversar no WhatsApp ({DISPLAY_WHATSAPP_PHONE})</span>
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-[#5d6650]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#748a54]" />
                <span>Atendimento direto pelo ateliê oficial em Fortaleza, Ceará.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

