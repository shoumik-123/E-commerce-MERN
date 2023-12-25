import React from 'react';
import { ReactNavbar } from 'overlay-navbar';
import logo from "../../assets/images/logo.png"
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";


const options = {
    // burgerColorHover: "#662D91",
    logo,
    logoWidth: "300px",
    navColor1: "#FDD138",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.5vmax",
    link1Family:"cursive",
    link1Color: "rgba(0,0,0)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#662D91",
    link1Margin: "1vmax",
    profileIcon:true,
    profileIconColor: "rgba(0,0,0)",
    ProfileIconElement: MdAccountCircle,
    profileIconUrl: "/profile",
    profileIconColorHover: "#662D91",
    profileIconMargin:"10px",
    searchIcon:true,
    searchIconColor: "rgba(0,0,0)",
    SearchIconElement:MdSearch,
    searchIconColorHover:"#662D91",
    searchIconMargin:"10px",
    cartIcon:true,
    cartIconColor: "rgba(0,0,0)",
    CartIconElement:MdAddShoppingCart,
    cartIconColorHover:"#662D91",
    cartIconMargin:"10px"


};
const Header = () => {
    return (
        <ReactNavbar {...options} />
    );
};

export default Header;