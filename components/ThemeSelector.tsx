'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const { theme, setTheme, customColors, setCustomColors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tempColors, setTempColors] = useState({
    primary: customColors?.primary || '#2068D5',
    primaryLight: customColors?.primaryLight || '#5B8EE6',
    secondary: customColors?.secondary || '#3DC681',
    secondaryLight: customColors?.secondaryLight || '#6AD89E',
    dark: customColors?.dark || '#1C1C1E',
    darkLight: customColors?.darkLight || '#2C2C2E',
    grayLight: customColors?.grayLight || '#F5F5F7',
    gray: customColors?.gray || '#C9C5CB',
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = theme === 'custom'
    ? { value: 'custom', label: 'Custom', colors: [customColors?.primary || '#2068D5', customColors?.secondary || '#3DC681'] }
    : themes.find(t => t.value === theme) || themes[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveCustomColors = () => {
    setCustomColors(tempColors);
    setTheme('custom' as any);
    setShowCustomModal(false);
    setIsOpen(false);
  };

  const modalContent = showCustomModal && mounted ? createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm" style={{ zIndex: 9999, backgroundColor: 'rgba(var(--color-primary-rgb, 32, 104, 213), 0.15)' }}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-dark mb-4">Colores personalizados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primario
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={tempColors.primary}
                onChange={(e) => setTempColors({ ...tempColors, primary: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={tempColors.primary}
                onChange={(e) => setTempColors({ ...tempColors, primary: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="#2068D5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primario Claro
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={tempColors.primaryLight}
                onChange={(e) => setTempColors({ ...tempColors, primaryLight: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={tempColors.primaryLight}
                onChange={(e) => setTempColors({ ...tempColors, primaryLight: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="#5B8EE6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secundario
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={tempColors.secondary}
                onChange={(e) => setTempColors({ ...tempColors, secondary: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={tempColors.secondary}
                onChange={(e) => setTempColors({ ...tempColors, secondary: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="#3DC681"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secundario Claro
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={tempColors.secondaryLight}
                onChange={(e) => setTempColors({ ...tempColors, secondaryLight: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={tempColors.secondaryLight}
                onChange={(e) => setTempColors({ ...tempColors, secondaryLight: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="#6AD89E"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Oscuro
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={tempColors.dark}
                onChange={(e) => setTempColors({ ...tempColors, dark: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={tempColors.dark}
                onChange={(e) => setTempColors({ ...tempColors, dark: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="#1C1C1E"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Oscuro Claro
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={tempColors.darkLight}
                onChange={(e) => setTempColors({ ...tempColors, darkLight: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={tempColors.darkLight}
                onChange={(e) => setTempColors({ ...tempColors, darkLight: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="#2C2C2E"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gris Claro
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={tempColors.grayLight}
                onChange={(e) => setTempColors({ ...tempColors, grayLight: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={tempColors.grayLight}
                onChange={(e) => setTempColors({ ...tempColors, grayLight: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="#F5F5F7"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gris
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={tempColors.gray}
                onChange={(e) => setTempColors({ ...tempColors, gray: e.target.value })}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={tempColors.gray}
                onChange={(e) => setTempColors({ ...tempColors, gray: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="#C9C5CB"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <p className="text-sm text-gray-600 mb-3">Vista previa</p>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-12 rounded-lg" style={{ backgroundColor: tempColors.primary }}></div>
            <div className="h-12 rounded-lg" style={{ backgroundColor: tempColors.primaryLight }}></div>
            <div className="h-12 rounded-lg" style={{ backgroundColor: tempColors.secondary }}></div>
            <div className="h-12 rounded-lg" style={{ backgroundColor: tempColors.secondaryLight }}></div>
            <div className="h-12 rounded-lg" style={{ backgroundColor: tempColors.dark }}></div>
            <div className="h-12 rounded-lg" style={{ backgroundColor: tempColors.darkLight }}></div>
            <div className="h-12 rounded-lg border border-gray-300" style={{ backgroundColor: tempColors.grayLight }}></div>
            <div className="h-12 rounded-lg" style={{ backgroundColor: tempColors.gray }}></div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowCustomModal(false)}
            className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveCustomColors}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
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
            <button
              onClick={() => {
                setShowCustomModal(true);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors border-t border-gray-200 ${
                theme === 'custom' ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex space-x-1">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              </div>
              <span className="text-sm font-medium text-dark">Custom</span>
              {theme === 'custom' && (
                <svg className="w-4 h-4 text-primary ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {modalContent}
    </>
  );
}
