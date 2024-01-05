import {configureStore} from "@reduxjs/toolkit";
import patientReducer from "../features/patientSlice";

export const store = configureStore({
    reducer : {
        patient: patientReducer,
    }
});