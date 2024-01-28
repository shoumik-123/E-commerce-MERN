import React, {Fragment} from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import MyOrder from "../components/MyOrder/MyOrder.jsx";

const MyOrderPage = () => {
    return (
        <Fragment>
            <MetaData title="My Order" />
            <MyOrder/>
        </Fragment>
    );
};

export default MyOrderPage;