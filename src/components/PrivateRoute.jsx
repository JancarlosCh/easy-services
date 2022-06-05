import React, { useContext } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ ...props }) => {
  const { auth } = useContext(AuthContext);
  return auth.isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
