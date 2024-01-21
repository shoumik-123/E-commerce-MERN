import React, {Fragment} from 'react';
import Shoe3D from "./Shoe3d/Shoe3D.jsx";
import {getInfoFor3D} from "../../helper/SassionHelper.js";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";

const View3D = () => {

    const navigate =  useNavigate()
    const goBack = () => {
      navigate(-1)
    }
    return (
        <Fragment>
            <div className="body3D">
                {getInfoFor3D().subcategory === "Shoe" &&(
                    <Shoe3D/>
                )}
                {getInfoFor3D().subcategory === "Laptop" &&(
                    toast.info("Laptop 3D model Will be import as soon  as  possible")

                )}
                {getInfoFor3D().subcategory === "T-Shirt" &&(
                    toast.info("T-Shirt 3D model Will be import as soon  as  possible")
                )}
                {getInfoFor3D().subcategory === "Mobile" &&(
                    toast.info("Mobile 3D model Will be import as soon  as  possible")
                )}
                {getInfoFor3D().subcategory === "Guitar" &&(
                    toast.info("Guitar 3D model Will be import as soon  as  possible")
                )}
                <button className="goBackBtnFrom3dPage" onClick={goBack}>Go Back</button>
            </div>
        </Fragment>
    );
};

export default View3D;