import Link from 'next/link';
import { accounts } from '@/lib/data';
import { use } from 'react';

export default function CuentaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const account = accounts.find(acc => acc.id === parseInt(id));

  if (!account) {
    return (
      <div className="p-8">
        <p>Cuenta no encontrada</p>
        <Link href="/cuentas" className="text-primary hover:underline">Volver a cuentas</Link>
      </div>
    );
  }

  const transactions = [
    { id: 1, date: '2025-10-02', description: 'Transferencia recibida', amount: 250000, type: 'income', balance: account.balance },
    { id: 2, date: '2025-10-01', description: 'Compra en comercio', amount: -85000, type: 'expense', balance: account.balance - 250000 },
    { id: 3, date: '2025-09-30', description: 'Pago de servicios', amount: -45000, type: 'expense', balance: account.balance - 165000 },
    { id: 4, date: '2025-09-29', description: 'Depósito efectivo', amount: 150000, type: 'income', balance: account.balance - 120000 },
    { id: 5, date: '2025-09-28', description: 'Transferencia realizada', amount: -120000, type: 'expense', balance: account.balance + 30000 },
    { id: 6, date: '2025-09-27', description: 'Abono sueldo', amount: 1500000, type: 'income', balance: account.balance - 1350000 },
  ];

  return (
    <div className="p-8">
      <Link href="/cuentas" className="text-primary hover:underline mb-4 inline-block">&larr; Volver a cuentas</Link>

      <h1 className="text-3xl font-bold text-dark mb-8">Detalle de Cuenta</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-primary rounded-xl p-8 shadow-lg text-white">
          <p className="text-sm opacity-90 mb-1">{account.type}</p>
          <p className="text-sm opacity-75 mb-6">{account.number}</p>
          <p className="text-sm opacity-90 mb-2">Saldo disponible</p>
          <p className="text-5xl font-bold">${account.balance.toLocaleString('es-CL')}</p>
        </div>

        <div className="space-y-4">
          <Link
            href={`/transferir?from=${account.id}`}
            className="block w-full bg-white text-primary text-center px-6 py-4 rounded-lg hover:shadow-md transition-shadow font-medium border-2 border-primary"
          >
            Transferir desde esta cuenta
          </Link>
          <button className="w-full bg-secondary text-white px-6 py-4 rounded-lg hover:bg-secondary-light transition-colors font-medium">
            Descargar cartola
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-dark">Movimientos</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold text-dark mb-1">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div className="text-right ml-4">
                  <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-dark' : 'text-dark'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('es-CL')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Saldo: ${transaction.balance.toLocaleString('es-CL')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
