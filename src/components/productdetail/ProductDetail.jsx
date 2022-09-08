import { useContext } from "react";
import { useParams } from "react-router-dom";
import "./productdetail.scss";
import Data from "../../productsData";
import Navbar from "../navbar/Navbar";
import { appContext } from "../../context/AppContext";
import { useState } from "react";
export default function ProductDetail() {
  const { setCartCount, cartData, setCartData , setCartTotalPrice} = useContext(appContext);
  const { productId } = useParams();
  const currentProduct = Data.find((prod) => prod.id === productId);
  const [added, setAdded] = useState(false);
  const addToCart = () => {
    if (!added) {
      setCartCount((prev) => prev + 1);
      setCartData((prev) => [
        ...prev,
        {
          id: currentProduct.id,
          title: currentProduct.title,
          price: currentProduct.price,
          image: currentProduct.image,
          quantity:  1,
        },
      ]);
      setCartTotalPrice(prev => prev + currentProduct.price)
      setAdded(true);
    }
  };
  return (
    <div className="product-page">
      <Navbar />
      <div className="product">
        <div className="left">
          <img src={currentProduct.image} alt="product" />
        </div>
        <div className="right">
          <div className="title-view">
            <h1 className="title">{currentProduct.title}</h1>
          </div>
          <p className="description">{currentProduct.description}</p>
          <div className="price-count">
            <p className="price">Price: $ {currentProduct.price}</p>
            <p
              className={`count ${
                currentProduct.count >= 5 ? "high" : "medium"
              } ${currentProduct.count <= 2 && "low"}`}
            >
              Quantity: {currentProduct.count}
            </p>
          </div>
          <button onClick={addToCart} className="add-to-cart">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
