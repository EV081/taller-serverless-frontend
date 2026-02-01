// User Roles
export const ROLES = {
    CLIENTE: 'CLIENTE',
    COCINERO: 'COCINERO',
    REPARTIDOR: 'REPARTIDOR',
    GERENTE: 'GERENTE'
};

// Order Status
export const ORDER_STATUS = {
    PENDIENTE: 'pendiente',
    COCINA: 'cocina',
    EN_PREPARACION: 'en_preparacion',
    LISTO: 'listo',
    EN_CAMINO: 'en_camino',
    ENTREGADO: 'entregado',
    CANCELADO: 'cancelado'
};

// API Endpoints
export const API_ENDPOINTS = {
    USER_URL: import.meta.env.VITE_API_USER_URL,
    PRODUCTO_URL: import.meta.env.VITE_API_PRODUCTO_URL,
    ORDER_URL: import.meta.env.VITE_API_ORDER_URL,
    COCINA_URL: import.meta.env.VITE_API_COCINA_URL,
    DELIVERY_URL: import.meta.env.VITE_API_DELIVERY_URL,
    WORK_URL: import.meta.env.VITE_API_WORK_URL
};

// Status Colors
export const STATUS_COLORS = {
    'PENDIENTE_COCINA': '#FFA500',
    'EN_PREPARACION_COCINA': '#FF6B6B',
    'LISTO_PARA_RECOJO': '#4ECDC4',
    'EN_CAMINO': '#95E1D3',
    'ENTREGADO': '#51CF66',
    'CANCELADO': '#868E96',
    'procesando': '#FFA500',
    [ORDER_STATUS.PENDIENTE]: '#FFA500',
    [ORDER_STATUS.COCINA]: '#FF6B6B',
    [ORDER_STATUS.EN_PREPARACION]: '#FF6B6B',
    [ORDER_STATUS.LISTO]: '#4ECDC4',
    [ORDER_STATUS.EN_CAMINO]: '#95E1D3',
    [ORDER_STATUS.ENTREGADO]: '#51CF66',
    [ORDER_STATUS.CANCELADO]: '#868E96'
};

// Status Labels in Spanish
export const STATUS_LABELS = {
    'PENDIENTE_COCINA': 'Pendiente en Cocina',
    'EN_PREPARACION_COCINA': 'En Preparación',
    'LISTO_PARA_RECOJO': 'Listo para Recoger',
    'EN_CAMINO': 'En Camino',
    'ENTREGADO': 'Entregado',
    'CANCELADO': 'Cancelado',
    'procesando': 'Procesando',
    [ORDER_STATUS.PENDIENTE]: 'Pendiente',
    [ORDER_STATUS.COCINA]: 'En Cocina',
    [ORDER_STATUS.EN_PREPARACION]: 'En Preparación',
    [ORDER_STATUS.LISTO]: 'Listo',
    [ORDER_STATUS.EN_CAMINO]: 'En Camino',
    [ORDER_STATUS.ENTREGADO]: 'Entregado',
    [ORDER_STATUS.CANCELADO]: 'Cancelado'
};
