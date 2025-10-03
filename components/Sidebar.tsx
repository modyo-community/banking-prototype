'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, WalletIcon, CreditCardIcon, HomeIconAlt, ShieldIcon, ChartIcon, SendIcon, ReceiptIcon, GiftIcon, LifeBuoyIcon } from './icons';
import ThemeSelector from './ThemeSelector';
import FontSelector from './FontSelector';

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: '/', label: 'Resumen', Icon: HomeIcon },
  { href: '/cuentas', label: 'Cuentas', Icon: WalletIcon },
  { href: '/tarjetas', label: 'Tarjetas', Icon: CreditCardIcon },
  { href: '/creditos', label: 'Créditos', Icon: HomeIconAlt },
  { href: '/seguros', label: 'Seguros', Icon: ShieldIcon },
  { href: '/inversiones', label: 'Inversiones', Icon: ChartIcon },
  {
    href: '/transferir',
    label: 'Transferir',
    Icon: SendIcon,
    submenu: [
      { href: '/transferir', label: 'Nueva transferencia' },
      { href: '/transferir/contactos', label: 'Contactos' },
      { href: '/transferir/historial', label: 'Historial' },
    ]
  },
  { href: '/pagar', label: 'Pagar', Icon: ReceiptIcon },
  {
    href: '/servicios',
    label: 'Servicios',
    Icon: GiftIcon,
    submenu: [
      { href: '/beneficios', label: 'Beneficios' },
      { href: '/mensajes', label: 'Mensajes' },
      { href: '/notificaciones', label: 'Notificaciones' },
      { href: '/documentos', label: 'Documentos' },
    ]
  },
  {
    href: '/soporte',
    label: 'Soporte',
    Icon: LifeBuoyIcon,
    submenu: [
      { href: '/ejecutivo', label: 'Mi Ejecutivo' },
      { href: '/ayuda', label: 'Ayuda' },
      { href: '/perfil', label: 'Mi Perfil' },
    ]
  },
];

export default function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const submenuRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  useEffect(() => {
    // Auto-open submenu if current path matches any submenu item
    menuItems.forEach(item => {
      if ('submenu' in item && item.submenu) {
        const isInSubmenu = item.submenu.some(subitem => pathname.startsWith(subitem.href));
        if (isInSubmenu) {
          setOpenSubmenu(item.href);
        }
      }
    });
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedInsideAnySubmenu = Object.values(submenuRefs.current).some(
        ref => ref && ref.contains(event.target as Node)
      );
      if (!clickedInsideAnySubmenu) {
        setOpenSubmenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 transform ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 md:z-auto w-64 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="block hover:opacity-80 transition-opacity" onClick={onClose}>
          <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Icon - Modern banking symbol */}
            <circle cx="20" cy="25" r="18" fill="var(--color-primary)" opacity="0.15"/>
            <path d="M12 25L18 31L28 19" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Text */}
            <text x="45" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="700" fill="var(--color-dark)">
              DynamicBank
            </text>
          </svg>
            </Link>
            <button
              onClick={onClose}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Cerrar menú"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Juan Pérez</p>
        </div>

      <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
        {/* Main Menu */}
        <ul className="space-y-1 lg:space-y-2 mb-6">
          {menuItems.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            const hasSubmenu = 'submenu' in item && item.submenu;
            const isSubmenuOpen = openSubmenu === item.href;

            return (
              <li key={item.href} ref={hasSubmenu ? el => { submenuRefs.current[item.href] = el; } : null}>
                {hasSubmenu ? (
                  <div className="relative">
                    <button
                      onClick={() => setOpenSubmenu(isSubmenuOpen ? null : item.href)}
                      className={`w-full flex items-center justify-between space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#f6f9fd] text-primary'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm lg:text-base">{item.label}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isSubmenuOpen && (
                      <ul className="mt-1 ml-8 space-y-1">
                        {item.submenu.map((subitem) => {
                          const isSubActive = pathname === subitem.href;
                          return (
                            <li key={subitem.href}>
                              <Link
                                href={subitem.href}
                                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                  isSubActive
                                    ? 'bg-[#f6f9fd] text-primary font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                onClick={onClose}
                              >
                                {subitem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#f6f9fd] text-primary'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={onClose}
                  >
                    <item.Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm lg:text-base">{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 lg:p-4 border-t border-gray-200 space-y-3">
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 px-1">Personalización</p>
          <ThemeSelector />
          <FontSelector />
        </div>
        <button className="w-full px-3 lg:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left text-sm lg:text-base">
          Cerrar sesión
        </button>
      </div>
      </aside>
    </>
  );
}
