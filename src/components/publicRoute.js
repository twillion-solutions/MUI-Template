import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.token);


  return !isAuthenticated ? <Component /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;