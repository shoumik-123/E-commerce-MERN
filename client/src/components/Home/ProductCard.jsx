import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const option = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"yellow",
    size:window.innerWidth < 600 ? 20 :25,
    value:4.5,
    inHalf:true
}

const ProductCard = ({product}) => {
    return (
        <div>
            <Link className="productCard" to={product._id}>
                <img src={product.images[0].url} alt={product.name}/>
                <div>
                    <p>{product.name}</p>
                    <div>
                        <ReactStars {...option}/><span>(269 reviews)</span>
                    </div>
                    <span>{product.price}</span>
                </div>
            </Link>

        </div>
    );
};

export default ProductCard;