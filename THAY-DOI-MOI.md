# 🔄 TÓM TẮT THAY ĐỔI MỚI

## 🎯 TỔNG QUAN

Đã thay đổi toàn bộ cấu trúc website từ **"Đăng ký lái thử"** → **"Nhận báo giá xe"** với layout mới theo mẫu.

---

## 📋 DANH SÁCH THAY ĐỔI

### 1. **DATABASE (Strapi)**

#### Bảng Car - MỚI (11 trường):
1. ✅ `category` (Text) - Phân loại xe
2. ✅ `name` (Text) - Tên xe
3. ✅ `slug` (UID) - Auto từ name
4. ✅ `priceFrom` (Number) - Giá chỉ từ (hiển thị trang chủ)
5. ✅ `shortPromo` (Long Text) - Ưu đãi ngắn
6. ✅ `images` (Media - Multiple) - Ảnh xe
7. ✅ `price` (Number) - Giá bán
8. ✅ `originalPrice` (Number) - Giá gốc
9. ✅ `discount` (Number) - Số tiền khuyến mại
10. ✅ `detailedPromo` (Rich text/Markdown) - Ưu đãi chi tiết
11. ✅ `detailedContent` (Rich text/Markdown) - Nội dung chi tiết

#### Đổi tên: Test Drive → Price Quote
- Collection name: `price-quote` (API: `/api/price-quotes`)
- Fields giữ nguyên: name, phone, address, notes, car (relation)

---

### 2. **FRONTEND - FILES THAY ĐỔI**

#### ✅ `frontend/lib/api.ts`
- Cập nhật interface `Car` với 11 fields mới
- Đổi `TestDrive` → `PriceQuote`
- Thêm function `getCarsByCategory(category: string)`
- Đổi `createTestDrive` → `createPriceQuote`

#### ✅ `frontend/components/PriceQuoteForm.tsx` (NEW)
- Component mới thay thế `TestDriveForm`
- Tiêu đề: "Nhận báo giá xe"
- Thông báo: "Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ báo giá sớm nhất."

#### ✅ `frontend/components/CarCard.tsx`
- Hiển thị `priceFrom` thay vì `price`
- Hiển thị `shortPromo` (màu đỏ)
- Nút "Xem chi tiết" thay vì link text
- Hover effect đẹp hơn

#### ✅ `frontend/app/page.tsx` (Trang chủ)
- Đổi `getCars()` → `getCarsByCategory('Các dòng xe VinFast')`
- Hero: Đổi "Đăng ký lái thử" → "Xem bảng giá xe" + "Liên hệ ngay"
- CTA: Đổi "Đăng ký lái thử" → "Gọi ngay / Chat Zalo"
- Tiêu đề section: "Các Dòng Xe VinFast"

#### ✅ `frontend/app/xe/[slug]/page.tsx` (Trang chi tiết)
**Layout hoàn toàn mới:**

**Header:**
- Background đen với tên xe + "2026"

**Main Content (Grid 2:1):**

**Left (2 cột):**
- Ảnh lớn (400-500px height)
- Gallery thumbnail 4 ảnh nhỏ (có border, hover effect)

**Right (1 cột):**
- Rating 5 sao + social share buttons
- **GIÁ BÁN** (đỏ, lớn)
- **GIÁ GỐC** (gạch ngang)
- **KHUYẾN MÃI** (đỏ)
- **ƯU ĐÃI CHI TIẾT** (box vàng, markdown render với icons 👉)
- **Form NHẬN BÁO GIÁ XE** (background đen, hotline lớn)

**Chi Tiết Section:**
- Header đen "CHI TIẾT"
- Content box trắng với markdown render đầy đủ

**Comments:** Giữ nguyên

---

### 3. **FILES MỚI**

1. ✅ `CAP-NHAT-DATABASE-MOI.md` - Hướng dẫn cập nhật Strapi
2. ✅ `frontend/components/PriceQuoteForm.tsx` - Form mới
3. ✅ `THAY-DOI-MOI.md` - File này (tóm tắt)

---

## 🚀 CẦN LÀM ĐỂ HOÀN TẤT

### **Bước 1: Cập Nhật Strapi**

📖 **Xem chi tiết:** `CAP-NHAT-DATABASE-MOI.md`

```bash
# 1. Vào Strapi Admin
http://localhost:1337/admin

# 2. Xóa Content Type "Car" cũ
Content-Type Builder → Car → Delete

# 3. Xóa Content Type "Test Drive"  
Content-Type Builder → Test Drive → Delete

# 4. Tạo "Car" mới với 11 fields (theo hướng dẫn)
# 5. Tạo "Price Quote" mới (thay Test Drive)
# 6. Cấu hình Permissions (Public: find, findOne, create)
```

### **Bước 2: Thêm Dữ Liệu Mẫu**

```bash
# Vào Content Manager → Car → Create new entry

category: Các dòng xe VinFast
name: VinFast VF3
slug: vf-3 (auto)
priceFrom: 278000000
shortPromo: Giảm tiền mặt + phụ kiện cực hót khi liên hệ
images: [Upload ảnh]
price: 281060000
originalPrice: 299000000
discount: 17940000
detailedPromo: [Copy từ ví dụ trong hướng dẫn]
detailedContent: [Copy từ VF8-MARKDOWN-TEMPLATE.md]

→ Save → Publish
```

