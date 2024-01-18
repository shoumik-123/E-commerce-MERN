class SessionHelper{
    setToken(token){
        localStorage.setItem("token" , token)
    }
    getToken(){
        return localStorage.getItem("token")
    }

    setUserDetails(UserDetails){
        localStorage.setItem("UserDetails" ,JSON.stringify(UserDetails))
    }
    getUserDetails(){
        return JSON.parse(localStorage.getItem("UserDetails"))
    }


    //cart
    setCart(cartItems) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    getCart() {
        const storedCartItems = localStorage.getItem("cartItems");
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    }


    //Shipping  Info

    setShippingInfo(ShippingInfo){
        localStorage.setItem("ShippingInfo" ,JSON.stringify(ShippingInfo))
    }
    getShippingInfo() {
        try {
            return JSON.parse(localStorage.getItem("ShippingInfo")) || null;
        } catch (error) {
            console.error("Error parsing ShippingInfo:", error);
            return null;
        }
    }






    //for recovery
    setEmail(Email){
        localStorage.setItem("Email" , Email)
    }
    getEmail(){
        return localStorage.getItem("Email")
    }
    setOTP(OTP){
        localStorage.setItem("OTP" , OTP)
    }
    getOTP(){
        return localStorage.getItem("OTP")
    }

    removeSession(){
        localStorage.clear()
        window.location.href="/login"
    }



    //session  Storage
    setConfirmOrder(OrderInfo){
        sessionStorage.setItem("OrderInfo", JSON.stringify(OrderInfo))
    }
    getConfirmOrder(){
        return JSON.parse(sessionStorage.getItem("OrderInfo"));    }

}

export const {setToken , getToken , setUserDetails ,getUserDetails  ,setShippingInfo,getShippingInfo,setConfirmOrder,getConfirmOrder,removeSession ,setCart,getCart,setEmail,getEmail,setOTP,getOTP} = new SessionHelper();