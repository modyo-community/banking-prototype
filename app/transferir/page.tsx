'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { accounts, contacts } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

function TransferirContent() {
  const searchParams = useSearchParams();
  const fromAccountId = searchParams.get('from');

  const [step, setStep] = useState(1);
  const [view, setView] = useState<'transfer' | 'contacts'>('transfer');
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    fromAccount: fromAccountId || '',
    toAccount: '',
    amount: '',
    description: '',
  });
  const [newContact, setNewContact] = useState({
    name: '',
    rut: '',
    bank: '',
    accountType: '',
    accountNumber: '',
    email: '',
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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.rut.includes(searchTerm) ||
    contact.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteContacts = filteredContacts.filter(c => c.favorite);
  const otherContacts = filteredContacts.filter(c => !c.favorite);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactForm(false);
    setNewContact({
      name: '',
      rut: '',
      bank: '',
      accountType: '',
      accountNumber: '',
      email: '',
    });
  };

  const handleSelectContact = (contact: typeof contacts[0]) => {
    setFormData({ ...formData, toAccount: contact.accountNumber });
    setView('transfer');
    if (step < 2) setStep(2);
  };

  if (view === 'contacts') {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <button
          onClick={() => setView('transfer')}
          className="text-primary hover:underline mb-4 inline-block"
        >
          &larr; Volver a transferir
        </button>

        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-dark">Mis Contactos</h1>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors font-medium"
          >
            + Agregar contacto
          </button>
        </div>

        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-dark mb-4">Agregar nuevo contacto</h2>
              <form onSubmit={handleSaveContact}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      RUT
                    </label>
                    <input
                      type="text"
                      value={newContact.rut}
                      onChange={(e) => setNewContact({ ...newContact, rut: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="12.345.678-9"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Banco
                    </label>
                    <select
                      value={newContact.bank}
                      onChange={(e) => setNewContact({ ...newContact, bank: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Selecciona un banco</option>
                      <option value="Banco de Chile">Banco de Chile</option>
                      <option value="Banco Estado">Banco Estado</option>
                      <option value="Banco Santander">Banco Santander</option>
                      <option value="Banco BCI">Banco BCI</option>
                      <option value="Banco Scotiabank">Banco Scotiabank</option>
                      <option value="Banco Itaú">Banco Itaú</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de cuenta
                    </label>
                    <select
                      value={newContact.accountType}
                      onChange={(e) => setNewContact({ ...newContact, accountType: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Selecciona tipo</option>
                      <option value="Cuenta Corriente">Cuenta Corriente</option>
                      <option value="Cuenta Vista">Cuenta Vista</option>
                      <option value="Cuenta Ahorro">Cuenta Ahorro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de cuenta
                    </label>
                    <input
                      type="text"
                      value={newContact.accountNumber}
                      onChange={(e) => setNewContact({ ...newContact, accountNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors font-medium"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, RUT o banco..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {favoriteContacts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-dark mb-4 flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Favoritos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteContacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200" onClick={() => handleSelectContact(contact)}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-dark text-lg">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.rut}</p>
                    </div>
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">{contact.bank}</p>
                    <p className="text-sm text-gray-600">{contact.accountType} • {contact.accountNumber}</p>
                    {contact.email && <p className="text-sm text-gray-500">{contact.email}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {otherContacts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-dark mb-4">Todos los contactos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherContacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200" onClick={() => handleSelectContact(contact)}>
                  <div className="mb-3">
                    <h3 className="font-bold text-dark text-lg">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.rut}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">{contact.bank}</p>
                    <p className="text-sm text-gray-600">{contact.accountType} • {contact.accountNumber}</p>
                    {contact.email && <p className="text-sm text-gray-500">{contact.email}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredContacts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No se encontraron contactos</p>
          </div>
        )}
      </div>
    );
  }

  if (transferSuccess && step === 4) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
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
    <div className="p-4 md:p-6 lg:p-8">
      <Link href="/" className="text-primary hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>

      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-dark">Transferir dinero</h1>
        <button
          onClick={() => setView('contacts')}
          className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
        >
          Ver contactos
        </button>
      </div>

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
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Número de cuenta o RUT del destinatario
                  </label>
                  <button
                    type="button"
                    onClick={() => setView('contacts')}
                    className="text-sm text-primary hover:underline"
                  >
                    Seleccionar de contactos
                  </button>
                </div>
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

export default function TransferirPage() {
  return (
    <Suspense fallback={
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="text-center text-gray-600">Cargando...</p>
          </div>
        </div>
      </div>
    }>
      <TransferirContent />
    </Suspense>
  );
}
