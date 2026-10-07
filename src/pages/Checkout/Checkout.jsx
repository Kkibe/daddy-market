import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaSpinner, FaExclamationTriangle, FaMobileAlt, FaCreditCard, FaUniversity, FaShieldAlt } from 'react-icons/fa';
import { cartState } from '../../recoil/atoms';
import { cartTotalSelector } from '../../recoil/selectors';
import { userState } from '../../recoil/atoms';
import { initiateMpesaPayment, initiateCardPayment, initiateBankTransferPayment, pollPaymentStatus, PAYMENT_METHODS } from '../../lib/paymentService';
import { createOrderWithItems, updateOrderStatus } from '../../lib/orderService';
import './Checkout.scss';

const STEPS = ['details', 'payment', 'processing', 'confirmation'];

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useRecoilValue(cartState);
  const user = useRecoilValue(userState);
  const { subtotal, shipping, discount, total, totalQuantity } = useRecoilValue(cartTotalSelector);

  const [step, setStep] = useState('details');
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.MPESA);
  const [paymentOption, setPaymentOption] = useState('full');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderResult, setOrderResult] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  const [form, setForm] = useState({
    name: user?.displayName || user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: 'Nairobi',
    zip: '',
    // card fields
    card_number: '',
    exp_month: '',
    exp_year: '',
    cvv: '',
  });

  const amountToPay = paymentOption === '50%' ? Math.ceil(total / 2) : total;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateDetails = () => {
    if (!form.name.trim()) return 'Please enter your name';
    if (!form.phone.trim()) return 'Phone number is required';
    if (!/^[0-9+\s]{9,15}$/.test(form.phone.trim())) return 'Enter a valid phone number';
    if (!form.street.trim()) return 'Street address is required';
    if (!form.city.trim()) return 'City is required';
    return null;
  };

  const validateCard = () => {
    if (paymentMethod !== PAYMENT_METHODS.CARD) return null;
    if (!form.card_number.trim()) return 'Card number is required';
    if (!form.exp_month.trim() || !form.exp_year.trim()) return 'Expiry date is required';
    if (!form.cvv.trim()) return 'CVV is required';
    return null;
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    const err = validateDetails();
    if (err) { setError(err); return; }
    setError(null);
    setStep('payment');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const cardErr = validateCard();
    if (cardErr) { setError(cardErr); return; }
    setError(null);
    setLoading(true);
    setStep('processing');
    setPaymentStatus('initiating');

    let checkoutId = null;
    let txRef = null;
    let savedOrder = null;

    try {
      // 1. Persist the order to Supabase first
      const orderPayload = {
        user_email: user?.email || form.email || null,
        user_id: user?.uid || null,
        customer_name: form.name,
        customer_phone: form.phone,
        customer_email: form.email || null,
        street: form.street,
        city: form.city,
        zip: form.zip,
        payment_method: paymentMethod,
        payment_option: paymentOption,
        subtotal,
        shipping,
        discount,
        total: amountToPay,
        currency: 'KES',
        status: 'pending',
      };
      const { order } = await createOrderWithItems(orderPayload, cart);
      savedOrder = order;

      // 2. Initiate payment with the Rise API
      let initResult;
      if (paymentMethod === PAYMENT_METHODS.MPESA) {
        initResult = await initiateMpesaPayment({
          amount: amountToPay,
          currency: 'KES',
          phone: form.phone,
          email: form.email || user?.email || '',
          fullname: form.name,
        });
      } else if (paymentMethod === PAYMENT_METHODS.CARD) {
        initResult = await initiateCardPayment({
          amount: amountToPay,
          currency: 'USD',
          card_number: form.card_number.replace(/\s/g, ''),
          exp_month: form.exp_month,
          exp_year: form.exp_year,
          cvv: form.cvv,
          email: form.email || user?.email || '',
        });
      } else {
        initResult = await initiateBankTransferPayment({
          amount: amountToPay,
          currency: 'NGN',
          email: form.email || user?.email || '',
        });
      }

      checkoutId = initResult.checkoutId;
      txRef = initResult.tx_ref;

      // 3. Update the order with checkout references
      await updateOrderStatus(savedOrder.id, {
        status: 'pending',
        checkout_id: checkoutId,
        tx_ref: txRef,
      });

      setPaymentStatus('awaiting_payment');

      // 4. Poll for payment status
      const pollResult = await pollPaymentStatus({
        checkoutId,
        tx_ref: txRef,
        onUpdate: (status) => setPaymentStatus(status),
        intervalMs: 4000,
        maxAttempts: 30,
      });

      const finalStatus = pollResult.status === 'success' ? 'success' : 'failed';
      await updateOrderStatus(savedOrder.id, { status: finalStatus });

      setOrderResult({
        orderId: savedOrder.id,
        status: finalStatus,
        checkoutId,
        txRef,
        amount: amountToPay,
      });
      setPaymentStatus(finalStatus);
      setStep('confirmation');
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      setPaymentStatus('failed');
      if (savedOrder) {
        try { await updateOrderStatus(savedOrder.id, { status: 'failed' }); } catch {}
      }
      setStep('payment');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <section className="checkout">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add some products before checking out.</p>
          <button className="btn" onClick={() => navigate('/shop')}>Browse Products</button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout">
      <button className="back-btn" onClick={() => navigate('/cart')}>
        <FaArrowLeft /> Back to Cart
      </button>

      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="step-indicator">
          {STEPS.map((s, i) => (
            <div key={s} className={`step-dot ${step === s ? 'active' : ''} ${STEPS.indexOf(step) > i ? 'done' : ''}`}>
              <span>{i + 1}</span>
              <label>{s}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-grid">
        <div className="checkout-main">
          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <form onSubmit={handleDetailsSubmit} className="checkout-form">
                  <h2>Delivery Details</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="254712345678" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email (optional)</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input name="city" value={form.city} onChange={handleChange} placeholder="Nairobi" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Street Address</label>
                      <input name="street" value={form.street} onChange={handleChange} placeholder="123 Main St" required />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input name="zip" value={form.zip} onChange={handleChange} placeholder="00100" />
                    </div>
                  </div>
                  {error && <p className="error-msg"><FaExclamationTriangle /> {error}</p>}
                  <button type="submit" className="btn primary">Continue to Payment</button>
                </form>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <form onSubmit={handlePaymentSubmit} className="checkout-form">
                  <h2>Payment Method</h2>

                  <div className="payment-options">
                    <label className={`payment-option ${paymentMethod === PAYMENT_METHODS.MPESA ? 'selected' : ''}`}>
                      <input type="radio" name="paymentMethod" value={PAYMENT_METHODS.MPESA} checked={paymentMethod === PAYMENT_METHODS.MPESA} onChange={() => setPaymentMethod(PAYMENT_METHODS.MPESA)} />
                      <FaMobileAlt className="pay-icon" />
                      <div>
                        <strong>M-Pesa</strong>
                        <span>STK push to your phone</span>
                      </div>
                    </label>
                    <label className={`payment-option ${paymentMethod === PAYMENT_METHODS.CARD ? 'selected' : ''}`}>
                      <input type="radio" name="paymentMethod" value={PAYMENT_METHODS.CARD} checked={paymentMethod === PAYMENT_METHODS.CARD} onChange={() => setPaymentMethod(PAYMENT_METHODS.CARD)} />
                      <FaCreditCard className="pay-icon" />
                      <div>
                        <strong>Card</strong>
                        <span>Visa, Mastercard, Amex</span>
                      </div>
                    </label>
                    <label className={`payment-option ${paymentMethod === PAYMENT_METHODS.BANK_TRANSFER ? 'selected' : ''}`}>
                      <input type="radio" name="paymentMethod" value={PAYMENT_METHODS.BANK_TRANSFER} checked={paymentMethod === PAYMENT_METHODS.BANK_TRANSFER} onChange={() => setPaymentMethod(PAYMENT_METHODS.BANK_TRANSFER)} />
                      <FaUniversity className="pay-icon" />
                      <div>
                        <strong>Bank Transfer</strong>
                        <span>Virtual account details</span>
                      </div>
                    </label>
                  </div>

                  <div className="payment-option-split">
                    <label>Payment Option</label>
                    <div className="split-buttons">
                      <button type="button" className={`split-btn ${paymentOption === 'full' ? 'active' : ''}`} onClick={() => setPaymentOption('full')}>Full Payment</button>
                      <button type="button" className={`split-btn ${paymentOption === '50%' ? 'active' : ''}`} onClick={() => setPaymentOption('50%')}>50% Now</button>
                    </div>
                  </div>

                  {paymentMethod === PAYMENT_METHODS.CARD && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="card-fields">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input name="card_number" value={form.card_number} onChange={handleChange} placeholder="4111 1111 1111 1111" maxLength="19" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Month</label>
                          <input name="exp_month" value={form.exp_month} onChange={handleChange} placeholder="MM" maxLength="2" />
                        </div>
                        <div className="form-group">
                          <label>Expiry Year</label>
                          <input name="exp_year" value={form.exp_year} onChange={handleChange} placeholder="YY" maxLength="2" />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" maxLength="4" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === PAYMENT_METHODS.MPESA && (
                    <div className="mpesa-note">
                      <FaMobileAlt /> You will receive an M-Pesa prompt on <strong>{form.phone || 'your phone'}</strong>. Enter your PIN to complete payment.
                    </div>
                  )}

                  {error && <p className="error-msg"><FaExclamationTriangle /> {error}</p>}

                  <div className="payment-actions">
                    <button type="button" className="btn ghost" onClick={() => setStep('details')}>Back</button>
                    <button type="submit" className="btn primary" disabled={loading}>
                      {loading ? <FaSpinner className="spin" /> : `Pay KSH ${amountToPay.toLocaleString()}`}
                    </button>
                  </div>
                  <p className="secure-note"><FaShieldAlt /> Payments are secured by Flutterwave</p>
                </form>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="processing-state">
                <FaSpinner className="spin big" />
                <h2>Processing Payment</h2>
                <p className="status-text">
                  {paymentStatus === 'initiating' && 'Initiating payment...'}
                  {paymentStatus === 'awaiting_payment' && 'Waiting for you to confirm on your phone...'}
                  {paymentStatus === 'pending' && 'Confirming payment...'}
                </p>
                <p className="sub-text">Please do not close this window or refresh the page.</p>
              </motion.div>
            )}

            {step === 'confirmation' && (
              <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="confirmation-state">
                {orderResult?.status === 'success' ? (
                  <>
                    <div className="success-icon"><FaCheck /></div>
                    <h2>Payment Successful!</h2>
                    <p>Thank you for your order. We have received your payment and will process your delivery shortly.</p>
                    <div className="order-info">
                      <div><span>Order ID</span><strong>{orderResult.orderId?.slice(0, 8)}</strong></div>
                      <div><span>Amount Paid</span><strong>KSH {orderResult.amount.toLocaleString()}</strong></div>
                      <div><span>Reference</span><strong>{orderResult.txRef?.slice(0, 20)}...</strong></div>
                    </div>
                    <button className="btn primary" onClick={() => navigate('/shop')}>Continue Shopping</button>
                  </>
                ) : (
                  <>
                    <div className="fail-icon"><FaExclamationTriangle /></div>
                    <h2>Payment Failed</h2>
                    <p>Your payment could not be completed. This may be due to insufficient funds, a cancelled prompt, or a network issue.</p>
                    <div className="payment-actions">
                      <button className="btn ghost" onClick={() => navigate('/cart')}>Back to Cart</button>
                      <button className="btn primary" onClick={() => setStep('payment')}>Try Again</button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.title || item.description} />
                <div className="item-info">
                  <span className="item-title">{item.title || item.description}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="item-price">KSH {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="total-row"><span>Subtotal</span><span>KSH {subtotal.toLocaleString()}</span></div>
            <div className="total-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `KSH ${shipping}`}</span></div>
            {discount > 0 && <div className="total-row"><span>Discount</span><span>-KSH {discount.toLocaleString()}</span></div>}
            <div className="total-row grand"><span>Total</span><span>KSH {total.toLocaleString()}</span></div>
            {paymentOption === '50%' && (
              <div className="total-row due"><span>Due Now (50%)</span><span>KSH {amountToPay.toLocaleString()}</span></div>
            )}
          </div>
          <div className="summary-count">{totalQuantity} item{totalQuantity !== 1 ? 's' : ''} in cart</div>
        </aside>
      </div>
    </section>
  );
}
