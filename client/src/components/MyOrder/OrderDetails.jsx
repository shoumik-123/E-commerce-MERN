import React, {Fragment, useEffect, useState} from 'react';
import {Typography} from "@material-ui/core";
import {Link, useParams} from "react-router-dom";
import {GetOrderDetails} from "../../APIRequest/OrderApi.js";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart.js";

const OrderDetails = () => {

    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const result = await GetOrderDetails(id);
                setOrder(result);
                console.log(result);
            } catch (e) {
                console.error('Error fetching Order:', e);
                setOrder(null); // Set order to null on error
            }
        };

        fetchOrder();
    }, [id]);

    console.log("order",order)

    return (
        order === null ? (
            <div className="emptyCart">
                <RemoveShoppingCartIcon />
                <Typography>No Order in Your Cart</Typography>
                <Link to="/products">View Products</Link>
            </div>
        ) : (
            <Fragment>
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <Typography component="h1">
                            Order #{order && order._id}
                        </Typography>
                        <Typography>Shipping Info</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Name:</p>
                                <span>{order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>
                                {order.shippingInfo && order.shippingInfo.phoneNo}
                            </span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>
                                {order.shippingInfo &&
                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                            </span>
                            </div>
                        </div>
                        <Typography>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.paymentInfo &&
                                        order.paymentInfo.status === "success"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.paymentInfo &&
                                    order.paymentInfo.status === "success"
                                        ? "PAID"
                                        : "NOT PAID"}
                                </p>
                            </div>

                            <div>
                                <p>Amount:</p>
                                <span>BDT {order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>

                        <Typography>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.orderStatus && order.orderStatus === "Delivered"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.orderStatus && order.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="orderDetailsCartItems">
                        <Typography>Order Items:</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            {order.orderItems &&
                                order.orderItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product"/>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                        {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{item.price * item.quantity}</b>
                                    </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    );
};

export default OrderDetails;