import React, {Fragment} from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import PaymentOption from "../components/Payment/PaymentOption.jsx";

const PaymentOptionPage = () => {
    return (
        <Fragment>
            <MetaData title="Select Payment Method" />
            <PaymentOption />
        </Fragment>
    );
};

export default PaymentOptionPage;