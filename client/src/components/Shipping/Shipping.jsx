import React, {Fragment, useEffect, useState} from 'react';
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import {GetUserDetails} from "../../APIRequest/UserApi.js";
import CheckoutSteps from "./CheckOutStep.jsx";
import {IsMobile} from "../../helper/FormHelper.js";
import {toast} from "react-toastify";
import {getShippingInfo, setShippingInfo} from "../../helper/SassionHelper.js";
import {useNavigate} from "react-router-dom";

const Shipping = () => {

    const navigate  = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetUserDetails();
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchData();
    }, []);


    const [address, setAddress] = useState(getShippingInfo()?.address);
    const [city, setCity] = useState(getShippingInfo()?.city);
    const [state, setState] = useState(getShippingInfo()?.state);
    const [country, setCountry] = useState(getShippingInfo()?.country);
    const [pinCode, setPinCode] = useState(getShippingInfo()?.pinCode);
    const [phoneNo, setPhoneNo] = useState(getShippingInfo()?.phoneNo);


    const shippingSubmit = async (e) => {
        e.preventDefault()

        if (!IsMobile(phoneNo)){
            toast.error("Phone Number is not Valid")
        }
        else {
            await setShippingInfo({address, city, state, country, pinCode, phoneNo })
            navigate("/order/confirm")
        }

    };
    return (
        <Fragment>
            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <HomeIcon/>
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                        <LocationCityIcon/>
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                </div>

                <div>
                    <PinDropIcon/>
                    <input
                        type="number"
                        placeholder="Pin Code"
                        required
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                    />
                </div>

                <div>
                    <PhoneIcon/>
                    <input
                        type="number"
                        placeholder="Phone Number"
                        required
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        size="10"
                    />
                </div>
                <div>
                    <PublicIcon/>

                    <select
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="">Country</option>
                        {Country &&
                            Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                        </div>
                        {country && (
                            <div>
                                <TransferWithinAStationIcon />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>

        </Fragment>
);
};

export default Shipping;