import { redirect } from 'next/navigation';
import { cards } from '@/lib/data';

export default function TarjetasPage() {
  if (cards.length > 0) {
    redirect(`/tarjetas/${cards[0].id}`);
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8">Mis Tarjetas</h1>
      <p className="text-gray-600">No hay tarjetas disponibles</p>
    </div>
  );
}
