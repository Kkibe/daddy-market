import { FaXmark } from 'react-icons/fa6';
import { useCartActions } from '../../hooks/useCartActions';
import './CartItem.scss';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCartActions();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    updateQuantity(item.id, Math.max(1, Math.min(99, newQuantity)));
  };

  return (
    <div className='cart-item'>
      <div className="wrapper">
        <div className="preview-image">
          <img src={item.image} alt={item.title || item.description} loading="lazy" />
        </div>
        <p className="item-name">{item.title || item.description}</p>
        <input
          type="number"
          value={item.quantity}
          min="1"
          max="99"
          className='quantity-input quantity'
          onChange={handleQuantityChange}
          aria-label="Item quantity"
        />
        <h2 className="multiply">×{item.price}</h2>
        <p className="item-total total">
          {(item.price * item.quantity).toLocaleString()}
        </p>
        <span
          className="remove-btn remove"
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item from cart"
        >
          <FaXmark />
        </span>
      </div>
    </div>
  );
}
