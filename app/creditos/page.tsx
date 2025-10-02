import Link from 'next/link';
import { loans } from '@/lib/data';

export default function CreditosPage() {
  const totalDebt = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalMonthlyPayment = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8">Mis Créditos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Deuda Total</p>
          <p className="text-3xl font-bold text-dark">${totalDebt.toLocaleString('es-CL')}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Pago Mensual Total</p>
          <p className="text-3xl font-bold text-primary">${totalMonthlyPayment.toLocaleString('es-CL')}</p>
        </div>
      </div>

      <div className="space-y-6">
        {loans.map((loan) => (
          <Link key={loan.id} href={`/creditos/${loan.id}`} className="block">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.01]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-dark mb-1">{loan.type}</h3>
                  <p className="text-sm text-gray-500">Tasa de interés: {loan.interestRate}%</p>
                </div>
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Activo
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Saldo adeudado</p>
                  <p className="text-2xl font-bold text-dark">${loan.balance.toLocaleString('es-CL')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cuota mensual</p>
                  <p className="text-2xl font-bold text-dark">${loan.monthlyPayment.toLocaleString('es-CL')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Próximo vencimiento</p>
                  <p className="text-2xl font-bold text-primary">{loan.dueDate}</p>
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
          <Link href="/pagar" className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors">
            <span>Pagar cuota</span>
          </Link>
          <button className="flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-light transition-colors">
            <span>Simular prepago</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
            <span>Solicitar nuevo crédito</span>
          </button>
        </div>
      </div>
    </div>
  );
}
