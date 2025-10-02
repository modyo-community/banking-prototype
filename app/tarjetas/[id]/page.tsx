'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cards } from '@/lib/data';
import { use } from 'react';

export default function TarjetaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedCardIndex, setSelectedCardIndex] = useState(cards.findIndex(c => c.id === parseInt(id)));
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
            <div
              className="rounded-xl p-8 shadow-lg text-white h-60 flex flex-col justify-between"
              style={{ backgroundColor: selectedCard.color }}
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

            {/* Carousel Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow text-dark font-medium"
              >
                ← Anterior
              </button>
              <div className="flex space-x-2 items-center">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCardIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedCardIndex ? 'bg-primary w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow text-dark font-medium"
              >
                Siguiente →
              </button>
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
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-dark mb-4">Últimos movimientos</h2>
            <div className="space-y-3">
              {[
                { date: '2025-10-01', description: 'Supermercado Central', amount: -45000 },
                { date: '2025-09-30', description: 'Gasolinera Shell', amount: -35000 },
                { date: '2025-09-29', description: 'Netflix', amount: -12000 },
                { date: '2025-09-28', description: 'Pago realizado', amount: 150000 },
              ].map((transaction, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-dark">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <p className={`font-bold ${transaction.amount > 0 ? 'text-dark' : 'text-dark'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('es-CL')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
