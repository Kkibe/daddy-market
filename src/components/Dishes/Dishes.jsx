import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaShareAlt, FaStar } from 'react-icons/fa';
import ShareModal from '../ShareModal/ShareModal';
import { useCartActions } from '../../hooks/useCartActions';

export default function Dishes({ data }) {
  const toggleSingle = () => {
    document.querySelector('.single')?.classList.toggle('active');
  };

  const Dish = ({ item }) => {
    const [visible, setVisible] = useState(false);
    const { addToCart, cart, removeFromCart } = useCartActions();
    const isInCart = cart.some(i => i.id === item.id);

    const handleAddToCart = () => {
      if (isInCart) {
        removeFromCart(item.id);
      } else {
        addToCart({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          image: item.image,
          quantity: 1,
        });
      }
    };

    return (
      <div className="card-wrapper">
        <ShareModal visible={visible} setVisible={setVisible} product={item} />
        <motion.div
          className="dish card"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <button className="icon heart" onClick={() => setVisible(true)} aria-label="Share"><FaShareAlt /></button>
          <button className="icon eye" onClick={toggleSingle} aria-label="Quick view"><FaEye /></button>
          <img src={item.image} alt={item.title} loading="lazy" />
          <h3>{item.title}</h3>
          <div className="dish-meta">
            <span className="dish-rating"><FaStar className="star" /> {item.rating || item.stars || '4.5'}</span>
            <span className="dish-price">KSH {item.price.toLocaleString()}</span>
          </div>
          <button className={`btn ${isInCart ? 'in-cart' : ''}`} onClick={handleAddToCart}>
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </motion.div>
      </div>
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
