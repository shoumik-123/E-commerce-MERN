import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state/SettingsSlice.js";

const BaseURL = "http://localhost:8000/api/v1/";
const config = {
    headers:{"Content-type":"application/json"}
}


//Get all products
export async function getProducts(keyword = "", currentPage , price=[1,100000], category,subcategory, ratings = 1) {
    store.dispatch(ShowLoader())
    try {
        let encodedKeyword = encodeURIComponent(keyword);
        let URL = `products?keyword=${encodedKeyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
            URL = `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        if (category && subcategory) {
            URL = `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&subcategory=${subcategory}&ratings[gte]=${ratings}`;
        }
        let result = await axios.get(BaseURL + URL);
        store.dispatch(HideLoader())
        return result.data;
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


export async function newReview(reviewData) {
    store.dispatch(ShowLoader())
    try {

        let result = await axios.post(BaseURL + "review/" ,  reviewData );
        store.dispatch(HideLoader())
        console.log(result)
        return result.data['data'];
    } catch (e) {
        store.dispatch(HideLoader())
        console.error("Error fetching products:", e);
        return [];
    }
}
