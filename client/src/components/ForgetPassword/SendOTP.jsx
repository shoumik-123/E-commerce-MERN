import React, {Fragment, useState} from 'react';
import MetaData from "../Layout/MetaData.jsx";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {RecoverVerifyEmail} from "../../APIRequest/UserApi.js";
import {IsEmail} from "../../helper/FormHelper.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const SendOtp = () => {
    const [email, setEmail] = useState("");

    const navigate  =useNavigate()
    const forgotPasswordSubmit = async () => {

        console.log(IsEmail(email))
        if(IsEmail(email)){
            const result  =  await RecoverVerifyEmail(email)
            console.log("result",result)
            if(result){
                navigate("/verifyOTP")
            }
        }
        else {
            toast.error("Email is not Valid")
        }

    };
    return (
        <Fragment>
            <MetaData title="Send OTP Code" />
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                    <h2 className="forgotPasswordHeading">Forgot Password</h2>

                    <form
                        className="forgotPasswordForm"
                        onSubmit={forgotPasswordSubmit}
                    >
                        <div className="forgotPasswordEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Send"
                            className="forgotPasswordBtn"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default SendOtp;