// import React, { Fragment, useEffect, useState } from 'react';
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { StripeApiKey as fetchStripeApiKey } from "../../../APIRequest/PaymentStripeApi.js";
// import CheckoutSteps from "../../Shipping/CheckOutStep.jsx";
// import StripePaymentForm from "./StripePaymentForm.jsx";
// import EventIcon from "@material-ui/icons/Event";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import {toast} from "react-toastify";
// import {useNavigate} from "react-router-dom";
// import {getConfirmOrder, getMyOrders, setConfirmOrder, setMyOrders} from "../../../helper/SassionHelper.js";
// import {CreateOrder} from "../../../APIRequest/OrderApi.js";
//
// const StripePayment = () => {
//     const cartItems= getConfirmOrder().cartItems
//     const itemsPrice= getConfirmOrder().itemsPrice
//     const shippingCharges= getConfirmOrder().shippingCharges
//     const shippingInfo= getConfirmOrder().shippingInfo
//     const tax= getConfirmOrder().tax
//     const totalPrice= getConfirmOrder().totalPrice
//
//     const [stripeApiKey, setStripeApiKey] = useState(null);
//
//     useEffect(() => {
//         async function fetchStripeApiKeyData() {
//             try {
//                 const data = await fetchStripeApiKey();
//                 if (data && data.stripeApiKey) {
//                     setStripeApiKey(loadStripe(data.stripeApiKey));
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//
//         fetchStripeApiKeyData();
//     }, []);
//
//     const navigate = useNavigate()
//     const handlePaymentSubmit = async () => {
//         try {
//             toast.success("Stripe Payment Successfully")
//             const orderInfo ={
//                 cartItems,
//                 itemsPrice,
//                 shippingCharges,
//                 shippingInfo,
//                 tax,
//                 totalPrice,
//                 paymentInfo : {
//                     id:"demo payment id",
//                     status:"success"
//                 }
//             }
//
//             setConfirmOrder(orderInfo)
//             const newOrderData = await CreateOrder();
//
//             console.log("New Order Data:", newOrderData);
//             setMyOrders([cartItems, newOrderData]);
//             navigate("/success")
//         }
//         catch (e) {
//             console.log(e)
//         }
//     };
//
//     return (
//         <Fragment>
//             <CheckoutSteps activeStep={2} />
//             <div className="paymentContainer">
//                 {stripeApiKey && (
//                     <Elements stripe={stripeApiKey}>
//                         <StripePaymentForm onSubmit={handlePaymentSubmit} />
//                     </Elements>
//                 )}
//                 <EventIcon />
//                 <VpnKeyIcon /> {/* Use VpnKeyIcon component */}
//             </div>
//         </Fragment>
//     );
// };
//
// export default StripePayment;
//
//
//
//
//
//
//
//
// // import React, { Fragment, useEffect, useRef, useState } from 'react';
// // import { CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
// // import { loadStripe } from '@stripe/stripe-js';
// // import { StripeApiKey as fetchStripeApiKey } from '../../APIRequest/PaymentStripeApi.js';
// // import CheckoutSteps from '../Shipping/CheckOutStep.jsx';
// // import StripePaymentForm from './StripePaymentForm';
// // import EventIcon from '@material-ui/icons/Event';
// // import VpnKeyIcon from '@material-ui/icons/VpnKey';
// // import { toast } from 'react-toastify';
// // import { useNavigate } from 'react-router-dom';
// // import { getShippingInfo, getUserDetails } from '../../helper/SassionHelper.js';
// //
// // const StripePayment = () => {
// //     const navigate = useNavigate();
// //     const [stripeApiKey, setStripeApiKey] = useState(null);
// //     const payBtn = useRef(null);
// //     const user = getUserDetails();
// //     const shippingInfo = getShippingInfo();
// //     const [clientSecret, setClientSecret] = useState(null);
// //
// //     const stripe = useStripe();
// //     const elements = useElements();
// //
// //     const handleClientSecretReceived = (secret) => {
// //         setClientSecret(secret);
// //     };
// //
// //     useEffect(() => {
// //         async function fetchStripeApiKeyData() {
// //             try {
// //                 const data = await fetchStripeApiKey();
// //                 if (data && data.stripeApiKey) {
// //                     setStripeApiKey(loadStripe(data.stripeApiKey));
// //                 }
// //             } catch (error) {
// //                 console.error(error);
// //             }
// //         }
// //
// //         fetchStripeApiKeyData();
// //     }, []);
// //
// //     const handlePaymentSubmit = async () => {
// //         payBtn.current.disabled = true;
// //
// //         try {
// //             // Check if stripe and elements are defined
// //             if (!stripe || !elements) {
// //                 console.error('Stripe or elements not defined');
// //                 return;
// //             }
// //
// //             // Check if clientSecret is defined
// //             if (!clientSecret) {
// //                 console.error('Client secret not defined');
// //                 return;
// //             }
// //
// //             const result = await stripe.confirmCardPayment(clientSecret, {
// //                 payment_method: {
// //                     card: elements.getElement(CardNumberElement),
// //                     billing_details: {
// //                         name: user.name,
// //                         email: user.email,
// //                         address: {
// //                             line1: shippingInfo.address,
// //                             city: shippingInfo.city,
// //                             state: shippingInfo.state,
// //                             postal_code: shippingInfo.pinCode,
// //                             country: shippingInfo.country,
// //                         },
// //                     },
// //                 },
// //             });
// //
// //             if (result.error) {
// //                 payBtn.current.disabled = false;
// //                 toast.error(result.error.message);
// //             } else {
// //                 if (result.paymentIntent.status === 'succeeded') {
// //                     // Handle successful payment
// //                     toast.success('StripePayment Successful');
// //                     navigate('/products');
// //                 } else {
// //                     toast.error("There's some issue while processing payment ");
// //                 }
// //             }
// //         } catch (error) {
// //             console.error('Error in handlePaymentSubmit:', error);
// //
// //             payBtn.current.disabled = false;
// //             toast.error(error.response?.data?.message || 'An error occurred');
// //         }
// //     };
// //
// //     return (
// //         <Fragment>
// //             <CheckoutSteps activeStep={2} />
// //             <div className="paymentContainer">
// //                 {/* Ensure that Elements wraps the entire StripePayment component */}
// //                 {stripeApiKey && (
// //                     <Elements stripe={stripeApiKey}>
// //                         <StripePaymentForm
// //                             onSubmit={handlePaymentSubmit}
// //                             onClientSecretReceived={handleClientSecretReceived}
// //                             payBtnRef={payBtn}
// //                         />
// //                     </Elements>
// //                 )}
// //                 <EventIcon />
// //                 <VpnKeyIcon />
// //             </div>
// //         </Fragment>
// //     );
// // };
// //
// // export default StripePayment;
