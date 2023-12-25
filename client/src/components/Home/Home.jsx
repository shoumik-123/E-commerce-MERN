import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {CgMouse} from "react-icons/cg";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../Layout/MetaData.jsx";


const product ={
    name : "T-Shirt",
    images:[{url:"https://static-01.daraz.com.bd/p/38a8e822da9fe774e7381188a8db832a.jpg"}],
    price : "300",
    _id:"1232"
}

const Home = () => {
    return (
        <Fragment>
            <MetaData title="Home Page"/>
            <div className="banner">
                <p>Welcome to Happy Shopping</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <Link to="">
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </Link>
            </div>
            <div className="empty-div"></div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container">
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
            </div>
        </Fragment>
    );
};

export default Home;