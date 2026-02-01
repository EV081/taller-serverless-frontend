import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Register a new client
 * @param {Object} userData - User data (nombre, correo, contrasena)
 * @returns {Promise} API response
 */
export const register = async (userData) => {
    const response = await api.post(`${API_ENDPOINTS.USER_URL}/register`, userData);
    return response.data;
};

/**
 * Login as client or manager
 * @param {Object} credentials - Login credentials (correo, contrasena)
 * @returns {Promise} API response with token
 */
export const login = async (credentials) => {
    const response = await api.post(`${API_ENDPOINTS.USER_URL}/login`, credentials);
    return response.data;
};

/**
 * Login as employee (cocinero or repartidor)
 * @param {Object} credentials - Login credentials (correo, contrasena)
 * @returns {Promise} API response with token
 */
export const loginEmpleado = async (credentials) => {
    const response = await api.post(`${API_ENDPOINTS.USER_URL}/login/empleado`, credentials);
    return response.data;
};

/**
 * Logout user
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Get current user from localStorage
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Save user to localStorage
 * @param {Object} user - User object
 */
export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get token from localStorage
 * @returns {string|null} Token or null
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Save token to localStorage
 * @param {string} token - JWT token
 */
export const saveToken = (token) => {
    localStorage.setItem('token', token);
};
