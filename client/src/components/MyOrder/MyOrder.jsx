import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import {getMyOrders, getUserDetails, setMyOrders} from "../../helper/SassionHelper.js";
import {Link} from "react-router-dom";
import {MyOrders} from "../../APIRequest/OrderApi.js";
const MyOrder = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersData = await MyOrders();
                setMyOrders(ordersData);
            } catch (error) {
                console.error("Error fetching MyOrders:", error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.7 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 100,
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 100,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 200,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];
    const myOrders = getMyOrders() ;
    console.log(myOrders)

    if (Array.isArray(myOrders)) {
        myOrders.forEach((item, index) => {
            if (item !== null) {
                rows.push({
                    itemsQty: item.orderItems,
                    id: item._id,
                    status: item.orderStatus,
                    amount: item.totalPrice,
                });
            } else {
                console.warn("Skipping null item at index:", index);
            }
        });
    } else {
        console.error("getMyOrders did not return an array:", myOrders);
    }



    return (
        <Fragment>

            <div className="myOrdersPage">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="myOrdersTable"
                    autoHeight
                />

                <Typography id="myOrdersHeading">{getUserDetails()[0].name}'s Orders</Typography>
            </div>
        </Fragment>
    );
};

export default MyOrder;