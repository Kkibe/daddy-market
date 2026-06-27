import { motion } from 'framer-motion';
import { FaTag, FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ProductImage from '../ProductImage';
import { products } from '../../../data';
import './SponsoredAd.scss';

export default function SponsoredAd() {
  const ad = products[2];

  return (
    <motion.div
      className="sponsored-ad"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sponsored-badge">
        <FaTag /> Sponsored
      </div>
      <div className="ad-content">
        <div className="ad-image">
          <ProductImage src={ad.image} alt={ad.title} />
        </div>
        <div className="ad-text">
          <span className="ad-label">Featured Deal</span>
          <h2>{ad.title}</h2>
          <p>{ad.description}</p>
          <div className="ad-price-row">
            <span className="ad-price">KSH {ad.price.toLocaleString()}</span>
            <NavLink to={`/shop/${ad.id}`} className="ad-cta">
              Shop Now <FaArrowRight />
            </NavLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
