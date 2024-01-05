import React from "react";
import { Route, Routes } from "react-router-dom";
import Patient from "../pages/patients/Patient";
import Patients from "../pages/patients/Patients";


const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          <Route path="/" element={<Patients />} />
          <Route path="/patients/:registrationId" element={<Patient />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
