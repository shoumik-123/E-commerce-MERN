import React, {Fragment, useEffect, useState} from 'react';
import CartItemCard from "./CartItemCard.jsx";
import {getCart, getToken} from "../../helper/SassionHelper.js";
import {addItemToCart, removeItemFromCart} from "../../APIRequest/CartApi.js";
import {toast} from "react-toastify";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import {Link, useNavigate} from "react-router-dom";

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
            toast.info("Not enough stock to increase quantity.");
        }
    };
    const decreaseQuantity = async (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty > 0) {
            await addItemToCart(id, newQty);
            setCartItems(getCart());
        } else {
            toast.info("Quantity cannot be less than 1.");
        }
    };
    
    const deleteCartItem =async (id) => {
        console.log("ok")
        const result= await removeItemFromCart(id ,setCartItems)
        toast.info("Item Removed From Cart")

    }

    const navigate  =useNavigate()
    const checkOutHandle = () => {
        const isAuthenticated = getToken()

        if (isAuthenticated) {
            navigate('/shipping', { replace: true });
        } else {
            navigate('/login?redirect=shipping');
        }
    };
    return (
        <Fragment>

            {cartItems.length === 0 ?(
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />

                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
                ) :(
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {Array.isArray(cartItems) &&  cartItems.map((item)=> (
                            <div key={item.id} className="cartContainer">
                                <CartItemCard item={item}  deleteCartItem={deleteCartItem}/>
                                <div className="cartInput">
                                    <button onClick={()=>decreaseQuantity(item.id,  item.quantity )}>-</button>
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
                                <p>৳ {cartItems.reduce((acc,item)=>acc+item.price * item.quantity,0)}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkOutHandle}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
                )
            }
        </Fragment>

    );
};

export default Cart;