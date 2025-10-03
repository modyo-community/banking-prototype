'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contacts } from '@/lib/data';

export default function ContactosPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newContact, setNewContact] = useState({
    name: '',
    rut: '',
    bank: '',
    accountType: '',
    accountNumber: '',
    email: '',
  });

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

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Link href="/transferir" className="text-primary hover:underline mb-4 inline-block">&larr; Volver a transferir</Link>

      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-dark mb-1">Gestión de Contactos</h1>
          <p className="text-gray-600">Administra tus contactos para transferencias</p>
        </div>
        <button
          onClick={() => setShowContactForm(true)}
          className="bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
        >
          + Nuevo contacto
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

      <div className="max-w-5xl">
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, RUT o banco..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {favoriteContacts.length > 0 && !searchTerm && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-dark mb-4 flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Favoritos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-dark text-lg">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.rut}</p>
                    </div>
                    <button className="text-yellow-500 hover:text-yellow-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-1 mb-4">
                    <p className="text-sm text-gray-600">{contact.bank}</p>
                    <p className="text-sm text-gray-600">{contact.accountType}</p>
                    <p className="text-sm text-gray-600 font-mono">{contact.accountNumber}</p>
                    {contact.email && <p className="text-sm text-gray-500">{contact.email}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 text-sm px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors">
                      Editar
                    </button>
                    <button className="flex-1 text-sm px-3 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(otherContacts.length > 0 || searchTerm) && (
          <div>
            <h2 className="text-lg font-bold text-dark mb-4">
              {searchTerm ? 'Resultados de búsqueda' : 'Todos los contactos'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(searchTerm ? filteredContacts.filter(c => !c.favorite) : otherContacts).map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-dark text-lg">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.rut}</p>
                    </div>
                    <button className="text-gray-400 hover:text-yellow-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-1 mb-4">
                    <p className="text-sm text-gray-600">{contact.bank}</p>
                    <p className="text-sm text-gray-600">{contact.accountType}</p>
                    <p className="text-sm text-gray-600 font-mono">{contact.accountNumber}</p>
                    {contact.email && <p className="text-sm text-gray-500">{contact.email}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 text-sm px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors">
                      Editar
                    </button>
                    <button className="flex-1 text-sm px-3 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredContacts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
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
  );
}
