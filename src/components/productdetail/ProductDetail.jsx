import { useContext } from "react";
import { useParams } from "react-router-dom";
import "./productdetail.scss";
import Navbar from "../navbar/Navbar";
import { appContext } from "../../context/AppContext";
export default function ProductDetail() {
  const { setCartData, setCartTotalPrice , data , setData , setOrdersCount } = useContext(appContext);
  const { productId } = useParams();
  const currentProduct = data.find((prod) => prod.id === productId);
  const addToCart = () => {
    if (!currentProduct.addedToCart) {
      setOrdersCount(prev => prev + 1)
      setCartData((prev) => [
        ...prev,
        {
          id: currentProduct.id,
          title: currentProduct.title,
          originalPrice: currentProduct.price,
          price: currentProduct.price,
          image: currentProduct.image,
          quantity: 1,
          avQuantity: currentProduct.count,
        },
      ]);
      setCartTotalPrice((prev) => prev + currentProduct.price);
      let newData = data
      newData[currentProduct.id - 1].addedToCart = true
      setData(newData)
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
