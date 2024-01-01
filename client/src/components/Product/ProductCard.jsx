import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({product}) => {

    const option = {
        edit:false,
        color:"rgba(255,255,255,0.94)",
        activeColor:"yellow",
        size:window.innerWidth < 600 ? 20 :25,
        value:product.ratings,
        inHalf:true
    }

    function trimDescription(description) {
        const words = description.split(' ');
        if (words.length > 5) {
            return words.slice(0, 5).join(' ') + '...';
        }
        return description;
    }

    return (
        <div>
            <Link className="productCard" to={`/product/${product._id}`}>
                <div className="productCardImgDiv">
                    <img src={product.images[0].url} alt={product.name}/>

                </div>
                <div className="productCardDiv">
                    <h3>{product.name}</h3>
                    <p>{trimDescription(product.description, 5)}</p>
                    <div>
                        <ReactStars {...option}/><span>({product.numOfReviews} reviews)</span>
                    </div>
                    <span>{product.price}</span>
                </div>
            </Link>

        </div>
    );
};

export default ProductCard;