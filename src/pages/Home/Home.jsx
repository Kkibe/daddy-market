import { motion } from 'framer-motion';
import { FaArrowRight, FaTruckFast, FaShieldHalved, FaTags } from 'react-icons/fa6';
import ProductItem from '../../components/ProductCards/ProductItem';
import PopularStoreItem from '../../components/ProductCards/PopularStoreItem';
import ProductImage from '../../components/ProductImage';
import { products, categories } from '../../../data';
import { NavLink } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import SliderOne from '../../components/SliderOne/SliderOne';
import SliderTwo from '../../components/SliderTwo/SliderTwo';
import './Home.scss';

export default function Home() {
  const featured = products[0];

  return (
    <section className='home'>
      <div className="hero">
        <div className="hero-bg">
          <div className="hero-glow" />
        </div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ProductImage src={featured.image} alt={featured.title} />
          <div className="hero-badge">
            <FaTags /> Featured
          </div>
        </motion.div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="hero-tag">Fresh Groceries Delivered</span>
          <h1 className="hero-title">{featured.title}</h1>
          <p className="hero-desc">{featured.description}</p>
          <div className="hero-actions">
            <NavLink to="/shop" className="btn hero-cta">
              Shop Now <FaArrowRight />
            </NavLink>
            <NavLink to={`/shop/${featured.id}`} className="btn hero-secondary">
              View Details
            </NavLink>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <FaTruckFast className="stat-icon" />
              <span>Fast Delivery</span>
            </div>
            <div className="stat">
              <FaShieldHalved className="stat-icon" />
              <span>Quality Guaranteed</span>
            </div>
            <div className="stat">
              <FaTags className="stat-icon" />
              <span>Best Prices</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="section-header">
        <h3 className="sub-heading">Browse</h3>
        <h1>Shop by Category</h1>
      </div>

      <div className="categories">
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <NavLink to={category.link}>
              <div className="category-card">
                <ProductImage src={category.image} alt={category.title} />
                <div className="overlay">
                  <h3>{category.title}</h3>
                </div>
              </div>
            </NavLink>
          </motion.div>
        ))}
      </div>

      <Menu />
      <SliderOne />

      <div className="section-header">
        <h3 className="sub-heading">Our Menu</h3>
        <h1>Today's Specialty</h1>
      </div>

      <div className="popular">
        {products.slice(0, 8).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 4) * 0.05 }}
          >
            <PopularStoreItem data={{ ...item }} />
          </motion.div>
        ))}
      </div>

      <SliderTwo />

      <div className="section-header">
        <h3 className="sub-heading">Explore Our Blog</h3>
        <h1>Trending Posts</h1>
      </div>

      <div className="posts">
        {products.slice(0, 4).map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
