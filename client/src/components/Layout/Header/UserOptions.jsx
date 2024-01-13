import React, { Fragment, useState } from 'react';
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import profilePNG from "../../../assets/images/profile.png"
import {useNavigate} from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {getCart, getUserDetails, removeSession, setCart} from "../../../helper/SassionHelper.js";
import {toast} from "react-toastify";
const UserOptions = () => {
    const [open, setOpen] = useState(false);


    let navigate =  useNavigate()

    const options = [
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        {
            icon: (
                <ShoppingCartIcon
                    style={{ color:getCart().length  >  0 ? "#662D91" :"unset"}}
                />
            ),
            name: `Cart`,
            func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];


    if (getUserDetails()[0].role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }
    function dashboard() {
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }
    function logoutUser() {
        removeSession()
        return toast.success("Logout Success")
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={getUserDetails()[0]?.avatar?.url || profilePNG}
                        alt="Profile"
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;
