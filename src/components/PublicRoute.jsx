import React, { useContext } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PublicRoute = () => {
  const { auth } = useContext(AuthContext);
  return !auth.isLogged ? <Outlet /> : <Navigate to="/consultas" replace />;
};

export default PublicRoute;
