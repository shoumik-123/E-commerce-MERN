import React, {Fragment} from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import Shipping from "../components/Shipping/Shipping.jsx";

const ShippingPage = () => {
    return (
        <Fragment>
            <MetaData title="Shipping page"/>
            <Shipping/>
        </Fragment>
    );
};

export default ShippingPage;