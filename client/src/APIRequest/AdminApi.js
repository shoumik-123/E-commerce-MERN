import axios from "axios";
import store from "../redux/store/store.js";
import { HideLoader, ShowLoader } from "../redux/state/SettingsSlice.js";
import {getToken} from "../helper/SassionHelper.js";

const BaseURL = "http://localhost:8000/api/v1/";
const token = getToken();
const AxiosHeader = {
    headers: {
        "token-key": token
    }
}

// Get all products for admin
export async function getProductsAdmin() {
    if (!token) {
        console.error("Token not available");
        return [];
    }
    store.dispatch(ShowLoader());
    try {
        const response = await axios.get(BaseURL + "admin/products", AxiosHeader);
        const data = response.data;
        store.dispatch(HideLoader());
        return data;
    } catch (error) {
        store.dispatch(HideLoader());
        console.error("Error fetching products:", error);
        return [];
    }
}
//new product by Admin
export async function newProductCreateAdmin(productData) {
    store.dispatch(ShowLoader())
    try {

        let result = await axios.post(BaseURL + "admin/product/new" , productData);
        store.dispatch(HideLoader())
        console.log(result)
        return result.data['data'];
    } catch (e) {
        store.dispatch(HideLoader())
        console.error("Error fetching products:", e);
        return [];
    }
}