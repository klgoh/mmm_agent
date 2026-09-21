import React from 'react';
import logo from '../assets/logo.png';

interface MitsubishiLogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export default function MitsubishiLogo({
  className = 'w-16 h-16',
  showText = true,
  textColor = 'text-brand-charcoal'
}: MitsubishiLogoProps) {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className={`${className} flex items-center justify-center`}>
        <img
          src={logo}
          alt="Mitsubishi Motors Logo"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className={`mt-2 text-center flex flex-col items-center`}>
          <span className={`text-[11px] font-bold tracking-[0.25em] uppercase leading-none ${textColor}`}>
            Mitsubishi
          </span>
          <span className={`text-[9px] font-medium tracking-[0.35em] uppercase leading-none mt-1 ${textColor}`}>
            Motors
          </span>
        </div>
      )}
    </div>
  );
}
