import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getProductsAdmin } from "../../APIRequest/AdminApi.js";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log("pro", products);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProductsAdmin();
                setProducts(productsData.data || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 150, flex: 0.3 },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    // Ensure products is an array before iterating over it
    const rows = Array.isArray(products)
        ? products.map((item) => ({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
        }))
        : [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;
