import { useState } from "react";
import { createContext } from "react";
import Data from "../productsData";
export const appContext = createContext();

export default function AppContextProvider(props) {
  const [cartData, setCartData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [data, setData] = useState(Data);
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
  };
  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
}
