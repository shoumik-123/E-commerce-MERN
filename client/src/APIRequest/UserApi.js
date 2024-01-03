import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state/SettingsSlice.js";
import {setToken, setUserDetails} from "../helper/SassionHelper.js";
import {toast} from "react-toastify";

const BaseURL = "http://localhost:8000/api/v1/";


export async function UserRegistration(user){
    try {
        store.dispatch(ShowLoader());
        const URL = BaseURL + "registration";
        const postBody = {
            name:user.name,
            email: user.email,
            password: user.password,
            avatar:user.avatar
        };

        const result = await axios.post(URL, postBody);
        store.dispatch(HideLoader());
        if (result.status === 200) {
            toast.success("Registration Success");
            return true;
        } else {
            toast.error("Fail");
            return false;
        }
    }
    catch (error) {
        store.dispatch(HideLoader());
        toast.error("Email already exists");
        console.log('Response data:', error.response.data);
    }

}
export async function UserLogin(email, password) {
    try {
        store.dispatch(ShowLoader());
        const URL = BaseURL + "login";
        const postBody = {
            email: email,
            password: password
        };

        const result = await axios.post(URL, postBody);
        store.dispatch(HideLoader());

        if (result.status === 200) {
            setToken(result.data.token);
            setUserDetails(result.data.data);
            toast.success("Login Success");
            return true;
        } else {
            toast.error("Invalid Email or Password");
            return false;
        }
    }
    catch (error) {
        store.dispatch(HideLoader());
        toast.error("Login Fail")
        console.log('An error occurred during login:', error);
    }
}