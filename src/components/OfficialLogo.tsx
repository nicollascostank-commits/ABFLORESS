import React from 'react';

interface OfficialLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showText = true,
  className = '',
}) => {
  const isLight = variant === 'light';

  const strokeColor = isLight ? '#faf8f5' : '#38432a';
  const dotColor = isLight ? '#c29d59' : '#748a54';
  const textColor = isLight ? '#faf8f5' : '#38432a';
  const subtitleColor = isLight ? '#e8e3d7' : '#748a54';

  const symbolSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.35em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Símbolo Oficial AB Flores: Semente orgânica germinando e desabrochando em flor contínua */}
      <svg
        className={`${symbolSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Curvas contínuas orgânicas da semente desabrochando e formando a flor com as iniciais AB */}
        <path
          d="M24 70C24 70 29 55 45 49C57 44 65 35 69 23C69 23 79 40 69 57C63 67 51 73 39 73C25 73 16 62 23 49C26 43 33 39 39 41C45 43 47 49 43 55C39 61 24 70 24 70Z"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M45 49L63 30C67 26 75 26 81 32C87 38 85 46 79 52L53 69"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M51 49H77"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Pontos botânicos: semente e pólen */}
        <circle cx="28" cy="46" r="4.5" fill={dotColor} />
        <circle cx="69" cy="38" r="4" fill={dotColor} />
      </svg>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-brand font-bold uppercase tracking-[0.2em] ${titleSizes[size]}`} style={{ color: textColor }}>
            AB
          </span>
          <span className={`font-body font-medium uppercase mt-1 ${subtitleSizes[size]}`} style={{ color: subtitleColor }}>
            Flores & Decoração
          </span>
        </div>
      )}
    </div>
  );
};
