import React, { useEffect, Fragment } from 'react';
import Shoe3D from "./Shoe3d/Shoe3D.jsx";
import { getInfoFor3D } from "../../helper/SassionHelper.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const View3D = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const subcategory = getInfoFor3D().subcategory;

        if (subcategory === "Laptop") {
            toast.info("Laptop 3D model will be imported as soon as possible");
        } else if (subcategory === "T-Shirt") {
            toast.info("T-Shirt 3D model will be imported as soon as possible");
        } else if (subcategory === "Mobile") {
            toast.info("Mobile 3D model will be imported as soon as possible");
        } else if (subcategory === "Guitar") {
            toast.info("Guitar 3D model will be imported as soon as possible");
        }
    }, []);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Fragment>
            <div className="body3D">
                {getInfoFor3D().subcategory === "Shoe" && <Shoe3D />}
                <button className="goBackBtnFrom3dPage" onClick={goBack}>
                    Go Back
                </button>
            </div>
        </Fragment>
    );
};

export default View3D;
