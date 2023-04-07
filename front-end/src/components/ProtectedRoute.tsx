import React, { useEffect, useState, ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { checkAuthLoader } from '../util/auth';

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const token = checkAuthLoader()
  return token ? <>{children}</> : <Navigate to='/login' replace={true} />
};

export default ProtectedRoute;