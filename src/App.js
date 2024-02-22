import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EmployeeList from "./components/Employee/EmployeeList";
import EmployeeDetail from "./components/Employee/EmployeeDetail";
import EmployeeForm from "./components/Employee/EmployeeForm";
import PrivateRoute from "./components/common/PrivateRoute";
import NotFound from "./components/common/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          exact
          path="/employees"
          element={<PrivateRoute Component={EmployeeList} />}
        />
        <Route
          exact
          path="/employees/:id"
          element={<PrivateRoute Component={EmployeeDetail} />}
        />
        <Route
          exact
          path="/create"
          element={<PrivateRoute Component={EmployeeForm} />}
        />
        <Route
          exact
          path="/edit/:id"
          element={<PrivateRoute Component={EmployeeForm} />}
        />
        {/* Catching-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/404" />} />
        {/* Error page for unknown paths */}
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
