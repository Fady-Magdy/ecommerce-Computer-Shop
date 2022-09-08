import { useState } from "react";
import { createContext } from "react";

export const appContext = createContext();

export default function AppContextProvider(props) {
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartTotalPrice , setCartTotalPrice] = useState(0)
  const value = {
    cartCount,
    setCartCount,
    searchValue,
    setSearchValue,
    cartData,
    setCartData,
    cartTotalPrice,
    setCartTotalPrice
  };
  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
}
