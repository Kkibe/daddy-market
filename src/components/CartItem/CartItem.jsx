import { FaXmark } from 'react-icons/fa6';
import { useCartActions } from '../../hooks/useCartActions';
import './CartItem.scss';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCartActions();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    updateQuantity(item.id, Math.max(1, Math.min(99, newQuantity)));
  };

  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemoveItem = () => {
    removeFromCart(item.id);
  };

  return (
    <div className='cart-item'>
      <div className="wrapper">
              <div className="preview-image">
        <img
          src={item.image}
          alt={/*item.description*/ 'k'}
          loading="lazy"
        />
      </div>
      {/*<div className="item-details">
        <p className="item-name">{item.description}</p>
        <p className="item-price">KSH {item.price.toLocaleString()} each</p>
      </div>*/}
      <p className="item-name">{item.description}</p>
      <input
        type="number"
        value={item.quantity}
        min="1"
        max="99"
        className='quantity-input quantity'
        onChange={handleQuantityChange}
        aria-label="Item quantity"
      />
      <h2 className="multiply">{item.price}</h2>
      {/*div className="quantity-controls">
        <button
          className="quantity-btn"
          onClick={decrementQuantity}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          type="number"
          value={item.quantity}
          min="1"
          max="99"
          className='quantity-input'
          onChange={handleQuantityChange}
          aria-label="Item quantity"
        />
        <button
          className="quantity-btn"
          onClick={incrementQuantity}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>*/}

      <p className="item-total total">
        {(item.price * item.quantity).toLocaleString()}
      </p>

      <span
        className="remove-btn remove"
        onClick={handleRemoveItem}
        aria-label="Remove item from cart"
      >
        <FaXmark />
      </span>
      </div>
    </div>
  );
}