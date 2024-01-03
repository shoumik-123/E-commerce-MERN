import React from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import LoginRegistration from "../components/User/LoginRegistration.jsx";

const LoginRegistrationPage = () => {
    return (
        <div>
            <MetaData title="Login or Registration"/>
            <LoginRegistration/>
        </div>
    );
};

export default LoginRegistrationPage;