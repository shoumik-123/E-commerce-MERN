import React, { Fragment, useState } from 'react';
import CheckoutSteps from '../Shipping/CheckOutStep.jsx';
import { useNavigate } from 'react-router-dom';
import bkashLogo from '../../assets/images/bkash-logo.png';
import stripeLogo from '../../assets/images/stripe-logo.png';

const PaymentOption = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const handleOptionSelect = (option) => {
        setSelectedOption(option);

        if (option === 1) {
            navigate('/process/payment/bkash');
        }
        if (option === 2) {
            navigate('/process/payment/stripe');
        }
    };

    const options = [
        { id: 1, name: 'Bkash', logo: bkashLogo },
        { id: 2, name: 'Stripe', logo: stripeLogo },
    ];

    return (
        <Fragment>
            <div className="payment-option">
                <CheckoutSteps activeStep={2} />

                <div className="payment-option-selector">
                    <h2>Select Payment Option</h2>
                    <div className="option-div">
                        {options.map((option) => (
                            <label key={option.id}>
                                <input
                                    type="radio"
                                    name="paymentOption"
                                    className="payment-option-radio"
                                    value={option.id}
                                    checked={selectedOption === option.id}
                                    onChange={() => handleOptionSelect(option.id)}
                                />
                                <span>{option.name}</span>
                                <img style={{height:"30px" , marginLeft :"50px"}} src={option.logo} alt={option.name} />
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default PaymentOption;
