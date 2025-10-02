import Link from 'next/link';
import { insurances } from '@/lib/data';

export default function SegurosPage() {
  const totalPremium = insurances.reduce((sum, ins) => sum + ins.premium, 0);
  const totalCoverage = insurances.reduce((sum, ins) => sum + ins.coverage, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-dark mb-8">Mis Seguros</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Cobertura Total</p>
          <p className="text-3xl font-bold text-dark">${totalCoverage.toLocaleString('es-CL')}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Prima Mensual Total</p>
          <p className="text-3xl font-bold text-primary">${totalPremium.toLocaleString('es-CL')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insurances.map((insurance) => (
          <Link key={insurance.id} href={`/seguros/${insurance.id}`}>
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-dark">{insurance.name}</h3>
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium">
                  {insurance.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cobertura</p>
                  <p className="text-2xl font-bold text-dark">${insurance.coverage.toLocaleString('es-CL')}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Prima mensual</p>
                  <p className="text-xl font-bold text-dark">${insurance.premium.toLocaleString('es-CL')}</p>
                </div>
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
          <button className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors">
            <span>Solicitar indemnización</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-light transition-colors">
            <span>Ver pólizas</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
            <span>Contratar nuevo seguro</span>
          </button>
        </div>
      </div>
    </div>
  );
}
