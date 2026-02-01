import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROLES } from '../utils/constants';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        correo: '',
        contrasena: '',
        userType: 'cliente' // cliente, empleado
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const isEmployee = formData.userType === 'empleado';
            const result = await login({
                correo: formData.correo,
                contrasena: formData.contrasena
            }, isEmployee);

            if (result.success) {
                // Redirect based on role
                const userRole = result.user.rol;

                switch (userRole) {
                    case ROLES.CLIENTE:
                        navigate('/productos');
                        break;
                    case ROLES.COCINERO:
                        navigate('/cocina');
                        break;
                    case ROLES.REPARTIDOR:
                        navigate('/delivery');
                        break;
                    case ROLES.GERENTE:
                        navigate('/manager');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setError(result.error || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="burger-icon">🍔</div>
                    <h1>Burger Cloud</h1>
                    <p className="text-secondary">Bienvenido de vuelta</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    <div className="user-type-selector">
                        <button
                            type="button"
                            className={`type-btn ${formData.userType === 'cliente' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, userType: 'cliente' })}
                        >
                            👤 Cliente
                        </button>
                        <button
                            type="button"
                            className={`type-btn ${formData.userType === 'empleado' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, userType: 'empleado' })}
                        >
                            👨‍🍳 Empleado
                        </button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            className="form-input"
                            value={formData.correo}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            className="form-input"
                            value={formData.contrasena}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>

                    {formData.userType === 'cliente' && (
                        <p className="login-footer">
                            ¿No tienes cuenta? <Link to="/register" className="link-primary">Regístrate aquí</Link>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
