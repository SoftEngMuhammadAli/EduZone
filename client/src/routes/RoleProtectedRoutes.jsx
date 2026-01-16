import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RoleProtectedRouteWrapper = ({ allowedRoles }) => {
  console.log(
    "Check!!! Check!!! Check!!! Role Based Protected Route Wrapper Check!!!"
  );

  const { user } = useSelector((state) => state.auth);

  console.log(`Check for User: ${user}`);

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
