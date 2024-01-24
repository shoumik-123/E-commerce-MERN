import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state/SettingsSlice.js";
import {getToken} from "../helper/SassionHelper.js";

const AxiosHeader = { headers: { "token-key": getToken() } };
const BaseURL = "http://localhost:8000/api/v1/";

export async function StripeApiKey() {
    store.dispatch(ShowLoader());
    try {
        const response = await axios.get(BaseURL + "stripeApiKey", AxiosHeader);
        store.dispatch(HideLoader());
        return response.data;
    } catch (e) {
        store.dispatch(HideLoader())
        console.log(e);
    }
}

export async function ProcessPayment(paymentData) {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "token-key": getToken()
            },
        };

        const { data } = await axios.post(BaseURL+'payment/process', paymentData, config);

        console.log(data)

        return data.client_secret;
    } catch (e) {
        console.log("api call  error",e);
    }
}

