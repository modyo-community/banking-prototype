'use client';

import { useState, useRef, useEffect } from 'react';
import { useFont } from '@/contexts/FontContext';

const fonts = [
  { value: 'inter', label: 'Inter', family: 'Inter, system-ui, sans-serif' },
  { value: 'jost', label: 'Jost', family: 'Jost, system-ui, sans-serif' },
  { value: 'poppins', label: 'Poppins', family: 'Poppins, system-ui, sans-serif' },
  { value: 'work-sans', label: 'Work Sans', family: 'Work Sans, system-ui, sans-serif' },
  { value: 'dm-sans', label: 'DM Sans', family: 'DM Sans, system-ui, sans-serif' },
  { value: 'plus-jakarta', label: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans, system-ui, sans-serif' },
  { value: 'manrope', label: 'Manrope', family: 'Manrope, system-ui, sans-serif' },
  { value: 'outfit', label: 'Outfit', family: 'Outfit, system-ui, sans-serif' },
  { value: 'sora', label: 'Sora', family: 'Sora, system-ui, sans-serif' },
  { value: 'urbanist', label: 'Urbanist', family: 'Urbanist, system-ui, sans-serif' },
];

export default function FontSelector() {
  const { font, setFont } = useFont();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentFont = fonts.find(f => f.value === font) || fonts[0];

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
        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 w-full"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span className="text-sm font-medium text-dark flex-1 text-left">{currentFont.label}</span>
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
        <div className="absolute right-0 bottom-full mb-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 max-h-64 overflow-y-auto">
          {fonts.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFont(f.value as any);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                font === f.value ? 'bg-gray-50' : ''
              }`}
              style={{ fontFamily: f.family }}
            >
              <span className="text-sm font-medium text-dark flex-1 text-left">{f.label}</span>
              {font === f.value && (
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
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
