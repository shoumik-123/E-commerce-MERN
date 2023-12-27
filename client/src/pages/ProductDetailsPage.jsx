import React from 'react';
import ProductDetails from "../components/Product/ProductDetails.jsx";
import MetaData from "../components/Layout/MetaData.jsx";

const ProductDetailsPage = () => {
    return (
        <div>
            <MetaData title="Details of product"/>
            <ProductDetails/>
        </div>
    );
};

export default ProductDetailsPage;