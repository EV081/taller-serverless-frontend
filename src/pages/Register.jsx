import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerService } from '../services/authService';
import { isValidEmail, isValidPassword } from '../utils/helpers';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.correo.trim()) {
            newErrors.correo = 'El correo es requerido';
        } else if (!isValidEmail(formData.correo)) {
            newErrors.correo = 'El correo no es válido';
        }

        if (!formData.contrasena) {
            newErrors.contrasena = 'La contraseña es requerida';
        } else if (!isValidPassword(formData.contrasena)) {
            newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (formData.contrasena !== formData.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            await registerService({
                nombre: formData.nombre,
                correo: formData.correo,
                contrasena: formData.contrasena
            });

            setSuccess(true);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setErrors({
                general: err.message || 'Error al registrar usuario'
            });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="register-page">
                <div className="register-container">
                    <div className="success-message">
                        <div className="success-icon">✅</div>
                        <h2>¡Registro Exitoso!</h2>
                        <p>Tu cuenta ha sido creada correctamente.</p>
                        <p className="text-secondary">Redirigiendo al inicio de sesión...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-header">
                    <div className="burger-icon">🍔</div>
                    <h1>Burger Cloud</h1>
                    <p className="text-secondary">Crea tu cuenta</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    {errors.general && (
                        <div className="alert alert-error">
                            {errors.general}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className="form-input"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Juan Pérez"
                        />
                        {errors.nombre && <div className="form-error">{errors.nombre}</div>}
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
                            placeholder="tu@email.com"
                        />
                        {errors.correo && <div className="form-error">{errors.correo}</div>}
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
                            placeholder="Mínimo 6 caracteres"
                        />
                        {errors.contrasena && <div className="form-error">{errors.contrasena}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarContrasena" className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmarContrasena"
                            name="confirmarContrasena"
                            className="form-input"
                            value={formData.confirmarContrasena}
                            onChange={handleChange}
                            placeholder="Repite tu contraseña"
                        />
                        {errors.confirmarContrasena && <div className="form-error">{errors.confirmarContrasena}</div>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>

                    <p className="register-footer">
                        ¿Ya tienes cuenta? <Link to="/login" className="link-primary">Inicia sesión aquí</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
