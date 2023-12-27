import React from 'react';
import Home from "../components/Home/Home.jsx";
import ProductCard from "../components/Product/ProductCard.jsx";
import MetaData from "../components/Layout/MetaData.jsx";

const HomePage = () => {
    return (
        <div>
            <MetaData title="Home"/>
            <Home/>
        </div>
    );
};

export default HomePage;