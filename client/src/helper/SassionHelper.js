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
    getShippingInfo(){
        return JSON.parse(localStorage.getItem("ShippingInfo"))
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
}

export const {setToken , getToken , setUserDetails ,getUserDetails  ,setShippingInfo,getShippingInfo,removeSession ,setCart,getCart,setEmail,getEmail,setOTP,getOTP} = new SessionHelper();