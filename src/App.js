import Home from "./pages/home/Home.jsx";
import "./style/app.scss";
import "./style/darkMode.scss";
import AppContextProvider from "./context/AppContext";
import ProductPage from "./pages/products/ProductsPage.jsx";
import ProductDetail from "./components/productdetail/ProductDetail.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import CheckOut from "./components/checkout/CheckOut.jsx";
import Footer from "./components/footer/Footer.jsx";
import { useEffect, useState } from "react";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("darkMode") !== null) {
      setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <AppContextProvider>
        <BrowserRouter basename="/ecommerce-Computer-Shop">
          <Navbar setDarkMode={setDarkMode} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
          <CheckOut />
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
