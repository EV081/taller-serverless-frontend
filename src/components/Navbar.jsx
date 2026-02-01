import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROLES } from '../utils/constants';
import { getInitials } from '../utils/helpers';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getNavLinks = () => {
        if (!user) return [];

        switch (user.rol) {
            case ROLES.CLIENTE:
                return [
                    { to: '/productos', label: 'Productos', icon: '🍔' },
                    { to: '/mis-pedidos', label: 'Mis Pedidos', icon: '📦' }
                ];
            case ROLES.COCINERO:
                return [
                    { to: '/cocina/pendientes', label: 'Pendientes', icon: '⏳' },
                    { to: '/cocina/en-curso', label: 'En Curso', icon: '👨‍🍳' }
                ];
            case ROLES.REPARTIDOR:
                return [
                    { to: '/delivery/disponibles', label: 'Disponibles', icon: '🛵' },
                    { to: '/delivery/mis-pedidos', label: 'Mis Pedidos', icon: '📝' }
                ];
            case ROLES.GERENTE:
                return [
                    { to: '/manager', label: 'Dashboard', icon: '📊' },
                    { to: '/productos', label: 'Productos', icon: '🍔' }
                ];
            default:
                return [];
        }
    };

    const navLinks = getNavLinks();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🍔</span>
                    <span className="brand-text">Burger Cloud</span>
                </Link>

                <div className="navbar-links">
                    {navLinks.map((link) => (
                        <Link key={link.to} to={link.to} className="nav-link">
                            <span className="nav-icon">{link.icon}</span>
                            <span className="nav-label">{link.label}</span>
                        </Link>
                    ))}
                </div>

                {user && (
                    <div className="navbar-user">
                        <div className="user-avatar">
                            {getInitials(user.nombre)}
                        </div>
                        <div className="user-info">
                            <div className="user-name">{user.nombre}</div>
                            <div className="user-role">{user.rol}</div>
                        </div>
                        <button onClick={handleLogout} className="btn-logout" title="Cerrar sesión">
                            🚪
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
