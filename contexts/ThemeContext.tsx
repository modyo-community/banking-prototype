'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'default' | 'crypto' | 'sunset' | 'ocean' | 'forest' | 'rose' | 'midnight' | 'coral' | 'custom';

interface CustomColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  dark: string;
  darkLight: string;
  grayLight: string;
  gray: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  customColors: CustomColors | null;
  setCustomColors: (colors: CustomColors) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function generateColorVariants(baseColor: string) {
  // Simple function to generate lighter/darker variants
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const lighten = (value: number) => Math.min(255, value + 40);
  const darken = (value: number) => Math.max(0, value - 20);

  const light = `#${lighten(r).toString(16).padStart(2, '0')}${lighten(g).toString(16).padStart(2, '0')}${lighten(b).toString(16).padStart(2, '0')}`;
  const dark = `#${darken(r).toString(16).padStart(2, '0')}${darken(g).toString(16).padStart(2, '0')}${darken(b).toString(16).padStart(2, '0')}`;

  return { light, dark };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default');
  const [customColors, setCustomColorsState] = useState<CustomColors | null>(null);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('banking-theme') as Theme;
    const savedCustomColors = localStorage.getItem('banking-custom-colors');

    if (savedCustomColors) {
      setCustomColorsState(JSON.parse(savedCustomColors));
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('banking-theme', theme);

    // Apply theme to document
    if (theme === 'custom' && customColors) {
      document.documentElement.style.setProperty('--color-primary', customColors.primary);
      document.documentElement.style.setProperty('--color-primary-light', customColors.primaryLight);
      document.documentElement.style.setProperty('--color-secondary', customColors.secondary);
      document.documentElement.style.setProperty('--color-secondary-light', customColors.secondaryLight);
      document.documentElement.style.setProperty('--color-dark', customColors.dark);
      document.documentElement.style.setProperty('--color-dark-light', customColors.darkLight);
      document.documentElement.style.setProperty('--color-gray-light', customColors.grayLight);
      document.documentElement.style.setProperty('--color-gray', customColors.gray);

      // Extract RGB from primary color for transparency effects
      const hex = customColors.primary.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      document.documentElement.style.setProperty('--color-primary-rgb', `${r}, ${g}, ${b}`);

      document.documentElement.setAttribute('data-theme', 'custom');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, customColors]);

  const setCustomColors = (colors: CustomColors) => {
    setCustomColorsState(colors);
    localStorage.setItem('banking-custom-colors', JSON.stringify(colors));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customColors, setCustomColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
