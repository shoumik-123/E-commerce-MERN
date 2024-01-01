import React, {Fragment, useEffect, useState} from 'react';
import {getProducts} from "../../APIRequest/ProductAPI.js";
import ProductCard from "../Product/ProductCard.jsx";
import {useParams} from "react-router-dom";
import Pagination from "react-js-pagination";
import SideBar from "./SideBar.jsx";

const Products = () => {
    const [products, setProducts] = useState({
        resultPerPage: 1,
        // productCount: 1,
    });
    const [currentPage, setCurrentPage] = useState(1)
    const {keyword} =useParams()             //For keyword Search

    const [price, setPrice] = useState([0, 100000]);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [ratings, setRatings] = useState(0)

    const setCurrentPageNo =(e)=>{
        setCurrentPage(e)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getProducts(keyword, currentPage ,price ,category,subcategory,ratings);
                setProducts(result);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [keyword, currentPage ,price ,category,subcategory,ratings]);

    const handlePriceChange = (newPrice) => {
        setPrice(newPrice)
    };
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory)
    };
    const handleSubcategoryChange = (newSubcategory) => {
        setSubcategory(newSubcategory)
    };
    const handleRatingChange = (newRating) => {
        setRatings(newRating)
    }
    
    return (
        <Fragment>
            <div className="allProductPage">
                <h2 className="productsHeading">Products</h2>
                <div className="productPageBody">
                    <div className="sidebar-wrapper">
                        <SideBar
                            className="filterBox"
                            onPriceChange={handlePriceChange}
                            onCategoryChange={handleCategoryChange}
                            onSubcategoryChange={handleSubcategoryChange}
                            onRatingChange={handleRatingChange}
                        />
                    </div>

                    <div className="products">
                        {Array.isArray(products.data) && products.data.map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        ))}
                    </div>
                </div>

                {/*{products.pageCount && currentPage < products.pageCount && (*/}
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
            </div>
        </Fragment>
    );
};

export default Products;