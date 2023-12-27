import React, {Fragment, useEffect, useState} from 'react';
import {getProducts} from "../../APIRequest/ProductAPI.js";
import ProductCard from "../Product/ProductCard.jsx";
import {useParams} from "react-router-dom";

const Products = () => {

    const [products, setProducts] = useState([]);

    const {keyword} =useParams()
    console.log(keyword)


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getProducts(keyword);
                setProducts(result);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();

    }, []);
    return (
        <Fragment>
            <h2 className="productsHeading">Products</h2>

            <div className="products">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </Fragment>
    );
};

export default Products;