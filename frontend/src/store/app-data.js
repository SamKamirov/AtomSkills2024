import { createSlice } from "@reduxjs/toolkit";

export const SliceNames = {
    AppData: 'AppData'
};

const initialState = {

};

export const AppData = createSlice({
    name: SliceNames.AppData,
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
    },
})