import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRouteWrapper = () => {
  console.log(">>> Protected Route Wrapper Working <<<");
  const token = localStorage.getItem("token");
  console.log(`Check Token in Protected Route Wrapper: ${token}`);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouteWrapper;
