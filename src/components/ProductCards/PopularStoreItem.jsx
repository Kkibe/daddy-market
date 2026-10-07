import { useState } from 'react';
import { FaCartPlus, FaCheckCircle, FaShareAlt, FaStar } from "react-icons/fa";
import ShareModal from '../ShareModal/ShareModal';
import { NavLink } from 'react-router-dom';
import { useWishlist } from '../../hooks/useWishlist';
import { useCartActions } from '../../hooks/useCartActions';

export default function PopularStoreItem({ data }) {
    const [showShareModal, setShowShareModal] = useState(false);
    const { addToCart, cart, removeFromCart } = useCartActions(); //useCartActions();
    const { toggleWishlistItem, isInWishlist } = useWishlist();

    // Check if item is already in cart
    const isInCart = cart.some(item => item.id === data.id);

    const handleAddToCart = () => {
        /*addToCart({
            id: data.id,
            title: data.description,
            price: data.price,
            image: data.image,
            quantity: 1
        });*/
        isInCart ? removeFromCart : addToCart(data)
    };

    return (
        <div className="card">
            <ShareModal visible={showShareModal} onClose={() => setShowShareModal(false)} />

            <div className="image">
                <img src={data.image} alt={data.description} />
                <a className='icon share' onClick={() => setShowShareModal(true)}><FaShareAlt /></a>
                {/*<div} className="icon-group">
                    <button
                        className={`icon wishlist ${isInWishlist(data.id) ? 'active' : ''}`}
                        onClick={() => toggleWishlistItem(data.id)}
                        aria-label={isInWishlist(data.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        {isInWishlist(data.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <button
                        className="icon share"
                        onClick={() => setShowShareModal(true)}
                        aria-label="Share product"
                    >
                        <FaShareAlt />
                    </button>
                    <NavLink
                        to={`shop/${data.id}`}
                        className="icon preview"
                        aria-label="View product details"
                    >
                        <FaEye />
                    </NavLink>
                </div>*/}
            </div>

            <div className="content">
                <div className="meta">
                    <span className='rating trailing'><FaStar className='star' /> {data.rating || '5.2K'}</span>
                    <div className="price">KSH {data.price.toLocaleString()}</div>
                </div>

                <NavLink to={`shop/${data.id}`} className="product-title">
                    <h3>{data.description}</h3>
                </NavLink>

                <p className="product-description">{data.description}</p>

                <a
                    className={`add-to-cart add green ${isInCart ? 'in-cart' : ''}`}
                    onClick={handleAddToCart}
                    aria-label={isInCart ? 'Item in cart' : 'Add to cart'}
                >
                    {isInCart ?  <FaCartPlus className='cart-icon'/> : <FaCheckCircle className='cart-icon'/> }
                </a>
            </div>
        </div>
    );
}