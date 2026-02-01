import axios from 'axios';

// Create axios instance
const api = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }

            // Extract error message
            const message = error.response.data?.message ||
                error.response.data?.error ||
                'Ha ocurrido un error';

            return Promise.reject(new Error(message));
        } else if (error.request) {
            return Promise.reject(new Error('No se pudo conectar con el servidor'));
        } else {
            return Promise.reject(error);
        }
    }
);

export default api;
