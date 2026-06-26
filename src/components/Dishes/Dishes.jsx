import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaShareAlt, FaStar } from 'react-icons/fa';
import ShareModal from '../ShareModal/ShareModal';

export default function Dishes({ data }) {
  const toggleSingle = () => {
    document.querySelector('.single')?.classList.toggle('active');
  };

  const Dish = ({ item }) => {
    const [visible, setVisible] = useState(false);
    return (
      <motion.div
        className="dish card"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {visible && <ShareModal visible={visible} setVisible={setVisible} />}
        <button className="icon heart" onClick={() => setVisible(true)} aria-label="Share"><FaShareAlt /></button>
        <button className="icon eye" onClick={toggleSingle} aria-label="Quick view"><FaEye /></button>
        <img src={item.image} alt={item.title} loading="lazy" />
        <h3>{item.title}</h3>
        <div className="dish-meta">
          <span className="dish-rating"><FaStar className="star" /> {item.rating || item.stars || '4.5'}</span>
          <span className="dish-price">KSH {item.price.toLocaleString()}</span>
        </div>
        <a href="/shop" className='btn'>Add to Cart</a>
      </motion.div>
    );
  };

  return (
    <section className='dishes' id='dishes'>
      <div className="section-header">
        <h3 className="sub-heading">Explore Our Store</h3>
        <h1>Popular Products</h1>
      </div>
      <div className="container">
        {data && data.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 4) * 0.05 }}
          >
            <Dish item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
