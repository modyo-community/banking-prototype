'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export default function MobileHeader({ onMenuToggle }: MobileHeaderProps) {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="block">
          <svg width="140" height="36" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Icon */}
            <circle cx="18" cy="18" r="16" fill="var(--color-primary)" opacity="0.15"/>
            <path d="M11 18L16 23L25 14" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Text */}
            <text x="38" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="700" fill="var(--color-dark)">
              DynamicBank
            </text>
          </svg>
        </Link>
        <button
          onClick={onMenuToggle}
          className="p-2 text-dark hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
