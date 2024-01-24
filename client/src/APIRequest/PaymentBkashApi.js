import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state/SettingsSlice.js";

const BaseURL = "http://localhost:8000/api/v1/";


export async function pay() {
    try {
        const { data } = await axios.post(BaseURL,
            { amount: 50, orderId: 1 },
            { withCredentials: true })
        window.location.href = data.bkashURL
    } catch (error) {
        console.log(error.response.data)
    }
}