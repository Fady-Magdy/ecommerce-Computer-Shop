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
    setFavouriteList,
    showItems,
    goRight,
    goLeft,
    addToCart,
    getStars,
  } = useContext(appContext);
  const { productId } = useParams();
  const currentProduct = productData.find((prod) => prod.id === productId);
  const [productImage, setProductImage] = useState(currentProduct.images[0]);
  const similarItemsSection = useRef(null);
  const YouMayAlsoLikeSection = useRef(null);
  const similarItemsNum = useRef(0);
  const YouMayAlsoLikeNum = useRef(0);
  const [favourite, setFavourite] = useState(
    productData[currentProduct.id - 1].favourite
  );
  let categoryList = productData.filter(
    (prod) => prod.category === currentProduct.category
  );

  useEffect(() => {
    setFavourite(productData[currentProduct.id - 1].favourite)
    setProductImage(currentProduct.images[0])
    window.scrollTo(0, 0);
  }, [productId]);

  const changeImage = (e) => {
    let image = e.target.getAttribute("data-image");
    setProductImage(image);
  };

  const addToFavourite = () => {
    let newData = productData;
    newData[currentProduct.id - 1].favourite =
      !newData[currentProduct.id - 1].favourite;
      setProductData(newData);
    setFavourite(!favourite);
    setFavouriteList(productData.filter((product) => product.favourite));
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
              {getStars(currentProduct)} ({currentProduct.raters})
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
            <button
              onClick={() => {
                addToCart(currentProduct);
              }}
              className="add-to-cart"
            >
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
            goRight(productData, YouMayAlsoLikeSection, YouMayAlsoLikeNum);
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </div>
        <div
          className="arrow left-arrow"
          onClick={() => {
            goLeft(productData, YouMayAlsoLikeSection, YouMayAlsoLikeNum);
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div ref={YouMayAlsoLikeSection} className="products-line">
          {showItems(productData)}
        </div>
      </div>
    </div>
  );
}
