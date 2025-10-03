'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function AyudaPage() {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'chat'>('faq');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    { text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?', sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const faqs: FAQItem[] = [
    {
      question: '¿Cómo puedo transferir dinero a otra cuenta?',
      answer: 'Para realizar una transferencia, ve a la sección "Transferir" en el menú lateral. Selecciona la cuenta de origen, ingresa los datos del destinatario y el monto. Confirma la operación con tu clave dinámica.',
      category: 'Transferencias'
    },
    {
      question: '¿Cuáles son los límites de transferencia diarios?',
      answer: 'El límite diario de transferencias es de $5.000.000 CLP para transferencias nacionales y $3.000.000 CLP para transferencias internacionales. Puedes modificar estos límites desde tu perfil.',
      category: 'Transferencias'
    },
    {
      question: '¿Cómo activo mi tarjeta de crédito?',
      answer: 'Puedes activar tu tarjeta desde la sección "Tarjetas", seleccionando tu tarjeta y haciendo clic en "Activar". También puedes llamar al número que viene en el sticker de tu tarjeta.',
      category: 'Tarjetas'
    },
    {
      question: '¿Qué hago si pierdo mi tarjeta?',
      answer: 'Si pierdes tu tarjeta, ve inmediatamente a la sección "Tarjetas" y selecciona "Bloquear tarjeta". También puedes llamar a nuestro número de emergencias 24/7: 600 600 6000.',
      category: 'Tarjetas'
    },
    {
      question: '¿Cómo cambio mi contraseña?',
      answer: 'Ve a tu perfil, sección "Seguridad" y selecciona "Cambiar contraseña". Necesitarás tu contraseña actual para confirmar el cambio.',
      category: 'Seguridad'
    },
    {
      question: '¿Qué es la autenticación de dos factores?',
      answer: 'La autenticación de dos factores (2FA) agrega una capa extra de seguridad. Además de tu contraseña, necesitarás un código que se envía a tu teléfono. Puedes activarla desde tu perfil.',
      category: 'Seguridad'
    },
    {
      question: '¿Cómo descargo mi cartola?',
      answer: 'Ve a la sección "Documentos", selecciona el tipo de documento que necesitas (cartola, certificado, etc.) y el período. Haz clic en "Descargar" para obtener el PDF.',
      category: 'Documentos'
    },
    {
      question: '¿Puedo agendar pagos automáticos?',
      answer: 'Sí, desde la sección "Pagos" puedes programar pagos recurrentes. Selecciona la cuenta, el monto, la fecha y la frecuencia.',
      category: 'Pagos'
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { text: chatInput, sender: 'user' }]);
      setChatInput('');

      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          text: 'Gracias por tu mensaje. Un ejecutivo te responderá en breve. ¿Hay algo más en lo que pueda ayudarte?',
          sender: 'bot'
        }]);
      }, 1000);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6">Centro de Ayuda</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'faq'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Preguntas Frecuentes
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'contact'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Contacto
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'chat'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Chat en Vivo
          </button>
        </div>

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div>
            {categories.map((category) => (
              <div key={category} className="mb-6">
                <h2 className="text-lg font-bold text-dark mb-3">{category}</h2>
                <div className="space-y-3">
                  {faqs.filter(faq => faq.category === category).map((faq, index) => {
                    const faqIndex = faqs.indexOf(faq);
                    return (
                      <div key={faqIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <button
                          onClick={() => setOpenFAQ(openFAQ === faqIndex ? null : faqIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-dark pr-4">{faq.question}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                              openFAQ === faqIndex ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openFAQ === faqIndex && (
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-2">Llámanos</h3>
              <p className="text-gray-600 mb-3">Atención 24/7</p>
              <p className="text-primary font-bold text-lg">600 600 6000</p>
              <p className="text-gray-500 text-sm mt-1">Llamada gratuita desde Chile</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-2">Email</h3>
              <p className="text-gray-600 mb-3">Respuesta en 24 horas</p>
              <p className="text-secondary font-bold">ayuda@dynamicbank.cl</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-2">Sucursales</h3>
              <p className="text-gray-600 mb-3">Encuentra tu sucursal más cercana</p>
              <button className="text-primary hover:underline font-medium">Ver mapa</button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-2">Emergencias</h3>
              <p className="text-gray-600 mb-3">Bloqueo de tarjetas, fraudes</p>
              <p className="text-red-500 font-bold text-lg">600 800 8000</p>
              <p className="text-gray-500 text-sm mt-1">Disponible 24/7</p>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 300px)', minHeight: '400px' }}>
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary to-primary-light p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Asistente Virtual</h3>
                    <p className="text-sm text-white/80">En línea</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
