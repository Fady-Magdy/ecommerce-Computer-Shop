import Home from "./pages/home/Home.jsx";
import "./style/app.scss";
import AppContextProvider from "./context/AppContext";
import ProductPage from "./pages/products/ProductsPage.jsx";
import ProductDetail from "./components/productdetail/ProductDetail.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <BrowserRouter basename="/ecommerce-Computer-Shop">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
