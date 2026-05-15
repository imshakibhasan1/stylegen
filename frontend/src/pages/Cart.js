import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import '../styles/pages.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, updateQuantity, removeFromCart, fetchCart, loading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const shippingCost = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {loading ? (
            <p>Loading cart...</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <img src={item.image || 'https://via.placeholder.com/100'} alt={item.productName} />
                <div className="item-details">
                  <h3>{item.productName}</h3>
                  {item.color && <p>Color: {item.color}</p>}
                  {item.size && <p>Size: {item.size}</p>}
                  <p>${item.price}</p>
                </div>
                <div className="item-quantity">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, Math.max(1, parseInt(e.target.value)))
                    }
                  />
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
          <button className="btn btn-secondary btn-block" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
