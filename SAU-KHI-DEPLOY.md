# 🌐 Sau Khi Deploy - Quản Lý Website

## ✅ TL;DR - Trả Lời Nhanh

**Câu hỏi:** Sau khi deploy lên internet, tôi chỉ cần vào trang quản trị để thêm/sửa/xóa phải không?

**Trả lời:** ✅ **ĐÚNG VẬY!** 

Sau khi deploy xong, bạn **KHÔNG CẦN** code nữa. Chỉ cần:
1. Vào trang quản trị (Admin Panel)
2. Thêm/sửa/xóa xe, ảnh, xem đơn đăng ký
3. Website tự động cập nhật!

---

## 📝 Workflow Sau Khi Deploy

### 🎯 Công Việc Hàng Ngày/Hàng Tuần

```
🔐 Đăng nhập Admin Panel
    ↓
📋 Chọn công việc muốn làm:
    │
    ├─→ 🚗 Thêm xe mới
    ├─→ ✏️ Sửa giá xe, thông số
    ├─→ 📸 Thêm ảnh bàn giao
    ├─→ 👀 Xem danh sách đăng ký lái thử
    ├─→ 💬 Quản lý bình luận
    └─→ 🗑️ Xóa xe hết hàng
```

---

## 🔧 Các Tác Vụ Quản Trị

### 1️⃣ Đăng Nhập Admin Panel

**URL:** `https://your-strapi-url.railway.app/admin`

Ví dụ: Nếu Railway cho bạn URL `https://vinfast-backend-production.up.railway.app`, thì vào:
```
https://vinfast-backend-production.up.railway.app/admin
```

**Đăng nhập** với tài khoản admin đã tạo.

---

### 2️⃣ Thêm Xe Mới

**Khi nào làm:** Có xe mới về, có khuyến mãi mới

**Các bước:**
1. Vào **Content Manager** → **Car**
2. Click **Create new entry**
3. Điền:
   - **name:** VF 6 (tên xe)
   - **price:** 699000000 (giá tiền)
   - **description:** Mô tả xe
   - **specifications:** Thông số kỹ thuật
   - **color:** Màu sắc có sẵn
   - **featured:** Tích ✓ nếu muốn hiện trang chủ
   - **images:** Upload ảnh (từ 3-8 ảnh)
4. Click **Save**
5. Click **Publish**

**✅ Xong!** Vào website sẽ thấy xe mới ngay lập tức!

---

### 3️⃣ Sửa Giá Xe / Thông Tin

**Khi nào làm:** Giá thay đổi, thông số cập nhật, thêm ảnh mới

**Các bước:**
1. **Content Manager** → **Car**
2. Click vào xe muốn sửa
3. Sửa bất kỳ thông tin nào:
   - Giá
   - Mô tả
   - Thêm/xóa ảnh
   - Đổi màu sắc
4. Click **Save**
5. Click **Publish** (nếu chưa publish)

**✅ Website tự động cập nhật!**

---

### 4️⃣ Xóa Xe (Hết Hàng)

**Khi nào làm:** Xe hết hàng, ngừng bán

**Cách 1: Xóa Hẳn**
1. **Content Manager** → **Car**
2. Click vào xe muốn xóa
3. Click nút **Delete** (góc trên, màu đỏ)
4. Confirm

**Cách 2: Unpublish (Giấu đi, không xóa hẳn)**
1. Click vào xe
2. Click **Unpublish**
3. Xe biến mất khỏi website nhưng vẫn còn trong database
4. Muốn hiển thị lại → Click **Publish**

---

### 5️⃣ Thêm Ảnh Bàn Giao Xe

**Khi nào làm:** Mỗi khi bàn giao xe cho khách

**Các bước:**
1. **Content Manager** → **Gallery**
2. Click **Create new entry**
3. Điền:
   - **title:** "Bàn giao VF 8 cho anh Tuấn"
   - **description:** "Hà Nội, 25/01/2026" (tùy chọn)
   - **image:** Upload ảnh chụp với khách
4. Click **Save** → **Publish**

**Mục đích:** Tăng uy tín, cho khách mới thấy bạn đã bán nhiều xe

---

### 6️⃣ Xem Danh Sách Đăng Ký Lái Thử

**Khi nào làm:** Hàng ngày để gọi cho khách

**Các bước:**
1. **Content Manager** → **Test Drive**
2. Xem danh sách:
   - Tên khách
   - Số điện thoại
   - Địa chỉ
   - Ghi chú
   - Xe muốn lái thử
   - Thời gian đăng ký

**Export Excel:**
1. Tick chọn các đơn cần export
2. Click nút **Export** (góc trên)
3. Chọn **CSV**
4. Mở bằng Excel để gọi cho khách

**Xóa đơn đã xử lý:**
- Click vào đơn → **Delete**

---

### 7️⃣ Quản Lý Bình Luận

**Khi nào làm:** Hàng ngày/tuần để kiểm tra spam

**Các bước:**
1. **Content Manager** → **Comment**
2. Xem danh sách bình luận
3. **Xóa spam:** Click vào bình luận → **Delete**
4. **Giữ lại** bình luận tốt để khách mới nhìn thấy

**Lưu ý:** Bình luận hiển thị ngay trên website khi khách gửi (không cần duyệt). Nếu muốn duyệt trước, cần code thêm.

---

### 8️⃣ Sửa Thông Tin Liên Hệ (Zalo, FB, SĐT)

**Khi nào làm:** Đổi số điện thoại, đổi link Zalo/Facebook

**⚠️ CẦN LÀM 1 LẦN, SAU ĐÓ KHÔNG CẦN NỮA**

