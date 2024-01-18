import React, {Fragment} from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import Payment from "../components/Payment/Payment.jsx";

const PaymentPage = () => {
    return (
        <Fragment>
            <MetaData title="Payment  Page"  />
            <Payment/>
        </Fragment>
    );
};

export default PaymentPage;