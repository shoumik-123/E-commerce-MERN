import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
        // background:"linear-gradient(55deg, rgba(125, 125, 126, 0.99) 0%, rgb(14, 14, 14) 100%)",
        background:"#FDD138",
        position:"fixed",
        width:"100%",
        zIndex:"1",
    };

    return (
        <Fragment>

            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index} completed={activeStep > index}>
                        <StepLabel
                            style={{
                                color: activeStep >= index ? "#662D91" : "rgba(0,0,0,0.55)",
                            }}
                            icon={item.icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

        </Fragment>
    );
};

export default CheckoutSteps;