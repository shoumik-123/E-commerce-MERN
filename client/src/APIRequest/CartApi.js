import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state/SettingsSlice.js";
import {getCart, setCart} from "../helper/SassionHelper.js";

const BaseURL = "http://localhost:8000/api/v1/";


export async function addItemToCart(id, quantity) {
    store.dispatch(ShowLoader());

    try {
        const result = await axios.get(BaseURL + "product/" + id);

        const productData = result.data.data;

        const cartItem = {
            id: productData._id,
            name: productData.name,
            price: productData.price,
            image: productData.images[0].url,
            stock: productData.stock,
            quantity,
        };

        const existingCartItems = Array.isArray(getCart()) ? getCart() : [];
        const existingProductIndex = existingCartItems.findIndex(item => item.id === cartItem.id);

        if (existingProductIndex !== -1) {
            // If the product exists, update its quantity
            existingCartItems[existingProductIndex].quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart
            existingCartItems.push(cartItem);
        }
        setCart(existingCartItems);

        store.dispatch(HideLoader());

        return true;
    } catch (e) {
        store.dispatch(HideLoader());
        console.error("Error adding item to cart:", e);
        return false;
    }
}