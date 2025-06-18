import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  email: string;
  roles?: string[];
  iat: number;
  exp: number;
}

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      login(token); // Lưu token vào context và localStorage

      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const roles = decodedToken.roles || [];

        // Điều hướng dựa trên vai trò
        if (roles.includes('admin')) {
          navigate('/admin');
        } else if (roles.includes('teacher')) {
          navigate('/teacher');
        } else {
          navigate('/student');
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        navigate('/'); // Về trang chủ nếu có lỗi
      }
    } else {
      // Nếu không có token, quay về trang đăng nhập
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Đang xử lý đăng nhập, vui lòng chờ...</p>
    </div>
  );
};

export default AuthCallback;