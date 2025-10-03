'use client';

import { useState } from 'react';

interface Message {
  id: number;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  important: boolean;
  category: 'general' | 'promotion' | 'alert';
}

export default function MensajesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      subject: 'Nueva oferta de crédito pre-aprobado',
      preview: 'Tenemos una oferta especial de crédito con tasa preferencial...',
      date: '5 Oct 2025',
      read: false,
      important: true,
      category: 'promotion'
    },
    {
      id: 2,
      subject: 'Actualización de términos y condiciones',
      preview: 'Hemos actualizado nuestros términos de servicio...',
      date: '3 Oct 2025',
      read: false,
      important: true,
      category: 'alert'
    },
    {
      id: 3,
      subject: 'Tu cartola mensual está disponible',
      preview: 'Ya puedes descargar tu cartola del mes de septiembre...',
      date: '1 Oct 2025',
      read: true,
      important: false,
      category: 'general'
    },
    {
      id: 4,
      subject: 'Beneficios exclusivos para ti',
      preview: 'Descubre los nuevos beneficios de tu tarjeta de crédito...',
      date: '28 Sep 2025',
      read: true,
      important: false,
      category: 'promotion'
    },
    {
      id: 5,
      subject: 'Recordatorio: Vencimiento de pago',
      preview: 'Tu pago de tarjeta vence el 10 de octubre...',
      date: '25 Sep 2025',
      read: true,
      important: false,
      category: 'alert'
    }
  ]);

  const markAsRead = (message: Message) => {
    setMessages(messages.map(m =>
      m.id === message.id ? { ...m, read: true } : m
    ));
    setSelectedMessage({ ...message, read: true });
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'promotion':
        return 'text-secondary';
      case 'alert':
        return 'text-red-500';
      default:
        return 'text-primary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'promotion':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark">Mensajes</h1>
            {unreadCount > 0 && (
              <p className="text-gray-600 mt-1">{unreadCount} mensajes sin leer</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => markAsRead(message)}
                className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  !message.read ? 'border-l-4 border-primary' : ''
                } ${selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className={`flex items-center gap-1 ${getCategoryColor(message.category)}`}>
                    {getCategoryIcon(message.category)}
                    {message.important && (
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </div>
                  {!message.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                  )}
                </div>
                <h3 className={`font-bold text-sm mb-1 ${!message.read ? 'text-dark' : 'text-gray-600'}`}>
                  {message.subject}
                </h3>
                <p className="text-gray-500 text-xs mb-2 line-clamp-2">{message.preview}</p>
                <p className="text-gray-400 text-xs">{message.date}</p>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={getCategoryColor(selectedMessage.category)}>
                      {getCategoryIcon(selectedMessage.category)}
                    </div>
                    {selectedMessage.important && (
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </div>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <h2 className="text-xl font-bold text-dark mb-2">{selectedMessage.subject}</h2>
                <p className="text-gray-500 text-sm mb-6">{selectedMessage.date}</p>

                <div className="prose prose-sm max-w-none text-gray-700">
                  {selectedMessage.category === 'promotion' && (
                    <>
                      <p className="mb-4">Estimado cliente,</p>
                      <p className="mb-4">
                        Nos complace informarte que tienes una <strong>oferta especial de crédito pre-aprobado</strong> con condiciones exclusivas.
                      </p>
                      <ul className="mb-4">
                        <li>Tasa preferencial del 0,99% mensual</li>
                        <li>Hasta 60 cuotas para pagar</li>
                        <li>Sin costos de apertura</li>
                        <li>Aprobación inmediata</li>
                      </ul>
                      <p className="mb-4">
                        Esta oferta es válida hasta el <strong>31 de octubre de 2025</strong>. No dejes pasar esta oportunidad.
                      </p>
                      <div className="mt-6">
                        <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium">
                          Ver oferta completa
                        </button>
                      </div>
                    </>
                  )}

                  {selectedMessage.category === 'alert' && (
                    <>
                      <p className="mb-4">Estimado cliente,</p>
                      <p className="mb-4">
                        Te informamos que hemos actualizado nuestros <strong>términos y condiciones de servicio</strong>.
                      </p>
                      <p className="mb-4">
                        Los principales cambios incluyen:
                      </p>
                      <ul className="mb-4">
                        <li>Actualización de políticas de seguridad</li>
                        <li>Nuevos límites de transacciones</li>
                        <li>Mejoras en la protección de datos</li>
                      </ul>
                      <p className="mb-4">
                        Te recomendamos revisar los nuevos términos. Estos entrarán en vigencia el 15 de octubre de 2025.
                      </p>
                      <div className="mt-6">
                        <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium">
                          Leer términos completos
                        </button>
                      </div>
                    </>
                  )}

                  {selectedMessage.category === 'general' && (
                    <>
                      <p className="mb-4">Hola,</p>
                      <p className="mb-4">
                        Tu <strong>cartola mensual de septiembre</strong> ya está disponible para descargar.
                      </p>
                      <p className="mb-4">
                        Puedes acceder a ella desde la sección de Documentos o haciendo clic en el botón a continuación.
                      </p>
                      <div className="mt-6">
                        <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium">
                          Descargar cartola
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">Selecciona un mensaje para leerlo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
