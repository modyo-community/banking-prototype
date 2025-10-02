'use client';

import { useState } from 'react';
import Link from 'next/link';
import { accounts } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

export default function TransferirPage() {
  const searchParams = useSearchParams();
  const fromAccountId = searchParams.get('from');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromAccount: fromAccountId || '',
    toAccount: '',
    amount: '',
    description: '',
  });
  const [transferSuccess, setTransferSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Simulate transfer
      setTimeout(() => {
        setTransferSuccess(true);
        setStep(4);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNewTransfer = () => {
    setStep(1);
    setFormData({
      fromAccount: '',
      toAccount: '',
      amount: '',
      description: '',
    });
    setTransferSuccess(false);
  };

  const selectedAccount = accounts.find(acc => acc.id.toString() === formData.fromAccount);

  if (transferSuccess && step === 4) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">Transferencia exitosa</h2>
            <p className="text-gray-600 mb-6">Tu transferencia ha sido procesada correctamente</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monto</span>
                  <span className="font-bold text-dark">${parseInt(formData.amount).toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cuenta origen</span>
                  <span className="font-bold text-dark">{selectedAccount?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Destinatario</span>
                  <span className="font-bold text-dark">{formData.toAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Descripción</span>
                  <span className="font-bold text-dark">{formData.description || 'Sin descripción'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleNewTransfer}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
              >
                Nueva transferencia
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

      <h1 className="text-3xl font-bold text-dark mb-8">Transferir dinero</h1>

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
              <h2 className="text-xl font-bold text-dark mb-6">Datos de origen</h2>

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
                  Monto a transferir
                </label>
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

              <button
                type="submit"
                disabled={!formData.fromAccount || !formData.amount || (selectedAccount && parseInt(formData.amount) > selectedAccount.balance)}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-dark mb-6">Datos del destinatario</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de cuenta o RUT del destinatario
                </label>
                <input
                  type="text"
                  value={formData.toAccount}
                  onChange={(e) => setFormData({ ...formData, toAccount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="12345678-9"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción (opcional)
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Pago arriendo, regalo, etc."
                />
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
                  disabled={!formData.toAccount}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-dark mb-6">Confirmar transferencia</h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cuenta origen</span>
                    <span className="font-bold text-dark">{selectedAccount?.type} - {selectedAccount?.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destinatario</span>
                    <span className="font-bold text-dark">{formData.toAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monto</span>
                    <span className="font-bold text-primary text-2xl">${parseInt(formData.amount).toLocaleString('es-CL')}</span>
                  </div>
                  {formData.description && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Descripción</span>
                      <span className="font-bold text-dark">{formData.description}</span>
                    </div>
                  )}
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
                  Confirmar y transferir
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
