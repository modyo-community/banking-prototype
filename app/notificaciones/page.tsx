'use client';

import { useState } from 'react';

interface Notification {
  id: number;
  type: 'transaction' | 'security' | 'promotion' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificacionesPage() {
  const [filter, setFilter] = useState<'all' | 'transaction' | 'security' | 'promotion' | 'info'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'transaction',
      title: 'Transferencia recibida',
      message: 'Recibiste $150.000 de María González',
      time: 'Hace 5 minutos',
      read: false,
    },
    {
      id: 2,
      type: 'security',
      title: 'Nuevo dispositivo detectado',
      message: 'Se detectó un inicio de sesión desde un nuevo dispositivo',
      time: 'Hace 2 horas',
      read: false,
    },
    {
      id: 3,
      type: 'promotion',
      title: 'Oferta especial',
      message: 'Obtén hasta 30% de descuento en seguros',
      time: 'Hace 5 horas',
      read: true,
    },
    {
      id: 4,
      type: 'transaction',
      title: 'Pago exitoso',
      message: 'Se realizó el pago de $45.000 a Servicios Básicos',
      time: 'Hace 1 día',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      title: 'Mantenimiento programado',
      message: 'El sistema estará en mantenimiento el 15 de octubre',
      time: 'Hace 2 días',
      read: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'security':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'promotion':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'bg-primary/10 text-primary';
      case 'security':
        return 'bg-red-500/10 text-red-500';
      case 'promotion':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark">Notificaciones</h1>
            {unreadCount > 0 && (
              <p className="text-gray-600 mt-1">Tienes {unreadCount} notificaciones sin leer</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-primary hover:underline font-medium"
            >
              Marcar todas como leídas
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('transaction')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'transaction'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Transacciones
          </button>
          <button
            onClick={() => setFilter('security')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'security'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Seguridad
          </button>
          <button
            onClick={() => setFilter('promotion')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'promotion'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Promociones
          </button>
          <button
            onClick={() => setFilter('info')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'info'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Información
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                !notification.read ? 'border-l-4 border-primary' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-bold ${!notification.read ? 'text-dark' : 'text-gray-600'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-gray-500">No hay notificaciones en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}
