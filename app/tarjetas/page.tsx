import Link from 'next/link';
import { cards } from '@/lib/data';

export default function TarjetasPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8 animate-fade-in">Mis Tarjetas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link key={card.id} href={`/tarjetas/${card.id}`}>
            <div
              className="rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer text-white h-52 flex flex-col justify-between hover:scale-105 animate-slide-up"
              style={{ backgroundColor: card.color, animationDelay: `${index * 0.1}s` }}
            >
              <div>
                <p className="text-lg font-semibold opacity-90 mb-1">{card.name}</p>
                <p className="text-sm opacity-75">{card.number}</p>
              </div>

              <div>
                <p className="text-sm opacity-75 mb-1">Saldo actual</p>
                <p className="text-2xl md:text-3xl font-bold">${Math.abs(card.balance).toLocaleString('es-CL')}</p>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <p className="text-xs opacity-75">Cupo disponible</p>
                    <p className="text-sm font-semibold">${(card.limit - Math.abs(card.balance)).toLocaleString('es-CL')}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">Vencimiento</p>
                    <p className="text-sm font-semibold">{card.dueDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-dark mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/pagar" className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors">
            <span>Pagar tarjeta</span>
          </Link>
          <button className="flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-light transition-colors">
            <span>Ver movimientos</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
            <span>Solicitar aumento de cupo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
