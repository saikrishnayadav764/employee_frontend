// EmployeeList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./form.css"; // Importing the CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://extinct-life-jacket-calf.cyclic.app/employee/list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee List</h2>
      <ul className="list-group">
        {employees.map((employee) => (
          <li
            key={employee._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <Link to={`/employees/${employee._id}`} className="btn btn-primary">
              {employee.name}
            </Link>

            <Link
              to={`/edit/${employee._id}`}
              className="btn btn-danger btn-sm"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Link to="/create" className="btn btn-success">
          Add Employee
        </Link>
      </div>
    </div>
  );
};

export default EmployeeList;
