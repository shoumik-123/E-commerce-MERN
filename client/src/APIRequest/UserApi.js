import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state/SettingsSlice.js";
import {getToken, setEmail, setOTP, setToken, setUserDetails} from "../helper/SassionHelper.js";
import {toast} from "react-toastify";

const BaseURL = "http://localhost:8000/api/v1/";
const AxiosHeader = { headers: { "token-key": getToken() } };


//Registration
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
        toast.error("Registration First")
        console.log('An error occurred during login:', error);
        // return false
    }
}
//Get  User Details
export async function GetUserDetails() {
    store.dispatch(ShowLoader());
    try {
        const URL = BaseURL + "profileDetails";

        const result = await axios.get(URL, AxiosHeader);
        setUserDetails(result.data.data);
        store.dispatch(HideLoader());
    } catch (e) {
        store.dispatch(HideLoader());
        console.log(e);
    }
}


//update Profile
export async function ProfileUpdate(name,avatar,oldAvatarPublicId){
    try {
        store.dispatch(ShowLoader());
        const URL = BaseURL + "profileUpdate";
        const postBody = {
            name:name,
            avatar:avatar,
            oldAvatarPublicId:oldAvatarPublicId
        };

        const result = await axios.post(URL, postBody,AxiosHeader);
        store.dispatch(HideLoader());
        if (result.status === 200) {
            toast.success("Update Success");
            return true;
        } else {
            toast.error("Fail");
            return false;
        }
    }
    catch (error) {
        store.dispatch(HideLoader());
        toast.error("Update Fail");
        console.log('Response data:', error.response.data);
    }

}


//update Password
export async function PasswordUpdate(password){
    try {
        store.dispatch(ShowLoader());
        const URL = BaseURL + "profileUpdate";
        const postBody = {
            password:password,

        };

        const result = await axios.post(URL, postBody,AxiosHeader);
        store.dispatch(HideLoader());
        if (result.status === 200) {
            toast.success("Password  Updated");
            return true;
        } else {
            toast.error("Fail");
            return false;
        }
    }
    catch (error) {
        store.dispatch(HideLoader());
        toast.error("Password Update Fail");
        console.log('Response data:', error.response.data);
    }

}




//Recovery Password
export async function RecoverVerifyEmail(email) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL +"recoverVerifyEmail/"+email;
        const result = await axios.get(URL)

        console.log(result)

        if(result){
            store.dispatch(HideLoader())
            if(result.status===200){
                if(result.data[['status']] ==="Fail"){
                    toast.error("No user Found")
                    return false;
                }
                else {
                    setEmail(email)
                    toast.info("A 6 Digit verification code has been sent to your email address. ");
                    return true;
                }
            }
            else {
                toast.error("Something Wrong")
            }
        }
    }
    catch(err){
        store.dispatch(HideLoader())
        toast.error("Something Wrong")
        console.log(err)
        return false;
    }
}

//Verify OTP
export async function RecoverVerifyOTP(email,OTP) {
    try {
        store.dispatch(ShowLoader())

        let URL = BaseURL +  "recoverVerifyOTP/" + email +"/"+OTP;
        const result = await axios.get(URL)

        if (result){
            store.dispatch(HideLoader())

            if(result.status===200){
                if (result.data['status']==="Fail"){
                    toast.error("Invalid OTP")
                    return false;
                }
                else {
                    setOTP(OTP);
                    toast.success("Code Verification Success");
                    return true;
                }

            }
            else {
                toast.error("Something Wrong")
                return false
            }
        }
    }
    catch(e){
        store.dispatch(HideLoader())
        toast.error("Something Wrong")
        console.log(e)
        return false;
    }

}