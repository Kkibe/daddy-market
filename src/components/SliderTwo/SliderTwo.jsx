import { useState } from 'react';
import { motion } from 'framer-motion';
import './SliderTwo.scss';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { products } from '../../../data';

export default function SliderTwo() {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : (products.length - 1));
        } else {
            setSlideIndex(slideIndex < (products.length - 1) ? slideIndex + 1 : 0);
        }
    };

    return (
        <div className="slider slider-two">
            <div className="arrow" onClick={() => handleClick("left")} aria-label="Previous">
                <FaArrowLeft />
            </div>
            <div className="slide-wrapper" style={{ transform: `translateX(${slideIndex * -100}%)` }}>
                {products.map((dish) => (
                    <div className="slide" key={dish.id}>
                        <motion.div
                            className="image"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <img src={dish.image} alt={dish.title} />
                        </motion.div>
                        <div className='slide-container'>
                            <span className="price-tag">KSH {dish.price.toLocaleString()}</span>
                            <hr />
                            <h2 className='heading'>{dish.title}</h2>
                            <p>{dish.description}</p>
                            <a href="/shop" className='btn'>Shop Now</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="arrow" onClick={() => handleClick("right")} aria-label="Next">
                <FaArrowRight />
            </div>
        </div>
    );
}
