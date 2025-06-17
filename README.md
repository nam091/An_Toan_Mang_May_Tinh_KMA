# Hệ thống Quản lý Điểm - Khoa An toàn thông tin KMA

[cite_start]Đây là một dự án quản lý điểm cho sinh viên Học viện Kỹ thuật Mật mã (KMA), được phát triển với mục đích học tập và nghiên cứu về an toàn mạng. 

## Công nghệ sử dụng

Dự án được xây dựng theo kiến trúc full-stack bao gồm:

* [cite_start]**Frontend:** 
    * Framework: **React** (với TypeScript)
    * Routing: **React Router**
    * UI: **shadcn/ui** và **Tailwind CSS**
    * Build tool: **Vite**
* [cite_start]**Backend:** 
    * Framework: **NestJS**
    * Cơ sở dữ liệu: **PostgreSQL**
    * ORM: **TypeORM**
* [cite_start]**Xác thực & Phân quyền (IAM):** 
    * **Keycloak** (OpenID Connect/OAuth 2.0)

## Cấu trúc dự án

Dự án được tổ chức theo dạng monorepo:

* `/`: Thư mục gốc chứa mã nguồn Frontend (React).
* `/score-backend`: Thư mục chứa mã nguồn Backend (NestJS).

## Hướng dẫn cài đặt và chạy dự án

### Yêu cầu

* [Node.js](https://nodejs.org/) (phiên bản >= 20.11)
* [Docker](https://www.docker.com/) và [Docker Compose](https://docs.docker.com/compose/)

### 1. Cài đặt Keycloak và PostgreSQL

[cite_start]Chúng tôi khuyến khích sử dụng Docker để khởi tạo Keycloak và PostgreSQL một cách nhanh chóng. 

Tạo một file `docker-compose.yml` ở thư mục gốc của dự án với nội dung sau:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: kma_postgres_db
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: password # Đổi mật khẩu này trong môi trường production
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - kma-network

  keycloak:
    image: quay.io/keycloak/keycloak:24.0.4
    container_name: kma_keycloak
    command: start-dev
    environment:
      KC_DB: postgres
      KC_DB_URL_HOST: postgres
      KC_DB_URL_DATABASE: keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: password # Phải trùng với mật khẩu ở trên
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    networks:
      - kma-network

networks:
  kma-network:
    driver: bridge

volumes:
  postgres_data: