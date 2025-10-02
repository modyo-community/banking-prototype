'use client';

import { useState } from 'react';
import Link from 'next/link';
import { accounts, cards, loans } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

export default function PagarPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const idParam = searchParams.get('id');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    paymentType: typeParam || 'card',
    itemId: idParam || '',
    fromAccount: '',
    amount: '',
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Simulate payment
      setTimeout(() => {
        setPaymentSuccess(true);
        setStep(4);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNewPayment = () => {
    setStep(1);
    setFormData({
      paymentType: 'card',
      itemId: '',
      fromAccount: '',
      amount: '',
    });
    setPaymentSuccess(false);
  };

  const selectedItem = formData.paymentType === 'card'
    ? cards.find(c => c.id.toString() === formData.itemId)
    : loans.find(l => l.id.toString() === formData.itemId);

  const selectedAccount = accounts.find(acc => acc.id.toString() === formData.fromAccount);

  if (paymentSuccess && step === 4) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">Pago exitoso</h2>
            <p className="text-gray-600 mb-6">Tu pago ha sido procesado correctamente</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monto pagado</span>
                  <span className="font-bold text-dark">${parseInt(formData.amount).toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pagado desde</span>
                  <span className="font-bold text-dark">{selectedAccount?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pagado a</span>
                  <span className="font-bold text-dark">
                    {formData.paymentType === 'card' ? (selectedItem as any)?.name : (selectedItem as any)?.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleNewPayment}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
              >
                Realizar otro pago
              </button>
              <Link href="/" className="flex-1 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium text-center">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link href="/" className="text-primary hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>

      <h1 className="text-3xl font-bold text-dark mb-8">Pagar</h1>

      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > s ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-dark mb-6">¿Qué deseas pagar?</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de pago
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentType: 'card', itemId: '' })}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      formData.paymentType === 'card'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <p className="font-bold">Tarjeta de crédito</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentType: 'loan', itemId: '' })}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      formData.paymentType === 'loan'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <p className="font-bold">Crédito</p>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.paymentType === 'card' ? 'Selecciona tu tarjeta' : 'Selecciona tu crédito'}
                </label>
                <select
                  value={formData.itemId}
                  onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  {formData.paymentType === 'card' ? (
                    cards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.name} - {card.number} (${Math.abs(card.balance).toLocaleString('es-CL')})
                      </option>
                    ))
                  ) : (
                    loans.map((loan) => (
                      <option key={loan.id} value={loan.id}>
                        {loan.type} (${loan.balance.toLocaleString('es-CL')})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <button
                type="submit"
                disabled={!formData.itemId}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-dark mb-6">Datos del pago</h2>

              {selectedItem && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-1">
                    {formData.paymentType === 'card' ? 'Tarjeta seleccionada' : 'Crédito seleccionado'}
                  </p>
                  <p className="text-lg font-bold text-dark">
                    {formData.paymentType === 'card' ? (selectedItem as any).name : (selectedItem as any).type}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Saldo: ${Math.abs((selectedItem as any).balance).toLocaleString('es-CL')}</p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuenta de origen
                </label>
                <select
                  value={formData.fromAccount}
                  onChange={(e) => setFormData({ ...formData, fromAccount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Selecciona una cuenta</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.type} - {account.number} (${account.balance.toLocaleString('es-CL')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto a pagar
                </label>
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, amount: Math.abs((selectedItem as any).balance).toString() })}
                    className="px-4 py-2 bg-gray-100 text-dark rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Pago total
                  </button>
                  {formData.paymentType === 'loan' && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, amount: (selectedItem as any).monthlyPayment.toString() })}
                      className="px-4 py-2 bg-gray-100 text-dark rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Cuota mínima
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>
                {selectedAccount && formData.amount && parseInt(formData.amount) > selectedAccount.balance && (
                  <p className="text-red-500 text-sm mt-1">Saldo insuficiente</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={!formData.fromAccount || !formData.amount || (selectedAccount && parseInt(formData.amount) > selectedAccount.balance)}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-dark mb-6">Confirmar pago</h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cuenta de origen</span>
                    <span className="font-bold text-dark">{selectedAccount?.type} - {selectedAccount?.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pagar a</span>
                    <span className="font-bold text-dark">
                      {formData.paymentType === 'card' ? (selectedItem as any)?.name : (selectedItem as any)?.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monto a pagar</span>
                    <span className="font-bold text-primary text-2xl">${parseInt(formData.amount).toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nuevo saldo</span>
                    <span className="font-bold text-dark">
                      ${(Math.abs((selectedItem as any).balance) - parseInt(formData.amount)).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
                >
                  Confirmar y pagar
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
