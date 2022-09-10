import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import userImage from "../../images/user-image.jpg";
import { appContext } from "../../context/AppContext";

export default function Navbar() {
  const searchBar = useRef();
  const [emptySearchBar, setEmptySearchBar] = useState(true);
  const {
    setSearchValue,
    cartData,
    setCartData,
    cartTotalPrice,
    setCartTotalPrice,
    data,
    setData,
    ordersCount,
    setOrdersCount,
  } = useContext(appContext);
  const [showCart, setShowCart] = useState(false);
  const search = () => {
    setSearchValue(searchBar.current.value.toLowerCase());
  };
  const count = useRef(0);
  count.current = 0;
  function removeItem(e) {
    let newData = data;
    newData[e.target.id - 1].addedToCart = false;
    setData(newData);
    let newCartData = cartData;
    newCartData.splice(e.target.value - 1, 1);
    setCartData(newCartData);
    setOrdersCount((prev) => prev - 1);

    let newTotalPrice = 0;
    for (let i = 0; i < newCartData.length; i++) {
      newTotalPrice += newCartData[i].price;
    }
    setCartTotalPrice(newTotalPrice);
  }
  function increaseQuantity(e) {
    let avQuantity = e.target.getAttribute("data-avquantity");
    let quantity = e.target.getAttribute("data-quantity");
    if (quantity < avQuantity) {
      let newCartData = cartData;
      let originalPrice = newCartData[e.target.value - 1].originalPrice;
      newCartData[e.target.value - 1].quantity += 1;
      newCartData[e.target.value - 1].price += originalPrice;
      setCartData(newCartData);

      let newTotalPrice = 0;
      for (let i = 0; i < newCartData.length; i++) {
        newTotalPrice += newCartData[i].price;
      }
      setCartTotalPrice(newTotalPrice);
    }
  }
  function decreaseQuantity(e) {
    let quantity = e.target.getAttribute("data-quantity");
    if (quantity > 1) {
      let newCartData = cartData;
      let originalPrice = newCartData[e.target.value - 1].originalPrice;
      newCartData[e.target.value - 1].quantity -= 1;
      newCartData[e.target.value - 1].price -= originalPrice;
      setCartData(newCartData);

      let newTotalPrice = 0;
      for (let i = 0; i < newCartData.length; i++) {
        newTotalPrice += newCartData[i].price;
      }
      setCartTotalPrice(newTotalPrice);
    }
  }
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
          <p>{ordersCount}</p>
        </div>
        <div className="icon">
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
        <div className="user-image">
          <img src={userImage} alt="" />
        </div>
      </div>

      <div className={`cart ${showCart && "show"}`}>
        {cartData.map((product) => {
          count.current += 1;
          return (
            <div className="product-in-cart" key={product.id}>
              <div className="left">
                <img src={product.image} alt="" />
              </div>
              <div className="right">
                <h1 className="title">{product.title}</h1>
                <p className="price">
                  Price: ${product.originalPrice}
                  <button
                  className="remove"
                    onClick={removeItem}
                    id={product.id}
                    value={count.current}
                  >
                    Delete
                  </button>
                </p>
                <p className="quantity">
                  Quantity: {product.quantity}
                  <span className="change-buttons">
                    <button
                      className="change-quantity"
                      onClick={decreaseQuantity}
                      id={product.id}
                      data-quantity={product.quantity}
                      data-avquantity={product.avQuantity}
                      value={count.current}
                    >
                      -
                    </button>
                    <button
                      className="change-quantity"
                      onClick={increaseQuantity}
                      id={product.id}
                      data-quantity={product.quantity}
                      data-avquantity={product.avQuantity}
                      value={count.current}
                    >
                      +
                    </button>
                  </span>
                </p>
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
                className="clear"
                onClick={() => {
                  let newData = data;
                  newData.map((item) => {
                    return (item.addedToCart = false);
                  });
                  setData(newData);
                  setCartData([]);
                  setOrdersCount(0);
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
