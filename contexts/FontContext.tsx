'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontType = 'inter' | 'jost' | 'poppins' | 'work-sans' | 'dm-sans' | 'plus-jakarta' | 'manrope' | 'outfit' | 'sora' | 'urbanist';

interface FontContextType {
  font: FontType;
  setFont: (font: FontType) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFontState] = useState<FontType>('inter');

  useEffect(() => {
    // Load font preference from localStorage
    const savedFont = localStorage.getItem('font-preference') as FontType;
    if (savedFont) {
      setFontState(savedFont);
      document.documentElement.setAttribute('data-font', savedFont);
    }
  }, []);

  const setFont = (newFont: FontType) => {
    setFontState(newFont);
    localStorage.setItem('font-preference', newFont);
    document.documentElement.setAttribute('data-font', newFont);
  };

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}
