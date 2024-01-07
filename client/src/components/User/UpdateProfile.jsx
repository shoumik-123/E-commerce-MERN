import React, {Fragment, useEffect, useState} from 'react';
import {getToken, getUserDetails} from "../../helper/SassionHelper.js";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import MetaData from "../Layout/MetaData.jsx";
import {useNavigate} from "react-router-dom";
import {ProfileUpdate} from "../../APIRequest/UserApi.js";

const UpdateProfile = () => {

    const [avatar, setAvatar] = useState(getUserDetails()[0]?.avatar?.url);
    const [name, setName] = useState(getUserDetails()[0]?.name)

    useEffect(() => {
        if (getToken()) {

        }
    }, []);


    const navigate =useNavigate()
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            const file = e.target.files[0];
            if (file) {
                if (file.type.startsWith("image/")) {
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            setAvatar(reader.result);
                        }
                    };

                    reader.readAsDataURL(file);
                } else {
                    console.error("Invalid file type. Please select an image.");
                }
            }
        }
        else if (e.target.name === "name") {
            setName(e.target.value);
        }

    };


    const updateSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(name, avatar);

            // Make sure to use the selectedAvatar, not the avatar state
            const result = await ProfileUpdate(name, avatar);

            if (result) {
                navigate("/account");
                // window.location.href("/account")
            }
        }
        catch (error) {
            console.error("error" , error);
        }
    };


    return (
        <Fragment>
            <MetaData title={`Update ${getUserDetails()[0]?.name}'s Profile`}/>

            <div className="profileUpdateContainer">
                <div className="profileUpdateBox">
                    <h2 className="profileUpdateHeading">Update Profile</h2>
                    <form
                        className="profileUpdateForm"
                        encType="multipart/form-data"
                        onSubmit={updateSubmit}
                    >

                        <div className="profileUpdateName">
                            <FaceIcon/>
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="profileUpdateEmail">
                            <MailOutlineIcon/>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={getUserDetails()[0]?.email}
                                onChange={registerDataChange}
                            />
                        </div>


                        <div id="profileUpdateImage">
                            <img src={avatar} alt="Avatar"/>
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>

                        <input type="submit" value="Update" className="profileUpdateBtn"/>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProfile;