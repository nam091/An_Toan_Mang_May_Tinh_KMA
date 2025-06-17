// src/pages/Index.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Chuyển hướng người dùng đến endpoint đăng nhập của backend
    // Backend sẽ xử lý việc chuyển hướng tới Keycloak
    window.location.href = "http://localhost:3001/api/auth/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hệ Thống Quản Lý Điểm
          </h1>
          <p className="text-gray-600">Học viện Kỹ thuật Mật mã - KMA</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Đăng Nhập</CardTitle>
            <CardDescription className="text-center">
              Sử dụng tài khoản do nhà trường cấp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Đang chuyển hướng..." : "Đăng nhập với KMA"}
              </Button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lock className="h-4 w-4" />
                <span>Xác thực qua Hệ thống Tập trung</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;