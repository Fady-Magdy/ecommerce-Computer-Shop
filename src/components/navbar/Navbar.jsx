import React, { useRef, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { appContext } from "../../context/AppContext";
import Notification from "../notification/Notification";
export default function Navbar(props) {
  const searchBar = useRef();
  const {
    cartData,
    setCartData,
    cartTotalPrice,
    setCartTotalPrice,
    productData,
    setProductData,
    cartCount,
    setCartCount,
    notificationCount,
    userData,
    checkOut,
    setCheckOut,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    notificationList,
    favoriteList,
    ordersData,
    searchProduct,
    searchValue,
  } = useContext(appContext);
  const [showCart, setShowCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  let navigate = useNavigate();
  const search = (valueFrom) => {
    searchValue.current = valueFrom;
    searchProduct();
    searchValue.current = "";
  };
  const count = useRef(0);
  count.current = 0;
  //  Functions
  let activeStyle = {
    color: "rgb(103, 169, 255)",
    backgroundColor: "rgba(209, 231, 255, 0.080)",
  };

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
          <i className="brand fa-solid fa-computer"></i>
          <span>PC Shop</span>
        </Link>
      </div>
      <div className="center">
        <input
          placeholder="Search Products"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(e.target.value.toLowerCase());
              navigate("/product");
            }
          }}
          ref={searchBar}
          type="text"
        />
        <button
          onClick={() => {
            if (searchBar.current.value !== "") {
              search(searchBar.current.value.toLowerCase());
              navigate("/product");
            }
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="right">
        <div
          className={`icon`}
          onClick={() => {
            props.setDarkMode((prev) => !prev);
          }}
        >
          <i className="fa-solid fa-circle-half-stroke"></i>
        </div>
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
          <p>{cartCount}</p>
        </div>
        <div className="logout icon">
          <i className=" fa-solid fa-right-from-bracket"></i>
        </div>
        <div
          className="user-image"
          onClick={() => {
            setShowUserMenu(!showUserMenu);
            setShowNotification(false);
            setShowCart(false);
          }}
        >
          <img src={userData.userImage} alt="" />
        </div>
      </div>
      {/* ------------------------------------------------------- */}
      {/*  User Menu */}
      <div
        onMouseLeave={() => setShowUserMenu(false)}
        className={`user-menu ${showUserMenu ? "show-user-menu" : ""}`}
      >
        <div className="user-image">
          <img src={userData.userImage} alt="" />
        </div>
        <h3>{userData.username}</h3>
        <Link className="view-profile-btn" to="/profile">
          View Profile
        </Link>
        <div className="details">
          <p>Favorites: {favoriteList.length} </p>
          <p>Orders: {ordersData.length} </p>
        </div>
      </div>
      {/* Notifications */}
      <div
        className={`notification ${showNotification && "show-notification"}`}
      >
        No New Notifications
      </div>
      {/* ------------------------------------------------------------- */}
      {/* Cart */}
      <div className={`cart ${showCart && "showc-cart"}`}>
        <div className="products">
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
        </div>
        {cartData.length === 0 && (
          <h1 className="cart-is-empty">Cart is Empty</h1>
        )}
        {cartData.length !== 0 && (
          <>
            <h3 className="total">Total: ${cartTotalPrice}</h3>
            <div className="buttons">
              <button
                onClick={() => {
                  setCheckOut(true);
                  setShowCart(false);
                }}
                className="checkout-btn"
              >
                Checkout
              </button>
              <button
                className="clear"
                onClick={() => {
                  let newData = productData;
                  newData.map((item) => {
                    return (item.addedToCart = false);
                  });
                  setProductData(newData);
                  setCartData([]);
                  setCartCount(0);
                  setCartTotalPrice(0);
                  localStorage.setItem(
                    "productsData",
                    JSON.stringify(productData)
                  );
                  localStorage.setItem("cartData", JSON.stringify(cartData));
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
      {/* ---------------------------------------------------------------- */}
      {/*  Menu */}
      <div
        onMouseLeave={() => setShowMenu(false)}
        className={`menu ${showMenu ? "show-menu" : ""}`}
      >
        <h3>Menu</h3>
        <ul>
          <div className="menu-list pages">
            <h4>Pages</h4>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="menu-item"
                to="/"
              >
                <div className="icon">
                  <i className="fa-solid fa-house"></i>
                </div>{" "}
                <p>Home</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="menu-item"
                to="/product"
                end
              >
                <div className="icon">
                  <i className="fa-sharp fa-solid fa-shop"></i>
                </div>{" "}
                <p>Products</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="menu-item"
                to="/profile"
              >
                <div className="icon">
                  <i className="fa-solid fa-user"></i>{" "}
                </div>
                <p>Profile</p>
              </NavLink>
            </li>
            <li>
              <NavLink className="menu-item" to="/profile">
                <div className="icon">
                  <i className="fa-solid fa-bag-shopping"></i>
                </div>{" "}
                <p>Orders</p>
              </NavLink>
            </li>
            <li>
              <NavLink className="menu-item" to="/profile">
                <div className="icon">
                  <i className="fa-solid fa-heart"></i>
                </div>{" "}
                <p>Favorites</p>
              </NavLink>
            </li>
          </div>
          <div className="menu-list categories">
            <h4>Categories</h4>
            <li>
              <NavLink
                onClick={() => {
                  search("laptop");
                }}
                className="menu-item"
                to="/product"
              >
                <div className="icon">
                  <i className="fa-solid fa-laptop"></i>
                </div>{" "}
                <p>Laptops</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => {
                  search("keyboard");
                }}
                className="menu-item"
                to="/product"
              >
                <div className="icon">
                  <i className="fa-solid fa-keyboard"></i>
                </div>{" "}
                <p>Keyboards</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => {
                  search("mouse");
                }}
                className="menu-item"
                to="/product"
              >
                <div className="icon">
                  <i className="fa-solid fa-computer-mouse"></i>
                </div>
                <p>Mouses</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => {
                  search("headphone");
                }}
                className="menu-item"
                to="/product"
              >
                <div className="icon">
                  <i className="fa-solid fa-headphones-simple"></i>
                </div>{" "}
                <p>Headphones</p>
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
      {checkOut && (
        <div onClick={() => setCheckOut(false)} className="dark-bg"></div>
      )}
      {/* -------------------------------------------------------- */}
      {/*  Ntification Area */}
      <div className="notification-area">
        {notificationList.reverse().map((msg) => {
          return (
            <Notification
              index={msg.id}
              key={msg.id}
              msg={msg.message}
              item={msg.item}
            />
          );
        })}
      </div>
    </div>
  );
}
