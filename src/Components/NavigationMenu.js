import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "./NavigationMenu.css";
import Login from "./Login"; // Import the Login component

function NavigationMenu() {
  const { cart } = useContext(CartContext);

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navigation-menu">
      <div className="menu-logo">
        <Link to="/">
          <img src="/path-to-your-logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <ul className="menu-list">
        <li className="menu-item">
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item">
          <Link to="/streamlist">Stream List</Link>
        </li>
        <li className="menu-item">
          <Link to="/favorites">Favorites</Link> 
        </li>
        <li className="menu-item">
          <Link to="/movies">Movies</Link>
        </li>
        <li className="menu-item">
          <Link to="/subscriptions">Subscriptions</Link>        
        </li>
        <li className="menu-item">
          <Link to="/cart">Cart ({totalItemsInCart})</Link>
        </li>
        <li className="menu-item">
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="login-section">
        <Login /> {/* Add the Login component here */}
      </div>
    </nav>
  );
}

export default NavigationMenu;




