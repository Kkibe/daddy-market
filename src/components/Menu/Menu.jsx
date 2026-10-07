import './Menu.scss';
import { FaEye } from "react-icons/fa";
import { motion } from 'framer-motion';
import { products } from '../../../data';
import { useCartActions } from '../../hooks/useCartActions';

export default function Menu() {
  const { addToCart, cart, removeFromCart } = useCartActions();

  const toggleSingle = () => {
    document.querySelector('.single')?.classList.toggle('active');
  };

  const handleAddToCart = (item) => {
    const isInCart = cart.some(i => i.id === item.id);
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
    <section className='menu' id='menu'>
      <div className="section-header">
        <h3 className="sub-heading">Discover More</h3>
        <h1>Trending Today</h1>
      </div>
      <div className="container">
        {products.slice(0, 8).map((item, i) => {
          const isInCart = cart.some(ci => ci.id === item.id);
          return (
            <motion.div
              className="card"
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.05 }}
            >
              <div className="image">
                <img src={item.image} alt={item.title} loading="lazy" />
                <button className="icon eye" onClick={toggleSingle} aria-label="Quick view"><FaEye /></button>
              </div>
              <div className="content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-footer">
                  <span className="price">KSH {item.price.toLocaleString()}</span>
                  <button
                    className={`btn ${isInCart ? 'in-cart' : ''}`}
                    onClick={() => handleAddToCart(item)}
                  >
                    {isInCart ? 'In Cart' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
