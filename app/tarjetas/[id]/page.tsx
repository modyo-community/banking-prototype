'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cards } from '@/lib/data';
import { use } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon, GasIcon, FilmIcon, CashIcon } from '@/components/icons';

export default function TarjetaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedCardIndex, setSelectedCardIndex] = useState(cards.findIndex(c => c.id === parseInt(id)));
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(null);
  const selectedCard = cards[selectedCardIndex];

  const handlePrevious = () => {
    setSelectedCardIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleNext = () => {
    setSelectedCardIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  if (!selectedCard) {
    return (
      <div className="p-8">
        <p>Tarjeta no encontrada</p>
        <Link href="/tarjetas" className="text-primary hover:underline">Volver a tarjetas</Link>
      </div>
    );
  }

  const availableCredit = selectedCard.limit - Math.abs(selectedCard.balance);
  const usagePercentage = (Math.abs(selectedCard.balance) / selectedCard.limit) * 100;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Link href="/tarjetas" className="text-primary hover:underline mb-4 inline-block">&larr; Volver a tarjetas</Link>

      <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8">Detalle de Tarjeta</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Card Carousel */}
        <div>
          <div className="relative">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-[120px] -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 text-dark"
              aria-label="Tarjeta anterior"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Card */}
            <div
              className="rounded-xl p-8 shadow-lg text-white h-60 flex flex-col justify-between transition-all duration-300"
              style={{ background: selectedCard.gradient }}
            >
              <div>
                <p className="text-xl font-semibold opacity-90 mb-2">{selectedCard.name}</p>
                <p className="text-sm opacity-75">{selectedCard.number}</p>
              </div>

              <div>
                <p className="text-sm opacity-75 mb-1">Saldo actual</p>
                <p className="text-4xl font-bold">${Math.abs(selectedCard.balance).toLocaleString('es-CL')}</p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-[120px] -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 text-dark"
              aria-label="Tarjeta siguiente"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCardIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === selectedCardIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Ir a tarjeta ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-3">
            <Link
              href={`/pagar?type=card&id=${selectedCard.id}`}
              className="block w-full bg-primary text-white text-center px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
            >
              Pagar esta tarjeta
            </Link>
            <button className="w-full border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
              Bloquear tarjeta
            </button>
          </div>
        </div>

        {/* Card Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-dark mb-4">Información</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Límite de crédito</span>
                <span className="font-bold text-dark">${selectedCard.limit.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saldo utilizado</span>
                <span className="font-bold text-dark">${Math.abs(selectedCard.balance).toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Crédito disponible</span>
                <span className="font-bold text-dark">${availableCredit.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha de pago</span>
                <span className="font-bold text-dark">{selectedCard.dueDate}</span>
              </div>
            </div>

            {/* Usage Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Uso del cupo</span>
                <span>{usagePercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-dark">Últimos movimientos</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { id: 1, date: '2025-10-01', time: '18:45', description: 'Supermercado Central', detail: 'Compra con tarjeta', amount: -45000, category: 'Alimentación' },
                { id: 2, date: '2025-09-30', time: '11:05', description: 'Shell Copec', detail: 'Estación de servicio', amount: -35000, category: 'Combustible' },
                { id: 3, date: '2025-09-29', time: '20:30', description: 'Netflix', detail: 'Suscripción mensual', amount: -12000, category: 'Entretenimiento' },
                { id: 4, date: '2025-09-28', time: '09:00', description: 'Pago realizado', detail: 'Desde cuenta corriente', amount: 150000, category: 'Pago' },
              ].map((transaction) => {
                const isExpanded = expandedTransaction === transaction.id;
                return (
                  <div key={transaction.id} className="border-b border-gray-100 last:border-0">
                    <div
                      className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setExpandedTransaction(isExpanded ? null : transaction.id)}
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {transaction.category === 'Alimentación' && <ShoppingCartIcon />}
                          {transaction.category === 'Combustible' && <GasIcon />}
                          {transaction.category === 'Entretenimiento' && <FilmIcon />}
                          {transaction.category === 'Pago' && <CashIcon />}
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
                            <span className="text-sm font-medium text-dark">{transaction.amount > 0 ? 'Pago recibido' : 'Cargo'}</span>
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
      </div>
    </div>
  );
}
