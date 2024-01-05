import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addPatientDetails,
  selectPatientDetails,
} from "../../features/patientSlice";

const Patient = () => {
  const dispatch = useDispatch();
  const { registrationId } = useParams();

  console.log(registrationId);

  useEffect(() => {
    //axios fetch patients demographics function
    const getPatientDetails = async () => {
      try {
        const response = await axios.get(
          `http://41.188.172.204:30003/patients?Registration_ID=${registrationId}`
        );
        console.log(response);
        if (response?.data?.data) {
            const data = response.data.data;
            // console.log(data);
          dispatch(addPatientDetails(data?.data[0]));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPatientDetails();
  }, [dispatch, registrationId]);

  const patientDetails = useSelector(selectPatientDetails);
//   console.log(patientDetails);

  return (
    <div className="px-2 w-[100%]">
      <h4 className="text-xl font-light py-2 text-center">
        {patientDetails?.Patient_Name} Demographics
      </h4>
      <div className="flex flex-row w-[100%] justify-center items-center py-2">
        <div className="py-2 w-[80%] px-8 border-[1px] border-black rounded-xl">
          <div className="w-[100%] flex flex-row justify-center py-1 text-lg">
            <h4 className="w-[50%]">Name : {patientDetails?.Patient_Name}</h4>
            <h4 className="w-[50%]">Number : {patientDetails?.Registration_ID}</h4>
          </div>
          <div className="w-[100%] flex flex-row justify-center py-1 text-lg">
            <h4 className="w-[50%]">Gender : {patientDetails?.Gender}</h4>
            <h4 className="w-[50%]">Date of Birth : {patientDetails?.Date_Of_Birth}</h4>
          </div>
          <div className="w-[100%] flex flex-row justify-center py-1 text-lg">
            <h4 className="w-[50%]">Region : {patientDetails?.Region}</h4>
            <h4 className="w-[50%]">Ward : {patientDetails?.Ward}</h4>
          </div>
          <div className="w-[100%] flex flex-row justify-center py-1 text-lg">
            <h4 className="w-[50%]">Guarantor : {patientDetails?.sponsor?.Guarantor_Name}</h4>
            <h4 className="w-[50%]">Member No : {patientDetails?.Member_Number}</h4>
          </div>
          <div className="w-[100%] flex flex-row justify-center py-1 text-lg">
            <h4 className="w-[50%]">Emergency Contact : {patientDetails?.Emergence_Contact_Name}</h4>
            <h4 className="w-[50%]">Emergency Contact No : {patientDetails?.Emergence_Contact_Number}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
