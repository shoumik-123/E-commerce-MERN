import React, {Fragment} from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import Dashboard from "../components/Admin/Dashboard.jsx";

const DashboardPage = () => {
    return (
        <Fragment>
            <MetaData title="Dashboard"/>

            <Dashboard/>
        </Fragment>
    );
};

export default DashboardPage;