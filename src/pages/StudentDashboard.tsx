import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { User, BookOpen, BarChart3, LogOut, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentInfo] = useState({
    name: "Nguyễn Văn A",
    studentId: "AT190001",
    class: "AT19-01",
    email: "at190001@kma.edu.vn"
  });

  const [grades] = useState([
    { subject: "Mật mã học", score: 8.5, credits: 3, teacher: "TS. Nguyễn Văn Minh" },
    { subject: "An toàn mạng", score: 7.8, credits: 3, teacher: "PGS. Trần Thị Lan" },
    { subject: "Phân tích mã độc", score: 9.0, credits: 2, teacher: "TS. Lê Văn Nam" },
    { subject: "Hệ điều hành bảo mật", score: 8.2, credits: 3, teacher: "ThS. Phạm Thị Hoa" },
    { subject: "Lập trình bảo mật", score: 8.8, credits: 3, teacher: "TS. Hoàng Văn Tùng" },
    { subject: "Pháp luật ATTT", score: 7.5, credits: 2, teacher: "ThS. Nguyễn Thị Linh" },
    { subject: "Kiểm thử xâm nhập", score: 8.0, credits: 2, teacher: "TS. Võ Văn Đức" },
  ]);

  const [schedule] = useState([
    { day: "Thứ 2", periods: ["Mật mã học", "An toàn mạng", "Nghiên cứu khoa học", "Tiếng Anh", "Thể dục"] },
    { day: "Thứ 3", periods: ["Pháp luật ATTT", "Hệ điều hành bảo mật", "Mật mã học", "Lập trình bảo mật", "Seminar"] },
    { day: "Thứ 4", periods: ["Phân tích mã độc", "Kiểm thử xâm nhập", "An toàn mạng", "Toán ứng dụng", "Tự học"] },
    { day: "Thứ 5", periods: ["Lập trình bảo mật", "Hệ điều hành bảo mật", "Đồ án môn học", "Thực tập", "GDQP-AN"] },
    { day: "Thứ 6", periods: ["Kiểm thử xâm nhập", "Phân tích mã độc", "Thực hành lab", "Hội thảo", "Sinh hoạt lớp"] },
  ]);

  const calculateGPA = () => {
    const totalPoints = grades.reduce((sum, grade) => sum + (grade.score * grade.credits), 0);
    const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const getGradeColor = (score: number) => {
    if (score >= 8.5) return "text-green-600";
    if (score >= 7.0) return "text-blue-600";
    if (score >= 5.5) return "text-yellow-600";
    return "text-red-600";
  };

  const handleLogout = () => {
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sinh viên - KMA</h1>
                <p className="text-sm text-gray-600">Xem điểm và thời khóa biểu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Sinh viên
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
        {/* Student Info Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white">{studentInfo.name}</CardTitle>
                <CardDescription className="text-blue-100">
                  MSSV: {studentInfo.studentId} - Lớp {studentInfo.class}
                </CardDescription>
                <CardDescription className="text-blue-100">
                  Học viện Kỹ thuật Mật mã - KMA
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{calculateGPA()}</div>
                <div className="text-sm text-blue-100">GPA</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="grades" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="grades">Bảng điểm</TabsTrigger>
            <TabsTrigger value="schedule">Thời khóa biểu</TabsTrigger>
            <TabsTrigger value="performance">Thành tích</TabsTrigger>
          </TabsList>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bảng điểm các môn học</CardTitle>
                <CardDescription>Điểm số chi tiết từng môn học trong chương trình ATTT</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {grades.map((grade, index) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-lg">{grade.subject}</h4>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-600">{grade.credits} tín chỉ</span>
                              <span className={`text-2xl font-bold ${getGradeColor(grade.score)}`}>
                                {grade.score}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Giảng viên: {grade.teacher}</span>
                            <Progress value={(grade.score / 10) * 100} className="w-32" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grade Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Điểm cao nhất</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.max(...grades.map(g => g.score))}
                  </div>
                  <p className="text-xs text-gray-600">Phân tích mã độc</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng tín chỉ</CardTitle>
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {grades.reduce((sum, grade) => sum + grade.credits, 0)}
                  </div>
                  <p className="text-xs text-gray-600">Đã tích lũy</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Xếp loại</CardTitle>
                  <Award className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {parseFloat(calculateGPA()) >= 8.5 ? "Xuất sắc" : 
                     parseFloat(calculateGPA()) >= 7.0 ? "Giỏi" : 
                     parseFloat(calculateGPA()) >= 5.5 ? "Khá" : "Trung bình"}
                  </div>
                  <p className="text-xs text-gray-600">Học lực hiện tại</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thời khóa biểu tuần</CardTitle>
                <CardDescription>Lịch học các môn trong tuần - Khoa ATTT</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule.map((day, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-medium text-lg mb-3">{day.day}</h4>
                      <div className="grid grid-cols-5 gap-3">
                        {day.periods.map((period, periodIndex) => (
                          <div
                            key={periodIndex}
                            className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 text-center"
                          >
                            <div className="text-xs text-gray-600 mb-1">Ca {periodIndex + 1}</div>
                            <div className="font-medium text-sm">{period}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Biểu đồ điểm số</CardTitle>
                  <CardDescription>Phân tích điểm số các môn chuyên ngành</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {grades.slice(0, 5).map((grade, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{grade.subject}</span>
                          <span className="font-medium">{grade.score}/10</span>
                        </div>
                        <Progress value={(grade.score / 10) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thành tích nổi bật</CardTitle>
                  <CardDescription>Các thành tích đã đạt được trong học tập</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Award className="h-6 w-6 text-yellow-600" />
                      <div>
                        <div className="font-medium">Sinh viên xuất sắc</div>
                        <div className="text-sm text-gray-600">Học kỳ I năm 2024</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-medium">Điểm cao Phân tích mã độc</div>
                        <div className="text-sm text-gray-600">Điểm 9.0/10</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-medium">Giải nhất CTF UIT</div>
                        <div className="text-sm text-gray-600">Cuộc thi An toàn thông tin</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
