import { motion } from 'framer-motion';
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
  return (
    <section className='home'>
      <div className="hero-slide">
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProductImage src={products[0].image} alt={products[0].title} />
        </motion.div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="hero-price">KSH {products[0].price.toLocaleString()}</span>
          <h1 className="hero-title">{products[0].title}</h1>
          <p className="hero-desc">{products[0].description}</p>
          <NavLink to="/shop" className="btn hero-cta">Shop Now</NavLink>
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
