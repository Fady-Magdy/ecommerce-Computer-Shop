import React, { useContext } from "react";
import "./productspage.scss";
import { appContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import ProductsFilter from "../../components/productsFilter/ProductsFilter";
import { useEffect } from "react";

const Product = () => {
  const { filteredData, setFilteredData } = useContext(appContext);

  useEffect(() => {
    setFilteredData((prev) =>
      prev.sort((a, b) => (a.rating < b.rating ? 1 : -1))
    );
  }, []);
  return (
    <div className="products-page">
      <ProductsFilter />
      <div className="products-container">
        {filteredData.length > 0 && (
          <p className="found-text">Found {filteredData.length} Items</p>
        )}
        <div className="result-container">
          {filteredData.length === 0 && (
            <h1 className="no-product">No Product found</h1>
          )}
          {filteredData.map((product) => {
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
                      {product.count} In Stock
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
