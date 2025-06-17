
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, BookOpen, Users, LogOut, PlusCircle, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [classes] = useState([
    { id: 1, name: "ATTT01", subject: "Mật mã học", students: 28 },
    { id: 2, name: "ATTT02", subject: "An toàn mạng", students: 32 },
    { id: 3, name: "ATTT03", subject: "Phân tích mã độc", students: 25 },
  ]);

  const [students] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "ATTT01", cryptography: 8.5, network_security: 7.8, malware_analysis: 9.0 },
    { id: 2, name: "Trần Thị B", class: "ATTT01", cryptography: 9.2, network_security: 8.5, malware_analysis: 8.8 },
    { id: 3, name: "Lê Văn C", class: "ATTT01", cryptography: 7.8, network_security: 8.0, malware_analysis: 7.5 },
    { id: 4, name: "Phạm Thị D", class: "ATTT02", cryptography: 8.8, network_security: 9.0, malware_analysis: 8.2 },
  ]);

  const handleLogout = () => {
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  const handleGradeUpdate = (studentId: number, subject: string, grade: number) => {
    toast.success(`Cập nhật điểm ${subject} thành công`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Giảng viên - Khoa ATTT</h1>
                <p className="text-sm text-gray-600">Quản lý lớp học và điểm số</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Giảng viên
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lớp đang dạy</CardTitle>
              <BookOpen className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{classes.length}</div>
              <p className="text-xs text-gray-600">Khoa An toàn thông tin</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng sinh viên</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {classes.reduce((total, cls) => total + cls.students, 0)}
              </div>
              <p className="text-xs text-gray-600">Tất cả các lớp</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Điểm trung bình</CardTitle>
              <GraduationCap className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">8.3</div>
              <p className="text-xs text-gray-600">Tất cả các lớp</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classes">Lớp học</TabsTrigger>
            <TabsTrigger value="grades">Quản lý điểm</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lớp học đang dạy</CardTitle>
                <CardDescription>Danh sách các lớp học bạn đang phụ trách</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((cls) => (
                    <Card key={cls.id} className="hover:shadow-md transition-shadow duration-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{cls.name}</CardTitle>
                        <CardDescription>{cls.subject}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{cls.students} sinh viên</span>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Xem chi tiết
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Quản lý điểm số</CardTitle>
                  <CardDescription>Nhập và cập nhật điểm cho sinh viên</CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Thêm điểm mới
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <Card key={student.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-gray-600">Lớp {student.class}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Mật mã học</Label>
                          <Input 
                            type="number" 
                            value={student.cryptography} 
                            onChange={(e) => handleGradeUpdate(student.id, 'cryptography', parseFloat(e.target.value))}
                            className="mt-1"
                            step="0.1"
                            min="0"
                            max="10"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">An toàn mạng</Label>
                          <Input 
                            type="number" 
                            value={student.network_security} 
                            onChange={(e) => handleGradeUpdate(student.id, 'network_security', parseFloat(e.target.value))}
                            className="mt-1"
                            step="0.1"
                            min="0"
                            max="10"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Phân tích mã độc</Label>
                          <Input 
                            type="number" 
                            value={student.malware_analysis} 
                            onChange={(e) => handleGradeUpdate(student.id, 'malware_analysis', parseFloat(e.target.value))}
                            className="mt-1"
                            step="0.1"
                            min="0"
                            max="10"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Báo cáo thống kê</CardTitle>
                <CardDescription>Thống kê điểm số và hiệu suất học tập</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Điểm trung bình các lớp</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">ATTT01:</span>
                        <span className="font-medium">8.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ATTT02:</span>
                        <span className="font-medium">8.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ATTT03:</span>
                        <span className="font-medium">8.1</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-green-50 border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">Thống kê xếp loại</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Xuất sắc:</span>
                        <span className="font-medium">12 sinh viên</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Giỏi:</span>
                        <span className="font-medium">18 sinh viên</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Khá:</span>
                        <span className="font-medium">15 sinh viên</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
