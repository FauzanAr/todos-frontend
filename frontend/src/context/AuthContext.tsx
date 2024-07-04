import api from '../api'
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken_] = useState<string | null>(localStorage.getItem("accessToken"));

  const setToken = (newToken: string | null) => {
    console.log('token: ', newToken)
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("accessToken", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
