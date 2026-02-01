import { useState, useEffect } from 'react';
import { getOrders } from '../services/orderService';
import { formatCurrency, formatDateShort } from '../utils/helpers';
import { STATUS_LABELS, STATUS_COLORS, ORDER_STATUS } from '../utils/constants';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getOrders();
            setOrders(Array.isArray(data) ? data : data.pedidos || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.estado === filter);

    const stats = {
        total: orders.length,
        pendiente: orders.filter(o => o.estado === ORDER_STATUS.PENDIENTE).length,
        cocina: orders.filter(o => o.estado === ORDER_STATUS.COCINA).length,
        enCamino: orders.filter(o => o.estado === ORDER_STATUS.EN_CAMINO).length,
        entregado: orders.filter(o => o.estado === ORDER_STATUS.ENTREGADO).length,
        totalVentas: orders.reduce((sum, o) => sum + (o.total || 0), 0)
    };

    if (loading) {
        return <Loading message="Cargando dashboard..." />;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={loadOrders} />;
    }

    return (
        <div className="manager-dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>📊 Dashboard Gerencial</h1>
                        <p className="text-secondary">Vista general de pedidos</p>
                    </div>
                    <button onClick={loadOrders} className="btn btn-secondary">
                        🔄 Actualizar
                    </button>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📦</div>
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Total Pedidos</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⏳</div>
                        <div className="stat-value">{stats.pendiente}</div>
                        <div className="stat-label">Pendientes</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👨‍🍳</div>
                        <div className="stat-value">{stats.cocina}</div>
                        <div className="stat-label">En Cocina</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🚚</div>
                        <div className="stat-value">{stats.enCamino}</div>
                        <div className="stat-label">En Camino</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-value">{stats.entregado}</div>
                        <div className="stat-label">Entregados</div>
                    </div>
                    <div className="stat-card highlight">
                        <div className="stat-icon">💰</div>
                        <div className="stat-value">{formatCurrency(stats.totalVentas)}</div>
                        <div className="stat-label">Ventas Totales</div>
                    </div>
                </div>

                <div className="filter-section">
                    <h3>Filtrar por estado:</h3>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Todos
                        </button>
                        {Object.entries(ORDER_STATUS).map(([key, value]) => (
                            <button
                                key={value}
                                className={`filter-btn ${filter === value ? 'active' : ''}`}
                                onClick={() => setFilter(value)}
                            >
                                {STATUS_LABELS[value]}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="orders-table">
                    <h3>Pedidos ({filteredOrders.length})</h3>
                    {filteredOrders.length === 0 ? (
                        <div className="no-orders">
                            <p>No hay pedidos con este filtro</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Cliente</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="order-id">#{order.id || order.pedidoId}</td>
                                            <td>{formatDateShort(order.fecha || order.createdAt)}</td>
                                            <td>{order.clienteNombre || order.cliente || 'N/A'}</td>
                                            <td>{order.items?.length || 0}</td>
                                            <td className="order-total">{formatCurrency(order.total)}</td>
                                            <td>
                                                <span
                                                    className="status-badge"
                                                    style={{ backgroundColor: STATUS_COLORS[order.estado] }}
                                                >
                                                    {STATUS_LABELS[order.estado] || order.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
