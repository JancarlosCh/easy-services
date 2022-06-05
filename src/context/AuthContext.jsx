import React, { createContext, useState } from "react";
import { getIsLogged } from "../services/localStorage";

const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => getIsLogged());

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
