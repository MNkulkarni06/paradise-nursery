import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateItemTotal = (item) => item.cost * item.quantity;

  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3 className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Unit Price: ${item.cost}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Total: ${calculateItemTotal(item)}</p>
          </div>
          <button className="delete-button" onClick={() => handleRemove(item)}>
            Delete
          </button>
        </div>
      ))}

      <div className="cart-actions">
        <button className="continue-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-button" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
