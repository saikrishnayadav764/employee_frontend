import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const history = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://extinct-life-jacket-calf.cyclic.app/auth/register",
        {
          username,
          email,
          password,
        }
      );

      // Handling success response
      setFeedback({ message: "Registration successful!", type: "success" });

      // Redirecting to login page after successful registration
      history("/login");
    } catch (error) {
      // Handling error response
      setFeedback({
        message: "Registration failed. Please try again.",
        type: "error",
      });
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>

              {feedback.message && (
                <div className="alert alert-danger" role="alert">
                  {feedback.message}
                </div>
              )}

              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                  <Link className="text-center mt-2" to="/login">
                    <button className="btn btn-success btn-block">Login</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