### **Bước 3: Restart Frontend**

```powershell
# Dừng frontend (Ctrl+C)
# Khởi động lại
cd D:\DEV_TOOL\web_oto_hung\frontend
npm run dev
```

### **Bước 4: Test**

1. **Trang chủ:** http://localhost:3000
   - Kiểm tra hiển thị xe theo category
   - Kiểm tra CarCard mới (priceFrom, shortPromo)
   
2. **Trang chi tiết:** http://localhost:3000/xe/vf-3
   - Kiểm tra layout mới (ảnh + giá + form)
   - Kiểm tra hiển thị giá bán, giá gốc, khuyến mại
   - Kiểm tra ưu đãi chi tiết (box vàng)
   - Kiểm tra form "Nhận báo giá xe"

3. **Submit form:**
   - Điền form → Nhận báo giá ngay
   - Kiểm tra toast thông báo: "Gửi yêu cầu thành công!"
   - Vào Strapi Admin → Price Quote → Kiểm tra dữ liệu

---

## 📊 SO SÁNH TRƯỚC/SAU

### **❌ TRƯỚC:**
- Tên: "Đăng ký lái thử"
- Trang chủ: Hiển thị tất cả xe, không phân loại
- CarCard: Hiển thị price, description
- Trang chi tiết: Hero + Gallery + Content + Form riêng
- Form: "Đăng ký lái thử miễn phí"

### **✅ SAU:**
- Tên: "Nhận báo giá xe"
- Trang chủ: Hiển thị xe theo category "Các dòng xe VinFast"
- CarCard: Hiển thị priceFrom, shortPromo
- Trang chi tiết: Layout mới 2 cột (Ảnh + Giá/Form)
- Giá: Hiển thị đầy đủ (Giá bán, Giá gốc, Khuyến mại)
- Ưu đãi chi tiết: Box vàng với markdown render
- Form: "NHẬN BÁO GIÁ XE" (embedded bên phải)

---

## ⚠️ LƯU Ý QUAN TRỌNG

### **1. Số Điện Thoại:**
Thay đổi số điện thoại trong:
- `frontend/components/PriceQuoteForm.tsx` (dòng ~122)
- `frontend/components/FloatingContact.tsx`
- `frontend/components/Footer.tsx`
- `frontend/app/page.tsx` (CTA section)
- `frontend/app/xe/[slug]/page.tsx` (Form section, dòng ~150)

**Tìm:** `0123456789` hoặc `0387332698`  
**Thay bằng:** Số điện thoại của bạn

### **2. Link Zalo/Facebook:**
- `frontend/components/FloatingContact.tsx`
- `frontend/app/page.tsx` (CTA section)

### **3. Database:**
- Sau khi xóa Content Type cũ, **KHÔNG THỂ KHÔI PHỤC**
- Backup trước khi xóa (Export dữ liệu nếu cần)

### **4. API Endpoint:**
- Old: `/api/test-drives`
- New: `/api/price-quotes`
- Frontend đã cập nhật tự động

---

## 🛠️ TROUBLESHOOTING

### **❌ Lỗi: "Cannot find module PriceQuoteForm"**
→ File mới chưa được tạo, kiểm tra `frontend/components/PriceQuoteForm.tsx`

### **❌ API trả về 403 Forbidden**
→ Chưa cấu hình Permissions cho Price Quote  
→ Vào Settings → Roles → Public → Price Quote → Bật `create`

### **❌ Không thấy xe trên trang chủ**
→ Chưa có xe với `category = "Các dòng xe VinFast"`  
→ Vào Strapi → Car → Thêm xe với category đúng

### **❌ Trang chi tiết lỗi layout**
→ Restart frontend (`Ctrl+C` → `npm run dev`)  
→ Clear browser cache (Ctrl+Shift+R)

---

## ✅ CHECKLIST

- [ ] Đã backup dữ liệu cũ (nếu cần)
- [ ] Đã xóa Content Type "Car" cũ
- [ ] Đã xóa Content Type "Test Drive"
- [ ] Đã tạo Content Type "Car" mới với 11 fields
- [ ] Đã tạo Content Type "Price Quote"
- [ ] Đã cấu hình Permissions (find, findOne, create)
- [ ] Đã thêm ít nhất 1 xe mẫu (VF3)
- [ ] Đã restart frontend
- [ ] Đã test trang chủ → OK
- [ ] Đã test trang chi tiết → OK
- [ ] Đã test submit form → OK
- [ ] Đã đổi số điện thoại thành số của mình
- [ ] Đã đổi link Zalo/Facebook

---

## 🎉 HOÀN TẤT!

**Website đã được cập nhật hoàn toàn theo layout mới!**

📞 **Liên hệ:** Nếu cần hỗ trợ, xem lại file `CAP-NHAT-DATABASE-MOI.md`

---

**Good luck! 🚀**
