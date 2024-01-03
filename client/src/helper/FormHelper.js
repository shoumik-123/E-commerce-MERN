import {toast} from "react-toastify";
const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
const mobileRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
    IsEmpty(value){
        return value.length===0;
    }

    IsMobile(value){
        return mobileRegex.test(value);
    }

    IsEmail(value){
        return emailRegex.test(value);
    }
}
export const {
    IsEmpty,
    IsMobile,
    IsEmail
} = new FormHelper();
