import React, { useContext } from "react";
import "./productspage.scss";
import Navbar from "../../components/navbar/Navbar";
import { appContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import data from "../../productsData";
const Product = () => {
  const { searchValue } = useContext(appContext);
  const newData = data.filter(
    (product) =>
      product.title.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)
  );

  newData.sort((a, b) => (a.rating < b.rating ? 1 : -1));
  return (
    <div className="products-page">
      <Navbar />
      <div className="products-container">
        {newData.length === 0 && <h1>No Product found</h1>}
        {newData.length > 0 && (
          <p className="found-text">Found {newData.length} Items</p>
        )}
        <div className="result-container">
          {newData.map((product) => {
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
                  <img src={product.images[0]} alt="" />
                </div>
                <div className="bottom">
                  <div className="title-view">
                    <h1 className="title">{product.title}</h1>
                    <Link to={`/product/${product.id}`}>View</Link>
                  </div>
                  <div className="rating">
                    <div className="stars">
                      {stars} {"(" + product.raters + ")"}
                    </div>
                  </div>
                  <p className="description">{product.description}</p>
                  <div className="price-count">
                    <p className="price">Price: $ {product.price}</p>
                    <p
                      className={`count ${
                        product.count >= 5 ? "high" : "medium"
                      } ${product.count <= 2 && "low"}`}
                    >
                      Quantity: {product.count}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
