import { useState, useEffect } from "react";
import { createContext } from "react";
import { Link } from "react-router-dom";
import ProductData from "../productsData";
import UserData from "../userData";
export const appContext = createContext();

export default function AppContextProvider(props) {
  const [cartData, setCartData] = useState([]);
  const [productData, setProductData] = useState(ProductData);
  const [ordersData, setOrdersData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [favoriteList, setfavoriteList] = useState([]);
  const [userData, setUserData] = useState(UserData);
  const [checkOut, setCheckOut] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [notificationMsgCount, setNotificationMsgCount] = useState(0);
  const [randomSortedProductData, setRandomSortedProductData] = useState(
    Array.from(productData)
  );
  useEffect(() => {
    setRandomSortedProductData(
      randomSortedProductData.sort((a, b) => 0.5 - Math.random())
    );
    setfavoriteList(productData.filter((product) => product.favorite));
  }, []);

  //  Functions
  const sendNotification = (msg, item) => {
    let newList = notificationList;
    newList.push({ id: notificationMsgCount, message: msg, item: item });
    setNotificationList(newList);
    setNotificationMsgCount((prev) => prev + 1);
  };
  const cancelOrder = (index) => {
    let newOrdersList = ordersData;
    newOrdersList = newOrdersList.filter((product) => product.id !== index);
    setOrdersData(newOrdersList);
  };
  const getStars = (prod) => {
    let stars = [];
    let ratingCount = 0;
    for (let i = 0; i < 5; i++) {
      if (ratingCount >= prod.rating) {
        stars.push(<i key={i} className="fa-regular fa-star"></i>);
      } else {
        stars.push(<i key={i} className="fa-solid fa-star"></i>);
      }
      ratingCount++;
    }
    return stars;
  };
  const getArrows = (ref) => {
    return (
      <>
        <div
          className="arrow right-arrow"
          onClick={() => {
            goRight(ref);
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </div>
        <div
          className="arrow left-arrow"
          onClick={() => {
            goLeft(ref);
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
      </>
    );
  };
  const showMore = (ref) => {
    return (
      <>
        <div
          onClick={() => {
            ref.current.style.height = "auto";
            ref.current.parentNode.lastChild.style.display = "none";
          }}
          className="show-more"
        >
          Show More
        </div>
      </>
    );
  };
  const addToCart = (prod) => {
    if (!prod.addedToCart) {
      setCartCount((prev) => prev + 1);
      setCartData((prev) => [
        ...prev,
        {
          id: prod.id,
          title: prod.title,
          originalPrice: prod.price,
          price: prod.price,
          image: prod.images[0],
          quantity: 1,
          avQuantity: prod.count,
        },
      ]);
      setCartTotalPrice((prev) => prev + prod.price);
      let newData = productData;
      newData[prod.id - 1].addedToCart = true;
      setProductData(newData);
      sendNotification(`Item Added to Cart`, prod.title);
    } else {
      sendNotification(`Item Already in Cart`);
    }
  };
  function increaseQuantity(e) {
    let avQuantity = +e.target.getAttribute("data-avquantity");
    let quantity = +e.target.getAttribute("data-quantity");
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
  function removeItem(e) {
    let newData = productData;
    newData[e.target.id - 1].addedToCart = false;
    setProductData(newData);
    let newCartData = cartData;
    newCartData.splice(e.target.value - 1, 1);
    setCartData(newCartData);
    setCartCount((prev) => prev - 1);

    let newTotalPrice = 0;
    for (let i = 0; i < newCartData.length; i++) {
      newTotalPrice += newCartData[i].price;
    }
    setCartTotalPrice(newTotalPrice);
  }
  const goRight = (ref) => {
    ref.current.scrollBy(308, 0);
  };
  const goLeft = (ref) => {
    ref.current.scrollBy(-308, 0);
  };
  const showItems = (prod) => {
    let result = prod.map((product) => {
      let stars = [];
      let ratingCount = 0;
      for (let i = 0; i < 5; i++) {
        if (ratingCount >= product.rating) {
          stars.push(<i key={i} className="fa-regular fa-star"></i>);
        } else {
          stars.push(<i key={i} className="fa-solid fa-star"></i>);
        }
        ratingCount++;
      }
      return (
        <div className="product" key={product.id}>
          <div className="top">
            <img src={product.images[0]} alt="Product" />
          </div>
          <div className="bottom">
            <div className="title-view">
              <h1 className="title">{product.title}</h1>
              <Link to={`/product/${product.id}`}>View</Link>
            </div>
            <div className="rating">
              <div className="stars">
                {stars} ({product.raters})
              </div>
            </div>
            <p className="description">{product.description}</p>
            <div className="price-count">
              <p className="price">Price: ${product.price}</p>
              <p className={`count ${product.count >= 5 ? "high" : "low"}`}>
                {product.count} In Stock
              </p>
            </div>
          </div>
        </div>
      );
    });
    return result;
  };
  const value = {
    searchValue,
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
    setNotificationCount,
    favoriteList,
    setfavoriteList,
    showItems,
    goRight,
    goLeft,
    addToCart,
    getStars,
    userData,
    setUserData,
    checkOut,
    setCheckOut,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    randomSortedProductData,
    getArrows,
    showMore,
    ordersData,
    setOrdersData,
    cancelOrder,
    sendNotification,
    notificationList,
    notificationMsgCount,
  };
  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
}
