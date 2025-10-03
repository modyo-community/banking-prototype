'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HistorialPage() {
  const [tab, setTab] = useState<'sent' | 'received'>('sent');

  // Mock transfer history data
  const sentTransfers = [
    { id: 1, date: '2025-10-02', time: '14:32', recipient: 'María González', bank: 'Banco de Chile', account: '****7890', amount: 250000, status: 'Completada' },
    { id: 2, date: '2025-09-28', time: '10:15', recipient: 'Pedro Martínez', bank: 'Banco Estado', account: '****3210', amount: 120000, status: 'Completada' },
    { id: 3, date: '2025-09-20', time: '16:45', recipient: 'Ana Silva', bank: 'Banco Santander', account: '****6677', amount: 85000, status: 'Completada' },
    { id: 4, date: '2025-09-15', time: '11:20', recipient: 'Carlos Rojas', bank: 'Banco BCI', account: '****2233', amount: 150000, status: 'Completada' },
    { id: 5, date: '2025-09-10', time: '09:30', recipient: 'Laura Torres', bank: 'Banco Scotiabank', account: '****4455', amount: 95000, status: 'Completada' },
    { id: 6, date: '2025-09-05', time: '15:50', recipient: 'María González', bank: 'Banco de Chile', account: '****7890', amount: 200000, status: 'Completada' },
  ];

  const receivedTransfers = [
    { id: 1, date: '2025-10-01', time: '09:15', sender: 'Empresa S.A.', bank: 'Banco de Chile', account: '****1234', amount: 1500000, status: 'Completada', concept: 'Sueldo Septiembre' },
    { id: 2, date: '2025-09-25', time: '18:30', sender: 'María González', bank: 'Banco de Chile', account: '****7890', amount: 50000, status: 'Completada', concept: 'Pago compartido' },
    { id: 3, date: '2025-09-18', time: '14:00', sender: 'Ana Silva', bank: 'Banco Santander', account: '****6677', amount: 75000, status: 'Completada', concept: 'Devolución' },
    { id: 4, date: '2025-09-10', time: '11:45', sender: 'Pedro Martínez', bank: 'Banco Estado', account: '****3210', amount: 100000, status: 'Completada', concept: 'Regalo cumpleaños' },
    { id: 5, date: '2025-09-01', time: '09:00', sender: 'Empresa S.A.', bank: 'Banco de Chile', account: '****1234', amount: 1500000, status: 'Completada', concept: 'Sueldo Agosto' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Link href="/transferir" className="text-primary hover:underline mb-4 inline-block">&larr; Volver a transferir</Link>

      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2">Historial de Transferencias</h1>
          <p className="text-gray-600">Revisa tus transferencias realizadas y recibidas</p>
        </div>
        <Link
          href="/transferir"
          className="bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
        >
          Nueva transferencia
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg max-w-md">
        <button
          onClick={() => setTab('sent')}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
            tab === 'sent'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Enviadas
        </button>
        <button
          onClick={() => setTab('received')}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
            tab === 'received'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Recibidas
        </button>
      </div>

      {/* Transfer History Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {tab === 'sent' ? 'Destinatario' : 'Remitente'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banco</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta</th>
                {tab === 'received' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
                )}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tab === 'sent' && sentTransfers.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transfer.date}</div>
                    <div className="text-xs text-gray-500">{transfer.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{transfer.recipient}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{transfer.bank}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{transfer.account}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-bold text-dark">-${transfer.amount.toLocaleString('es-CL')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {transfer.status}
                    </span>
                  </td>
                </tr>
              ))}
              {tab === 'received' && receivedTransfers.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transfer.date}</div>
                    <div className="text-xs text-gray-500">{transfer.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{transfer.sender}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{transfer.bank}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{transfer.account}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{transfer.concept}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-bold text-secondary">+${transfer.amount.toLocaleString('es-CL')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {transfer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {((tab === 'sent' && sentTransfers.length === 0) || (tab === 'received' && receivedTransfers.length === 0)) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay transferencias {tab === 'sent' ? 'enviadas' : 'recibidas'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
