import Link from 'next/link';
import { investments } from '@/lib/data';

export default function InversionesPage() {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const fixedInvestments = investments.filter(inv => inv.type === 'fixed');
  const variableInvestments = investments.filter(inv => inv.type === 'variable');

  const totalFixed = fixedInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalVariable = variableInvestments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8">Mis Inversiones</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary rounded-xl p-6 shadow-lg text-white">
          <p className="text-sm opacity-90 mb-2">Total Invertido</p>
          <p className="text-3xl font-bold">${totalInvested.toLocaleString('es-CL')}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Renta Fija</p>
          <p className="text-3xl font-bold text-dark">${totalFixed.toLocaleString('es-CL')}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Renta Variable</p>
          <p className="text-3xl font-bold text-primary">${totalVariable.toLocaleString('es-CL')}</p>
        </div>
      </div>

      {/* Fixed Income Investments */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark mb-4">Renta Fija</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fixedInvestments.map((investment) => (
            <Link key={investment.id} href={`/inversiones/${investment.id}`}>
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-1">{investment.name}</h3>
                    <p className="text-sm text-gray-500">{investment.maturity}</p>
                  </div>
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                    +{investment.return}%
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Monto invertido</p>
                  <p className="text-2xl font-bold text-dark">${investment.amount.toLocaleString('es-CL')}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-primary hover:underline">Ver detalles →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Variable Income Investments */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark mb-4">Renta Variable</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {variableInvestments.map((investment) => (
            <Link key={investment.id} href={`/inversiones/${investment.id}`}>
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-1">{investment.name}</h3>
                    <p className="text-sm text-gray-500">{investment.maturity}</p>
                  </div>
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {investment.return > 0 ? '+' : ''}{investment.return}%
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Monto invertido</p>
                  <p className="text-2xl font-bold text-dark">${investment.amount.toLocaleString('es-CL')}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-primary hover:underline">Ver detalles →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-dark mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors">
            <span>Nueva inversión</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-light transition-colors">
            <span>Ver rentabilidad</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
            <span>Asesoría personalizada</span>
          </button>
        </div>
      </div>
    </div>
  );
}
