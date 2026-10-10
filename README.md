# 🏨 The Imperial Haven - Nền tảng Đặt phòng Khách sạn Cao cấp

**The Imperial Haven** là một hệ thống đặt phòng khách sạn, khu nghỉ dưỡng cao cấp được phát triển với kiến trúc Full-stack hiện đại. Dự án cung cấp trải nghiệm mượt mà cho khách hàng trong việc tìm kiếm và đặt phòng, đồng thời mang đến một trang quản trị (Admin Dashboard) mạnh mẽ để quản lý toàn bộ hệ thống.

## ✨ Tính năng nổi bật

### 👤 Dành cho Khách hàng (User)
- 🔍 **Tìm kiếm & Đặt phòng:** Tìm kiếm điểm đến, chọn ngày nhận/trả phòng và đặt phòng trực tuyến.
- 🔐 **Xác thực người dùng:** Đăng ký, đăng nhập an toàn, bảo mật thông tin.
- 📜 **Lịch sử đặt phòng:** Theo dõi, xem chi tiết và quản lý các phòng đã đặt.
- 🎨 **Giao diện hiện đại:** Trải nghiệm UI/UX sang trọng, thiết kế responsive mượt mà trên cả điện thoại và máy tính.

### 🛡️ Dành cho Quản trị viên (Admin)
- 📊 **Dashboard Tổng quan:** Theo dõi số liệu kinh doanh, lượng đặt phòng một cách trực quan.
- 🛏️ **Quản lý Đặt phòng (Bookings):** Phê duyệt, hủy, cập nhật trạng thái các đơn đặt phòng của khách.
- 👥 **Quản lý Khách hàng (Guests):** Theo dõi danh sách người dùng, tìm kiếm thông tin khách hàng chi tiết.
- 🚪 **Quản lý Phòng & Loại phòng:** Cập nhật sơ đồ phòng, giá cả và tình trạng phòng trống.

## 🛠️ Công nghệ sử dụng

- **Frontend:** React.js, Vite, TypeScript, Tailwind CSS, Playwright (E2E Testing).
- **Backend:** Java Spring Boot, Spring Security (JWT Authentication).
- **Cơ sở dữ liệu:** MySQL.
- **Khác:** Kiến trúc RESTful API.

## 🚀 Hướng dẫn cài đặt & Chạy dự án

### Yêu cầu hệ thống
- [Node.js](https://nodejs.org/) (Phiên bản >= 18)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (Phiên bản 17 hoặc cao hơn)
- [MySQL](https://www.mysql.com/)

### 1. Cài đặt Cơ sở dữ liệu (Database)
1. Mở MySQL và tạo một database mới (ví dụ: `hotelbookingdb`).
2. Chạy file script `BookingAI.sql` đính kèm trong thư mục gốc để khởi tạo các cấu trúc bảng và dữ liệu mẫu.

### 2. Khởi chạy Backend (Spring Boot)
Mở terminal và trỏ vào thư mục `backend`:
```bash
cd backend
# Cấu hình lại thông tin kết nối MySQL (username, password) trong file src/main/resources/application.properties nếu cần.
./mvnw spring-boot:run
