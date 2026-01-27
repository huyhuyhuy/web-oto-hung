# 🚗 Hướng Dẫn Setup Website VinFast - Dành Cho Người Mới

## 📋 Mục Lục
1. [Chuẩn Bị](#1-chuẩn-bị)
2. [Setup Backend (Strapi)](#2-setup-backend-strapi)
3. [Setup Frontend (Next.js)](#3-setup-frontend-nextjs)
4. [Thêm Dữ Liệu Mẫu](#4-thêm-dữ-liệu-mẫu)
5. [Deploy Lên Internet](#5-deploy-lên-internet)
6. [Quản Lý Website](#6-quản-lý-website)

---

## 1. Chuẩn Bị

### ✅ Cần cài đặt trước:

1. **Node.js** (phiên bản 18 hoặc 20)
   - Tải tại: https://nodejs.org/
   - Chọn bản LTS (Long Term Support)
   - Sau khi cài, mở PowerShell và gõ `node -v` để kiểm tra

2. **Git** (để quản lý code)
   - Tải tại: https://git-scm.com/
   - Sau khi cài, gõ `git --version` để kiểm tra

3. **Code Editor** (khuyên dùng VS Code)
   - Tải tại: https://code.visualstudio.com/

---

## 2. Setup Backend (Strapi)

### Bước 1: Cài đặt Strapi

```bash
# Mở PowerShell, di chuyển vào thư mục backend
cd D:\DEV_TOOL\web_oto_hung\backend

# Cài đặt packages
npm install

# Tạo file .env (copy từ file mẫu)
copy .env.example .env
```

### Bước 2: Chạy Strapi

```bash
npm run develop
```

**Chú ý:** Lần đầu chạy sẽ mất 1-2 phút. Đợi đến khi thấy:
```
Server started on: http://localhost:1337
```

### Bước 3: Tạo Admin Account

1. Trình duyệt tự động mở: http://localhost:1337/admin
2. Điền thông tin admin của bạn:
   - Username: `admin` (hoặc tên bạn thích)
   - Email: email của bạn
   - Password: mật khẩu mạnh (ít nhất 8 ký tự)
3. Click **Create Account**

### Bước 4: Tạo Content Types (Cấu trúc dữ liệu)

Bây giờ bạn cần tạo 4 loại dữ liệu:

#### 📌 A. Tạo "Car" (Xe)

1. Vào **Content-Type Builder** (menu bên trái)
2. Click **Create new collection type**
3. Display name: `Car`
4. Click **Continue**
5. Thêm các fields (nhấn **Add another field** sau mỗi field):

| Field Type | Name | Options |
|------------|------|---------|
| Text | name | Required ✓, Short text |
| UID | slug | Attached field: name |
| Number | price | Required ✓, Number format: integer |
| Text | description | Long text |
| Text | specifications | Long text |
| Text | color | Short text |
| Boolean | featured | Default value: false |
| Media | images | Multiple files ✓ |

6. Click **Save** → Click **Finish**

#### 📌 B. Tạo "Test Drive" (Đăng ký lái thử)

1. Click **Create new collection type**
2. Display name: `Test Drive`
3. Thêm fields:

| Field Type | Name | Options |
|------------|------|---------|
| Text | name | Required ✓, Short text |
| Text | phone | Required ✓, Short text |
| Text | address | Required ✓, Short text |
| Text | notes | Long text |
| Relation | car | Car (many-to-one) |

4. Click **Save** → **Finish**

#### 📌 C. Tạo "Comment" (Bình luận)

1. Click **Create new collection type**
2. Display name: `Comment`
3. Thêm fields:

| Field Type | Name | Options |
|------------|------|---------|
| Text | name | Required ✓, Short text |
| Text | content | Required ✓, Long text |
| Relation | car | Car (many-to-one) |

4. Click **Save** → **Finish**

#### 📌 D. Tạo "Gallery" (Ảnh bàn giao)

1. Click **Create new collection type**
2. Display name: `Gallery`
3. Thêm fields:

| Field Type | Name | Options |
|------------|------|---------|
| Text | title | Required ✓, Short text |
| Text | description | Short text |
| Media | image | Required ✓, Single file |

4. Click **Save** → **Finish**

### Bước 5: Cấu Hình Permissions (Cho phép truy cập)

1. Vào **Settings** (menu bên trái)
2. Click **Users & Permissions Plugin** → **Roles**
3. Click vào **Public**
4. Scroll xuống, tích chọn các permissions sau:

**Car:**
- ✅ find
- ✅ findOne

**Comment:**
- ✅ find
- ✅ create

**Test-drive:**
- ✅ create

**Gallery:**
- ✅ find

5. Click **Save** ở góc trên

**✅ Xong phần Backend!** Giữ nguyên terminal này đang chạy.

---

## 3. Setup Frontend (Next.js)

### Bước 1: Mở Terminal Mới

Mở PowerShell mới (giữ nguyên terminal backend đang chạy)

```bash
# Di chuyển vào thư mục frontend
cd D:\DEV_TOOL\web_oto_hung\frontend

# Cài đặt packages
npm install

# Tạo file .env.local
copy .env.local.example .env.local
```

### Bước 2: Cấu Hình Environment

Mở file `frontend/.env.local` và sửa:

```
NEXT_PUBLIC_API_URL=http://localhost:1337
```

**Chú ý:** Sau này khi deploy, bạn sẽ thay `http://localhost:1337` bằng URL của Strapi trên Railway.

### Bước 3: Chạy Frontend

```bash
npm run dev
```

Đợi đến khi thấy:
```
Local: http://localhost:3000
```

### Bước 4: Xem Website

Mở trình duyệt: http://localhost:3000

**🎉 Bạn đã có website chạy local!**

---

## 4. Thêm Dữ Liệu Mẫu

### Bước 1: Thêm Xe

1. Vào http://localhost:1337/admin
2. Click **Content Manager** → **Car**
3. Click **Create new entry**
4. Điền thông tin:
   - **name**: VF 8
   - **slug**: vf-8 (tự động tạo)
   - **price**: 999000000
   - **description**: Xe điện VinFast VF 8, 5 chỗ, công nghệ hiện đại
   - **specifications**: 
     ```
     - Động cơ: 2 mô-tơ điện
     - Công suất: 402 HP
     - Pin: 87.7 kWh
     - Tầm di chuyển: 447 km
     ```
   - **color**: Đỏ, Xanh, Trắng
   - **featured**: ✓ (tích chọn)
   - **images**: Upload ảnh xe (tải ảnh VinFast từ Google)

5. Click **Save** → Click **Publish**

**Lặp lại** để thêm các xe khác: VF 9, VF e34, VF 5...

### Bước 2: Thêm Gallery (Ảnh bàn giao)

1. Vào **Content Manager** → **Gallery**
2. Click **Create new entry**
3. Điền:
   - **title**: Bàn giao xe VF 8 cho anh Tuấn
   - **description**: Hà Nội, tháng 1/2026
   - **image**: Upload ảnh (có thể dùng ảnh mẫu trước)
4. Click **Save** → **Publish**

Thêm khoảng 5-10 ảnh để website đẹp hơn.

### Bước 3: Kiểm Tra Website

Vào http://localhost:3000 và xem:
- Trang chủ hiển thị xe
- Click vào xe để xem chi tiết
- Thử đăng ký lái thử
- Thử bình luận

---

## 5. Deploy Lên Internet

### A. Deploy Backend (Strapi) lên Railway

#### Bước 1: Đăng ký Railway

1. Vào: https://railway.app/
2. Click **Login** → Chọn **GitHub**
3. Đăng ký tài khoản GitHub nếu chưa có
4. Cho phép Railway truy cập GitHub

#### Bước 2: Tạo Project

1. Click **New Project**
2. Chọn **Deploy from GitHub repo**
3. Click **Configure GitHub App** → Chọn repository
4. Hoặc chọn **Empty Project** rồi deploy sau

#### Bước 3: Setup Database

1. Click **Add Service** → **Database** → **PostgreSQL**
2. Đợi database khởi tạo (1-2 phút)

#### Bước 4: Deploy Strapi

1. Click **New** → **GitHub Repo**
2. Chọn repository `web_oto_hung`
3. Chọn thư mục: `backend`
4. Vào **Variables** tab, thêm:

```
NODE_VERSION=18
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}
APP_KEYS=random-string-1,random-string-2
API_TOKEN_SALT=random-string-3
ADMIN_JWT_SECRET=random-string-4
TRANSFER_TOKEN_SALT=random-string-5
JWT_SECRET=random-string-6
```

**Lưu ý:** Thay `random-string-x` bằng chuỗi ngẫu nhiên dài. Có thể generate tại: https://generate-secret.vercel.app/32

5. Click **Deploy**
6. Đợi 5-10 phút
7. Khi deploy xong, copy URL (dạng: `https://xxx.railway.app`)

#### Bước 5: Tạo Admin Account trên Production

1. Vào URL Railway của bạn + `/admin`: `https://xxx.railway.app/admin`
2. Tạo admin account mới
3. Tạo lại Content Types y hệt như local (hoặc copy database)
4. Cấu hình Permissions giống local

### B. Deploy Frontend (Next.js) lên Vercel

#### Bước 1: Đăng ký Vercel

1. Vào: https://vercel.com/
2. Click **Sign Up** → Chọn **GitHub**

#### Bước 2: Import Project

1. Click **Add New** → **Project**
2. Chọn repository `web_oto_hung`
3. **Root Directory**: chọn `frontend`
4. **Framework Preset**: Next.js (tự động nhận)

#### Bước 3: Cấu Hình Environment Variables

Trong phần **Environment Variables**, thêm:

```
NEXT_PUBLIC_API_URL=https://xxx.railway.app
```

**Thay `xxx.railway.app`** bằng URL Railway của bạn.

#### Bước 4: Deploy

1. Click **Deploy**
2. Đợi 3-5 phút
3. Khi xong, Vercel sẽ cho bạn URL (dạng: `https://vinfast-xxx.vercel.app`)

#### Bước 5: Cập Nhật CORS trong Strapi

1. Vào Railway → Strapi project → **Variables**
2. Thêm biến:
```
FRONTEND_URL=https://vinfast-xxx.vercel.app
```
3. Sửa file `backend/config/middlewares.js` (trên GitHub):
```js
origin: ['http://localhost:3000', process.env.FRONTEND_URL],
```
4. Push code lên GitHub → Railway tự deploy lại

**🎉 WEBSITE CỦA BẠN ĐÃ LÊN INTERNET!**

---

## 6. Quản Lý Website

### Thêm/Sửa/Xóa Xe

1. Vào: `https://your-railway-url.railway.app/admin`
2. Đăng nhập
3. **Content Manager** → **Car**
4. Click **Create new entry** hoặc click vào xe để sửa
5. Upload ảnh, sửa giá, thông tin
6. Click **Save** → **Publish**

### Xem Đăng Ký Lái Thử

1. **Content Manager** → **Test Drive**
2. Xem danh sách khách đăng ký
3. Export CSV: Click **Export** ở góc trên

### Quản Lý Bình Luận

1. **Content Manager** → **Comment**
2. Xóa spam nếu có

### Thêm Ảnh Gallery

1. **Content Manager** → **Gallery**
2. Click **Create new entry**
3. Upload ảnh, điền title
4. **Save** → **Publish**

### Sửa Thông Tin Liên Hệ

Sửa file `frontend/components/Header.tsx` và `frontend/components/Footer.tsx`:

```tsx
// Thay đổi các dòng:
href="https://zalo.me/YOUR_ZALO_NUMBER"  // Thay số Zalo của bạn
href="https://facebook.com/YOUR_FB_PAGE"  // Thay link Facebook
href="tel:0123456789"  // Thay số điện thoại
```

Sau khi sửa, push lên GitHub → Vercel tự deploy lại (2-3 phút).

---

## 💰 Chi Phí Hàng Tháng

| Dịch vụ | Giá |
|---------|-----|
| **Railway** (Strapi + PostgreSQL) | $5-10/tháng |
| **Vercel** (Frontend) | $0 (miễn phí) |
| **Domain** (.vn) | ~$10/năm (~$1/tháng) |
| **TỔNG** | **~$6-11/tháng** |

---

## ❓ Troubleshooting

### Lỗi "npm not found"
→ Chưa cài Node.js hoặc chưa restart PowerShell sau khi cài

### Lỗi "Port 1337 already in use"
→ Strapi đang chạy rồi, tắt terminal cũ đi

### Lỗi "Cannot connect to backend"
→ Kiểm tra URL trong `.env.local` có đúng không

### Lỗi CORS khi deploy
→ Kiểm tra `backend/config/middlewares.js` có thêm domain frontend chưa

### Ảnh không hiển thị
→ Kiểm tra `next.config.js` có thêm domain Railway vào `remotePatterns` chưa

---

## 📞 Hỗ Trợ

Nếu gặp lỗi khó hiểu:
1. Chụp màn hình lỗi
2. Google lỗi đó + "strapi" hoặc "nextjs"
3. Hỏi trên Stack Overflow hoặc Strapi Community

---

## 🎯 Checklist Hoàn Thành

- [ ] Đã cài Node.js, Git
- [ ] Backend chạy được ở local (localhost:1337)
- [ ] Frontend chạy được ở local (localhost:3000)
- [ ] Đã tạo đủ 4 Content Types
- [ ] Đã thêm ít nhất 3 xe mẫu
- [ ] Deploy backend lên Railway thành công
- [ ] Deploy frontend lên Vercel thành công
- [ ] Website live trên internet
- [ ] Đã thử đăng ký lái thử, bình luận

**Chúc mừng! Bạn đã có một website bán xe chuyên nghiệp! 🚗✨**
