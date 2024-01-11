import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../APIRequest/ProductAPI.js';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.jsx";
import {addItemToCart} from "../../APIRequest/CartApi.js";
import {toast} from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProductDetails(id);
                setProduct(result);
            } catch (e) {
                console.error('Error fetching product:', e);
            }
        };

        fetchProduct();
    }, [id]);

    const option = {
        edit: false,
        color: "rgba(255,255,255,0.94)",
        activeColor: "yellow",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product?.ratings ?? 0,
        inHalf: true,
    };
    const [quantity, setQuantity] = useState(1)

    const DecreaseQuantity = () => {
        setQuantity((prevQuantity) =>
            Math.max(prevQuantity - 1, 1)
        );
    };

    const IncreaseQuantity = () => {
        setQuantity((prevQuantity) =>
            Math.min(prevQuantity + 1, product?.stock || 1)
        );
    };

    const addToCartHandler =async () => {
        const result =await addItemToCart(id ,  quantity)
        if (result){
            toast.success("Item Added to Cart")
        }
    };
    return (
        <Fragment>
            <div className="productDetails">
                <Carousel className="carousel">
                    {product?.images && product.images.map((item, i) => (
                        <img
                            className="carouselImage"
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`}
                        />
                    ))}
                </Carousel>
                <div>
                    <div className="detailsBlock-1">
                        <h1>{product?.name}</h1>
                        <p> Product code : #{product?._id}</p>
                    </div>

                    <div className="detailsBlock-2">
                        <ReactStars {...option} />
                        <span>({product?.numOfReviews} Reviews)</span>
                    </div>

                    <div className="detailsBlock-3">
                        <h1>{`৳ ${product?.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button onClick={DecreaseQuantity}>-</button>
                                <input type="number" value={quantity} readOnly/>
                                <button onClick={IncreaseQuantity}>+</button>
                            </div>
                            <button onClick={addToCartHandler}>Add To Cart</button>
                        </div>

                        <p>
                            Status :
                            <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
                                {product?.stock < 1 ? "Out Of Stock" : "In Stock"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{product?.description}</p>
                    </div>

                    <button className="submitReview">Submit Review</button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

            {product?.reviews && product?.reviews[0] ? (
                <div className="reviews">
                    {product?.reviews.map((reviews)=>
                        <ReviewCard review ={reviews} />
                    )}
                </div>
            ) :(
                <p className="noReviews">No Reviews</p>
            )
            }

        </Fragment>
    );
};

export default ProductDetails;
