import Link from 'next/link';
import { insurances } from '@/lib/data';
import { use } from 'react';

export default function SeguroDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const insurance = insurances.find(ins => ins.id === parseInt(id));

  if (!insurance) {
    return (
      <div className="p-8">
        <p>Seguro no encontrado</p>
        <Link href="/seguros" className="text-primary hover:underline">Volver a seguros</Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link href="/seguros" className="text-primary hover:underline mb-4 inline-block">&larr; Volver a seguros</Link>

      <h1 className="text-3xl font-bold text-dark mb-8">{insurance.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-secondary to-secondary-light rounded-xl p-8 shadow-lg text-white">
          <p className="text-sm opacity-90 mb-1">{insurance.name}</p>
          <p className="text-sm opacity-75 mb-6">Estado: {insurance.status}</p>
          <p className="text-sm opacity-90 mb-2">Cobertura total</p>
          <p className="text-5xl font-bold">${insurance.coverage.toLocaleString('es-CL')}</p>
          <p className="text-sm opacity-90 mt-6">Prima mensual: ${insurance.premium.toLocaleString('es-CL')}</p>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary-light transition-colors font-medium">
            Solicitar indemnización
          </button>
          <button className="w-full border-2 border-primary text-primary px-6 py-4 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
            Descargar póliza
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-dark mb-4">Información del seguro</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo de seguro</span>
              <span className="font-bold text-dark">{insurance.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cobertura</span>
              <span className="font-bold text-dark">${insurance.coverage.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Prima mensual</span>
              <span className="font-bold text-dark">${insurance.premium.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado</span>
              <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium">
                {insurance.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-dark mb-4">Beneficios principales</h2>
          <ul className="space-y-3">
            {insurance.name === 'Seguro de Vida' && (
              <>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-gray-700">Cobertura por fallecimiento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-gray-700">Invalidez total y permanente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-gray-700">Asistencia funeraria</span>
                </li>
              </>
            )}
            {insurance.name === 'Seguro de Salud' && (
              <>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-gray-700">Hospitalización</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-gray-700">Cirugías</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-gray-700">Medicamentos</span>
                </li>
              </>
            )}
            {insurance.name === 'Seguro Automotriz' && (
              <>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-gray-700">Daños propios y a terceros</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-gray-700">Robo total</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span className="text-gray-700">Asistencia en ruta 24/7</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-dark mb-4">Historial de pagos</h2>
        <div className="divide-y divide-gray-100">
          {[
            { date: '2025-10-01', amount: insurance.premium, status: 'Pagado' },
            { date: '2025-09-01', amount: insurance.premium, status: 'Pagado' },
            { date: '2025-08-01', amount: insurance.premium, status: 'Pagado' },
            { date: '2025-07-01', amount: insurance.premium, status: 'Pagado' },
          ].map((payment, index) => (
            <div key={index} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-dark">Pago de prima</p>
                <p className="text-sm text-gray-500">{payment.date}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-dark">${payment.amount.toLocaleString('es-CL')}</p>
                <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium mt-1">
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
