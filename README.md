# Hệ thống quản lý điểm - KMA

Dự án quản lý điểm học tập cho sinh viên Học viện Kỹ thuật Mật mã (KMA).

## Công nghệ sử dụng

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: NestJS, TypeORM
- **Authentication**: Keycloak (SSO)
- **Database**: PostgreSQL

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js v16 trở lên
- PostgreSQL
- Keycloak server (v16+)

### Cấu hình Keycloak

1. Tải và giải nén Keycloak từ [trang chủ Keycloak](https://www.keycloak.org/downloads)
2. Khởi động Keycloak:

```bash
cd keycloak-x.x.x
bin/kc.sh start-dev