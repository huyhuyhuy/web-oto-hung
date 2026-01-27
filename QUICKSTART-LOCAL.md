# ⚡ QUICKSTART - Chạy Local Nhanh

Hướng dẫn siêu ngắn gọn để chạy website trên máy tính của bạn.

---

## 🛠 Bước 1: Cài Đặt Công Cụ Cần Thiết

### A. Cài Node.js
1. Vào: https://nodejs.org/
2. Tải bản **LTS** (bên trái, có chữ "Recommended")
3. Chạy file cài đặt → Next → Next → Install
4. **Restart máy tính**

### B. Kiểm Tra Đã Cài Xong Chưa
Mở **PowerShell** (tìm trong Start Menu), gõ:

```powershell
node -v
```

Nếu hiện `v18.x.x` hoặc `v20.x.x` → OK ✅

---

## 🚀 Bước 2: Chạy Backend (Strapi)

### A. Mở PowerShell trong thư mục backend

**Cách 1:** 
- Mở File Explorer → Vào thư mục `D:\DEV_TOOL\web_oto_hung\backend`
- Giữ **Shift**, click chuột phải vào vùng trống
- Chọn "Open PowerShell window here"

**Cách 2:**
```powershell
cd D:\DEV_TOOL\web_oto_hung\backend
```

### B. Cài đặt và chạy

```powershell
# Cài packages (chỉ chạy 1 lần đầu tiên, mất 2-3 phút)
npm install

# Tạo file cấu hình
copy .env.example .env

# Chạy Strapi (mất 1-2 phút lần đầu)
npm run develop
```

**Đợi** đến khi thấy:
```
Server started on: http://localhost:1337
```

### C. Tạo Tài Khoản Admin

1. Trình duyệt tự động mở: http://localhost:1337/admin
2. Nếu không tự mở, tự copy link vào Chrome
3. Điền thông tin:
   - **Username:** admin (hoặc tên bạn thích)
   - **Email:** email của bạn
   - **Password:** mật khẩu (ít nhất 8 ký tự)
4. Click **Create Account**

### D. Tạo Content Types (Cấu trúc dữ liệu)

Đây là bước **QUAN TRỌNG NHẤT**. Bạn cần tạo 4 loại dữ liệu:

#### 1️⃣ Tạo "Car" (Xe)

1. Click **Content-Type Builder** (menu bên trái)
2. Click **Create new collection type**
3. Display name: `Car` → Click **Continue**
4. Thêm từng field (nhấn **Add another field** sau mỗi field):

| Bước | Chọn Type | Name | Cài Đặt |
|------|-----------|------|---------|
| 1 | **Text** | `name` | Required ✓ |
| 2 | **UID** | `slug` | Attached field: name |
| 3 | **Number** | `price` | Required ✓, Number format: integer |
| 4 | **Text** | `description` | Long text |
| 5 | **Text** | `specifications` | Long text |
| 6 | **Text** | `color` | Short text |
| 7 | **Boolean** | `featured` | Default value: false |
| 8 | **Media** | `images` | Multiple files ✓ |

5. Click **Save** → Click **Finish**

#### 2️⃣ Tạo "Test Drive" (Đăng ký lái thử)

1. Click **Create new collection type**
2. Display name: `Test Drive` → **Continue**
3. Thêm fields:

| Type | Name | Cài Đặt |
|------|------|---------|
| **Text** | `name` | Required ✓ |
| **Text** | `phone` | Required ✓ |
| **Text** | `address` | Required ✓ |
| **Text** | `notes` | Long text |
| **Relation** | `car` | Car (many-to-one) |

4. **Save** → **Finish**

#### 3️⃣ Tạo "Comment" (Bình luận)

1. **Create new collection type**
2. Display name: `Comment` → **Continue**
3. Thêm fields:

| Type | Name | Cài Đặt |
|------|------|---------|
| **Text** | `name` | Required ✓ |
| **Text** | `content` | Required ✓, Long text |
| **Relation** | `car` | Car (many-to-one) |

4. **Save** → **Finish**

#### 4️⃣ Tạo "Gallery" (Ảnh bàn giao)

1. **Create new collection type**
2. Display name: `Gallery` → **Continue**
3. Thêm fields:

| Type | Name | Cài Đặt |
|------|------|---------|
| **Text** | `title` | Required ✓ |
| **Text** | `description` | Short text |
| **Media** | `image` | Required ✓, Single file |

4. **Save** → **Finish**

### E. Cấu Hình Quyền Truy Cập

**Quan trọng:** Để website truy cập được dữ liệu!

1. Click **Settings** (menu bên trái, icon bánh răng)
2. Click **Users & Permissions Plugin** → **Roles**
3. Click vào **Public**
4. Scroll xuống, tích chọn:

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

5. Click **Save** (góc trên bên phải)

**✅ XONG BACKEND!** Giữ nguyên cửa sổ PowerShell này (đừng tắt).

---

## 🌐 Bước 3: Chạy Frontend (Website)

### A. Mở PowerShell Mới

**Quan trọng:** Mở cửa sổ PowerShell **MỚI** (giữ nguyên cái cũ đang chạy backend)

### B. Vào thư mục frontend

```powershell
cd D:\DEV_TOOL\web_oto_hung\frontend
```

### C. Cài đặt và chạy

```powershell
# Cài packages (2-3 phút)
npm install

# Tạo file cấu hình
copy .env.local.example .env.local

# Chạy website
npm run dev
```

**Đợi** đến khi thấy:
```
Local: http://localhost:3000
```

---

## 🎉 Bước 4: Xem Website

Mở Chrome, vào: **http://localhost:3000**

**Lưu ý:** Lúc này website trống vì chưa có dữ liệu. Tiếp tục bước 5!

---

## 📝 Bước 5: Thêm Dữ Liệu Mẫu

### A. Vào Trang Quản Trị

Vào: **http://localhost:1337/admin**

### B. Thêm Xe

1. Click **Content Manager** (menu bên trái)
2. Click **Car**
3. Click nút **Create new entry** (góc trên)
4. Điền thông tin:

**Ví dụ xe VF 8:**
```
name: VF 8
slug: vf-8 (tự động)
price: 999000000
description: 
  Xe điện VinFast VF 8, 5 chỗ, công nghệ hiện đại, 
  an toàn, thân thiện môi trường.

specifications:
  - Động cơ: 2 mô-tơ điện
  - Công suất: 402 HP
  - Pin: 87.7 kWh
  - Tầm di chuyển: 447 km
  - Sạc nhanh: 0-80% trong 31 phút

color: Đỏ, Xanh, Trắng, Đen
featured: ✓ (tích chọn)
images: Upload ảnh xe (tải từ Google Images: "VinFast VF 8")
```

5. Click **Save** (góc trên)
6. Click **Publish** (góc trên)

**Lặp lại** để thêm thêm xe khác:
- VF 9 (giá: 1290000000)
- VF e34 (giá: 690000000)
- VF 5 Plus (giá: 468000000)

### C. Thêm Gallery (Ảnh Bàn Giao)

1. **Content Manager** → **Gallery**
2. Click **Create new entry**
3. Điền:
   - **title:** Bàn giao xe VF 8 cho anh Tuấn
   - **description:** Hà Nội, tháng 1/2026
   - **image:** Upload ảnh (có thể dùng ảnh mẫu từ Google)
4. **Save** → **Publish**

Thêm 5-10 ảnh để website đẹp hơn.

### D. Thêm Bình Luận Mẫu

1. **Content Manager** → **Comment**
2. **Create new entry**
3. Điền:
   - **name:** Nguyễn Văn A
   - **content:** Xe rất đẹp, tư vấn nhiệt tình. Đã mua VF 8 và rất hài lòng!
4. **Save** → **Publish**

Thêm 5-10 bình luận để website có vẻ uy tín hơn.

---

## ✅ Bước 6: Kiểm Tra Website

Vào lại: **http://localhost:3000**

**Test các chức năng:**
- ✅ Xem danh sách xe
- ✅ Click vào xe → Xem chi tiết
- ✅ Thử đăng ký lái thử (điền form)
- ✅ Thử bình luận
- ✅ Xem gallery

Sau khi đăng ký lái thử, vào **Admin** → **Test Drive** để xem danh sách!

---

## 🔧 Sửa Thông Tin Liên Hệ (Zalo, Facebook)

