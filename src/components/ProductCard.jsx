import { formatCurrency } from '../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
    const getProductEmoji = () => {
        if (product.categoria?.toLowerCase() === 'bebidas') {
            return '🥤';
        }
        return '🍔';
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <div className="product-placeholder">
                    {getProductEmoji()}
                </div>
            </div>

            <div className="product-content">
                <h3 className="product-name">{product.nombre}</h3>
                <p className="product-description">{product.descripcion}</p>

                <div className="product-footer">
                    <div className="product-price">
                        {formatCurrency(product.precio)}
                    </div>
                    <button
                        className="btn btn-primary btn-add-cart"
                        onClick={() => onAddToCart(product)}
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
