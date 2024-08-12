import React, { useContext } from "react";
import list from "../subscriptionList";
import { CartContext } from "../contexts/CartContext";
import "./Subscriptions.css";  // Import custom CSS for styling

function Subscriptions() {
  const { addToCart, cart } = useContext(CartContext);

  // Check if a subscription is already in the cart
  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <div className="subscriptions-container">
      <h1 className="subscriptions-title">Choose Your Subscription</h1>
      <div className="subscriptions-grid">
        {list.map((item) => (
          <div key={item.id} className="subscription-card">
            <img src={item.img} alt={item.service} className="subscription-img" />
            <div className="subscription-details">
              <h3 className="subscription-title">{item.service}</h3>
              <p className="subscription-info">{item.serviceInfo}</p>
              <p className="subscription-price">${item.price.toFixed(2)}</p>
              <button
                className={`add-to-cart-button ${isInCart(item.id) ? 'in-cart' : ''}`}
                onClick={() => addToCart(item)}
                disabled={isInCart(item.id)}
              >
                {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;


