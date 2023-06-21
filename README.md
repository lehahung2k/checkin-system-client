# ĐỒ ÁN TỐT NGHIỆP KỸ SƯ KTMT 20222

## XÂY DỰNG HỆ THỐNG CHECK-IN ĐA ĐIỂM - GIAI ĐOẠN 2 - CLIENT SIDE

### 04/2023

## Template: React berry admin
- References: https://berrydashboard.io/

## Cấu trúc template

- Layout: Header, Sidebar, Footer, MainLayout.
- Menu Items: Routing sidebar
  - adminRole: Routing page giành cho admin
  - tenantRole: Routing page giành cho tenant
  - pocRole: Routing page giành cho poc
- Routes: Đường dẫn các chức năng của hệ thống
- Themes: Giao diện chính của hệ thống
- Components: Các thành phần cơ bản: Card, BreadCrumb, Button, ...
- View: Các giao diện người dùng: admin, tenant, poc
- Store: thư mục của redux để chứa toàn bộ dữ liệu của ứng dụng

## Cài đặt giao diện
```bash
npm install
```
- Cấu hình các biến môi trường trong file .env
- Chạy lệnh
```bash
npm start
```
- Truy cập vào đường dẫn http://localhost:{port} (port mặc định là 3000)
## Deployment:
[Hệ thống quản lý checkin](https://dangky.app)
