import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole) {
    const userRole = user?.roles?.[0] || '';
    if (userRole !== requiredRole) {
      // Người dùng không có quyền truy cập trang này
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Người dùng đã xác thực và có quyền truy cập
  return <Outlet />;
};

export default ProtectedRoute;