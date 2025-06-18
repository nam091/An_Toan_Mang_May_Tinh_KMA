import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Nếu chưa xác thực, chuyển hướng về trang đăng nhập
    return <Navigate to="/" replace />;
  }

  // Nếu đã xác thực, hiển thị component con (trang dashboard)
  return <Outlet />;
};

export default ProtectedRoute;