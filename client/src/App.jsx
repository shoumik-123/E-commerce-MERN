import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FullScreenLoader from "./components/Loader/FullScreen-Loader.jsx";

function App() {

  return (
      <>
          <BrowserRouter>
              <FullScreenLoader/>
              <Header/>
              <Routes>
                  <Route path="/" element={<HomePage/>}></Route>
                  <Route path="/" element={<ProductsPage/>}></Route>
                  <Route path="/" element={<ContactPage/>}></Route>
                  <Route path="/" element={<AboutPage/>}></Route>
              </Routes>
              <Footer/>
          </BrowserRouter>
      </>
  )
}

export default App;
