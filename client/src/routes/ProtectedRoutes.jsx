import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRouteWrapper = () => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log(`Checking Token in Protected Route Wrapper: ${token}`);
  } else {
    console.log("No token found in Protected Route Wrapper");
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouteWrapper;
