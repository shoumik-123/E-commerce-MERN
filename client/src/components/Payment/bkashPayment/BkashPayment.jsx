import React, { useEffect } from 'react';
import axios from "axios";

const BkashPayment = () => {
    useEffect(() => {
        const pay = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/v1/bkash/payment/create",
                    { amount: 50, orderId: 1 },
                    { withCredentials: true });

                const { data } = response || {}; // Check if response is defined
                if (data && data.bkashURL) {
                    window.location.href = data.bkashURL;
                } else {
                    console.log("Unexpected response format:", response);
                }
            } catch (error) {
                console.log("Error:", error.response ? error.response.data : error.message);
            }
        };

        pay();
    }, []);

    return (
        <div>
            {/* Render any additional content as needed */}
        </div>
    );
};

export default BkashPayment;
