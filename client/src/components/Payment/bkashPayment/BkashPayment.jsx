import React, {Fragment, useState} from 'react';
import { toast } from 'react-toastify';
import { setConfirmOrder, setMyOrders, getConfirmOrder } from '../../../helper/SassionHelper.js';
import { CreateOrder } from '../../../APIRequest/OrderApi.js';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import CheckoutSteps from "../../Shipping/CheckOutStep.jsx"; // Import CSS file for styling

const BkashPayment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Get order details from session
            const orderDetails = getConfirmOrder();

            // Create order info object
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

            // Update order info and create new order
            setConfirmOrder(orderInfo);
            const newOrderData = await CreateOrder();
            console.log('New Order Data:', newOrderData);
            setMyOrders([...orderInfo.cartItems, newOrderData]);

            // Redirect to success page
            navigate('/success');
            toast.success("Payment Successfully")
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
            <div className="payment-container">
                <h1 className="payment-heading">BKash Payment</h1>
                <form className="bkash-form" onSubmit={handlePaymentSubmit}>
                    <label htmlFor="bkash-number" className="bkash-label">Enter bKash Number:</label>
                    <input type="text" id="bkash-number" name="bkash-number" className="bkash-input"
                           placeholder="Enter your bKash number" required/>

                    <label htmlFor="bkash-pin" className="bkash-label">Enter bKash PIN:</label>
                    <input type="password" id="bkash-pin" name="bkash-pin" className="bkash-input"
                           placeholder="Enter your bKash PIN" required/>

                    <button type="submit" className="bkash-submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Complete Payment'}
                    </button>
                </form>
            </div>
        </Fragment>

    );
};

export default BkashPayment;


// import React, { useEffect } from 'react';
// import axios from "axios";
//
// const BkashPayment = () => {
//     useEffect(() => {
//         const pay = async () => {
//             try {
//                 const response = await axios.post("http://localhost:8000/api/v1/bkash/payment/create",
//                     { amount: 50, orderId: 1 },
//                     { withCredentials: true });
//
//                 const { data } = response || {}; // Check if response is defined
//                 if (data && data.bkashURL) {
//                     window.location.href = data.bkashURL;
//                 } else {
//                     console.log("Unexpected response format:", response);
//                 }
//             } catch (error) {
//                 console.log("Error:", error.response ? error.response.data : error.message);
//             }
//         };
//
//         pay();
//     }, []);
//
//     return (
//         <div>
//             {/* Render any additional content as needed */}
//         </div>
//     );
// };
//
// export default BkashPayment;




