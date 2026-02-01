import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get available delivery orders (LISTO_PARA_RECOJO)
 * @returns {Promise} Available orders
 */
export const getAvailableOrders = async () => {
    const response = await api.get(`${API_ENDPOINTS.DELIVERY_URL}/delivery/disponibles`);
    return response.data;
};

/**
 * Get my active delivery orders (EN_CAMINO)
 * @returns {Promise} My orders
 */
export const getMyOrders = async () => {
    const response = await api.get(`${API_ENDPOINTS.DELIVERY_URL}/delivery/mis-pedidos`);
    return response.data;
};

/**
 * Accept a delivery order (LISTO_PARA_RECOJO -> EN_CAMINO)
 * @param {string} orderId - Order ID
 * @returns {Promise} Updated order
 */
export const acceptOrder = async (orderId) => {
    const response = await api.post(`${API_ENDPOINTS.DELIVERY_URL}/delivery/tomar`, {
        order_id: orderId
    });
    return response.data;
};

/**
 * Complete a delivery (EN_CAMINO -> ENTREGADO)
 * @param {string} orderId - Order ID
 * @returns {Promise} Updated order
 */
export const deliverOrder = async (orderId) => {
    const response = await api.post(`${API_ENDPOINTS.DELIVERY_URL}/delivery/entregar`, {
        order_id: orderId
    });
    return response.data;
};
