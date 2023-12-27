import React from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import Products from "../components/AllProducts/Products.jsx";

const ProductsPage = () => {
    return (
        <div>
            <MetaData title="All Products"/>
            <Products/>
        </div>
    );
};

export default ProductsPage;