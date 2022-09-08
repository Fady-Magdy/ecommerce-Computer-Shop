import React from "react";
import "./home.scss";
import BundleImage from "../../images/home-bundle.png";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import data from "../../productsData";
const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-container">
        <div className="home-first-bar">
          <div className="left">
            <h1>All You Need In One Place</h1>
          </div>
          <div className="bundle-image">
            <img src={BundleImage} alt="" />
          </div>
        </div>
        <div className="products-line">
          {data.map((product) => {
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
                      className={`count ${product.count >= 5 ? "high" : "low"}`}
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

export default Home;
