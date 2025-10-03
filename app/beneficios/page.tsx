'use client';

import { useState } from 'react';

export default function BeneficiosPage() {
  const [activeTab, setActiveTab] = useState<'points' | 'discounts' | 'cashback'>('points');

  const points = {
    total: 12450,
    expiring: 2000,
    expiringDate: '31 Dic 2025'
  };

  const discounts = [
    {
      category: 'Restaurantes',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      offers: [
        { name: 'Starbucks', discount: '15%', description: 'En toda la carta' },
        { name: 'McDonald\'s', discount: '20%', description: 'Combo del día' },
        { name: 'Subway', discount: '10%', description: 'En sándwiches seleccionados' }
      ]
    },
    {
      category: 'Entretenimiento',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>,
      offers: [
        { name: 'Cineplanet', discount: '25%', description: 'Entradas 2D y 3D' },
        { name: 'Netflix', discount: '1 mes gratis', description: 'Plan premium' },
        { name: 'Spotify', discount: '3 meses', description: 'Premium gratis' }
      ]
    },
    {
      category: 'Viajes',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
      offers: [
        { name: 'LATAM', discount: '15%', description: 'Vuelos nacionales' },
        { name: 'Booking.com', discount: '10%', description: 'Reservas de hotel' },
        { name: 'Hertz', discount: '20%', description: 'Arriendo de autos' }
      ]
    },
    {
      category: 'Compras',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
      offers: [
        { name: 'Falabella', discount: '10%', description: 'En todo el sitio' },
        { name: 'Ripley', discount: '15%', description: 'Electrónica' },
        { name: 'Paris', discount: '20%', description: 'Moda y calzado' }
      ]
    }
  ];

  const cashbackHistory = [
    { date: '1 Oct 2025', merchant: 'Supermercado', amount: 2500, status: 'acreditado' },
    { date: '28 Sep 2025', merchant: 'Farmacia', amount: 1200, status: 'acreditado' },
    { date: '25 Sep 2025', merchant: 'Restaurante', amount: 3400, status: 'pendiente' },
    { date: '20 Sep 2025', merchant: 'Gasolina', amount: 1800, status: 'acreditado' }
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6">Beneficios</h1>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg p-6 md:p-8 text-white mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-white/80 mb-1">Puntos disponibles</p>
              <p className="text-3xl font-bold">{points.total.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/80 mb-1">Cashback del mes</p>
              <p className="text-3xl font-bold">$8.900</p>
            </div>
            <div>
              <p className="text-white/80 mb-1">Descuentos activos</p>
              <p className="text-3xl font-bold">24</p>
            </div>
          </div>
          {points.expiring > 0 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Tienes {points.expiring.toLocaleString()} puntos que vencen el {points.expiringDate}
              </p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('points')}
            className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
              activeTab === 'points'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Puntos
          </button>
          <button
            onClick={() => setActiveTab('discounts')}
            className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
              activeTab === 'discounts'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Descuentos
          </button>
          <button
            onClick={() => setActiveTab('cashback')}
            className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
              activeTab === 'cashback'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cashback
          </button>
        </div>

        {/* Points Tab */}
        {activeTab === 'points' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-dark mb-4">Canjea tus puntos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <div className="mb-2 text-gray-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                  </div>
                  <h4 className="font-bold text-dark mb-1">Gift Cards</h4>
                  <p className="text-sm text-gray-600 mb-3">Desde 5.000 puntos</p>
                  <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">
                    Ver opciones
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <div className="mb-2 text-gray-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </div>
                  <h4 className="font-bold text-dark mb-1">Millas LATAM</h4>
                  <p className="text-sm text-gray-600 mb-3">1 punto = 1 milla</p>
                  <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">
                    Canjear
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <div className="mb-2 text-gray-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h4 className="font-bold text-dark mb-1">Descuento en deuda</h4>
                  <p className="text-sm text-gray-600 mb-3">100 puntos = $1.000</p>
                  <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">
                    Aplicar
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-dark mb-4">Historial de puntos</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-dark">Compra en supermercado</p>
                    <p className="text-sm text-gray-500">1 Oct 2025</p>
                  </div>
                  <p className="text-secondary font-bold">+250 pts</p>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-dark">Canje Gift Card Amazon</p>
                    <p className="text-sm text-gray-500">28 Sep 2025</p>
                  </div>
                  <p className="text-red-500 font-bold">-5.000 pts</p>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-dark">Pago de servicios</p>
                    <p className="text-sm text-gray-500">25 Sep 2025</p>
                  </div>
                  <p className="text-secondary font-bold">+150 pts</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Discounts Tab */}
        {activeTab === 'discounts' && (
          <div className="space-y-6">
            {discounts.map((category) => (
              <div key={category.category} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                  <span className="text-gray-600">{category.icon}</span>
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {category.offers.map((offer) => (
                    <div key={offer.name} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                      <h4 className="font-bold text-dark mb-1">{offer.name}</h4>
                      <p className="text-primary text-xl font-bold mb-1">{offer.discount}</p>
                      <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                      <button className="w-full px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium">
                        Ver detalles
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cashback Tab */}
        {activeTab === 'cashback' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-dark">Cashback disponible</h3>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium">
                  Transferir a cuenta
                </button>
              </div>
              <div className="text-center py-6 bg-gray-light rounded-lg">
                <p className="text-4xl font-bold text-primary mb-2">$8.900</p>
                <p className="text-gray-600">Disponible para transferir</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-dark mb-4">Historial de Cashback</h3>
              <div className="space-y-3">
                {cashbackHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-dark">{item.merchant}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${item.status === 'acreditado' ? 'text-secondary' : 'text-yellow-500'}`}>
                        ${item.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
