import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Create new order
 * @param {Object} orderData - Order data with items
 * @returns {Promise} Created order
 */
export const createOrder = async (orderData) => {
    const response = await api.post(`${API_ENDPOINTS.ORDER_URL}/pedido`, orderData);
    return response.data;
};

/**
 * Get all orders (filtered by role - GERENTE)
 * @returns {Promise} List of orders
 */
export const getOrders = async () => {
    const response = await api.get(`${API_ENDPOINTS.ORDER_URL}/pedidos/todos`);
    return response.data;
};

/**
 * Get order status by ID
 * @param {string} id - Order ID
 * @returns {Promise} Order status details
 */
export const getOrderById = async (id) => {
    const response = await api.get(`${API_ENDPOINTS.ORDER_URL}/pedido/status`, {
        params: { pedidoId: id }
    });
    return response.data;
};

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {string} status - New status
 * @returns {Promise} Updated order
 */
export const updateOrderStatus = async (id, status) => {
    const response = await api.put(`${API_ENDPOINTS.ORDER_URL}/pedido/estado`, {
        pedidoId: id,
        estado: status
    });
    return response.data;
};

/**
 * Get orders by status (for kitchen/delivery)
 * @param {string} status - Order status
 * @returns {Promise} Filtered orders
 */
export const getOrdersByStatus = async (status) => {
    const response = await api.get(`${API_ENDPOINTS.ORDER_URL}/pedidos/todos`, {
        params: { estado: status }
    });
    return response.data;
};

/**
 * Get user's orders (historial)
 * @returns {Promise} User's order history
 */
export const getUserOrders = async () => {
    const response = await api.get(`${API_ENDPOINTS.ORDER_URL}/pedidos/mis-pedidos`);
    return response.data;
};
