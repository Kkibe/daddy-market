import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCartPlus, FaCheckCircle, FaShareAlt, FaStar } from "react-icons/fa";
import ShareModal from '../ShareModal/ShareModal';
import ProductImage from '../ProductImage';
import { NavLink } from 'react-router-dom';
import { useCartActions } from '../../hooks/useCartActions';

export default function PopularStoreItem({ data }) {
    const [showShareModal, setShowShareModal] = useState(false);
    const { addToCart, cart, removeFromCart } = useCartActions();

    const isInCart = cart.some(item => item.id === data.id);

    const handleAddToCart = () => {
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
        <div className="card-wrapper popular-card-wrapper">
            <ShareModal visible={showShareModal} setVisible={setShowShareModal} product={data} />
            <motion.div
                className="card popular-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
            >
                <div className="image">
                    <ProductImage src={data.image} alt={data.title} />
                    <button
                        className='share-btn'
                        onClick={() => setShowShareModal(true)}
                        aria-label="Share"
                    >
                        <FaShareAlt />
                    </button>
                </div>

                <div className="content">
                    <div className="meta">
                        <span className='rating trailing'>
                            <FaStar className='star' /> {data.rating || data.stars || '4.5'}
                        </span>
                        <div className="price duration">KSH {data.price.toLocaleString()}</div>
                    </div>

                    <NavLink to={`/shop/${data.id}`} className="product-title">
                        <h3>{data.title}</h3>
                    </NavLink>

                    <p>{data.description}</p>

                    <button
                        className={`add-to-cart ${isInCart ? 'in-cart' : ''}`}
                        onClick={handleAddToCart}
                        aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
                    >
                        {isInCart ? <FaCheckCircle className='cart-icon' /> : <FaCartPlus className='cart-icon' />}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
