import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import userImage from "../../images/user-image.jpg";
import { appContext } from "../../context/AppContext";

export default function Navbar() {
  const searchBar = useRef();
  const [emptySearchBar, setEmptySearchBar] = useState(true);
  const {
    cartCount,
    setCartCount,
    setSearchValue,
    cartData,
    setCartData,
    cartTotalPrice,
    setCartTotalPrice,
  } = useContext(appContext);
  const [showCart, setShowCart] = useState(false);
  const search = () => {
    setSearchValue(searchBar.current.value.toLowerCase());
  };
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <h1>COMPUTER SHOP</h1>
        </Link>
      </div>
      <div className="center">
        <input
          onChange={(e) => {
            e.target.value !== ""
              ? setEmptySearchBar(false)
              : setEmptySearchBar(true);
          }}
          ref={searchBar}
          type="text"
        />
        <Link
          to="/product"
          className={`${emptySearchBar ? "disabled-link" : ""}`}
        >
          <button onClick={search}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </Link>
      </div>
      <div className="right">
        <div
          className="icon"
          onClick={() => {
            setShowCart(!showCart);
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <p>{cartCount}</p>
        </div>
        <div className="icon">
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
        <div className="user-image">
          <img src={userImage} alt="" />
        </div>
      </div>

      <div className={`cart ${showCart && 'show'}`}>
        {cartData.map((product) => {
          return (
            <div className="product-in-cart" key={product.id}>
              <div className="left">
                <img src={product.image} alt="" />
              </div>
              <div className="right">
                <h1 className="title">{product.title}</h1>
                <p className="price">Price: ${product.price}</p>
                <p className="quantity">Quantity: {product.quantity}</p>
              </div>
            </div>
          );
        })}
        {cartData.length === 0 && (
          <h1 className="cart-is-empty">Cart is Empty</h1>
        )}
        {cartData.length !== 0 && (
          <>
            <h3 className="total">Total: ${cartTotalPrice}</h3>
            <div className="buttons">
              <button className="checkout-btn">Checkout</button>
              <button
                className="checkout-btn"
                onClick={() => {
                  setCartData([]);
                  setCartCount(0);
                  setCartTotalPrice(0);
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
