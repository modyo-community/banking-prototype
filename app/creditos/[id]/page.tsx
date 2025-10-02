import Link from 'next/link';
import { loans } from '@/lib/data';
import { use } from 'react';

export default function CreditoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const loan = loans.find(l => l.id === parseInt(id));

  if (!loan) {
    return (
      <div className="p-8">
        <p>Crédito no encontrado</p>
        <Link href="/creditos" className="text-primary hover:underline">Volver a créditos</Link>
      </div>
    );
  }

  const paymentHistory = [
    { id: 1, date: '2025-09-05', amount: loan.monthlyPayment, status: 'Pagado', balance: loan.balance },
    { id: 2, date: '2025-08-05', amount: loan.monthlyPayment, status: 'Pagado', balance: loan.balance + loan.monthlyPayment },
    { id: 3, date: '2025-07-05', amount: loan.monthlyPayment, status: 'Pagado', balance: loan.balance + (loan.monthlyPayment * 2) },
    { id: 4, date: '2025-06-05', amount: loan.monthlyPayment, status: 'Pagado', balance: loan.balance + (loan.monthlyPayment * 3) },
  ];

  const estimatedMonths = Math.ceil(loan.balance / loan.monthlyPayment);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Link href="/creditos" className="text-primary hover:underline mb-4 inline-block">&larr; Volver a créditos</Link>

      <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8">{loan.type}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="lg:col-span-2 bg-primary rounded-xl p-6 md:p-8 shadow-lg text-white">
          <p className="text-sm opacity-90 mb-1">{loan.type}</p>
          <p className="text-sm opacity-75 mb-6">Tasa: {loan.interestRate}% anual</p>
          <p className="text-sm opacity-90 mb-2">Saldo adeudado</p>
          <p className="text-4xl md:text-5xl font-bold">${loan.balance.toLocaleString('es-CL')}</p>
          <p className="text-sm opacity-90 mt-6">Cuota mensual: ${loan.monthlyPayment.toLocaleString('es-CL')}</p>
        </div>

        <div className="space-y-4">
          <Link
            href={`/pagar?type=loan&id=${loan.id}`}
            className="block w-full bg-primary text-white text-center px-6 py-4 rounded-lg hover:bg-primary-light transition-colors font-medium"
          >
            Pagar cuota
          </Link>
          <button className="w-full bg-secondary text-white px-6 py-4 rounded-lg hover:bg-secondary-light transition-colors font-medium">
            Prepagar crédito
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-dark mb-4">Información del crédito</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa de interés</span>
              <span className="font-bold text-dark">{loan.interestRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cuota mensual</span>
              <span className="font-bold text-dark">${loan.monthlyPayment.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Próximo vencimiento</span>
              <span className="font-bold text-primary">{loan.dueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meses estimados restantes</span>
              <span className="font-bold text-dark">{estimatedMonths} meses</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-dark mb-4">Simulación de prepago</h2>
          <p className="text-sm text-gray-600 mb-4">
            Si realizas un prepago adicional, podrías reducir el tiempo de pago o el monto de tus cuotas.
          </p>
          <button className="w-full bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-light transition-colors font-medium">
            Simular prepago
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-dark">Historial de pagos</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold text-dark mb-1">Pago de cuota</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xl font-bold text-dark">${payment.amount.toLocaleString('es-CL')}</p>
                  <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium mt-1">
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
