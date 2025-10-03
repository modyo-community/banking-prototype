'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <MobileHeader onMenuToggle={() => setIsMobileMenuOpen(true)} />
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="flex-1 overflow-y-auto bg-gray-light pt-16 md:pt-0 pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </>
  );
}
