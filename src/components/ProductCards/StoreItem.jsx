import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShareAlt, FaStar, FaShoppingBasket, FaCheck, FaHeart, FaRegHeart } from 'react-icons/fa';
import ShareModal from '../ShareModal/ShareModal';
import { useWishlist } from '../../hooks/useWishlist';
import { useCartActions } from '../../hooks/useCartActions';

export default function StoreItem({ data }) {
    const [showShareModal, setShowShareModal] = useState(false);
    const { addToCart, removeFromCart, cart } = useCartActions();
    const { toggleWishlistItem, isInWishlist } = useWishlist();

    const isInCart = cart.some(item => item.id === data.id);

    const handleCartAction = () => {
        if (isInCart) {
            removeFromCart(data.id);
        } else {
            addToCart({
                id: data.id,
                title: data.title,
                description: data.description,
                price: data.price,
                image: data.image,
                quantity: 1,
            });
        }
    };

    return (
        <motion.div
            className="card"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <ShareModal
                visible={showShareModal}
                setVisible={() => setShowShareModal(false)}
                product={data}
            />
            <button
                className={`wishlist-btn icon heart ${isInWishlist(data.id) ? 'active' : ''}`}
                onClick={() => toggleWishlistItem(data.id, data.title)}
                aria-label={isInWishlist(data.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
                {isInWishlist(data.id) ? <FaHeart /> : <FaRegHeart />}
            </button>

            <button
                className="share-btn icon share"
                onClick={() => setShowShareModal(true)}
                aria-label="Share this product"
            >
                <FaShareAlt />
            </button>

            <div className="image-container image">
                <img src={data.image} alt={data.title} loading="lazy" />
            </div>

            <div className="content">
                <div className="meta-info meta">
                    <span className="rating trailing">
                        <FaStar className="star-icon star" />
                        {data.rating || data.stars || '4.5'}
                    </span>
                    <div className="price duration">KSH {data.price.toLocaleString()}</div>
                </div>

                <h3>{data.title}</h3>
                <p>{data.description}</p>

                {data.categories && (
                    <div className="category-tags">
                        {data.categories.map((category, index) => (
                            <span key={index} className="tag hash">{category}</span>
                        ))}
                    </div>
                )}

                <button
                    className={`cart-btn btn ${isInCart ? 'in-cart' : 'add'}`}
                    onClick={handleCartAction}
                    aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
                >
                    {isInCart ? <FaCheck /> : <FaShoppingBasket />}
                </button>
            </div>
        </motion.div>
    );
}
