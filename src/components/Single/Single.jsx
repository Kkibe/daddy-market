import { useState } from 'react';
import { motion } from 'framer-motion';
import './Single.scss';
import { FaMinus, FaXmark } from "react-icons/fa6";
import { FaPlus, FaShippingFast, FaStar } from 'react-icons/fa';
import { products } from '../../../data';
import { useCartActions } from '../../hooks/useCartActions';
import { NavLink } from 'react-router-dom';

export default function Single() {
  const [items, setItems] = useState(0);
  const { addToCart } = useCartActions();
  const product = products[0];

  const toggleSingle = () => {
    document.querySelector('.single')?.classList.toggle('active');
  };

  const handleItems = (type) => {
    if (type === 'add') setItems(items + 1);
    else if (items > 0) setItems(items - 1);
  };

  const handleAddToCart = () => {
    if (items > 0) {
      addToCart({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity: items,
      });
      setItems(0);
      toggleSingle();
    }
  };

  return (
    <div className='single'>
      <motion.div
        className="wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="details">
          <h1>{product.title}</h1>
          <span className='pricing'>
            <h3 className="sub-heading">KSH {product.price.toLocaleString()}</h3>
            <a className="icon badge">Free Shipping <FaShippingFast /></a>
          </span>
          <p>{product.description}</p>
          <div className="stars">
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStar className='star' />
          </div>
          <span className="actions">
            {items === 0 ? (
              <button className="btn" onClick={() => handleItems('add')}>Add To Cart</button>
            ) : (
              <div className="quantity-control">
                <a className="icon" onClick={() => handleItems('remove')}><FaMinus /></a>
                <h3 className="sub-heading">{items}</h3>
                <a className="icon" onClick={() => handleItems('add')}><FaPlus /></a>
              </div>
            )}
            <button className="btn primary" onClick={handleAddToCart}>Buy Now</button>
            <NavLink to={`/shop/${product.id}`} className="btn" onClick={toggleSingle}>View Details</NavLink>
          </span>
        </div>
      </motion.div>
      <span id="close" onClick={toggleSingle}><FaXmark /></span>
    </div>
  );
}
