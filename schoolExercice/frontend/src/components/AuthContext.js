// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Indique si l'utilisateur est authentifié
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Exemple de fonction de connexion. Vous pouvez y ajouter votre logique réelle.
  const login = (userData) => {
    setIsAuthenticated(true);
    // Vous pouvez aussi stocker userData dans le state ou localStorage.
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Supprimez les informations de l'utilisateur si nécessaire.
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
