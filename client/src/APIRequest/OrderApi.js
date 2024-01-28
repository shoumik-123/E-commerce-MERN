import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state/SettingsSlice.js";
import {getConfirmOrder, getToken} from "../helper/SassionHelper.js";

const BaseURL = "http://localhost:8000/api/v1/";
const AxiosHeader = { headers: { "token-key": getToken() ,"Content-Type": "application/json" } };



export async function CreateOrder() {
    try {
        store.dispatch(ShowLoader())
        const orderInfo = getConfirmOrder()
        console.log(orderInfo)

        const data=await axios.post(BaseURL+"newOrder" , orderInfo , AxiosHeader)

        store.dispatch(HideLoader())
        if (data){
            console.log("success")
        }
        else {
            console.log("Fail")
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        console.log(e)
    }
}

export async function MyOrders() {
    try {
        store.dispatch(ShowLoader())

        const response=await axios.get(BaseURL+"myOrder" ,AxiosHeader)
        store.dispatch(HideLoader())
        if (response){
            console.log("success")
            return response.data.data
        }
        else {
            console.log("Fail")
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        console.log(e)
    }
}

export async function GetOrderDetails(id) {
    try {
        store.dispatch(ShowLoader());

        const response = await axios.get(BaseURL + "order/" + id, AxiosHeader);

        store.dispatch(HideLoader());


        if (response.status >= 200 && response.status < 300) {
            return response.data.data;
        } else {
            console.log("Request failed with status:", response.status);
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        console.log(e)
    }
}
