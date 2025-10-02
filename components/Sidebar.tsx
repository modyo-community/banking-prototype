'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, WalletIcon, CreditCardIcon, HomeIconAlt, ShieldIcon, ChartIcon, SendIcon, ReceiptIcon } from './icons';

const menuItems = [
  { href: '/', label: 'Resumen', Icon: HomeIcon },
  { href: '/cuentas', label: 'Cuentas', Icon: WalletIcon },
  { href: '/tarjetas', label: 'Tarjetas', Icon: CreditCardIcon },
  { href: '/creditos', label: 'Créditos', Icon: HomeIconAlt },
  { href: '/seguros', label: 'Seguros', Icon: ShieldIcon },
  { href: '/inversiones', label: 'Inversiones', Icon: ChartIcon },
  { href: '/transferir', label: 'Transferir', Icon: SendIcon },
  { href: '/pagar', label: 'Pagar', Icon: ReceiptIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <h1 className="text-xl lg:text-2xl font-bold text-primary">Banca Digital</h1>
        <p className="text-sm text-gray-600 mt-1">Juan Pérez</p>
      </div>

      <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
        <ul className="space-y-1 lg:space-y-2">
          {menuItems.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
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
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 lg:p-4 border-t border-gray-200">
        <button className="w-full px-3 lg:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left text-sm lg:text-base">
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
