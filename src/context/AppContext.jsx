import { useState, useEffect } from "react";
import { createContext } from "react";
import { Link } from "react-router-dom";
import ProductData from "../productsData";
import UserData from "../userData";
export const appContext = createContext();

export default function AppContextProvider(props) {
  const [cartData, setCartData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [favouriteList, setFavouriteList] = useState([]);
  const [productData, setProductData] = useState(ProductData);
  const [userData, setUserData] = useState(UserData);
  useEffect(() => {
    setFavouriteList(productData.filter((product) => product.favourite));
  }, []);
  //  Functions
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
  const addToCart = (prod) => {
    if (!prod.addedToCart) {
      setOrdersCount((prev) => prev + 1);
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
  const goRight = (list, ref, sectionNum) => {
    if (sectionNum.current < list.length - 5) {
      ref.current.style.transform += "translateX(-320px)";
      sectionNum.current += 1;
    }
  };
  const goLeft = (list, ref, sectionNum) => {
    if (sectionNum.current > 0) {
      ref.current.style.transform += "translateX(320px)";
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
                Quantity: {product.count}
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
    ordersCount,
    setOrdersCount,
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
  };
  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
}
