// EmployeeDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./form.css"; // Importing the CSS file

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://extinct-life-jacket-calf.cyclic.app/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Failed to fetch employee details:", error.message);
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Detail</h2>
      {employee ? (
        <div className="card" style={{ width: "25rem" }}>
          <img
            className="card-img-top image-fluid"
            src={employee.image}
            height="300px"
            alt="Employee Image"
          />

          <div className="card-body">
            <h5 className="card-title">{employee.name}</h5>
            <p className="card-text">Role: {employee.role}</p>
            <p className="card-text">Mobile Number: {employee.mobileNumber}</p>
            <p className="card-text">Email: {employee.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeDetail;
