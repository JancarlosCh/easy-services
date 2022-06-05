import React, { useContext, useEffect } from "react";
import Home from "./pages/home/Home";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Menu from "./components/Menu";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Records from "./pages/Dashboard/Records";
import { AuthProvider } from "./context/AuthContext";
import { getIsLogged } from "./services/localStorage";
import Services from "./pages/Dashboard/Services";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { DataProvider } from "./context/DataContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <DataProvider>
        <Menu />
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="solicitudes" element={<Services />} />
              <Route path="consultas" element={<Records />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </>
  );
};

export default App;
