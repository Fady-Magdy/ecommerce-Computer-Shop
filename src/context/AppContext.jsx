import { useState, useEffect } from "react";
import { createContext } from "react";
import { Link } from "react-router-dom";
import Data from "../productsData";
export const appContext = createContext();

export default function AppContextProvider(props) {
  const [cartData, setCartData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [favouriteList, setFavouriteList] = useState([]);
  const [data, setData] = useState(Data);
  useEffect(() => {
    let newData = data;
    newData.sort(() => Math.random() - 0.5);
    setData(newData);
    setFavouriteList(data.filter((product) => product.favourite));
  }, []);
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
    data,
    setData,
    ordersCount,
    setOrdersCount,
    notificationCount,
    setNotificationCount,
    favouriteList,
    setFavouriteList,
    showItems,
    goRight,
    goLeft,
  };
  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
}
