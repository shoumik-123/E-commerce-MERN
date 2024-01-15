import React, {Fragment} from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import ConfirmOrder from "../components/ConfirmOrder/ConfirmOrder.jsx";

const OrderPage = () => {
    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <ConfirmOrder/>
        </Fragment>
    );
};

export default OrderPage;