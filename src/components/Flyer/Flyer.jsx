import { motion } from 'framer-motion';
import { products } from '../../../data';
import { NavLink } from 'react-router-dom';
import ProductImage from '../ProductImage';
import './Flyer.scss';

export default function Flyer() {
  const featured = products[5];
  return (
    <motion.div
      className="flyer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="image">
        <ProductImage src={featured.image} alt={featured.title} />
      </div>
      <div className="content">
        <h2>{featured.title}</h2>
        <span className="offer">Special Offer @ KSH {featured.price.toLocaleString()}</span>
        <p>Limited stock available</p>
        <NavLink to="/shop" className='btn'>Order Now</NavLink>
      </div>
    </motion.div>
  );
}
