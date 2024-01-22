import React, {Fragment} from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import BkashPayment from "../components/Payment/bkashPayment/BkashPayment.jsx";

const PaymentBkashPage = () => {
    return (
        <Fragment>
            <MetaData title="Bkash Payment"  />
            <BkashPayment/>
        </Fragment>
    );
};

export default PaymentBkashPage;