import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCartPlus, FaCheckCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useCartActions } from '../../hooks/useCartActions';
import ProductImage from '../ProductImage';

export default function ProductItem({ product }) {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart, cart, removeFromCart } = useCartActions();

    const isInCart = cart.some(item => item.id === product.id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
        }
    };

    return (
        <motion.div
            className={`product-card card blog ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <div className="product-image-container image">
                <ProductImage
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                />
            </div>

            <div className="product-content content">
                <div className="product-meta meta">
                    <span className="product-price trailing">
                        KSH: <span className="price-amount">{product.price.toLocaleString()}</span>
                    </span>
                    <button
                        className={`add-to-cart-btn btn ${isInCart ? 'in-cart' : ''}`}
                        onClick={handleAddToCart}
                        aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
                    >
                        {isInCart ? <FaCheckCircle className="cart-icon" /> : <FaCartPlus className="cart-icon" />}
                    </button>
                </div>

                <NavLink to={`/shop/${product.id}`} className="product-title-link">
                    <h3 className="product-title">{product.title}</h3>
                </NavLink>

                <p className="product-description">{product.description}</p>
            </div>
        </motion.div>
    );
}
