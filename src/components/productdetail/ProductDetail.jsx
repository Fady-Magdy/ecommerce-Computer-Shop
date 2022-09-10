import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productdetail.scss";
import Navbar from "../navbar/Navbar";
import { appContext } from "../../context/AppContext";
import { useRef } from "react";
export default function ProductDetail() {
  const {
    setCartData,
    setCartTotalPrice,
    data,
    setData,
    setOrdersCount,
    favouriteList,
    setFavouriteList,
    showItems,
    goRight,
    goLeft,
  } = useContext(appContext);
  const { productId } = useParams();
  const currentProduct = data.find((prod) => prod.id === productId);
  const [productImage, setProductImage] = useState(currentProduct.images[0]);
  const similarItemsSection = useRef(null);
  const YouMayAlsoLikeSection = useRef(null);
  const similarItemsNum = useRef(0);
  const YouMayAlsoLikeNum = useRef(0);
  const [favourite, setFavourite] = useState(
    data[currentProduct.id - 1].favourite
  );
  let categoryList = data.filter(
    (prod) => prod.category === currentProduct.category
  );
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeImage = (e) => {
    let image = e.target.getAttribute("data-image");
    setProductImage(image);
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
  const addToFavourite = () => {
    let newData = data;
    newData[currentProduct.id - 1].favourite =
      !newData[currentProduct.id - 1].favourite;
    setData(newData);
    setFavourite(!favourite);
    setFavouriteList(data.filter((product) => product.favourite));
    console.log(favouriteList);
  };
  return (
    <div className="product-page">
      <Navbar />
      <div className="product-details">
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
            <div className="stars">
              {stars} ({currentProduct.raters})
            </div>
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
          <div className="buttons">
            <button onClick={addToCart} className="add-to-cart">
              Add to cart
            </button>
            <div className="favourite" onClick={addToFavourite}>
              {favourite ? (
                <i className="favourite-on fa-solid fa-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="section-title">Similar Products</div>
        <div
          className="arrow right-arrow"
          onClick={() => {
            goRight(categoryList, similarItemsSection, similarItemsNum);
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </div>
        <div
          className="arrow left-arrow"
          onClick={() => {
            goLeft(categoryList, similarItemsSection, similarItemsNum);
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div ref={similarItemsSection} className="products-line">
          {showItems(categoryList)}
        </div>
      </div>
      <div className="section">
        <div className="section-title">You May Also Like </div>
        <div
          className="arrow right-arrow"
          onClick={() => {
            goRight(data, YouMayAlsoLikeSection, YouMayAlsoLikeNum);
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </div>
        <div
          className="arrow left-arrow"
          onClick={() => {
            goLeft(data, YouMayAlsoLikeSection, YouMayAlsoLikeNum);
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div ref={YouMayAlsoLikeSection} className="products-line">
          {showItems(data)}
        </div>
      </div>
    </div>
  );
}
