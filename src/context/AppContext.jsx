import { useState , useEffect } from "react";
import { createContext } from "react";
import Data from "../productsData";
export const appContext = createContext();

export default function AppContextProvider(props) {
  const [cartData, setCartData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [data, setData] = useState(Data);
  useEffect(() => {
    let newData = data
    newData.sort(() => Math.random() - 0.5);
    setData(newData)
  }, [])
  
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
    setNotificationCount
  };
  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
}
