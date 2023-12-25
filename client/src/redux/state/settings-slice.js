import {createSlice} from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name:'settings',
    initialState:{
        loader :"",
    },
    reducers:{
        ShowLoader:(state)=>{
            state.loader=""
        },
        HideLoader:(state)=>{
            state.loader="d-none"
        }
    }
})

export const {ShowLoader,HideLoader} = settingsSlice.actions;
export default settingsSlice.reducer;