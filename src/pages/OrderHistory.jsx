import { useState, useEffect } from 'react';
import { getUserOrders } from '../services/orderService';
import { formatCurrency, formatDate } from '../utils/helpers';
import { STATUS_LABELS, STATUS_COLORS } from '../utils/constants';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getUserOrders();
            setOrders(data.items || []);
        } catch (err) {
            setError(err.message || 'Error al cargar los pedidos');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading message="Cargando tus pedidos..." />;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={loadOrders} />;
    }

    return (
        <div className="order-history-page">
            <div className="container">
                <div className="page-header">
                    <h1>📦 Mis Pedidos</h1>
                    <p className="text-secondary">Historial de tus pedidos</p>
                </div>

                {orders.length === 0 ? (
                    <div className="no-orders">
                        <div className="empty-icon">📦</div>
                        <h3>No tienes pedidos aún</h3>
                        <p className="text-muted">¡Haz tu primer pedido y disfruta de nuestras deliciosas hamburguesas!</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div key={order.pedido_id || order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-id">
                                        <span className="label">Pedido #</span>
                                        <span className="value">{order.pedido_id || order.id}</span>
                                    </div>
                                    <span
                                        className="order-status-badge"
                                        style={{ backgroundColor: STATUS_COLORS[order.status || order.estado] }}
                                    >
                                        {STATUS_LABELS[order.status || order.estado] || order.status || order.estado}
                                    </span>
                                </div>

                                <div className="order-details">
                                    <div className="order-info">
                                        <div className="info-item">
                                            <span className="info-label">📅 Fecha:</span>
                                            <span className="info-value">{formatDate(order.created_at || order.fecha || order.createdAt)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">💰 Total:</span>
                                            <span className="info-value">{formatCurrency(order.total_price || order.total)}</span>
                                        </div>
                                    </div>

                                    {(order.productos || order.items) && (order.productos || order.items).length > 0 && (
                                        <div className="order-items">
                                            <h4>Productos:</h4>
                                            <ul>
                                                {(order.productos || order.items).map((item, index) => (
                                                    <li key={index}>
                                                        {item.cantidad || item.quantity}x {item.nombre || item.productoNombre || 'Producto'} - {formatCurrency(item.precio || item.price)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
