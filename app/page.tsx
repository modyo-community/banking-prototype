'use client';

import { useState } from 'react';
import Link from 'next/link';
import { accounts, cards, loans, recentTransactions, investments, insurances } from '@/lib/data';
import { BriefcaseIcon, ArrowDownIcon, CashIcon, ShoppingCartIcon, LightningIcon, GasIcon, FilmIcon, WalletIcon, CreditCardIcon, ChartIcon, ShieldIcon } from '@/components/icons';

export default function Home() {
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(null);
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalDebt = [...cards, ...loans].reduce((sum, item) => sum + Math.abs(item.balance), 0);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2">Bienvenido, Juan</h1>
        <p className="text-gray-600">Este es tu resumen financiero</p>
      </div>

      {/* Balance and Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Main Balance Card */}
        <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col">
          <p className="text-sm opacity-90 mb-1">Saldo total disponible</p>
          <p className="text-4xl md:text-5xl font-bold mb-auto">${totalBalance.toLocaleString('es-CL')}</p>
          <div className="flex gap-4 mt-6">
            <Link href="/transferir" className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 px-4 rounded-lg transition-colors text-center font-medium">
              Transferir
            </Link>
            <Link href="/pagar" className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 px-4 rounded-lg transition-colors text-center font-medium">
              Pagar
            </Link>
          </div>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
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
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-xl font-bold text-dark mb-4">Movimientos recientes</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {recentTransactions.map((transaction) => {
            const isExpanded = expandedTransaction === transaction.id;
            return (
              <div key={transaction.id} className="border-b border-gray-100 last:border-0">
                <div
                  className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setExpandedTransaction(isExpanded ? null : transaction.id)}
                >
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
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-base md:text-lg font-bold text-dark">
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('es-CL')}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{transaction.category}</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 bg-gray-50 border-t border-gray-100">
                    <div className="pt-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ID de transacción</span>
                        <span className="text-sm font-medium text-dark">TRX-{transaction.id.toString().padStart(6, '0')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tipo</span>
                        <span className="text-sm font-medium text-dark">{transaction.type === 'income' ? 'Ingreso' : 'Egreso'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Categoría</span>
                        <span className="text-sm font-medium text-dark">{transaction.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fecha completa</span>
                        <span className="text-sm font-medium text-dark">{transaction.date} a las {transaction.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Estado</span>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Completada</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
