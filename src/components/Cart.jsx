import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import { formatCurrency, calculateCartTotal } from '../utils/helpers';
import './Cart.css';

const Cart = ({ items, isOpen, onClose, onUpdateItem, onRemoveItem, onClearCart }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [direccion, setDireccion] = useState('');

    const total = calculateCartTotal(items);

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setLoading(true);
        setError('');

        try {
            const orderData = {
                local_id: 'BURGER-LOCAL-001', // Default local ID
                productos: items.map(item => ({
                    producto_id: item.id || item.producto_id,
                    cantidad: item.cantidad,
                    precio: parseFloat(item.precio)
                }))
            };

            // Add address if provided
            if (direccion.trim()) {
                orderData.direccion = direccion.trim();
            }

            await createOrder(orderData);

            // Clear cart
            onClearCart();
            onClose();

            // Show success message
            alert('¡Pedido realizado con éxito!');

            // Navigate to products list
            navigate('/productos');
        } catch (err) {
            setError(err.message || 'Error al crear el pedido');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={onClose}></div>
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>🛒 Tu Carrito</h2>
                    <button className="cart-close" onClick={onClose}>✕</button>
                </div>

                <div className="cart-content">
                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <div className="empty-icon">🍔</div>
                            <p>Tu carrito está vacío</p>
                            <p className="text-muted">¡Agrega algunas hamburguesas deliciosas!</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {items.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-info">
                                            <h4>{item.nombre}</h4>
                                            <p className="cart-item-price">{formatCurrency(item.precio)}</p>
                                        </div>

                                        <div className="cart-item-controls">
                                            <div className="quantity-controls">
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => onUpdateItem(item.id, item.cantidad - 1)}
                                                >
                                                    −
                                                </button>
                                                <span className="qty-value">{item.cantidad}</span>
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => onUpdateItem(item.id, item.cantidad + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                className="remove-btn"
                                                onClick={() => onRemoveItem(item.id)}
                                                title="Eliminar"
                                            >
                                                🗑️
                                            </button>
                                        </div>

                                        <div className="cart-item-total">
                                            {formatCurrency(item.precio * item.cantidad)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-footer">
                                <button
                                    className="btn btn-outline btn-block"
                                    onClick={onClearCart}
                                >
                                    Vaciar Carrito
                                </button>

                                <div className="cart-total">
                                    <span>Total:</span>
                                    <span className="total-amount">{formatCurrency(total)}</span>
                                </div>

                                <div className="address-input">
                                    <label htmlFor="direccion">📍 Dirección de entrega (opcional):</label>
                                    <input
                                        type="text"
                                        id="direccion"
                                        placeholder="Ej: Av. Principal 123, Lima"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        className="input-direccion"
                                    />
                                </div>

                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={handleCheckout}
                                    disabled={loading}
                                >
                                    {loading ? 'Procesando...' : 'Realizar Pedido'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
