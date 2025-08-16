import React, { useState } from 'react';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Image from '../assets/chicken.jpg';
//import { useCart } from '../hooks/useCart';
import { useCartActions } from '../hooks/useCartActions';

export default function ProductItem({ product = {
    id: 'default-id',
    title: 'Delicious chicken piece',
    description: '1 chicken piece with regular chips.',
    price: 159,
    imageUrl: Image // Changed from 'image' to 'imageUrl' to match your usage
} }) {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart, cart, removeFromCart } = useCartActions();
    const [showShareModal, setShowShareModal] = useState(false);

    // Check if product is already in cart
    const isInCart = cart.some(item => item.id === product.id);

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        e.preventDefault(); // Prevent default behavior
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart({
                id: product.id,
                title: product.description, // Using description as title
                description: product.description,
                price: product.price,
                image: product.imageUrl, // Using imageUrl
                quantity: 1
            });
        }
    };

    return (
        <div
            className={`product-card card blog ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-container image">
                <img
                    src={product.imageUrl}
                    alt={product.description}
                    className="product-image"
                    loading="lazy"
                />
            </div>

            <div className="product-content content">
                <div className="product-meta meta">
                    <span className="product-price trailing">
                        KSH: <span className="price-amount">{product.price.toLocaleString()}</span>
                    </span>
                    <button // Changed from div to button for better accessibility
                        className={`add-to-cart-btn btn ${isInCart ? 'in-cart' : ''}`}
                        onClick={handleAddToCart}

                        aria-label={isInCart ? 'Item in cart' : 'Add to cart'}
                    >
                        {isInCart ? (
                            <>
                                <FaCheck className="cart-icon" /> Remove
                            </>
                        ) : (
                            <>
                                <FaShoppingCart className="cart-icon" /> Add to Cart
                            </>
                        )}
                    </button>
                </div>

                <NavLink to={`/products/${product.id}`} className="product-title-link">
                    <h3 className="product-title">{product.description}</h3>
                </NavLink>

                <p className="product-description">{product.description}</p>
            </div>
        </div>
    );
}