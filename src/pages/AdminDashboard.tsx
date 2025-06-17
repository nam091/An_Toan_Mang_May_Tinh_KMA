
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, GraduationCap, BookOpen, Settings, LogOut, BarChart3, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalStudents: 450,
    totalTeachers: 25,
    totalSubjects: 18,
    totalClasses: 12
  });

  const handleLogout = () => {
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  const recentActivities = [
    { id: 1, action: "Thêm sinh viên mới", user: "Nguyễn Văn A", time: "5 phút trước" },
    { id: 2, action: "Cập nhật điểm Mật mã học", user: "TS. Minh", time: "10 phút trước" },
    { id: 3, action: "Tạo lớp ATTT04", user: "Admin", time: "15 phút trước" },
    { id: 4, action: "Thêm môn Blockchain Security", user: "Admin", time: "1 giờ trước" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin - Khoa ATTT</h1>
                <p className="text-sm text-gray-600">Quản lý hệ thống điểm</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                Quản trị viên
              </Badge>
              <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Sinh viên</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
              <p className="text-xs text-gray-600">Khoa An toàn thông tin</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Giảng viên</CardTitle>
              <GraduationCap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.totalTeachers}</div>
              <p className="text-xs text-gray-600">Bao gồm TS, ThS, GS</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Môn học chuyên ngành</CardTitle>
              <BookOpen className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.totalSubjects}</div>
              <p className="text-xs text-gray-600">Chương trình ATTT</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lớp học</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalClasses}</div>
              <p className="text-xs text-gray-600">Từ ATTT01 đến ATTT12</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="users">Quản lý người dùng</TabsTrigger>
            <TabsTrigger value="subjects">Môn học</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Hoạt động gần đây</CardTitle>
                  <CardDescription>Các hoạt động mới nhất trong hệ thống</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-600">bởi {activity.user}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                  <CardDescription>Các tác vụ thường dùng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col space-y-2 bg-blue-600 hover:bg-blue-700">
                      <Users className="h-6 w-6" />
                      <span className="text-sm">Thêm sinh viên</span>
                    </Button>
                    <Button className="h-20 flex flex-col space-y-2 bg-green-600 hover:bg-green-700">
                      <GraduationCap className="h-6 w-6" />
                      <span className="text-sm">Thêm giảng viên</span>
                    </Button>
                    <Button className="h-20 flex flex-col space-y-2 bg-orange-600 hover:bg-orange-700">
                      <BookOpen className="h-6 w-6" />
                      <span className="text-sm">Thêm môn học</span>
                    </Button>
                    <Button className="h-20 flex flex-col space-y-2 bg-purple-600 hover:bg-purple-700">
                      <BarChart3 className="h-6 w-6" />
                      <span className="text-sm">Xem báo cáo</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý người dùng</CardTitle>
                <CardDescription>Quản lý sinh viên, giảng viên và tài khoản</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Chức năng quản lý người dùng sẽ được tích hợp với Keycloak IAM</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <h4 className="font-medium text-blue-900">Sinh viên ATTT</h4>
                      <p className="text-sm text-blue-700">450 tài khoản đang hoạt động</p>
                    </Card>
                    <Card className="p-4 bg-green-50 border-green-200">
                      <h4 className="font-medium text-green-900">Giảng viên</h4>
                      <p className="text-sm text-green-700">25 tài khoản giảng viên</p>
                    </Card>
                    <Card className="p-4 bg-purple-50 border-purple-200">
                      <h4 className="font-medium text-purple-900">Quản trị viên</h4>
                      <p className="text-sm text-purple-700">3 tài khoản admin</p>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý môn học</CardTitle>
                <CardDescription>Thêm, sửa, xóa môn học chuyên ngành ATTT</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Chức năng quản lý môn học sẽ được kết nối với PostgreSQL</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Môn học cơ sở:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Mật mã học</li>
                        <li>• An toàn mạng</li>
                        <li>• Hệ điều hành bảo mật</li>
                        <li>• Lập trình bảo mật</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Môn học nâng cao:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Phân tích mã độc</li>
                        <li>• Kiểm thử xâm nhập</li>
                        <li>• Blockchain Security</li>
                        <li>• AI Security</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt hệ thống</CardTitle>
                <CardDescription>Cấu hình Keycloak và cơ sở dữ liệu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900">Keycloak IAM</h4>
                    <p className="text-sm text-blue-700">Cấu hình xác thực và phân quyền cho hệ thống ATTT</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900">PostgreSQL Database</h4>
                    <p className="text-sm text-green-700">Kết nối và quản lý cơ sở dữ liệu điểm số</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900">Security Settings</h4>
                    <p className="text-sm text-purple-700">Cấu hình bảo mật cho hệ thống quản lý điểm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
