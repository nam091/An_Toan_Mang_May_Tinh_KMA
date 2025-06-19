import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Chuyển hướng người dùng đến trang tương ứng nếu đã đăng nhập
  React.useEffect(() => {
    if (isAuthenticated && user) {
      // Xác định vai trò từ Keycloak hoặc đăng ký user trong hệ thống
      const role = sessionStorage.getItem('selectedRole') || 'student'; // Mặc định là student
      
      switch(role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        default:
          navigate('/student');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = (role: string) => {
    setIsLoading(true);
    // Lưu vai trò đã chọn để xử lý sau khi đăng nhập SSO thành công
    sessionStorage.setItem('selectedRole', role);
    
    // Giả lập login vì chúng ta chưa tích hợp Keycloak
    // Thông thường bạn sẽ gọi login(token) với token từ Keycloak
    window.location.href = '/api/auth/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Hệ thống quản lý điểm</h1>
        <div className="bg-white shadow-md rounded p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h2>
          <p className="text-gray-600 text-center mb-6">Vui lòng chọn vai trò của bạn</p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('student')}
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              {isLoading ? 'Đang xử lý...' : 'Sinh viên'}
            </button>
            
            <button
              onClick={() => handleLogin('teacher')}
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              {isLoading ? 'Đang xử lý...' : 'Giảng viên'}
            </button>
            
            <button
              onClick={() => handleLogin('admin')}
              disabled={isLoading}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
            >
              {isLoading ? 'Đang xử lý...' : 'Quản trị viên'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;