import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

const EmployeeForm = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const history = useNavigate();

  useEffect(() => {
    if (id) {
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
          setName(response.data.name);
          setImage(response.data.image);
          setRole(response.data.role);
          setMobileNumber(response.data.mobileNumber);
          setEmail(response.data.email);
        } catch (error) {
          console.error("Failed to fetch employee details:", error.message);
        }
      };

      fetchEmployee();
    }
  }, [id]);

  // Helper function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to validate mobile number format
  const isValidMobileNumber = (number) => {
    const numberRegex = /^\d{10}$/;
    return numberRegex.test(number);
  };

  // Helper function to validate image URL
  const isValidImageUrl = (url) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const handleSave = async () => {
    try {
      if (!name || !role || !mobileNumber || !email) {
        setValidationError("Please fill in all required fields");
        return;
      }

      // Individual field validations
      if (!name.trim()) {
        setValidationError("Name is required");
        return;
      }

      if (!role.trim()) {
        setValidationError("Role is required");
        return;
      }

      if (image && !isValidImageUrl(image)) {
        setValidationError("Invalid image URL");
        return;
      }

      // Validation for mobileNumber
      if (!mobileNumber.trim()) {
        setValidationError("Mobile Number is required");
        return;
      } else if (!isValidMobileNumber(mobileNumber)) {
        setValidationError("Invalid mobile number");
        return;
      }

      if (!email.trim()) {
        setValidationError("Email is required");
        return;
      } else if (!isValidEmail(email)) {
        setValidationError("Invalid email format");
        return;
      }

      // Clearing validation error
      setValidationError("");

      if (id) {
        // Updating existing employee
        await axios.put(
          `https://extinct-life-jacket-calf.cyclic.app/employee/${id}`,
          { name, image, role, mobileNumber, email },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Creating new employee
        await axios.post(
          "https://extinct-life-jacket-calf.cyclic.app/employee/create",
          { name, image, role, mobileNumber, email },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      setSuccessMessage("Employee saved successfully");
      // Redirecting to employee list page after successful save
      history("/employees");
    } catch (error) {
      console.error("Failed to save employee:", error.message);
    }
  };

  return (
    <div className="employee-form-container">
      <div className="employee-form">
        <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formRole">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formMobileNumber">
            <Form.Label>Mobile Number:</Form.Label>
            <Form.Control
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {validationError && <Alert variant="danger">{validationError}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Button variant="primary" type="button" onClick={handleSave}>
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EmployeeForm;
