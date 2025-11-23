import React from "react";
import { Navigate } from "react-router-dom";

// Props: children (the page to render), role (who can access it)
const ProtectedRoute = ({ children, role }) => {
  // Check if user is logged in
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // role: "user" or "admin"

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // If role mismatch (e.g., user tries to open admin page)
    return <Navigate to="/" replace />;
  }

  // If everything is fine → render the page
  return children;
};

export default ProtectedRoute;