### Bước 1: Mở VS Code

1. Tải VS Code: https://code.visualstudio.com/
2. Mở thư mục `D:\DEV_TOOL\web_oto_hung`

### Bước 2: Sửa File Header

Mở file: `frontend/components/Header.tsx`

Tìm và sửa các dòng:

```tsx
// Dòng 31: Sửa số Zalo
href="https://zalo.me/0123456789"  // Thay số của bạn

// Dòng 38: Sửa link Facebook
href="https://facebook.com/vinfasthung"  // Thay link page của bạn
```

### Bước 3: Sửa File Footer

Mở file: `frontend/components/Footer.tsx`

Tìm và sửa:

```tsx
// Dòng 52: Số điện thoại
<li>📞 Hotline: 0123 456 789</li>  // Thay số của bạn

// Dòng 53: Email
<li>📧 Email: hung@vinfast.vn</li>  // Thay email của bạn

// Dòng 54: Địa chỉ
<li>📍 Địa chỉ: Hà Nội, Việt Nam</li>  // Thay địa chỉ của bạn

// Dòng 62-65: Link Zalo
href="https://zalo.me/0123456789"  // Thay số của bạn

// Dòng 71-74: Link Facebook
href="https://facebook.com/vinfasthung"  // Thay link của bạn
```

**Sau khi sửa xong:**
- Lưu file (Ctrl+S)
- Website tự động reload (không cần restart)

---

## 🛑 Tắt Website (Khi Xong)

Khi muốn tắt website:

1. Vào cửa sổ PowerShell đang chạy
2. Nhấn **Ctrl+C**
3. Làm cho cả 2 cửa sổ (backend và frontend)

**Chạy lại lần sau:**
```powershell
# Terminal 1: Backend
cd D:\DEV_TOOL\web_oto_hung\backend
npm run develop

# Terminal 2: Frontend
cd D:\DEV_TOOL\web_oto_hung\frontend
npm run dev
```

---

## ❓ Lỗi Thường Gặp

### ❌ "npm is not recognized"
→ Chưa cài Node.js hoặc chưa restart máy sau khi cài

**Giải pháp:** Restart máy, mở PowerShell mới

### ❌ "Port 1337 is already in use"
→ Strapi đã chạy rồi

**Giải pháp:** Tắt terminal cũ hoặc restart máy

### ❌ "Port 3000 is already in use"
→ Frontend đã chạy rồi

**Giải pháp:** Tắt terminal cũ

### ❌ Website hiện "Cannot connect to API"
→ Backend chưa chạy hoặc chưa cấu hình permissions

**Giải pháp:** 
1. Kiểm tra backend có chạy không (vào http://localhost:1337)
2. Kiểm tra lại phần "Cấu Hình Quyền Truy Cập"

### ❌ Không thấy xe trên website
→ Chưa thêm dữ liệu hoặc chưa Publish

**Giải pháp:**
1. Vào Admin → Car
2. Kiểm tra xe đã **Publish** chưa (không phải Draft)

---

## 📋 Checklist

- [ ] Đã cài Node.js
- [ ] Backend chạy được (localhost:1337)
- [ ] Đã tạo admin account
- [ ] Đã tạo đủ 4 Content Types (Car, Test Drive, Comment, Gallery)
- [ ] Đã cấu hình Permissions
- [ ] Frontend chạy được (localhost:3000)
- [ ] Đã thêm ít nhất 3 xe
- [ ] Đã thêm ít nhất 5 ảnh gallery
- [ ] Đã thử đăng ký lái thử
- [ ] Đã thử bình luận
- [ ] Đã sửa thông tin liên hệ (Zalo, FB, SĐT)

---

## 🚀 Sau Khi Chạy Local OK

Khi website chạy tốt ở local, bạn có thể:

1. **Deploy lên internet** - Xem file `GUIDE.md` phần 5
2. **Tùy chỉnh giao diện** - Sửa màu sắc, font chữ
3. **Thêm nhiều dữ liệu** - Xe, ảnh, bình luận

---

**Chúc bạn thành công! 🎉**

Nếu có lỗi, đọc phần "Lỗi Thường Gặp" hoặc xem file `GUIDE.md` để biết thêm chi tiết.
