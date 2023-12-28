import React, {Fragment, useEffect, useState} from 'react';
import {getProducts} from "../../APIRequest/ProductAPI.js";
import ProductCard from "../Product/ProductCard.jsx";
import {useParams} from "react-router-dom";
import Pagination from "react-js-pagination";

const Products = () => {

    // const [products, setProducts] = useState();
    const [products, setProducts] = useState({
        resultPerPage: 1,
        // productCount: 1,
    });

    const [currentPage, setCurrentPage] = useState(1)

    const {keyword} =useParams()             //For keyword Search

    const setCurrentPageNo =(e)=>{
        setCurrentPage(e)
    }
    console.log("currentPage",currentPage)
    console.log("products.resultPerPage",products?.resultPerPage)
    console.log("products.productCount",products.productCount)
    console.log("products.pageCount",products.pageCount)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getProducts(keyword, currentPage);
                setProducts(result);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [keyword, currentPage]);

    return (
        <Fragment>
            <h2 className="productsHeading">Products</h2>

            <div className="products">
                {Array.isArray(products.data) && products.data.map((product) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>

            {/*{products.pageCount && currentPage < products.pageCount && (*/}
            {/*    */}
            {/*)}*/}
            <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={products.resultPerPage}
                    totalItemsCount={products.productCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
            </div>
        </Fragment>
    );
};

export default Products;