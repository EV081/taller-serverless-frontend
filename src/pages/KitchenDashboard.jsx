import { useState, useEffect } from 'react';
import { getPendingOrders, getInProgressOrders, startCooking, completeCooking } from '../services/kitchenService';
import { formatCurrency, formatDateShort } from '../utils/helpers';
import Loading from '../components/Loading';
import './KitchenDashboard.css';

const KitchenDashboard = (props) => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [inProgressOrders, setInProgressOrders] = useState([]);
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

            // Fetch both pending and in-progress orders
            // In a real app we might optimize this based on props.section,
            // but for now we fetch everything to keep simple sync
            const [pendingData, inProgressData] = await Promise.all([
                getPendingOrders(),
                getInProgressOrders()
            ]);

            const sortByDate = (a, b) => new Date(a.created_at) - new Date(b.created_at);
            setPendingOrders((pendingData.orders || []).slice().sort(sortByDate));
            setInProgressOrders((inProgressData.orders || []).slice().sort(sortByDate));
        } catch (err) {
            setError(err.message || 'Error al cargar pedidos');
        } finally {
            setLoading(false);
        }
    };

    const handleStartCooking = async (orderId) => {
        try {
            setUpdatingOrder(orderId);
            await startCooking(orderId);
            await loadOrders();
        } catch (err) {
            setError(err.message || 'Error al comenzar a cocinar');
        } finally {
            setUpdatingOrder(null);
        }
    };

    const handleCompleteCooking = async (orderId) => {
        try {
            setUpdatingOrder(orderId);
            await completeCooking(orderId);
            await loadOrders();
        } catch (err) {
            setError(err.message || 'Error al completar pedido');
        } finally {
            setUpdatingOrder(null);
        }
    };

    const renderOrderCard = (order, isPending) => (
        <div key={order.pedido_id} className="kitchen-order-card">
            <div className="order-number">
                <span className="hash">#</span>
                <span className="number">{(order.pedido_id || '').slice(-8)}</span>
            </div>

            <div className="order-time">
                🕐 {formatDateShort(order.created_at)}
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

            {isPending ? (
                <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleStartCooking(order.pedido_id)}
                    disabled={updatingOrder === order.pedido_id}
                >
                    {updatingOrder === order.pedido_id ? 'Procesando...' : '👨‍🍳 Comenzar a Cocinar'}
                </button>
            ) : (
                <button
                    className="btn btn-success btn-block"
                    onClick={() => handleCompleteCooking(order.pedido_id)}
                    disabled={updatingOrder === order.pedido_id}
                >
                    {updatingOrder === order.pedido_id ? 'Procesando...' : '✅ Completar'}
                </button>
            )}
        </div>
    );

    const renderSection = (title, count, orders, isPending, icon) => (
        <div className="kitchen-section">
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
                    {orders.map(order => renderOrderCard(order, isPending))}
                </div>
            )}
        </div>
    );

    if (loading && pendingOrders.length === 0 && inProgressOrders.length === 0) {
        return <Loading message="Cargando pedidos..." />;
    }

    const showPending = !props.section || props.section === 'pendientes';
    const showInProgress = !props.section || props.section === 'en-curso';

    return (
        <div className="kitchen-dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>📦 {props.section === 'pendientes' ? 'Pendientes' : props.section === 'en-curso' ? 'En Curso' : 'Pedidos'}</h1>
                        <p className="text-secondary">
                            {props.section === 'pendientes' ? 'Pedidos por preparar' :
                                props.section === 'en-curso' ? 'Pedidos en preparación' :
                                    'Gestión de pedidos en cocina'}
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

                <div className={`kitchen-sections ${props.section ? 'single-column' : ''}`}>
                    {showPending && renderSection('Pendientes', pendingOrders.length, pendingOrders, true, '⏳')}
                    {showInProgress && renderSection('En Curso', inProgressOrders.length, inProgressOrders, false, '👨‍🍳')}
                </div>
            </div>
        </div>
    );
};

export default KitchenDashboard;
