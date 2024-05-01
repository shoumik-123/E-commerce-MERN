import React, {Fragment} from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import StripePaymentForm from "../components/Payment/StripePayment/StripePaymentForm.jsx";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51OYxrHKVgLpmW6XvZmEGxlPhEO1jgsTv1M9z4MCOW5upRI4Cbfxw5m0mRWyIAN0SOHcnR3X7bkVI8oZRJtyxunW400HlsAHx6I');

const PaymentStripePage = () => {
    return (
        <Fragment>
            <MetaData title="Stripe Payment Page"  />

            <Elements stripe={stripePromise}>
                <StripePaymentForm />
            </Elements>

            {/*<StripePayment/>*/}
        </Fragment>
    );
};

export default PaymentStripePage;