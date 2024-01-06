import React, {Fragment, useEffect} from 'react';
import {GetUserDetails} from "../../APIRequest/UserApi.js";
import {Link} from "react-router-dom";
import {getUserDetails} from "../../helper/SassionHelper.js";
import profilePNG from "../../assets/images/profile.png";

const Profile = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetUserDetails();
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <Fragment>
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={getUserDetails()[0]?.avatar?.url || profilePNG} alt={getUserDetails()[0]?.name}/>
                    <Link to="/profileDetails">Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{getUserDetails()[0].name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{getUserDetails()[0].email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(getUserDetails()[0].createdAt).substr(0, 10)}</p>
                    </div>

                    <div>
                        <Link to="/myOrder">My Orders</Link>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default Profile;