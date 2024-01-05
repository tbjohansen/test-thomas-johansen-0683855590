import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "antd";
import {
  addPatientDetails,
  addPatients,
  selectPatients,
} from "../../features/patientSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const columns = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Patient Name",
    dataIndex: "Patient_Name",
    key: "Patient_Name",
  },
  {
    title: "Patient Number",
    dataIndex: "Registration_ID",
    key: "Registration_ID",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Guarantor Name",
    dataIndex: "sponsor",
    key: "sponsor",
    render: (sponsor) => <p>{sponsor?.Guarantor_Name}</p>,
  },
  {
    title: "Date of Birth",
    dataIndex: "Date_Of_Birth",
    key: "Date_Of_Birth",
  },
  {
    title: "Region",
    dataIndex: "Region",
    key: "Region",
  },
  {
    title: "Ward",
    dataIndex: "Ward",
    key: "Ward",
  },
  {
    title: "Actions",
    key: "action",
    render: (_, patient) => (
      <p className="flex flex-row gap-1 justify-start">
        <ViewPatient patient={patient} />
      </p>
    ),
  },
];

const ViewPatient = ({ patient }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleViewPatient = () => {
    dispatch(addPatientDetails(patient));
    // console.log(patient);
    navigate(`/patients/${patient?.Registration_ID}`);
  };

  return (
    <p className="mt-1">
      <Button shape="circle" className="flex justify-center items-center" onClick={() => handleViewPatient()}>
        <FaEye lassName="text-blue-300 text-xl cursor-pointer" />
      </Button>
    </p>
  );
};

const Patients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //axios fetch patients function
    const getPatients = async () => {
      try {
        const response = await axios.get(
          "http://41.188.172.204:30003/patients"
        );
        console.log(response);
        if (response?.data?.data) {
          const data = response.data.data;
          dispatch(addPatients(data?.data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPatients();
  }, [dispatch]);

  const patients = useSelector(selectPatients);

  const sortedPatients = patients.filter((patient, index) => {
    const key = index + 1;
    return { ...patient, key };
  });

  console.log(sortedPatients);

  return (
    <div className="px-2">
      <h4 className="text-center text-xl py-2">PATIENTS</h4>
      <div className="pt-8">
        <Table
          columns={columns}
          dataSource={patients}
          size="middle"
          pagination={{ defaultPageSize: 10, size: "middle" }}
        />
      </div>
    </div>
  );
};

export default Patients;
