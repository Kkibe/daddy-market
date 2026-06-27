import { useState } from 'react';
import { motion } from 'framer-motion';
import './SliderTwo.scss';
import { FaArrowLeft, FaArrowRight, FaCartPlus, FaCheckCircle } from 'react-icons/fa';
import { products } from '../../../data';
import { NavLink } from 'react-router-dom';
import ProductImage from '../ProductImage';
import { useCartActions } from '../../hooks/useCartActions';

export default function SliderTwo() {
    const [slideIndex, setSlideIndex] = useState(0);
    const { addToCart, cart, removeFromCart } = useCartActions();
    const maxIndex = products.length - 1;

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 0);
        } else {
            setSlideIndex(slideIndex < maxIndex ? slideIndex + 1 : maxIndex);
        }
    };

    return (
        <div className="slider slider-two">
            {slideIndex > 0 && (
                <div className="arrow left" onClick={() => handleClick("left")} aria-label="Previous">
                    <FaArrowLeft />
                </div>
            )}
            <div className="slide-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                {products.map((dish) => {
                    const isInCart = cart.some(item => item.id === dish.id);
                    return (
                        <div className="slide" key={dish.id}>
                            <div className='slide-container'>
                                <span className="price-tag">KSH {dish.price.toLocaleString()}</span>
                                <h2 className='heading'>{dish.title}</h2>
                                <p>{dish.description}</p>
                                <div className="slide-actions">
                                    <NavLink to={`/shop/${dish.id}`} className='btn view-btn'>View Details</NavLink>
                                    <button
                                        className={`btn cart-btn ${isInCart ? 'in-cart' : ''}`}
                                        onClick={() => isInCart ? removeFromCart(dish.id) : addToCart({
                                            id: dish.id, title: dish.title, description: dish.description,
                                            price: dish.price, image: dish.image, quantity: 1,
                                        })}
                                    >
                                        {isInCart ? <FaCheckCircle /> : <FaCartPlus />}
                                        {isInCart ? 'In Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                            <motion.div
                                className="image"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ProductImage src={dish.image} alt={dish.title} />
                            </motion.div>
                        </div>
                    );
                })}
            </div>
            {slideIndex < maxIndex && (
                <div className="arrow right" onClick={() => handleClick("right")} aria-label="Next">
                    <FaArrowRight />
                </div>
            )}
        </div>
    );
}
