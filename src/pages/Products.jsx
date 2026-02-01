import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProducts();
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getProducts();
            setProducts(Array.isArray(data) ? data : data.items || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product) => {
        const productId = product.producto_id || product.id;
        const existingItem = cart.find(item => (item.producto_id || item.id) === productId);

        if (existingItem) {
            setCart(cart.map(item =>
                (item.producto_id || item.id) === productId
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, id: productId, cantidad: 1 }]);
        }

        // Show cart briefly
        setShowCart(true);
    };

    const updateCartItem = (productId, cantidad) => {
        if (cantidad <= 0) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item =>
                (item.producto_id || item.id) === productId ? { ...item, cantidad } : item
            ));
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => (item.producto_id || item.id) !== productId));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const filteredProducts = products.filter(product =>
        product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cartItemCount = cart.reduce((total, item) => total + item.cantidad, 0);

    if (loading) {
        return <Loading message="Cargando productos deliciosos..." />;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={loadProducts} />;
    }

    return (
        <div className="products-page">
            <div className="products-header">
                <div className="container">
                    <h1>Nuestro Menú</h1>
                    <p className="text-secondary">Elige tus hamburguesas favoritas</p>

                    <div className="products-controls">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <button
                            className="cart-toggle-btn"
                            onClick={() => setShowCart(!showCart)}
                        >
                            🛒 Carrito ({cartItemCount})
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                {filteredProducts.length === 0 ? (
                    <div className="no-products">
                        <p>No se encontraron productos</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.producto_id || product.id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Cart
                items={cart}
                isOpen={showCart}
                onClose={() => setShowCart(false)}
                onUpdateItem={updateCartItem}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
            />
        </div>
    );
};

export default Products;
