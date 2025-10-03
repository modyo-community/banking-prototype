'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { accounts, contacts } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

function TransferirContent() {
  const searchParams = useSearchParams();
  const fromAccountId = searchParams.get('from');

  const [view, setView] = useState<'transfer' | 'history'>('transfer');
  const [historyTab, setHistoryTab] = useState<'sent' | 'received'>('sent');
  const [step, setStep] = useState(1); // Start at step 1 for contact selection
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null);
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

  // Mock transfer history data
  const sentTransfers = [
    { id: 1, date: '2025-10-02', time: '14:32', recipient: 'María González', bank: 'Banco de Chile', account: '****7890', amount: 250000, status: 'Completada' },
    { id: 2, date: '2025-09-28', time: '10:15', recipient: 'Pedro Martínez', bank: 'Banco Estado', account: '****3210', amount: 120000, status: 'Completada' },
    { id: 3, date: '2025-09-20', time: '16:45', recipient: 'Ana Silva', bank: 'Banco Santander', account: '****6677', amount: 85000, status: 'Completada' },
    { id: 4, date: '2025-09-15', time: '11:20', recipient: 'Carlos Rojas', bank: 'Banco BCI', account: '****2233', amount: 150000, status: 'Completada' },
  ];

  const receivedTransfers = [
    { id: 1, date: '2025-10-01', time: '09:15', sender: 'Empresa S.A.', bank: 'Banco de Chile', account: '****1234', amount: 1500000, status: 'Completada', concept: 'Sueldo Septiembre' },
    { id: 2, date: '2025-09-25', time: '18:30', sender: 'María González', bank: 'Banco de Chile', account: '****7890', amount: 50000, status: 'Completada', concept: 'Pago compartido' },
    { id: 3, date: '2025-09-18', time: '14:00', sender: 'Ana Silva', bank: 'Banco Santander', account: '****6677', amount: 75000, status: 'Completada', concept: 'Devolución' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      // Simulate transfer
      setTimeout(() => {
        setTransferSuccess(true);
        setStep(5);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) {
        setSelectedContact(null);
      }
    }
  };

  const handleNewTransfer = () => {
    setStep(1);
    setSelectedContact(null);
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

  // Simulate recent contacts (first 2 contacts for demo)
  const recentContacts = filteredContacts.slice(0, 2);
  const favoriteContacts = filteredContacts.filter(c => c.favorite);
  const otherContacts = filteredContacts.filter(c => !c.favorite && !recentContacts.includes(c));

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
    setSelectedContact(contact);
    setFormData({ ...formData, toAccount: contact.accountNumber });
    setStep(2); // Move to amount/account selection step
  };

  // History View
  if (view === 'history') {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2">Historial de Transferencias</h1>
            <p className="text-gray-600">Revisa tus transferencias realizadas y recibidas</p>
          </div>
          <button
            onClick={() => setView('transfer')}
            className="bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
          >
            Nueva transferencia
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg max-w-md">
          <button
            onClick={() => setHistoryTab('sent')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              historyTab === 'sent'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Enviadas
          </button>
          <button
            onClick={() => setHistoryTab('received')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              historyTab === 'received'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Recibidas
          </button>
        </div>

        {/* Transfer History Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {historyTab === 'sent' ? 'Destinatario' : 'Remitente'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banco</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta</th>
                  {historyTab === 'received' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
                  )}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historyTab === 'sent' && sentTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transfer.date}</div>
                      <div className="text-xs text-gray-500">{transfer.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{transfer.recipient}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{transfer.bank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{transfer.account}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-bold text-dark">-${transfer.amount.toLocaleString('es-CL')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {transfer.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {historyTab === 'received' && receivedTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transfer.date}</div>
                      <div className="text-xs text-gray-500">{transfer.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{transfer.sender}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{transfer.bank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{transfer.account}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{transfer.concept}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-bold text-secondary">+${transfer.amount.toLocaleString('es-CL')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {transfer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Contact Selection
  if (step === 1) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <Link href="/" className="text-primary hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>

        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-dark mb-1">Transferir dinero</h1>
          <p className="text-gray-600">Completa los pasos para realizar tu transferencia</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Destinatario' },
              { num: 2, label: 'Datos' },
              { num: 3, label: 'Detalles' },
              { num: 4, label: 'Confirmar' }
            ].map((s, index) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s.num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s.num}
                  </div>
                  <span className="text-xs mt-1 text-gray-600 hidden md:block">{s.label}</span>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > s.num ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">

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

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark">Paso 1: Selecciona un destinatario</h2>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors font-medium"
              >
                + Nuevo contacto
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, RUT o banco..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Favoritos */}
            {favoriteContacts.length > 0 && !searchTerm && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-dark mb-4 flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Favoritos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-all cursor-pointer border-2 border-gray-200 hover:border-primary"
                      onClick={() => handleSelectContact(contact)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-dark text-lg">{contact.name}</h4>
                          <p className="text-sm text-gray-500">{contact.rut}</p>
                        </div>
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{contact.bank}</p>
                        <p className="text-sm text-gray-600">{contact.accountType} • {contact.accountNumber}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Todos los contactos */}
            {(otherContacts.length > 0 || searchTerm) && (
              <div>
                <h3 className="text-lg font-bold text-dark mb-4">
                  {searchTerm ? 'Resultados de búsqueda' : 'Todos los contactos'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(searchTerm ? filteredContacts : otherContacts).map((contact) => (
                    <div
                      key={contact.id}
                      className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-all cursor-pointer border-2 border-gray-200 hover:border-primary"
                      onClick={() => handleSelectContact(contact)}
                    >
                      <div className="mb-3">
                        <h4 className="font-bold text-dark text-lg">{contact.name}</h4>
                        <p className="text-sm text-gray-500">{contact.rut}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{contact.bank}</p>
                        <p className="text-sm text-gray-600">{contact.accountType} • {contact.accountNumber}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredContacts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron contactos</p>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="mt-4 text-primary hover:underline font-medium"
                >
                  Agregar nuevo contacto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (transferSuccess && step === 5) {
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

      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-dark">Transferir dinero</h1>
        {selectedContact && (
          <p className="text-gray-600 mt-2">
            Transferencia a: <span className="font-semibold text-dark">{selectedContact.name}</span>
          </p>
        )}
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Destinatario' },
            { num: 2, label: 'Datos' },
            { num: 3, label: 'Detalles' },
            { num: 4, label: 'Confirmar' }
          ].map((s, index) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s.num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s.num}
                </div>
                <span className="text-xs mt-1 text-gray-600 hidden md:block">{s.label}</span>
              </div>
              {index < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > s.num ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm">
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-dark mb-6">Paso 2: Datos de origen</h2>

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

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-dark mb-6">Paso 3: Datos del destinatario</h2>

              {selectedContact ? (
                <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-dark">{selectedContact.name}</p>
                      <p className="text-sm text-gray-600">{selectedContact.bank}</p>
                      <p className="text-sm text-gray-600">{selectedContact.accountType} • {selectedContact.accountNumber}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedContact(null);
                        setStep(1);
                      }}
                      className="text-sm text-primary hover:underline"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Número de cuenta o RUT del destinatario
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
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
              )}

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

          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-dark mb-6">Paso 4: Confirmar transferencia</h2>

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
