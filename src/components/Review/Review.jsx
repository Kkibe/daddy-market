import { motion } from 'framer-motion';
import { FaQuoteRight, FaStar } from "react-icons/fa";
import { testimonials } from '../../../data';
import './Review.scss';

export default function Review() {
    return (
        <section className='review' id='review'>
            <div className="section-header">
                <h3 className="sub-heading">Customer Reviews</h3>
                <h1>What They Say</h1>
            </div>
            <div className="review-slider">
                <div className="wrapper">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            className="slide"
                            key={testimonial.id + i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="quote-icon"><FaQuoteRight /></span>
                            <div className="user">
                                <div className="user-info">
                                    <h3>{testimonial.name}</h3>
                                    <p className="rating">
                                        <FaStar className='star' /> {testimonial.stars}
                                    </p>
                                </div>
                            </div>
                            <p className="comment">{testimonial.comment}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
