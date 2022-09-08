import Home from "./pages/home/Home.jsx";
import './style/app.scss'
import AppContextProvider from './context/AppContext'
import ProductPage from "./pages/product/ProductsPage.jsx";
import ProductDetail from "./components/productdetail/ProductDetail.jsx";
import { BrowserRouter , Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/product" element={<ProductPage/>}/>
            <Route path="/product/:productId" element={<ProductDetail/>}/>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
