import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Header from "./components/Layout/Header/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FullScreenLoader from "./components/Loader/FullScreen-Loader.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import LoginRegistrationPage from "./pages/LoginRegistratonPage.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {getToken, getUserDetails} from "./helper/SassionHelper.js";
import UserOptions from "./components/Layout/Header/UserOptions.jsx"
import ProfilePage from "./pages/ProfilePage.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import SendOtpPage from "./pages/ForgetPassword/SendOtpPage.jsx";
import VerifyOtpPage from "./pages/ForgetPassword/VerifyOtpPage.jsx";
import CreatePasswordPage from "./pages/ForgetPassword/CreatePasswordPage.jsx";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPasswordPage.jsx";
import CartPage from "./pages/CartPage.jsx";



function App() {

    const isAuthenticated = getToken()
    const userDetails = getUserDetails();
    const role = userDetails && userDetails[0] ? userDetails[0].role : false;


    return (
      <>
          <BrowserRouter>
              <FullScreenLoader/>
              <Header/>
              {isAuthenticated && role && (
                  <UserOptions/>
              )}
              <Routes>

                  {isAuthenticated ? (
                      <>
                          <Route path="/account" element={<ProfilePage/>}></Route>
                          <Route path="/profileUpdate" element={<UpdateProfile/>}></Route>
                          <Route path="/password/update" element={<UpdatePassword/>}></Route>
                          <Route path="/login" element={<Navigate to="/account" />} />

                      </>
                  ):(
                      <>
                          <Route path="/login" element={<LoginRegistrationPage/>}></Route>
                          <Route path="/password/forgot/" element={<ForgetPasswordPage/>}></Route>
                          <Route path="/sendOtp" element={<SendOtpPage/>}></Route>
                          <Route path="/verifyOtp" element={<VerifyOtpPage/>}></Route>
                          <Route path="/createPassword" element={<CreatePasswordPage/>}></Route>
                      </>
                  )}
                  <Route path="/" element={<HomePage/>}></Route>
                  <Route path="/products" element={<ProductsPage/>}></Route>
                  <Route path="/contact" element={<ContactPage/>}></Route>
                  <Route path="/about" element={<AboutPage/>}></Route>
                  <Route path="/product/:id" element={<ProductDetailsPage/>}></Route>
                  <Route path="/search" element={<SearchPage/>}></Route>
                  <Route path="/products/:keyword" element={<ProductsPage/>}></Route>
                  <Route path="/cart" element={<CartPage/>}></Route>
              </Routes>
              <Footer/>
              <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
              />
          </BrowserRouter>
      </>
  )
}

export default App;
