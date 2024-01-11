import React, {Fragment, useEffect, useState} from 'react';
import CartItemCard from "./CartItemCard.jsx";
import {getCart} from "../../helper/SassionHelper.js";
import {addItemToCart} from "../../APIRequest/CartApi.js";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartData = () => {
            const updatedCart = getCart();
            setCartItems(updatedCart);
        };

        fetchCartData();
    }, []);

    const increaseQuantity = async (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock >= newQty) {
            await addItemToCart(id, newQty);
            setCartItems(getCart());
        } else {
            console.log("Not enough stock to increase quantity.");
        }
    };

    return (
        <Fragment>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>

                {cartItems &&  cartItems.map((item)=> (
                    <div key={item.id} className="cartContainer">
                        <CartItemCard item={item}/>
                        <div className="cartInput">
                            <button>-</button>
                            <input type="number" value={item.quantity} readOnly/>
                            <button onClick={()=>increaseQuantity(item.id,  item.quantity ,  item.stock)}>+</button>
                        </div>

                        <p className="cartSubtotal">{`৳ ${item.price * item.quantity}`}</p>
                    </div>
                ))}

                <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                        <p>Gross Total</p>
                        <p>৳ 500</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button>Check Out</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Cart;