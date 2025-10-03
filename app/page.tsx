'use client';

import { useState } from 'react';
import Link from 'next/link';
import { accounts, cards, loans, recentTransactions, investments, insurances } from '@/lib/data';
import { BriefcaseIcon, ArrowDownIcon, CashIcon, ShoppingCartIcon, LightningIcon, GasIcon, FilmIcon, WalletIcon, CreditCardIcon, ChartIcon, ShieldIcon } from '@/components/icons';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PromotionBanner from '@/components/PromotionBanner';

export default function Home() {
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(null);
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalDebt = [...cards, ...loans].reduce((sum, item) => sum + Math.abs(item.balance), 0);

  // Mock income data for chart
  const incomeData = [
    { month: 'Abr', value: 1200000 },
    { month: 'May', value: 1450000 },
    { month: 'Jun', value: 1380000 },
    { month: 'Jul', value: 1560000 },
    { month: 'Ago', value: 1650000 },
    { month: 'Sep', value: 1500000 },
  ];

  // Get CSS variable colors for charts
  const getComputedColor = (variable: string) => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    }
    return '#2068D5';
  };

  // Mock expenses data for pie chart using theme colors
  const expensesData = [
    { name: 'Shopping', value: 66, color: 'var(--color-primary)' },
    { name: 'Transport', value: 26, color: 'var(--color-secondary)' },
    { name: 'Otros', value: 8, color: 'var(--color-primary-light)' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2">Bienvenido, Juan</h1>
        <p className="text-gray-600">Este es tu resumen financiero</p>
      </div>

      {/* Balance and Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Main Balance Card */}
        <div className="bg-primary rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col">
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
          <Link href="/cuentas" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-primary text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
              <WalletIcon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-dark">Cuentas</p>
            <p className="text-lg font-bold text-primary mt-1">{accounts.length}</p>
          </Link>
          <Link href="/tarjetas" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-secondary text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
              <CreditCardIcon className="w-6 h-6 text-secondary" />
            </div>
            <p className="text-sm font-medium text-dark">Tarjetas</p>
            <p className="text-lg font-bold text-secondary mt-1">{cards.length}</p>
          </Link>
          <Link href="/inversiones" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-primary text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
              <ChartIcon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-dark">Inversiones</p>
            <p className="text-lg font-bold text-primary mt-1">{investments.length}</p>
          </Link>
          <Link href="/seguros" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-secondary text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
              <ShieldIcon className="w-6 h-6 text-secondary" />
            </div>
            <p className="text-sm font-medium text-dark">Seguros</p>
            <p className="text-lg font-bold text-secondary mt-1">{insurances.length}</p>
          </Link>
        </div>
      </div>

      {/* Promotion Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PromotionBanner
          title="¡Ahorra con nosotros!"
          description="Abre una cuenta de ahorro y obtén hasta 5% de interés anual. Sin costos de mantención."
          buttonText="Más información"
          variant="gradient"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          }
        />
        <PromotionBanner
          title="Tarjeta de crédito sin anualidad"
          description="Solicita tu tarjeta DynamicBank y disfruta del primer año gratis. Acumula puntos en cada compra."
          buttonText="Solicitar ahora"
          variant="primary"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Income Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-dark">Ingresos</h3>
            <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary bg-white">
              <option>Mensual</option>
              <option>Semanal</option>
              <option>Anual</option>
            </select>
          </div>
          <div className="mb-4">
            <p className="text-3xl font-bold text-primary">$1.650.000</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incomeData} margin={{ left: 0, right: 0 }}>
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {incomeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === incomeData.length - 1 ? 'var(--color-primary)' : 'var(--color-gray-light)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-2">
            {incomeData.map((item) => (
              <span key={item.month} className="text-xs text-gray-500 text-center flex-1">{item.month}</span>
            ))}
          </div>
        </div>

        {/* Expenses Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-dark">Tipo de gastos</h3>
            <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
              <option>Mensual</option>
              <option>Semanal</option>
              <option>Anual</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div className="relative" style={{ width: 180, height: 180 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={expensesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {expensesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold text-secondary">$950.000</p>
              </div>
            </div>
            <div className="space-y-3">
              {expensesData.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="text-sm text-gray-600">{item.name}</p>
                    <p className="text-lg font-bold text-dark">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                      transaction.type === 'income' ? 'bg-gradient-to-br from-secondary/20 to-primary/20 text-secondary' : 'bg-gradient-to-br from-gray-light to-gray text-gray-600'
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
