import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import các trang
import IndexPage from '../pages/Index';
import AdminDashboard from '../pages/AdminDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import UnauthorizedPage from '../pages/UnauthorizedPage';

// Component kiểm tra quyền truy cập
const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  redirectTo = '/' 
}: { 
  children: React.ReactNode; 
  requiredRole?: string;
  redirectTo?: string;
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user) {
    const userRole = user.roles?.[0] || '';
    if (userRole !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  
  return <>{children}</>;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/teacher/*" 
        element={
          <ProtectedRoute requiredRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/student/*" 
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};