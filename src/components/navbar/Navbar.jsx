import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { appContext } from "../../context/AppContext";
import CheckOut from "../checkout/CheckOut";
import Notification from "../notification/Notification";
export default function Navbar() {
  const [mobileView, setMobileView] = useState(false);
  const searchBar = useRef();
  const [emptySearchBar, setEmptySearchBar] = useState(true);
  const {
    setSearchValue,
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
  } = useContext(appContext);
  const [showCart, setShowCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const search = (valueFrom) => {
    setSearchValue(valueFrom);
  };
  const count = useRef(0);
  count.current = 0;
  useEffect(() => {
    if (window.matchMedia("(max-width: 480px)").matches) {
      setMobileView(true);
    } else {
    }
  }, []);

  //  Functions
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
            <i className="fa-solid fa-computer"></i>
            {!mobileView && "Computer Shop"}
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
          <button
            onClick={() => {
              search(searchBar.current.value.toLowerCase());
            }}
          >
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
          <p>{cartCount}</p>
        </div>

        {!mobileView && (
          <div className="icon">
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        )}
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
      <div className={`user-menu ${showUserMenu ? "show-user-menu" : ""}`}>
        <div className="user-image">
          <img src={userData.userImage} alt="" />
        </div>
        <h3>{userData.username}</h3>
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
                  localStorage.setItem("productsData" , JSON.stringify(productData))
                  localStorage.setItem("cartData", JSON.stringify(cartData));
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
          <div className="menu-list pages">
            <h4>Pages</h4>
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
              <Link className="menu-item" to="/profile">
                <div className="icon">
                  <i className="fa-solid fa-bag-shopping"></i>
                </div>{" "}
                <p>Orders</p>
              </Link>
            </li>
            <li>
              <Link className="menu-item" to="/profile">
                <div className="icon">
                  <i className="fa-solid fa-heart"></i>
                </div>{" "}
                <p>Favorites</p>
              </Link>
            </li>
          </div>
          <div className="menu-list categories">
            <h4>Categories</h4>
            <li>
              <Link
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
              </Link>
            </li>
            <li>
              <Link
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
              </Link>
            </li>
            <li>
              <Link
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
              </Link>
            </li>
            <li>
              <Link
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
              </Link>
            </li>
          </div>
        </ul>
      </div>
      {checkOut && (
        <div
          onClick={() => {
            setCheckOut(false);
          }}
          className="dark-bg"
        ></div>
      )}
      <CheckOut />
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
