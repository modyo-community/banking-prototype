import Link from 'next/link';
import { accounts } from '@/lib/data';
import { WalletIcon } from '@/components/icons';

export default function CuentasPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8 animate-fade-in">Mis Cuentas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <Link key={account.id} href={`/cuentas/${account.id}`}>
            <div
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-semibold text-dark">{account.type}</p>
                  <p className="text-sm text-gray-500">{account.number}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <WalletIcon className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Saldo disponible</p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark">${account.balance.toLocaleString('es-CL')}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-primary hover:underline">Ver detalles →</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-dark mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/transferir" className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors">
            <span>Transferir dinero</span>
          </Link>
          <button className="flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-light transition-colors">
            <span>Ver cartola</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
            <span>Abrir nueva cuenta</span>
          </button>
        </div>
      </div>
    </div>
  );
}
