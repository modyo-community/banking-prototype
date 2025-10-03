'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const themes = [
  { value: 'default', label: 'Default', colors: ['#2068D5', '#3DC681'] },
  { value: 'crypto', label: 'Crypto', colors: ['#B794F6', '#5CC9C4'] },
  { value: 'sunset', label: 'Sunset', colors: ['#F97316', '#FBBF24'] },
  { value: 'ocean', label: 'Ocean', colors: ['#0EA5E9', '#06B6D4'] },
  { value: 'forest', label: 'Forest', colors: ['#10B981', '#059669'] },
  { value: 'rose', label: 'Rose', colors: ['#EC4899', '#F472B6'] },
  { value: 'midnight', label: 'Midnight', colors: ['#6366F1', '#8B5CF6'] },
  { value: 'coral', label: 'Coral', colors: ['#FF6B9D', '#FFA07A'] },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
      >
        <div className="flex space-x-1">
          {currentTheme.colors.map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-dark">{currentTheme.label}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setTheme(t.value as any);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                theme === t.value ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex space-x-1">
                {t.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-dark">{t.label}</span>
              {theme === t.value && (
                <svg className="w-4 h-4 text-primary ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
