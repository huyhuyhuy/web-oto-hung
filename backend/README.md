# VinFast Backend - Strapi CMS

Backend API cho website bán xe VinFast, được xây dựng với Strapi v4.

## Content Types

Sau khi chạy Strapi, bạn cần tạo các Content Types sau trong Admin Panel:

### 1. Car (Collection Type)
- name (Text, Required)
- slug (UID, Required, Target field: name)
- price (Number, Required)
- description (Text, Long text)
- specifications (Text, Long text)
- color (Text)
- featured (Boolean, Default: false)
- images (Media, Multiple files)

### 2. Test Drive (Collection Type)
- name (Text, Required)
- phone (Text, Required)
- address (Text, Required)
- notes (Text, Long text)
- car (Relation: Many-to-One with Car)

### 3. Comment (Collection Type)
- name (Text, Required)
- content (Text, Long text, Required)
- car (Relation: Many-to-One with Car)

### 4. Gallery (Collection Type)
- title (Text, Required)
- description (Text)
- image (Media, Single file, Required)

## Cài đặt

```bash
cd backend
npm install
npm run develop
```

## Cấu hình

1. Tạo file `.env` từ `.env.example`
2. Đổi các giá trị secret keys
3. Chạy `npm run develop`
4. Truy cập http://localhost:1337/admin
5. Tạo admin account
6. Tạo các Content Types như hướng dẫn ở trên
7. Vào Settings > Users & Permissions > Roles > Public
8. Enable các permissions:
   - Car: find, findOne
   - Comment: find, create
   - Test-drive: create
   - Gallery: find

## Deploy lên Railway

Xem file GUIDE.md ở thư mục gốc để biết chi tiết.
