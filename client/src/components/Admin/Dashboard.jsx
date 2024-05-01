import React, {Fragment, useEffect, useState} from 'react';
import Sidebar from "./Sidebar.jsx";
import "./dashboard.css";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Doughnut, Line} from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement } from 'chart.js';
import {getProductsAdmin} from "../../APIRequest/AdminApi.js";

// Register required scales and elements
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement);

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    console.log("pro", products);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProductsAdmin();
                setProducts(productsData.data || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    let outOfStock = 0;

    products &&
    products.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                borderColor: "#FDD138",
                pointBackgroundColor: "#600000", // Change point color to white
                pointBorderColor: "#FFFFFF",
                backgroundColor: ["#FDD138"],
                hoverBackgroundColor: ["#662D91"],
                data: [0, 10000],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#0c4348", "#441212"],
                hoverBackgroundColor: ["#09343b", "#3d0000"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    return (
        <Fragment>
            <div className="dashboard">
                <Sidebar/>

                <div className="dashboardContainer">
                    {/*<Typography component="h1">Dashboard</Typography>*/}

                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount <br/> 4000 BDT
                            </p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>4</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>3</p>
                            </Link>
                        </div>
                    </div>

                    <div className="lineChart">
                        <Line data={lineState}/>
                    </div>

                    <br/>
                    <div className="doughnutChart">
                        <Doughnut data={doughnutState}/>
                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;