**Các bước:**
1. Mở project bằng VS Code trên máy
2. Sửa file `frontend/components/Header.tsx`:
   ```tsx
   href="https://zalo.me/YOUR_NUMBER"  // Thay số của bạn
   href="https://facebook.com/YOUR_PAGE"  // Thay link page
   ```
3. Sửa file `frontend/components/Footer.tsx` tương tự
4. Push code lên GitHub
5. Vercel tự động deploy lại (2-3 phút)

**Hoặc thuê dev sửa 1 lần** nếu không muốn tự làm.

---

## 📊 Dashboard - Tổng Quan

Khi vào Admin Panel, bạn sẽ thấy:

```
📈 Dashboard
├─ 🚗 Xe:               12 xe
├─ 📝 Đơn lái thử:       8 đơn mới
├─ 💬 Bình luận:        25 bình luận
└─ 📸 Gallery:         15 ảnh
```

---

## ⏱️ Thời Gian Cập Nhật

| Tác vụ | Thời gian cập nhật trên website |
|--------|----------------------------------|
| Thêm/sửa/xóa xe | ⚡ Ngay lập tức (< 1 phút) |
| Thêm ảnh gallery | ⚡ Ngay lập tức |
| Sửa code (Header, Footer) | 🕐 2-3 phút (Vercel deploy) |

---

## 💡 Tips Quản Lý Hiệu Quả

### ✅ Nên Làm

1. **Check đơn lái thử mỗi ngày** - Gọi ngay cho khách (trong 24h)
2. **Thêm ảnh bàn giao thường xuyên** - Tăng uy tín
3. **Cập nhật giá khi có khuyến mãi** - Thu hút khách
4. **Xóa bình luận spam** - Giữ website sạch sẽ
5. **Đặt xe "Nổi bật"** - Xe bán chạy hoặc có ưu đãi

### ❌ Không Nên Làm

1. **Không xóa hết xe** - Website trống = mất khách
2. **Không để giá sai** - Mất uy tín
3. **Không để bình luận spam** - Trông không chuyên nghiệp
4. **Không để ảnh mờ/xấu** - Ảnh hưởng đến doanh số

---

## 🔐 Bảo Mật

### Mật Khẩu Admin

- ✅ Dùng mật khẩu mạnh (ít nhất 12 ký tự)
- ✅ Kết hợp chữ, số, ký tự đặc biệt
- ✅ Không chia sẻ cho người khác
- ✅ Đổi mật khẩu định kỳ (3-6 tháng)

### Backup Dữ Liệu

**Railway tự động backup database** hàng ngày. 

Nếu muốn backup thủ công:
1. Vào Railway Dashboard
2. Chọn PostgreSQL service
3. Chọn **Data** tab
4. Click **Export**

---

## 📱 Quản Lý Trên Di Động

Bạn **CÓ THỂ** quản lý website trên điện thoại:

1. Mở trình duyệt (Chrome, Safari)
2. Vào `https://your-strapi-url.railway.app/admin`
3. Đăng nhập
4. Thêm/sửa/xóa như bình thường

**Lưu ý:** Giao diện trên mobile hơi nhỏ, khuyên dùng máy tính để tiện hơn.

---

## ❓ Câu Hỏi Thường Gặp

### Q: Tôi có thể cho nhân viên vào quản lý không?

**A:** Có! 
1. Vào **Settings** → **Users & Permissions** → **Users**
2. Click **Add new user**
3. Chọn Role (Author, Editor, v.v.)
4. Gửi thông tin đăng nhập cho nhân viên

### Q: Làm sao biết có đơn mới?

**A:** 
- Vào Admin Panel mỗi ngày để check
- Hoặc setup email notification (cần code thêm)
- Hoặc dùng Zapier/Make.com để gửi thông báo vào Telegram/Zalo

### Q: Khách bình luận spam thì sao?

**A:** Vào **Content Manager** → **Comment** → Xóa bình luận đó

### Q: Muốn thêm video xe thì sao?

**A:** Upload video lên YouTube, sau đó:
- Vào Admin Panel → Sửa xe
- Thêm link YouTube vào phần **description** hoặc **specifications**
- Hoặc thuê dev thêm field "video" (30 phút code)

### Q: Muốn thêm tính năng so sánh xe?

**A:** Cần thuê dev code thêm (1-2 ngày làm việc)

### Q: Chi phí hàng tháng là bao nhiêu?

**A:** 
- Railway: $5-10/tháng
- Vercel: $0 (miễn phí)
- Domain: ~$1/tháng
- **TỔNG: $6-11/tháng**

---

## 🎯 Tóm Tắt

### ✅ Sau Khi Deploy, Bạn CHỈ CẦN:

1. **Vào Admin Panel hàng ngày**
2. **Check đơn lái thử → Gọi cho khách**
3. **Thêm xe mới khi có hàng**
4. **Cập nhật giá khi thay đổi**
5. **Thêm ảnh bàn giao sau mỗi lần bán xe**
6. **Xóa bình luận spam (nếu có)**

### ❌ KHÔNG CẦN:

- ❌ Code nữa
- ❌ Vào server
- ❌ Biết Git/GitHub (trừ khi sửa thông tin liên hệ)
- ❌ Setup lại

---

## 📞 Khi Nào Cần Thuê Dev?

Chỉ khi muốn:
- ✏️ Sửa giao diện (màu sắc, layout)
- ➕ Thêm tính năng mới (so sánh xe, chat, v.v.)
- 🐛 Fix lỗi
- 🔧 Sửa thông tin liên hệ (nếu không tự làm được)

**Chi phí:** ~$10-30/giờ tùy dev

---

**Chúc bạn kinh doanh thành công! 🚗💰**
