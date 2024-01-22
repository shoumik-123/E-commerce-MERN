import React, {Fragment} from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import StripePayment from "../components/Payment/StripePayment/StripePayment.jsx";

const PaymentStripePage = () => {
    return (
        <Fragment>
            <MetaData title="Stripe Payment Page"  />
            <StripePayment/>
        </Fragment>
    );
};

export default PaymentStripePage;