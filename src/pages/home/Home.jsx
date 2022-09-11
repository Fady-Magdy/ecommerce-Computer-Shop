import { useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import { appContext } from "../../context/AppContext";
import BundleImage from "../../images/home-bundle.png";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  const { productData, showItems, goRight, goLeft } = useContext(appContext);
  const firstSectionRef = useRef(null);
  const autoMove = useRef(true);
  let currentProductSection1 = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(max-width: 480px)").matches) {
    } else {
      setInterval(() => {
        if (autoMove.current) {
          if (currentProductSection1.current < productData.length - 5) {
            firstSectionRef.current.style.transform += "translateX(-320px)";
            currentProductSection1.current += 1;
          } else {
            firstSectionRef.current.style.transform = "translateX(0)";
            currentProductSection1.current = 0;
          }
        }
      }, 3000);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let keyboards = productData.filter((prod) => prod.category === "keyboard");
  let mouses = productData.filter((prod) => prod.category === "mouse");
  let laptops = productData.filter((prod) => prod.category === "laptop");
  let headphones = productData.filter((prod) => prod.category === "headphone");

  //  functions

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
            {showItems(productData)}
          </div>
          <div
            className="arrow right-arrow"
            onClick={() => {
              goRight(productData, firstSectionRef, currentProductSection1);
            }}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div
            className="arrow left-arrow"
            onClick={() => {
              goLeft(productData, firstSectionRef, currentProductSection1);
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
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
