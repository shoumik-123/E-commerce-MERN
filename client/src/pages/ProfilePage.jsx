import React from 'react';
import Profile from "../components/User/Profile.jsx";
import MetaData from "../components/Layout/MetaData.jsx";
import {getUserDetails} from "../helper/SassionHelper.js";

const ProfilePage = () => {
    return (
        <div>
            <MetaData title={`${getUserDetails()[0].name}'s profile`}/>
            <Profile/>
        </div>
    );
};

export default ProfilePage;