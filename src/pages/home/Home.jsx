import { useRef, useEffect, useContext } from "react";
import "./home.scss";
import { appContext } from "../../context/AppContext";
import BundleImage from "../../images/home-bundle.png";
import { Link, useLocation } from "react-router-dom";
const Home = () => {
  const {
    productData,
    showItems,
    randomSortedProductData,
    getArrows,
    currentLocation,
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
  const location = useLocation();
  useEffect(() => {
    currentLocation.current = location.pathname;
  }, []);
  function scrollProducts() {
    if (autoMove.current && currentLocation.current === "/")
      firstSectionRef.current.scrollBy(308, 0);
    setTimeout(() => scrollProducts(), 3000);
  }
  useEffect(() => {
    scrollProducts();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-first-bar">
          <div className="left">
            <h1>All You Need In One Place</h1>
            <p>
              We have only Products of the Highest quality with more than 50%
              sale
            </p>
            <button className="view-products">
              <Link to="/product">
                <i className="fa-solid fa-shop"></i> <span>View Products</span>
              </Link>
            </button>
            <button className="view-profile">
              <Link to="/profile">
                <i className="fa-solid fa-user"></i> <span>View Profile</span>
              </Link>
            </button>
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
        </section>
        <section className="section">
          <div className="section-title">Top Laptops</div>
          <div ref={laptopsRef} className="products-line">
            {showItems(laptops)}
          </div>
          {getArrows(laptopsRef)}
        </section>
        <section className="section">
          <div className="section-title">Keyboards for you</div>
          <div ref={keyboardsRef} className="products-line">
            {showItems(keyboards)}
          </div>
          {getArrows(keyboardsRef)}
        </section>
        <section className="section">
          <div className="section-title">New Mouses</div>
          <div ref={mousesRef} className="products-line">
            {showItems(mouses)}
          </div>
          {getArrows(mousesRef)}
        </section>
        <section className="section">
          <div className="section-title">Special Headphones</div>
          <div ref={headphonesRef} className="products-line">
            {showItems(headphones)}
          </div>
          {getArrows(headphonesRef)}
        </section>
      </div>
    </div>
  );
};

export default Home;
