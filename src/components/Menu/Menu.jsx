import './Menu.scss';
import { FaEye } from "react-icons/fa";
import { motion } from 'framer-motion';
import { products } from '../../../data';

export default function Menu() {
  const toggleSingle = () => {
    document.querySelector('.single')?.classList.toggle('active');
  };

  return (
    <section className='menu' id='menu'>
      <div className="section-header">
        <h3 className="sub-heading">Discover More</h3>
        <h1>Trending Today</h1>
      </div>
      <div className="container">
        {products.slice(0, 8).map((item, i) => (
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
                <a href="/shop" className="btn">Add to cart</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
