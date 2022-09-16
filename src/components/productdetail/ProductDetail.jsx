import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productdetail.scss";
import Navbar from "../navbar/Navbar";
import { appContext } from "../../context/AppContext";
import { useRef } from "react";
export default function ProductDetail() {
  const {
    productData,
    setProductData,
    setfavoriteList,
    showItems,
    addToCart,
    getStars,
    getArrows,
    showMore,
    sendNotification,
    randomSortedProductData,
  } = useContext(appContext);
  const { productId } = useParams();
  const currentProduct = productData.find((prod) => prod.id === productId);
  const [productImage, setProductImage] = useState(currentProduct.images[0]);
  const similarItemsSection = useRef(null);
  const YouMayAlsoLikeSection = useRef(null);
  const similarItemsNum = useRef(0);
  const YouMayAlsoLikeNum = useRef(0);
  const [showScaledImage, setShowScaledImage] = useState(false);
  const [favorite, setfavorite] = useState(
    productData[currentProduct.id - 1].favorite
  );
  const [showImageTimeout, setShowImageTimeout] = useState();
  let categoryList = productData.filter(
    (prod) => prod.category === currentProduct.category
  );
  useEffect(() => {
    setfavorite(productData[currentProduct.id - 1].favorite);
    setProductImage(currentProduct.images[0]);
    window.scrollTo(0, 0);
  }, [currentProduct.id, currentProduct.images, productData, productId]);
  const changeImage = (e) => {
    let image = e.target.getAttribute("data-image");
    setProductImage(image);
  };
  useEffect(() => {
    !showScaledImage &&
      setTimeout(() => {
        setShowImageTimeout(false);
      }, 300);
    showScaledImage && setShowImageTimeout(true);
  }, [showScaledImage]);
  const addTofavorite = () => {
    let newData = productData;
    newData[currentProduct.id - 1].favorite =
      !newData[currentProduct.id - 1].favorite;
    setProductData(newData);
    setfavorite(!favorite);
    setfavoriteList(productData.filter((product) => product.favorite));
    sendNotification(
      `${currentProduct.favorite ? "Added to" : "Removed from"} Favorite`,
      currentProduct.title
    );
  };
  return (
    <div className="product-page">
      <Navbar />
      <div className="product-details">
        <div className="left">
          <div
            onMouseEnter={() => {
              setShowScaledImage(true);
            }}
            onMouseLeave={() => {
              setShowScaledImage(false);
            }}
            className="main-image"
          >
            <img src={productImage} alt="product" />
          </div>
          {
            <div
              className={`scaled-image ${showScaledImage ? "show" : ""} ${
                showImageTimeout ? "" : "remove"
              } `}
            >
              <img src={productImage} alt="" />
            </div>
          }
          <div className="switch-images">
            {currentProduct.images.map((image) => {
              return (
                <div
                  onClick={changeImage}
                  key={currentProduct.images.indexOf(image)}
                  className="image"
                  data-image={
                    currentProduct.images[currentProduct.images.indexOf(image)]
                  }
                >
                  <img
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
              {getStars(currentProduct)} ({currentProduct.raters})
            </div>
          </div>
          <p className="category">
            <span>Brand:</span> {currentProduct.brand}
          </p>
          <p className="category">
            <span>Category:</span> {currentProduct.category}
          </p>
          <p className="description">
            <span className="span-description">Details: </span>{" "}
            {currentProduct.description}
          </p>
          <p className="price">
            <span>Price:</span> ${currentProduct.price}
          </p>
          <p className={`count ${currentProduct.count >= 5 ? "high" : "low"}`}>
            <span>In Stock: </span>
            {currentProduct.count}
          </p>
          <div className="buttons">
            <button
              onClick={() => {
                addToCart(currentProduct);
              }}
              className="add-to-cart"
            >
              Add to cart
            </button>
            <div className="favorite" onClick={addTofavorite}>
              {favorite ? (
                <i className="favorite-on fa-solid fa-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="section-title">Similar Products</div>
        <div ref={similarItemsSection} className="products-line">
          {showItems(categoryList)}
        </div>
        {getArrows(categoryList, similarItemsSection, similarItemsNum)}
        {showMore(similarItemsSection)}
      </div>
      <div className="section">
        <div className="section-title">You May Also Like </div>
        <div ref={YouMayAlsoLikeSection} className="products-line">
          {showItems(randomSortedProductData)}
        </div>
        {getArrows(
          randomSortedProductData,
          YouMayAlsoLikeSection,
          YouMayAlsoLikeNum
        )}
        {showMore(YouMayAlsoLikeSection)}
      </div>
    </div>
  );
}
