import React from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import OrderDetails from "../components/MyOrder/OrderDetails.jsx";

const OrderDetailsPage = () => {
    return (
        <div>
            <MetaData  title="Order Details"/>
            <OrderDetails/>
        </div>
    );
};

export default OrderDetailsPage;