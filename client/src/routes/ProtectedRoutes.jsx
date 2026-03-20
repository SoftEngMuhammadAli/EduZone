import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRouteWrapper = () => {
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token || user);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouteWrapper;
