// Login.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  useEffect(() => {
    // Checking if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      history("/employees");
    }
  }, [history]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://extinct-life-jacket-calf.cyclic.app/auth/login",
        {
          email,
          password,
        }
      );

      // Saving token in localStorage or cookies
      localStorage.setItem("token", response.data.token);

      // Redirecting to employee list page
      history("/employees");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form>
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

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>

                  <Link className="text-center" to="/register">
                    <button className="btn btn-success btn-block">
                      Register
                    </button>
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

export default Login;
