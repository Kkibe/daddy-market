import { useState } from 'react';
import { FaShareAlt, FaStar, FaShoppingBasket, FaCheck, FaHeart, FaRegHeart } from 'react-icons/fa';
import ShareModal from '../ShareModal/ShareModal';
import { useWishlist } from '../../hooks/useWishlist';
import { useCartActions} from '../../hooks/useCartActions';

export default function StoreItem({ data }) {
    const [showShareModal, setShowShareModal] = useState(false);
    const { addToCart, removeFromCart, cart } = useCartActions();
    const { toggleWishlistItem, isInWishlist } = useWishlist();

    // Check if item is in cart
    const isInCart = cart.some(item => item.id === data.id);

    const handleCartAction = () => {
        if (isInCart) {
            removeFromCart(data.id);
        } else {
            addToCart({
                id: data.id,
                title: data.description,
                price: data.price,
                image: data.image,
                quantity: 1
            });
        }
    };

    return (
        <div className="card">
            <ShareModal
                visible={showShareModal}
                setVisible={() => setShowShareModal(false)}
                product={data}
            />
            <a
                className={`wishlist-btn icon heart ${isInWishlist(data.id) ? 'active' : ''}`}
                onClick={() => toggleWishlistItem(data.id)}
                aria-label={isInWishlist(data.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
                {isInWishlist(data.id) ? <FaHeart /> : <FaRegHeart />}
            </a>

            <a
                className="share-btn icon shar"
                onClick={() => setShowShareModal(true)}
                aria-label="Share this product"
            >
                <FaShareAlt />
            </a>
            <div className="image-container image">
                <img
                    src={data.image}
                    alt={data.description}
                    className="product-image"
                    loading="lazy"
                />

                {/*<div className="action-buttons">
                    <button
                        className={`wishlist-btn ${isInWishlist(data.id) ? 'active' : ''}`}
                        onClick={() => toggleWishlistItem(data.id)}
                        aria-label={isInWishlist(data.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        {isInWishlist(data.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    <button
                        className="share-btn"
                        onClick={() => setShowShareModal(true)}
                        aria-label="Share this product"
                    >
                        <FaShareAlt />
                    </button>
                </div>*/}
            </div>

            <div className="content">
                <div className="meta-info meta">
                    <span className="rating trailing">
                        <FaStar className="star-icon star" />
                        {data.stars}K
                    </span>
                    <div className="price duration">KSH {data.price.toLocaleString()}</div>
                </div>

                {/*<NavLink to={`/product/${data.id}`} className="product-title">
                    <h3>{data.description}</h3>
                </NavLink>*/}
                <h3>{data.description}</h3>

                <p className="product-description">{data.description}</p>

                {data.categories && (
                    <div className="category-tags">
                        {data.categories.map((category, index) => (
                            <span key={index} className="tag hash">
                                {category}
                            </span>
                        ))}
                    </div>
                )}

                <button
                    className={`cart-btn btn ${isInCart ? 'in-cart' : 'add'}`}
                    onClick={handleCartAction}
                    aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
                >
                    {isInCart ? (
                        <>
                            <FaCheck />
                        </>
                    ) : (
                        <>
                            <FaShoppingBasket />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}