import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../auth';

// Redirige vers la page de connexion si l'utilisateur n'est pas connecté.
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }
  return children;
};

export default ProtectedRoute;
