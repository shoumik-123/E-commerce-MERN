import React from 'react';
import {Link} from "react-router-dom";

const CartItemCard = ({item}) => {
    return (
        <div className="CartItemCard">
            <img src={item.image} alt="Imgage"/>
            <div>
                <Link to={`/product/${item.id}`}>{item.name}</Link>
                <span>Price ৳ {item.price}</span>
                <p>Remove</p>
            </div>
        </div>
    );
};

export default CartItemCard;