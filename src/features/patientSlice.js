import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  patientDetails: "",
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    addPatients(state, action) {
      state.patients = action.payload;
    },

    addPatientDetails(state, action) {
      state.patientDetails = action.payload;
    },
  },
});

export const { addPatients, addPatientDetails } = patientSlice.actions;

export const selectPatients = (state) => state.patient.patients;
export const selectPatientDetails = (state) => state.patient.patientDetails;

export default patientSlice.reducer;
