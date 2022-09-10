import { useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import { appContext } from "../../context/AppContext";
import BundleImage from "../../images/home-bundle.png";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  const { data } = useContext(appContext);
  const firstSectionRef = useRef(null);
  const autoMove = useRef(true);
  let currentProductSection1 = useRef(0);
  setInterval(() => {
    if (autoMove.current) {
      if (currentProductSection1.current < data.length - 5) {
        firstSectionRef.current.style.transform += "translateX(-320px)";
        currentProductSection1.current += 1;
      } else {
        firstSectionRef.current.style.transform = "translateX(0)";
        currentProductSection1.current = 0;
      }
    }
  }, 3000);
  let keyboards = data.filter((prod) => prod.category === "keyboard");
  let mouses = data.filter((prod) => prod.category === "mouse");
  let laptops = data.filter((prod) => prod.category === "laptop");
  let headphones = data.filter((prod) => prod.category === "headphone");

  //  functions
  const goRight = (list, ref) => {
    if (currentProductSection1.current < list.length - 5) {
      ref.current.style.transform += "translateX(-320px)";
      currentProductSection1.current += 1;
    }
  };
  const goLeft = (list, ref) => {
    if (currentProductSection1.current > 0) {
      ref.current.style.transform += "translateX(320px)";
      currentProductSection1.current -= 1;
    }
  };
  const showItems = (prod) => {
    let result = prod.map((product) => {
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
                {stars} ({product.raters})
              </div>
            </div>
            <p className="description">{product.description}</p>
            <div className="price-count">
              <p className="price">Price: ${product.price}</p>
              <p className={`count ${product.count >= 5 ? "high" : "low"}`}>
                Quantity: {product.count}
              </p>
            </div>
          </div>
        </div>
      );
    });
    return result;
  };
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
        <section
          className="section"
          onMouseEnter={() => {
            autoMove.current = false;
          }}
          onMouseLeave={() => {
            autoMove.current = true;
          }}
        >
          <div ref={firstSectionRef} className="products-line">
            {showItems(data)}
          </div>
          <div
            className="arrow right-arrow"
            onClick={() => {
              goRight(data, firstSectionRef);
            }}
          >
            {">"}
          </div>
          <div
            className="arrow left-arrow"
            onClick={() => {
              goLeft(data, firstSectionRef);
            }}
          >
            {"<"}
          </div>
        </section>
        <section className="section">
          <div className="section-title">Top Laptops</div>
          <div className="products-line">{showItems(laptops)}</div>
        </section>
        <section className="section">
          <div className="section-title">Keyboards for you</div>
          <div className="products-line">{showItems(keyboards)}</div>
        </section>
        <section className="section">
          <div className="section-title">Mouses for you</div>
          <div className="products-line">{showItems(mouses)}</div>
        </section>
        <section className="section">
          <div className="section-title">Headphones for you</div>
          <div className="products-line">{showItems(headphones)}</div>
        </section>
      </div>
    </div>
  );
};

export default Home;
