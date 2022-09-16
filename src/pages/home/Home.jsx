import { useRef, useEffect, useContext } from "react";
import "./home.scss";
import { appContext } from "../../context/AppContext";
import BundleImage from "../../images/home-bundle.png";
import Navbar from "../../components/navbar/Navbar";
const Home = () => {
  const {
    productData,
    showItems,
    randomSortedProductData,
    getArrows,
    showMore,
  } = useContext(appContext);
  const autoMove = useRef(true);
  const firstSectionRef = useRef(null);
  const laptopsRef = useRef(null);
  const keyboardsRef = useRef(null);
  const mousesRef = useRef(null);
  const headphonesRef = useRef(null);
  const keyboards = productData.filter((prod) => prod.category === "keyboard");
  const mouses = productData.filter((prod) => prod.category === "mouse");
  const laptops = productData.filter((prod) => prod.category === "laptop");
  const headphones = productData.filter(
    (prod) => prod.category === "headphone"
  );
  useEffect(() => {
    if (window.matchMedia("(max-width: 480px)").matches) {
    } else {
      setInterval(() => {
        if (autoMove.current) {
          firstSectionRef.current.scrollBy(308, 0);
        }
      }, 3000);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
            {showItems(randomSortedProductData)}
          </div>
          {getArrows(firstSectionRef)}
          {showMore(firstSectionRef)}
        </section>
        <section className="section">
          <div className="section-title">Top Laptops</div>
          <div ref={laptopsRef} className="products-line">
            {showItems(laptops)}
          </div>
          {getArrows(laptopsRef)}
          {showMore(laptopsRef)}
        </section>
        <section className="section">
          <div className="section-title">Keyboards for you</div>
          <div ref={keyboardsRef} className="products-line">
            {showItems(keyboards)}
          </div>
          {getArrows(keyboardsRef)}
          {showMore(keyboardsRef)}
        </section>
        <section className="section">
          <div className="section-title">New Mouses</div>
          <div ref={mousesRef} className="products-line">
            {showItems(mouses)}
          </div>
          {getArrows(mousesRef)}
          {showMore(mousesRef)}
        </section>
        <section className="section">
          <div className="section-title">Special Headphones</div>
          <div ref={headphonesRef} className="products-line">
            {showItems(headphones)}
          </div>
          {getArrows(headphonesRef)}
          {showMore(headphonesRef)}
        </section>
      </div>
    </div>
  );
};

export default Home;
