import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, loginEmpleado, logout as logoutService, getCurrentUser, saveUser, saveToken, getToken } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const currentUser = getCurrentUser();
        const token = getToken();

        if (currentUser && token) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const login = async (credentials, isEmployee = false) => {
        try {
            const loginFunction = isEmployee ? loginEmpleado : loginService;
            const data = await loginFunction(credentials);

            if (data.token) {
                saveToken(data.token);

                // Save user info
                // Backend returns "role" (not "rol") and in Spanish with capital first letter
                const backendRole = data.role || data.rol || data.user?.rol || 'Cliente';

                // Normalize role to uppercase (COCINERO, REPARTIDOR, CLIENTE, GERENTE)
                const normalizedRole = backendRole.toUpperCase();

                const userData = {
                    correo: credentials.correo,
                    nombre: data.nombre || data.user?.nombre || credentials.correo,
                    rol: normalizedRole
                };

                saveUser(userData);
                setUser(userData);

                return { success: true, user: userData };
            }

            return { success: false, error: 'No se recibió token' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
