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
  const [favouriteList, setFavouriteList] = useState([]);
  const [userData, setUserData] = useState(UserData);
  const [checkOut, setCheckOut] = useState(false);
  const [randomSortedProductData , setRandomSortedProductData] = useState(Array.from(productData))

  useEffect(() => {
    setRandomSortedProductData(randomSortedProductData.sort((a, b) => 0.5 - Math.random()))
    setFavouriteList(productData.filter((product) => product.favourite));
  }, []);

  //  Functions
  const cancleOrder = (index) => {
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
  const getArrows = (list, ref, count) => {
    return (
      <>
        <div
          className="arrow right-arrow"
          onClick={() => {
            goRight(list, ref, count);
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </div>
        <div
          className="arrow left-arrow"
          onClick={() => {
            goLeft(list, ref, count);
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
  const goRight = (list, ref, sectionNum) => {
    if (sectionNum.current < list.length - 6) {
      ref.current.style.transform += "translateX(-308px)";
      sectionNum.current += 1;
    }
  };
  const goLeft = (list, ref, sectionNum) => {
    if (sectionNum.current > 0) {
      ref.current.style.transform += "translateX(308px)";
      sectionNum.current -= 1;
    }
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
    favouriteList,
    setFavouriteList,
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
    cancleOrder,
  };
  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
}
