import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "./NavigationMenu.css";

function NavigationMenu() {
  const { cart } = useContext(CartContext);

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navigation-menu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/streamlist">Stream List</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link> 
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/subscriptions">Subscriptions</Link>        
        </li>
        <li>
          <Link to="/cart">Cart ({totalItemsInCart})</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;


