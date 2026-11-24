import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl, DISPLAY_WHATSAPP_PHONE } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = getWhatsAppUrl(
    'Olá! Vim pelo site da AB Flores e gostaria de conhecer os arranjos disponíveis.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip notice */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#faf8f5] text-[#38432a] text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg border border-[#748a54]/25 animate-in fade-in slide-in-from-right-3 duration-300">
          <span>WhatsApp Oficial: {DISPLAY_WHATSAPP_PHONE}</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-[#5d6650] hover:text-[#38432a] transition-colors cursor-pointer"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#38432a] hover:bg-[#748a54] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748a54]"
        aria-label="Abrir conversa no WhatsApp oficial da AB Flores"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </div>
  );
};

