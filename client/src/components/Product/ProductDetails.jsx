import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getProductDetails, newReview} from '../../APIRequest/ProductAPI.js';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.jsx";
import {addItemToCart} from "../../APIRequest/CartApi.js";
import {toast} from "react-toastify";
import {setInfoFor3D} from "../../helper/SassionHelper.js";
import {extractKeyValuePairs} from "../../helper/3D-Helper.js";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

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
    const navigate = useNavigate()
    const view3dFunction = async () => {

        const infoFor3D  = await extractKeyValuePairs(product?.description ,product?.subcategory)

        setInfoFor3D(infoFor3D)
        navigate("/view3d")

    };
    const submitReviewToggle =  () => {
        open ? setOpen(false) : setOpen(true);
    };
    const reviewSubmitHandler =async () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        const result = await newReview(myForm);

        setOpen(false);
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
                        <div>
                            <h1>{product?.name}</h1>
                            <p> Product code : #{product?._id}</p>
                        </div>
                        <div>
                            <button onClick={view3dFunction} className="Link3D">View 3D</button>
                            {/*<Link to="/shoe3d"></Link>*/}
                        </div>

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

                    <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />

                    <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

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
