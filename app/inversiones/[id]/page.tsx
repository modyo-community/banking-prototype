import Link from 'next/link';
import { investments } from '@/lib/data';
import { use } from 'react';

export default function InversionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const investment = investments.find(inv => inv.id === parseInt(id));

  if (!investment) {
    return (
      <div className="p-8">
        <p>Inversión no encontrada</p>
        <Link href="/inversiones" className="text-primary hover:underline">Volver a inversiones</Link>
      </div>
    );
  }

  const earnings = (investment.amount * investment.return) / 100;
  const currentValue = investment.amount + earnings;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Link href="/inversiones" className="text-primary hover:underline mb-4 inline-block">&larr; Volver a inversiones</Link>

      <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8">{investment.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="lg:col-span-2 bg-secondary rounded-xl p-6 md:p-8 shadow-lg text-white">
          <p className="text-sm opacity-90 mb-1">{investment.name}</p>
          <p className="text-sm opacity-75 mb-6">
            {investment.type === 'fixed' ? 'Renta Fija' : 'Renta Variable'}
          </p>
          <p className="text-sm opacity-90 mb-2">Valor actual</p>
          <p className="text-4xl md:text-5xl font-bold">${currentValue.toLocaleString('es-CL')}</p>
          <div className="mt-6 flex items-center space-x-4">
            <div>
              <p className="text-sm opacity-90">Rentabilidad</p>
              <p className="text-2xl font-bold">{investment.return > 0 ? '+' : ''}{investment.return}%</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Ganancia</p>
              <p className="text-2xl font-bold">${Math.abs(earnings).toLocaleString('es-CL')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary-light transition-colors font-medium">
            Aumentar inversión
          </button>
          <button className="w-full border-2 border-primary text-primary px-6 py-4 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
            Rescatar inversión
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-dark mb-4">Información de la inversión</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo</span>
              <span className="font-bold text-dark">
                {investment.type === 'fixed' ? 'Renta Fija' : 'Renta Variable'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monto invertido</span>
              <span className="font-bold text-dark">${investment.amount.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rentabilidad</span>
              <span className={`font-bold ${investment.return > 0 ? 'text-dark' : 'text-dark'}`}>
                {investment.return > 0 ? '+' : ''}{investment.return}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ganancia/Pérdida</span>
              <span className={`font-bold ${earnings > 0 ? 'text-dark' : 'text-dark'}`}>
                {earnings > 0 ? '+' : ''}${Math.abs(earnings).toLocaleString('es-CL')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vencimiento</span>
              <span className="font-bold text-dark">{investment.maturity}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-dark mb-4">Rendimiento histórico</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Último mes</span>
              <span className="font-bold text-dark">+1.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Últimos 3 meses</span>
              <span className="font-bold text-dark">+{(investment.return / 2).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Año actual</span>
              <span className={`font-bold ${investment.return > 0 ? 'text-dark' : 'text-dark'}`}>
                {investment.return > 0 ? '+' : ''}{investment.return}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-dark mb-4">Historial de movimientos</h2>
        <div className="divide-y divide-gray-100">
          {[
            { date: '2025-10-01', description: 'Aporte mensual', amount: investment.amount * 0.1, type: 'deposit' },
            { date: '2025-09-15', description: 'Rentabilidad generada', amount: earnings / 3, type: 'earning' },
            { date: '2025-09-01', description: 'Aporte mensual', amount: investment.amount * 0.1, type: 'deposit' },
            { date: '2025-08-15', description: 'Rentabilidad generada', amount: earnings / 3, type: 'earning' },
          ].map((movement, index) => (
            <div key={index} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-dark">{movement.description}</p>
                <p className="text-sm text-gray-500">{movement.date}</p>
              </div>
              <p className="text-xl font-bold text-dark">
                {movement.type === 'earning' ? '+' : ''}${Math.abs(movement.amount).toLocaleString('es-CL')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
