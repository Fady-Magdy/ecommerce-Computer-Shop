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
    notificationCount,
  } = useContext(appContext);
  const [showCart, setShowCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
        <div
          className={`icon ${showMenu ? "on" : ""}`}
          onClick={() => {
            setShowMenu(!showMenu);
            setShowNotification(false);
            setShowCart(false);
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
        <Link to="/">
          <h1>
            <i class="fa-solid fa-computer"></i> COMPUTER SHOP
          </h1>
        </Link>
      </div>
      <div className="center">
        <input
          placeholder="Search Products"
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
          className={`icon ${showNotification ? "on" : ""}`}
          onClick={() => {
            setShowNotification(!showNotification);
            setShowCart(false);
            setShowMenu(false);
            setShowUserMenu(false);
          }}
        >
          <i className="fa-solid fa-bell"></i>
          {notificationCount > 0 && <p>{notificationCount}</p>}
        </div>
        <div
          className={`icon ${showCart ? "on" : ""}`}
          onClick={() => {
            setShowCart(!showCart);
            setShowNotification(false);
            setShowMenu(false);
            setShowUserMenu(false);
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <p>{ordersCount}</p>
        </div>

        <div className="icon">
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
        <div
          className="user-image"
          onClick={() => {
            setShowUserMenu(!showUserMenu);
            setShowNotification(false);
            setShowCart(false);
          }}
        >
          <img src={userImage} alt="" />
        </div>
      </div>
      <div className={`user-menu ${showUserMenu ? "show-user-menu" : ""}`}>
        <div className="user-image">
          <img src={userImage} alt="" />
        </div>
        <h3>Martin Johnson</h3>
        <Link className="view-profile-btn" to="/profile">
          View Profile
        </Link>
      </div>
      <div
        className={`notification ${showNotification && "show-notification"}`}
      >
        No New Notifications
      </div>
      <div className={`cart ${showCart && "showc-cart"}`}>
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
      <div className={`menu ${showMenu ? "show-menu" : ""}`}>
        <h3>Menu</h3>
        <ul>
          <li>
            <Link className="menu-item" to="/">
              <div className="icon">
                <i className="fa-solid fa-house"></i>
              </div>{" "}
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link className="menu-item" to="/product">
              <div className="icon">
                <i className="fa-sharp fa-solid fa-shop"></i>
              </div>{" "}
              <p>Products</p>
            </Link>
          </li>
          <li>
            <Link className="menu-item" to="/profile">
              <div className="icon">
                <i className="fa-solid fa-user"></i>{" "}
              </div>
              <p>Profile</p>
            </Link>
          </li>
          <li>
            <Link className="menu-item" to="">
              <div className="icon">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>{" "}
              <p>Orders</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
