export const accounts = [
  { id: 1, type: 'Cuenta Corriente', number: '****1234', balance: 2500000, currency: 'CLP' },
  { id: 2, type: 'Cuenta Vista', number: '****5678', balance: 1200000, currency: 'CLP' },
  { id: 3, type: 'Cuenta Ahorro', number: '****9012', balance: 5800000, currency: 'CLP' },
];

export const cards = [
  {
    id: 1,
    name: 'Mastercard Black',
    number: '****3456',
    balance: -850000,
    limit: 3000000,
    dueDate: '2025-10-15',
    color: '#1C1C1E'
  },
  {
    id: 2,
    name: 'Visa Platinum',
    number: '****7890',
    balance: -450000,
    limit: 2000000,
    dueDate: '2025-10-20',
    color: '#2068D5'
  },
  {
    id: 3,
    name: 'Amex Gold',
    number: '****2345',
    balance: -120000,
    limit: 1500000,
    dueDate: '2025-10-18',
    color: '#3DC681'
  },
];

export const loans = [
  {
    id: 1,
    type: 'Crédito Hipotecario',
    balance: 45000000,
    monthlyPayment: 350000,
    dueDate: '2025-10-05',
    interestRate: 3.5
  },
  {
    id: 2,
    type: 'Crédito de Consumo',
    balance: 2500000,
    monthlyPayment: 125000,
    dueDate: '2025-10-10',
    interestRate: 12.5
  },
];

export const insurances = [
  { id: 1, name: 'Seguro de Vida', coverage: 50000000, premium: 45000, status: 'Activo' },
  { id: 2, name: 'Seguro de Salud', coverage: 30000000, premium: 85000, status: 'Activo' },
  { id: 3, name: 'Seguro Automotriz', coverage: 15000000, premium: 35000, status: 'Activo' },
];

export const investments = [
  {
    id: 1,
    name: 'Depósito a Plazo 90 días',
    type: 'fixed',
    amount: 5000000,
    return: 3.2,
    maturity: '2025-12-15'
  },
  {
    id: 2,
    name: 'Fondo Mutuo Renta Fija',
    type: 'fixed',
    amount: 3500000,
    return: 4.5,
    maturity: 'Sin vencimiento'
  },
  {
    id: 3,
    name: 'Fondo Mutuo Acciones',
    type: 'variable',
    amount: 2800000,
    return: 8.7,
    maturity: 'Sin vencimiento'
  },
  {
    id: 4,
    name: 'Inversión en Acciones',
    type: 'variable',
    amount: 4200000,
    return: -2.3,
    maturity: 'Sin vencimiento'
  },
];

export const recentTransactions = [
  {
    id: 1,
    date: '2025-10-02',
    time: '14:32',
    description: 'Transferencia recibida',
    detail: 'De: María González',
    amount: 250000,
    type: 'income',
    category: 'Transferencia'
  },
  {
    id: 2,
    date: '2025-10-01',
    time: '18:45',
    description: 'Supermercado Jumbo',
    detail: 'Compra con tarjeta ****3456',
    amount: -85420,
    type: 'expense',
    category: 'Alimentación'
  },
  {
    id: 3,
    date: '2025-10-01',
    time: '09:15',
    description: 'Netflix',
    detail: 'Suscripción mensual',
    amount: -9990,
    type: 'expense',
    category: 'Entretenimiento'
  },
  {
    id: 4,
    date: '2025-09-30',
    time: '16:20',
    description: 'Enel Distribución Chile',
    detail: 'Cuenta de luz - Sep 2025',
    amount: -45680,
    type: 'expense',
    category: 'Servicios'
  },
  {
    id: 5,
    date: '2025-09-30',
    time: '11:05',
    description: 'Shell Copec',
    detail: 'Compra con tarjeta ****3456',
    amount: -35000,
    type: 'expense',
    category: 'Combustible'
  },
  {
    id: 6,
    date: '2025-09-29',
    time: '20:30',
    description: 'Uber Eats',
    detail: 'Pedido - Restaurante Sushi',
    amount: -18900,
    type: 'expense',
    category: 'Alimentación'
  },
  {
    id: 7,
    date: '2025-09-28',
    time: '12:00',
    description: 'Depósito efectivo',
    detail: 'Sucursal Portal La Dehesa',
    amount: 150000,
    type: 'income',
    category: 'Depósito'
  },
  {
    id: 8,
    date: '2025-09-27',
    time: '08:45',
    description: 'Abono sueldo',
    detail: 'Empresa S.A.',
    amount: 1850000,
    type: 'income',
    category: 'Sueldo'
  },
];
