import {configureStore} from "@reduxjs/toolkit";
import SettingsSlice from "../state/SettingsSlice.js"
import ProductSlice from "../state/ProductSlice.js"
export default configureStore({
    reducer:{
        settings:SettingsSlice,
        products :ProductSlice


        // cart: cartReducer,
    }
})
