import { useRecoilValue } from 'recoil';
import { FaArrowLeft } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import './Cart.scss';
import { cartState } from '../../recoil/atoms';
import { useCartActions } from '../../hooks/useCartActions';
import { cartTotalSelector } from '../../recoil/selectors';

export default function Cart() {
	const cartItems = useRecoilValue(cartState);
	const { subtotal, shipping, discount, total, itemCount, totalQuantity } = useRecoilValue(cartTotalSelector);
	const { clearCart } = useCartActions();

	return (
		<section className="cart">
			<NavLink to="/shop" className="back-btn btn">
				<FaArrowLeft /> Continue Shopping
			</NavLink>

			<h1 className="cart-title">My Cart ({/*cartItems.length*//*itemCount*/ totalQuantity})</h1>

			<div className="cart-content content">
				{cartItems.length === 0 ? (
					<div className="empty-cart">
						<p>Your cart is empty</p>
						<NavLink to="/shop" className="btn btn-primary">
							Start Shopping
						</NavLink>
					</div>
				) : (
					<div className="row">
						<div className="cart-items items">
							<div className="cart-header item-header">
								<p className="header-item">Item</p>
								<p className="header-quantity quantity">Quantity</p>
								<p className="header-price multiply">Price (KSH)</p>
								<p className="header-total total">Subtotal (KSH)</p>
							</div>

							{cartItems.map(item => (
								<CartItem
									key={item.id}
									item={item}
								/>
							))}

							<button
								onClick={clearCart}
								className="clear-cart-btn btn"
							>
								Clear Cart
							</button>
						</div>

						<div className="summary col-md-12 col-lg-4">
							<h3>Order Summary</h3>
							<div className="summary-row summary-item">
								<span className="text">Subtotal</span>
								<span className="price">KSH {subtotal.toLocaleString()}</span>
							</div>
							<div className="summary-row summary-item">
								<span className="text">Shipping</span>
								<span className="price">{shipping === 0 ? 'Free' : `KSH ${shipping}`}</span>
							</div>
							<div className="summary-row summary-item">
								<span className="text">Discount</span>
								<span className="price">-KSH {discount.toLocaleString()}</span>
							</div>
							<div className="summary-row summary-item total">
								<span className="text">Total</span>
								<span className="price">KSH {total.toLocaleString()}</span>
							</div>
							<NavLink
								to="/checkout"
								type="button"
								className="checkout-btn btn-primary btn-lg btn-block btn"
							>
								Proceed to Checkout
							</NavLink>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}