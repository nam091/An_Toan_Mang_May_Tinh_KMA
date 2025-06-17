
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, Users } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (role: string) => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Đăng nhập thành công với vai trò ${role}`);
      
      // Navigate to appropriate dashboard
      switch(role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'student':
          navigate('/student');
          break;
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Header */}
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

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Đăng Nhập</CardTitle>
            <CardDescription className="text-center">
              Nhập thông tin đăng nhập của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="student" className="text-sm">Sinh viên</TabsTrigger>
                <TabsTrigger value="teacher" className="text-sm">Giảng viên</TabsTrigger>
                <TabsTrigger value="admin" className="text-sm">Quản trị</TabsTrigger>
              </TabsList>

              {/* Student Login */}
              <TabsContent value="student">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin('student'); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="at190000@kma.edu.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Mật khẩu</Label>
                    <Input
                      id="student-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </form>
              </TabsContent>

              {/* Teacher Login */}
              <TabsContent value="teacher">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin('teacher'); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-email">Email</Label>
                    <Input
                      id="teacher-email"
                      type="email"
                      placeholder="giangvien@kma.edu.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-password">Mật khẩu</Label>
                    <Input
                      id="teacher-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </form>
              </TabsContent>

              {/* Admin Login */}
              <TabsContent value="admin">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin('admin'); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@kma.edu.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Mật khẩu</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Keycloak Integration Note */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lock className="h-4 w-4" />
                <span>Xác thực qua Keycloak IAM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
      </div>
    </div>
  );
};

export default Index;
