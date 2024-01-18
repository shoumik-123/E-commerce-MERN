import React, { useRef } from 'react';
import { Typography } from "@material-ui/core";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EventIcon from "@material-ui/icons/Event";
import { getConfirmOrder } from "../../helper/SassionHelper.js";

const PaymentForm = ({ onSubmit, payBtnRef }) => {
    const stripe = useStripe();
    const elements = useElements();
    const orderInfo = getConfirmOrder();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        onSubmit();
    };

    return (
        <form className="paymentForm" onSubmit={(e) => handleSubmit(e)}>
            <Typography>Card Info</Typography>
            <div>
                <CreditCardIcon />
                <CardNumberElement className="paymentInput" />
            </div>
            <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
            </div>
            <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
            </div>

            <input
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtnRef}
                className="paymentFormBtn"
            />
        </form>
    );
};

export default PaymentForm;








// import React from 'react';
// import { Typography } from "@material-ui/core";
// import { CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
// import CreditCardIcon from "@material-ui/icons/CreditCard";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import EventIcon from "@material-ui/icons/Event";
// import { getConfirmOrder } from "../../helper/SassionHelper.js";
// import {ProcessPayment} from "../../APIRequest/PaymentApi.js";
//
// const PaymentForm = ({ onSubmit, payBtnRef ,onClientSecretReceived, stripe, elements }) => {
//
//     const orderInfo = getConfirmOrder();
//
//     if (!stripe) {
//         console.error('Stripe object is not defined');
//         return null;
//     }
//
//     const paymentData = {
//         amount: Math.round(orderInfo.totalPrice ),
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         try {
//             const client_secret = await ProcessPayment(paymentData, stripe);
//
//             if (!elements) {
//                 return;
//             }
//
//
//             onClientSecretReceived(client_secret);
//             onSubmit();
//         }
//         catch (e) {
//             console.log(e)
//         }
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
// export default PaymentForm;
//
