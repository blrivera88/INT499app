import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useContext(CartContext);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.img} alt={item.service} style={{ width: "100px" }} />
              <h3>{item.service}</h3>
              <p>{item.serviceInfo}</p>
              <p>Price: ${item.price}</p>
              <div>
                <label>Quantity: </label>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                />
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h2>Total: ${totalAmount.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;
