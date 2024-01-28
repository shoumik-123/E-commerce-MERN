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

    //set my orders
    setMyOrders(MyOrders){
        try {
            console.log("Setting MyOrders in localStorage:", MyOrders);
            localStorage.setItem("MyOrders", JSON.stringify(MyOrders));
        } catch (error) {
            console.error("Error setting MyOrders in localStorage:", error);
        }
    }
    getMyOrders(){
        return JSON.parse(localStorage.getItem("MyOrders"))
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
        sessionStorage.clear()
        window.location.href="/login"
    }



    //session  Storage
    setConfirmOrder(OrderInfo){
        // let existingData = JSON.parse(sessionStorage.getItem("OrderInfo")) || {};
        // existingData.paymentInfo = newData;
        // sessionStorage.setItem("OrderInfo", JSON.stringify(existingData));

        sessionStorage.setItem("OrderInfo", JSON.stringify(OrderInfo))
    }
    getConfirmOrder(){
        return JSON.parse(sessionStorage.getItem("OrderInfo"));
    }






    //for 3D Model
    setInfoFor3D(InfoFor3D){
        sessionStorage.setItem("InfoFor3D" , JSON.stringify(InfoFor3D))
    }
    getInfoFor3D(){
        return JSON.parse(sessionStorage.getItem("InfoFor3D"))
    }
}

export const {
    setInfoFor3D,getInfoFor3D,
    setToken , getToken ,
    setUserDetails ,getUserDetails  ,
    setMyOrders,getMyOrders,
    setShippingInfo,getShippingInfo,
    setConfirmOrder,getConfirmOrder,
    removeSession ,
    setCart,getCart,
    setEmail,getEmail,
    setOTP,getOTP} = new SessionHelper();