import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RoleProtectedRouteWrapper = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    console.log("User not found in Role Protected Route Wrapper");
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(user.user_type) ? (
    <Outlet />
  ) : (
    <Navigate to="/notfound" replace />
  );
};

export default RoleProtectedRouteWrapper;
