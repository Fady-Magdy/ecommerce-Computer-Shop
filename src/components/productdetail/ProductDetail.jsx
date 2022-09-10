import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import "./productdetail.scss";
import Navbar from "../navbar/Navbar";
import { appContext } from "../../context/AppContext";
export default function ProductDetail() {
  const { setCartData, setCartTotalPrice, data, setData, setOrdersCount } =
    useContext(appContext);
  const { productId } = useParams();
  const currentProduct = data.find((prod) => prod.id === productId);
  const [productImage , setProductImage] = useState(currentProduct.images[0])
  let stars = [];
  let ratingCount = 0;
  for (let i = 0; i < 5; i++) {
    if (ratingCount >= currentProduct.rating) {
      stars.push(<i key={i} className="fa-regular fa-star"></i>);
    } else {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    ratingCount++;
  }
  const changeImage = (e) => {
    let image = e.target.getAttribute("data-image")
    setProductImage(image)
  };
  const addToCart = () => {
    if (!currentProduct.addedToCart) {
      setOrdersCount((prev) => prev + 1);
      setCartData((prev) => [
        ...prev,
        {
          id: currentProduct.id,
          title: currentProduct.title,
          originalPrice: currentProduct.price,
          price: currentProduct.price,
          image: currentProduct.images[0],
          quantity: 1,
          avQuantity: currentProduct.count,
        },
      ]);
      setCartTotalPrice((prev) => prev + currentProduct.price);
      let newData = data;
      newData[currentProduct.id - 1].addedToCart = true;
      setData(newData);
    }
  };
  return (
    <div className="product-page">
      <Navbar />
      <div className="product">
        <div className="left">
          <div className="main-image">
            <img src={productImage} alt="product" />
          </div>
          <div className="switch-images">
            {currentProduct.images.map((image) => {
              return (
                <div
                  key={currentProduct.images.indexOf(image)}
                  className="image"
                >
                  <img
                    onClick={changeImage}
                    src={image}
                    alt="product"
                    data-image={
                      currentProduct.images[
                        currentProduct.images.indexOf(image)
                      ]
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="right">
          <div className="title-view">
            <h1 className="title">{currentProduct.title}</h1>
          </div>
          <div className="rating">
            <div className="stars">{stars} ({currentProduct.raters})</div>
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
