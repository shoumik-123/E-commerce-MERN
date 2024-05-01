import React, {Fragment, useState} from 'react';
import { Typography } from "@material-ui/core";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { getConfirmOrder, setConfirmOrder, setMyOrders } from "../../../helper/SassionHelper.js";
import { CreateOrder } from "../../../APIRequest/OrderApi.js";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../Shipping/CheckOutStep.jsx";
import ("./Payment.css")

const StripePaymentForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!stripe || !elements) {
                throw new Error('Stripe.js has not loaded yet.');
            }

            const orderDetails = getConfirmOrder();
            const orderInfo = {
                cartItems: orderDetails.cartItems,
                itemsPrice: orderDetails.itemsPrice,
                shippingCharges: orderDetails.shippingCharges,
                shippingInfo: orderDetails.shippingInfo,
                tax: orderDetails.tax,
                totalPrice: orderDetails.totalPrice,
                paymentInfo: {
                    id: 'demo_payment_id',
                    status: 'success',
                },
            };

            setConfirmOrder(orderInfo);
            const newOrderData = await CreateOrder();
            setMyOrders([...orderInfo.cartItems, newOrderData]);

            navigate('/success');
            toast.success("Payment Successfully");
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while processing the payment.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <CheckoutSteps activeStep={2}/>
            <div className="paymentContainer">
                <form className="payment-form " onSubmit={handlePaymentSubmit}>
                    <Typography variant="h6">Card Info</Typography>
                    <div className="payment-input-container">
                        <label>
                            <CardNumberElement className="payment-input"/>
                        </label>
                    </div>
                    <div className="payment-input-container">
                        <label>
                            <CardExpiryElement className="payment-input"/>
                        </label>
                    </div>
                    <div className="payment-input-container">
                        <label>
                            <CardCvcElement className="payment-input"/>
                        </label>
                    </div>

                    <button type="submit" className="payment-submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>


        </Fragment>

    );
};

export default StripePaymentForm;


// import React from 'react';
// import { Typography } from "@material-ui/core";
// import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import CreditCardIcon from "@material-ui/icons/CreditCard";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import EventIcon from "@material-ui/icons/Event";
// import { getConfirmOrder } from "../../../helper/SassionHelper.js";
//
// const StripePaymentForm = ({ onSubmit, payBtnRef }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const orderInfo = getConfirmOrder();
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         if (!stripe || !elements) {
//             return;
//         }
//         onSubmit();
//     };
//
//     return (
//         <form className="paymentForm" onSubmit={(e) => handleSubmit(e)}>
//             <Typography>Card Info</Typography>
//             <div>
//                 <CreditCardIcon />
//                 <CardNumberElement className="paymentInput" />
//             </div>
//             <div>
//                 <EventIcon />
//                 <CardExpiryElement className="paymentInput" />
//             </div>
//             <div>
//                 <VpnKeyIcon />
//                 <CardCvcElement className="paymentInput" />
//             </div>
//
//             <input
//                 type="submit"
//                 value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
//                 ref={payBtnRef}
//                 className="paymentFormBtn"
//             />
//         </form>
//     );
// };
//
// export default StripePaymentForm;
//
//
//
//
