import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FullScreenLoader from "./components/Loader/FullScreen-Loader.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";

function App() {

  return (
      <>
          <BrowserRouter>
              <FullScreenLoader/>
              <Header/>
              <Routes>
                  <Route path="/" element={<HomePage/>}></Route>
                  <Route path="/products" element={<ProductsPage/>}></Route>
                  <Route path="/contact" element={<ContactPage/>}></Route>
                  <Route path="/about" element={<AboutPage/>}></Route>
                  <Route path="/product/:id" element={<ProductDetailsPage/>}></Route>
                  <Route path="/search" element={<SearchPage/>}></Route>
                  <Route path="/products/:keyword" element={<ProductsPage/>}></Route>
              </Routes>
              <Footer/>
          </BrowserRouter>
      </>
  )
}

export default App;
