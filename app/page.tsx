import Link from 'next/link';
import { accounts, cards, loans, recentTransactions, investments, insurances } from '@/lib/data';
import { BriefcaseIcon, ArrowDownIcon, CashIcon, ShoppingCartIcon, LightningIcon, GasIcon, FilmIcon, WalletIcon, CreditCardIcon, ChartIcon, ShieldIcon } from '@/components/icons';

export default function Home() {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalDebt = [...cards, ...loans].reduce((sum, item) => sum + Math.abs(item.balance), 0);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2">Bienvenido, Juan</h1>
        <p className="text-gray-600">Este es tu resumen financiero</p>
      </div>

      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 md:p-8 text-white mb-8 shadow-lg">
        <p className="text-sm opacity-90 mb-1">Saldo total disponible</p>
        <p className="text-4xl md:text-5xl font-bold mb-6">${totalBalance.toLocaleString('es-CL')}</p>
        <div className="flex gap-4">
          <Link href="/transferir" className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 px-4 rounded-lg transition-colors text-center font-medium">
            Transferir
          </Link>
          <Link href="/pagar" className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 px-4 rounded-lg transition-colors text-center font-medium">
            Pagar
          </Link>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <Link href="/cuentas" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <WalletIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium text-dark">Cuentas</p>
          <p className="text-lg font-bold text-dark mt-1">{accounts.length}</p>
        </Link>
        <Link href="/tarjetas" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <CreditCardIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium text-dark">Tarjetas</p>
          <p className="text-lg font-bold text-dark mt-1">{cards.length}</p>
        </Link>
        <Link href="/inversiones" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <ChartIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium text-dark">Inversiones</p>
          <p className="text-lg font-bold text-dark mt-1">{investments.length}</p>
        </Link>
        <Link href="/seguros" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <ShieldIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium text-dark">Seguros</p>
          <p className="text-lg font-bold text-dark mt-1">{insurances.length}</p>
        </Link>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-xl font-bold text-dark mb-4">Movimientos recientes</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-600'
                }`}>
                  {transaction.category === 'Sueldo' && <BriefcaseIcon />}
                  {transaction.category === 'Transferencia' && <ArrowDownIcon />}
                  {transaction.category === 'Depósito' && <CashIcon />}
                  {transaction.category === 'Alimentación' && <ShoppingCartIcon />}
                  {transaction.category === 'Servicios' && <LightningIcon />}
                  {transaction.category === 'Combustible' && <GasIcon />}
                  {transaction.category === 'Entretenimiento' && <FilmIcon />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-dark">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.detail}</p>
                  <p className="text-xs text-gray-400 mt-1">{transaction.date} • {transaction.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base md:text-lg font-bold text-dark">
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('es-CL')}
                </p>
                <p className="text-xs text-gray-500 mt-1">{transaction.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
