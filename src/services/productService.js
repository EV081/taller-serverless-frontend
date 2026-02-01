import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const LOCAL_ID = 'BURGER-LOCAL-001'; // Default local ID

/**
 * Get all products (PUBLIC)
 * @param {number} limit - Maximum number of products to return
 * @returns {Promise} List of products
 */
export const getProducts = async (limit = 50) => {
    const response = await api.post(`${API_ENDPOINTS.PRODUCTO_URL}/productos/list`, {
        limit
    });
    return response.data;
};

/**
 * Get product by ID (PUBLIC)
 * @param {string} productoId - Product ID
 * @param {string} localId - Local ID (defaults to BURGER-LOCAL-001)
 * @returns {Promise} Product details
 */
export const getProductById = async (productoId, localId = LOCAL_ID) => {
    const response = await api.post(`${API_ENDPOINTS.PRODUCTO_URL}/productos/id`, {
        local_id: localId,
        producto_id: productoId
    });
    return response.data;
};

/**
 * Create new product (GERENTE only)
 * @param {Object} productData - Product data
 * @returns {Promise} Created product
 */
export const createProduct = async (productData) => {
    const response = await api.post(`${API_ENDPOINTS.PRODUCTO_URL}/productos/create`, productData);
    return response.data;
};

/**
 * Update product (GERENTE only)
 * @param {string} productoId - Product ID
 * @param {Object} productData - Updated product data
 * @param {string} localId - Local ID
 * @returns {Promise} Updated product
 */
export const updateProduct = async (productoId, productData, localId = LOCAL_ID) => {
    const response = await api.put(`${API_ENDPOINTS.PRODUCTO_URL}/productos/update`, {
        local_id: localId,
        producto_id: productoId,
        ...productData
    });
    return response.data;
};

/**
 * Delete product (GERENTE only)
 * @param {string} productoId - Product ID
 * @param {string} localId - Local ID
 * @returns {Promise} Deletion confirmation
 */
export const deleteProduct = async (productoId, localId = LOCAL_ID) => {
    const response = await api.delete(`${API_ENDPOINTS.PRODUCTO_URL}/productos/delete`, {
        data: {
            local_id: localId,
            producto_id: productoId
        }
    });
    return response.data;
};
