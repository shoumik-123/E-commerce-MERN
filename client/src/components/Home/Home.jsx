import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {CgMouse} from "react-icons/cg";
import ProductCard from "../Product/ProductCard.jsx";
import {getProducts} from "../../APIRequest/ProductAPI.js";




const Home = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getProducts();
                setProducts(result);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();

    }, []);

    return (
        <Fragment>
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
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </Fragment>
    );
};

export default Home;