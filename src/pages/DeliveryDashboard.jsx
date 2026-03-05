import { useState, useEffect } from 'react';
import { getAvailableOrders, getMyOrders, acceptOrder, deliverOrder } from '../services/deliveryService';
import { formatCurrency, formatDateShort } from '../utils/helpers';
import Loading from '../components/Loading';
import './DeliveryDashboard.css';

const DeliveryDashboard = (props) => {
    const [availableOrders, setAvailableOrders] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingOrder, setUpdatingOrder] = useState(null);

    useEffect(() => {
        loadOrders();
        // Auto-refresh every 30 seconds
        const interval = setInterval(loadOrders, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError('');

            // Fetch both available and my orders
            const [availableData, myData] = await Promise.all([
                getAvailableOrders(),
                getMyOrders()
            ]);

            const sortByDate = (a, b) => new Date(a.created_at) - new Date(b.created_at);
            setAvailableOrders((availableData.orders || []).slice().sort(sortByDate));
            setMyOrders((myData.orders || []).slice().sort(sortByDate));
        } catch (err) {
            setError(err.message || 'Error al cargar pedidos');
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptOrder = async (orderId) => {
        try {
            setUpdatingOrder(orderId);
            await acceptOrder(orderId);
            await loadOrders();
        } catch (err) {
            setError(err.message || 'Error al aceptar pedido');
        } finally {
            setUpdatingOrder(null);
        }
    };

    const handleDeliverOrder = async (orderId) => {
        try {
            setUpdatingOrder(orderId);
            await deliverOrder(orderId);
            await loadOrders();
        } catch (err) {
            setError(err.message || 'Error al finalizar entrega');
        } finally {
            setUpdatingOrder(null);
        }
    };

    const renderOrderCard = (order, isAvailable) => (
        <div key={order.pedido_id} className="delivery-order-card">
            <div className="order-header">
                <div className="order-number">
                    <span className="hash">#</span>
                    <span className="number">{(order.pedido_id || '').slice(-8)}</span>
                </div>
                <div className="order-time">
                    🕐 {formatDateShort(order.created_at)}
                </div>
            </div>

            <div className="order-address">
                <h4>📍 Dirección de Entrega:</h4>
                <p>{order.direccion || 'Sin dirección especificada'}</p>
            </div>

            <div className="order-items-list">
                <h4>Productos:</h4>
                {(order.productos || []).length > 0 ? (
                    <ul>
                        {order.productos.map((item, index) => (
                            <li key={index}>
                                <span className="item-qty">{item.cantidad}x</span>
                                <span className="item-name">Producto</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">Sin detalles</p>
                )}
            </div>

            <div className="order-total">
                Total: {formatCurrency(order.total_price)}
            </div>

            {isAvailable ? (
                <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleAcceptOrder(order.pedido_id)}
                    disabled={updatingOrder === order.pedido_id}
                >
                    {updatingOrder === order.pedido_id ? 'Procesando...' : '🛵 Aceptar Pedido'}
                </button>
            ) : (
                <button
                    className="btn btn-success btn-block"
                    onClick={() => handleDeliverOrder(order.pedido_id)}
                    disabled={updatingOrder === order.pedido_id}
                >
                    {updatingOrder === order.pedido_id ? 'Procesando...' : '✅ Finalizar Entrega'}
                </button>
            )}
        </div>
    );

    const renderSection = (title, count, orders, isAvailable, icon) => (
        <div className="delivery-section">
            <div className="section-header">
                <h2>{icon} {title}</h2>
                <span className="badge">{count}</span>
            </div>

            {orders.length === 0 ? (
                <div className="no-orders">
                    <div className="empty-icon">{icon}</div>
                    <p className="text-muted">No hay pedidos {title.toLowerCase()}</p>
                </div>
            ) : (
                <div className="orders-grid">
                    {orders.map(order => renderOrderCard(order, isAvailable))}
                </div>
            )}
        </div>
    );

    if (loading && availableOrders.length === 0 && myOrders.length === 0) {
        return <Loading message="Cargando pedidos..." />;
    }

    const showAvailable = !props.section || props.section === 'disponibles';
    const showMyOrders = !props.section || props.section === 'mis-pedidos';

    return (
        <div className="delivery-dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>🛵 {props.section === 'disponibles' ? 'Disponibles' : props.section === 'mis-pedidos' ? 'Mis Pedidos' : 'Delivery'}</h1>
                        <p className="text-secondary">
                            {props.section === 'disponibles' ? 'Pedidos listos para entregar' :
                                props.section === 'mis-pedidos' ? 'Pedidos asignados a ti' :
                                    'Gestión de entregas'}
                        </p>
                    </div>
                    <button onClick={loadOrders} className="btn btn-secondary" disabled={loading}>
                        🔄 Actualizar
                    </button>
                </div>

                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                <div className={`delivery-sections ${props.section ? 'single-column' : ''}`}>
                    {showAvailable && renderSection('Disponibles', availableOrders.length, availableOrders, true, '📍')}
                    {showMyOrders && renderSection('Mis Pedidos', myOrders.length, myOrders, false, '📝')}
                </div>
            </div>
        </div>
    );
};

export default DeliveryDashboard;
