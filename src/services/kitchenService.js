import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get pending kitchen orders (PENDIENTE_COCINA)
 * @returns {Promise} Pending orders
 */
export const getPendingOrders = async () => {
    const response = await api.get(`${API_ENDPOINTS.COCINA_URL}/cocina/pendientes`);
    return response.data;
};

/**
 * Get in-progress kitchen orders (EN_PREPARACION_COCINA)
 * @returns {Promise} In-progress orders
 */
export const getInProgressOrders = async () => {
    const response = await api.get(`${API_ENDPOINTS.COCINA_URL}/cocina/en-curso`);
    return response.data;
};

/**
 * Update order status to cooking (PENDIENTE_COCINA -> EN_PREPARACION_COCINA)
 * @param {string} orderId - Order ID
 * @returns {Promise} Updated order
 */
export const startCooking = async (orderId) => {
    const response = await api.post(`${API_ENDPOINTS.COCINA_URL}/cocina/confirmar`, {
        order_id: orderId,
        decision: 'ACEPTAR'
    });
    return response.data;
};

/**
 * Complete cooking for an order (EN_PREPARACION_COCINA -> LISTO_PARA_RECOJO)
 * @param {string} orderId - Order ID
 * @returns {Promise} Updated order
 */
export const completeCooking = async (orderId) => {
    const response = await api.post(`${API_ENDPOINTS.COCINA_URL}/cocina/terminar`, {
        order_id: orderId
    });
    return response.data;
};
