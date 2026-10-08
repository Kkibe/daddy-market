import { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMinus, FaPlus, FaStar, FaCheck, FaArrowLeft } from 'react-icons/fa6';
import { FaShoppingBasket } from 'react-icons/fa';
import { products } from '../../../data';
import PopularStoreItem from '../../components/ProductCards/PopularStoreItem';
import ProductImage from '../../components/ProductImage';
import { useCartActions } from '../../hooks/useCartActions';
import './Product.scss';

export default function Product() {
  const { id } = useParams();
  const data = products.find((p) => p.id === id) || products[0];
  const [items, setItems] = useState(1);
  const { addToCart, removeFromCart, cart } = useCartActions();
  const isInCart = cart.some((item) => item.id === data.id);

  const handleAdd = (type) => {
    if (type === 'add') setItems(items + 1);
    else if (type === 'less' && items > 1) setItems(items - 1);
  };

  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(data.id);
    } else {
      addToCart({
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image,
        quantity: items,
      });
    }
  };

  const related = products.filter((p) => p.id !== data.id).slice(0, 6);

  return (
    <div className="product">
      <NavLink to="/shop" className="back-link">
        <FaArrowLeft /> Back to Store
      </NavLink>

      <div className="card product-card">
        <motion.div
          className="image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ProductImage src={data.image} alt={data.title} />
        </motion.div>

        <div className="content">
          <h3>{data.title}</h3>
          <p className="product-desc">{data.description}</p>

          {data.categories && (
            <p className="categories">
              {data.categories.map((category) => (
                <span className="hash" key={category}>{category}</span>
              ))}
            </p>
          )}

          {data.features && (
            <ul className="features">
              {data.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}

          <span className="pricing">
            <h3 className="sub-heading duration">KSH {data.price.toLocaleString()}</h3>
            <a className="badge"><FaStar className="star" /> {data.rating || data.stars}</a>
          </span>

          <span className="actions">
            <div className="quantity-control">
              <a onClick={() => handleAdd('less')}><FaMinus /></a>
              <h3 className="sub-heading">{items}</h3>
              <a onClick={() => handleAdd('add')}><FaPlus /></a>
            </div>
            <button className={`btn ${isInCart ? 'in-cart' : 'primary'}`} onClick={handleCartAction}>
              {isInCart ? <><FaCheck /> In Cart</> : <><FaShoppingBasket /> Add to Cart</>}
            </button>
          </span>
        </div>
      </div>

      <div className="wrapper">
        <h3>You Might Also Like</h3>
        <div className="container">
          {related.map((item) => (
            <PopularStoreItem data={{ ...item }} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
