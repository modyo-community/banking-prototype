'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, WalletIcon, CreditCardIcon, HomeIconAlt, ShieldIcon, ChartIcon, SendIcon, ReceiptIcon } from './icons';
import ThemeSelector from './ThemeSelector';

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
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if current path is within transferir section
    if (pathname.startsWith('/transferir')) {
      setOpenSubmenu('/transferir');
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        setOpenSubmenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <Link href="/" className="block mb-2 hover:opacity-80 transition-opacity">
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
        <p className="text-sm text-gray-600 mt-1">Juan Pérez</p>
      </div>

      <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
        <ul className="space-y-1 lg:space-y-2">
          {menuItems.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            const hasSubmenu = 'submenu' in item && item.submenu;
            const isSubmenuOpen = openSubmenu === item.href;

            return (
              <li key={item.href} ref={hasSubmenu ? submenuRef : null}>
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
        <ThemeSelector />
        <button className="w-full px-3 lg:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left text-sm lg:text-base">
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
