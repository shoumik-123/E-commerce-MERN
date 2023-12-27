import axios from "axios";
import store from "../redux/store/store.js";
import SettingsSlice, {HideLoader, ShowLoader} from "../redux/state/SettingsSlice.js";

const BaseURL = "http://localhost:8000/api/v1/";


//Get all products
export async function getProducts(keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 1) {
    store.dispatch(ShowLoader())
    try {
        console.log(keyword)
        let encodedKeyword = encodeURIComponent(keyword);
        let URL = `products?keyword=${encodedKeyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
            URL = `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        let result = await axios.get(BaseURL + URL);
        store.dispatch(HideLoader())
        return result.data['data'];
    } catch (e) {
        store.dispatch(HideLoader())
        console.error("Error fetching products:", e);
        return [];
    }
}

//Get products Details
export async function getProductDetails(id) {
    store.dispatch(ShowLoader())
    try {

        let result = await axios.get(BaseURL + "product/" + id);
        store.dispatch(HideLoader())
        return result.data['data'];
    } catch (e) {
        store.dispatch(HideLoader())
        console.error("Error fetching products:", e);
        return [];
    }
}
