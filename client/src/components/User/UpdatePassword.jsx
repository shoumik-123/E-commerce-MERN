import React, {Fragment, useState} from 'react';
import MetaData from "../Layout/MetaData.jsx";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {getUserDetails} from "../../helper/SassionHelper.js";
import {toast} from "react-toastify";
import {PasswordUpdate} from "../../APIRequest/UserApi.js";
import {useNavigate} from "react-router-dom";

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate()
    const updatePasswordSubmit = async (e) => {
        e.preventDefault()

        if (oldPassword ===  getUserDetails()[0]?.password){
            if (newPassword.length >= 5){
                if(newPassword === confirmPassword){
                    const result = await PasswordUpdate(newPassword)
                    console.log(result)
                    if (result){
                        navigate('/account')
                        // window.location.reload()
                    }
                }
                else {
                    toast.error('Password and Confirm Password  is  not  same.')
                }
            }

            else {
                toast.warn('Password is  greater then 5.')
            }
        }
        else {
            toast.error('Old Password Incorrect')
        }


    };
    return (
        <Fragment>
            <MetaData title="Change Password" />
            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                    <h2 className="updatePasswordHeading">Change Password</h2>

                    <form
                        className="updatePasswordForm"
                        onSubmit={updatePasswordSubmit}
                    >
                        <div className="loginPassword">
                            <VpnKeyIcon />
                            <input
                                type="password"
                                placeholder="Old Password"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockIcon />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Change"
                            className="updatePasswordBtn"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdatePassword;