'use client';

import { useState } from 'react';
import Link from 'next/link';
import { accounts } from '@/lib/data';
import { use } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, WalletIcon, BriefcaseIcon, ArrowDownIcon, CashIcon, ShoppingCartIcon, LightningIcon } from '@/components/icons';

export default function CuentaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(accounts.findIndex(acc => acc.id === parseInt(id)));
  const selectedAccount = accounts[selectedAccountIndex];

  const handlePrevious = () => {
    setSelectedAccountIndex((prev) => (prev > 0 ? prev - 1 : accounts.length - 1));
  };

  const handleNext = () => {
    setSelectedAccountIndex((prev) => (prev < accounts.length - 1 ? prev + 1 : 0));
  };

  if (!selectedAccount) {
    return (
      <div className="p-8">
        <p>Cuenta no encontrada</p>
        <Link href="/" className="text-primary hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  // Generate transactions based on account type
  const getTransactionsForAccount = (account: typeof selectedAccount) => {
    if (account.type === 'Cuenta Corriente') {
      return [
        { id: 1, date: '2025-10-02', time: '14:32', description: 'Transferencia recibida', detail: 'De: María González', amount: 250000, type: 'income', category: 'Transferencia', balance: account.balance },
        { id: 2, date: '2025-10-01', time: '18:45', description: 'Supermercado Jumbo', detail: 'Compra con tarjeta ****3456', amount: -85000, type: 'expense', category: 'Alimentación', balance: account.balance - 250000 },
        { id: 3, date: '2025-09-30', time: '16:20', description: 'Enel Distribución Chile', detail: 'Cuenta de luz - Sep 2025', amount: -45000, type: 'expense', category: 'Servicios', balance: account.balance - 165000 },
        { id: 4, date: '2025-09-29', time: '12:00', description: 'Depósito efectivo', detail: 'Sucursal Portal La Dehesa', amount: 150000, type: 'income', category: 'Depósito', balance: account.balance - 120000 },
        { id: 5, date: '2025-09-28', time: '10:15', description: 'Transferencia enviada', detail: 'A: Pedro Martínez', amount: -120000, type: 'expense', category: 'Transferencia', balance: account.balance + 30000 },
        { id: 6, date: '2025-09-27', time: '08:45', description: 'Abono sueldo', detail: 'Empresa S.A.', amount: 1500000, type: 'income', category: 'Sueldo', balance: account.balance - 1350000 },
      ];
    } else if (account.type === 'Cuenta Vista') {
      return [
        { id: 1, date: '2025-10-02', time: '10:20', description: 'Compra en farmacia', detail: 'Farmacia Cruz Verde', amount: -25000, type: 'expense', category: 'Servicios', balance: account.balance },
        { id: 2, date: '2025-10-01', time: '15:30', description: 'Transferencia recibida', detail: 'De: Ana Silva', amount: 100000, type: 'income', category: 'Transferencia', balance: account.balance - 100000 },
        { id: 3, date: '2025-09-30', time: '12:15', description: 'Compra online', detail: 'Amazon', amount: -35000, type: 'expense', category: 'Alimentación', balance: account.balance - 65000 },
        { id: 4, date: '2025-09-29', time: '18:00', description: 'Depósito cajero', detail: 'Cajero automático', amount: 50000, type: 'income', category: 'Depósito', balance: account.balance - 15000 },
      ];
    } else { // Cuenta Ahorro
      return [
        { id: 1, date: '2025-10-01', time: '09:00', description: 'Intereses ganados', detail: 'Interés mensual', amount: 45000, type: 'income', category: 'Depósito', balance: account.balance },
        { id: 2, date: '2025-09-15', time: '11:30', description: 'Depósito programado', detail: 'Ahorro automático', amount: 200000, type: 'income', category: 'Depósito', balance: account.balance - 45000 },
        { id: 3, date: '2025-09-01', time: '09:00', description: 'Intereses ganados', detail: 'Interés mensual', amount: 43000, type: 'income', category: 'Depósito', balance: account.balance - 245000 },
        { id: 4, date: '2025-08-15', time: '11:30', description: 'Depósito programado', detail: 'Ahorro automático', amount: 200000, type: 'income', category: 'Depósito', balance: account.balance - 288000 },
      ];
    }
  };

  const transactions = getTransactionsForAccount(selectedAccount);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Link href="/" className="text-primary hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>

      <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8">Detalle de Cuenta</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Account Summary with Carousel */}
        <div>
          <div className="relative">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-[90px] -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 text-dark"
              aria-label="Cuenta anterior"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Account Summary Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-dark">{selectedAccount.type}</p>
                  <p className="text-sm text-gray-500">{selectedAccount.number}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Saldo disponible</p>
                <p className="text-4xl font-bold text-dark">${selectedAccount.balance.toLocaleString('es-CL')}</p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-[90px] -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 text-dark"
              aria-label="Cuenta siguiente"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {accounts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAccountIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === selectedAccountIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Ir a cuenta ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-3">
            <Link
              href={`/transferir?from=${selectedAccount.id}`}
              className="block w-full bg-primary text-white text-center px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
            >
              Transferir desde esta cuenta
            </Link>
            <button className="w-full border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
              Descargar cartola
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-dark">Movimientos recientes</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {transaction.category === 'Sueldo' && <BriefcaseIcon />}
                      {transaction.category === 'Transferencia' && <ArrowDownIcon />}
                      {transaction.category === 'Depósito' && <CashIcon />}
                      {transaction.category === 'Alimentación' && <ShoppingCartIcon />}
                      {transaction.category === 'Servicios' && <LightningIcon />}
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
      </div>
    </div>
  );
}
