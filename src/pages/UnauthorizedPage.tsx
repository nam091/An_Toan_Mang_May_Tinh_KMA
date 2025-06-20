import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Không được phép truy cập</h1>
        <p className="text-gray-600 mb-6">Bạn không có quyền truy cập vào trang này.</p>
        <Link to="/" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 