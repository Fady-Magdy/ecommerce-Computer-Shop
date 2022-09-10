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
      product.description.toLowerCase().includes(searchValue)
  );
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
            return (
              <div className="product" key={product.id}>
                <div className="top">
                  <img src={product.image} alt="" />
                </div>
                <div className="bottom">
                  <div className="title-view">
                    <h1 className="title">{product.title}</h1>
                    <Link to={`/product/${product.id}`}>View</Link>
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
