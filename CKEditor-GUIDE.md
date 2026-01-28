# 📝 CKEditor Integration Guide

Hướng dẫn tích hợp CKEditor vào Strapi để tạo nội dung chi tiết phong phú cho xe.

---

## 🎯 Mục Tiêu

### Trước (Hiện tại):
```
Chi tiết xe:
- Tên: VF 8
- Giá: 999.000.000 VNĐ
- Mô tả: 1 đoạn text đơn giản
- Thông số: Bullet points đơn giản
- Ảnh: Gallery ảnh
```

### Sau (Với CKEditor):
```
Chi tiết xe:
- Tên: VF 8
- Giá: 999.000.000 VNĐ
- NỘI DUNG CHI TIẾT (CKEditor):
  ✅ Nhiều section: Tổng quan, Ngoại thất, Nội thất, Công nghệ...
  ✅ Ảnh nhúng với caption
  ✅ Bảng so sánh thông số
  ✅ Video nhúng (YouTube)
  ✅ Định dạng đẹp: tiêu đề, màu sắc, highlight...
  ✅ Layout linh hoạt
```

---

## 📦 BƯỚC 1: Setup Rich Text Editor

### ⚠️ Lưu Ý Quan Trọng:

Plugin CKEditor mới nhất chỉ hỗ trợ Strapi 5, nhưng project này dùng Strapi 4.
**→ Chúng ta sẽ dùng Rich Text Editor có sẵn trong Strapi 4** (vẫn rất mạnh!)

### ✅ Không Cần Cài Gì Thêm!

Strapi 4 đã có sẵn Rich Text Editor với đầy đủ tính năng:
- ✅ Bold, Italic, Underline, Strikethrough
- ✅ Headings (H1, H2, H3, H4, H5, H6)
- ✅ Lists (Bullet, Numbered)
- ✅ Links
- ✅ Quotes
- ✅ Code blocks
- ✅ Images (chèn từ Media Library)
- ✅ Markdown support

### Backend Đã Sẵn Sàng!

Backend đang chạy tại **http://localhost:1337** → Không cần restart!

---

## 🛠️ BƯỚC 2: Thêm Field Rich Text vào Content Type "Car"

### A. Vào Admin Panel

Mở trình duyệt: **http://localhost:1337/admin**

### B. Vào Content-Type Builder

1. Click **Content-Type Builder** (menu bên trái)
2. Click vào **Car** (trong Collection Types)
3. Click nút **"Add another field"**

### C. Chọn Rich Text

1. Chọn type: **Rich text** block
2. Name: `detailedContent`
3. Click **Continue**

### D. Cài đặt Field

**Tab ADVANCED SETTINGS:**
- **Default value:** Để trống
- **Regex pattern:** Không cần
- **Private field:** ❌ Không tích

Click **Finish** → Click **Save**

**Strapi sẽ tự động restart** (đợi 20-30 giây)

---

## ✅ BƯỚC 3: Cấu hình Permissions

Sau khi Strapi restart:

1. Click **Settings** (menu trái, icon bánh răng)
2. Click **Users & Permissions Plugin** → **Roles**
3. Click **Public**
4. Scroll xuống phần **Car**
5. Đảm bảo đã tích:
   - ✅ find
   - ✅ findOne
6. Click **Save**

---

## 📝 BƯỚC 4: Tạo Nội dung Chi Tiết cho Xe

### A. Vào Content Manager

1. Click **Content Manager** (menu trái)
2. Click **Car**
3. Chọn 1 xe đã có (VD: VF 8) hoặc tạo mới

### B. Điền Nội dung với Rich Text Editor

Scroll xuống field **"Detailed Content"** → Bạn sẽ thấy editor Markdown/Rich Text!

#### Ví dụ Nội dung:

```
[Heading 1] TỔNG QUAN VF 8

VF 8 là mẫu xe điện SUV 5 chỗ cao cấp của VinFast, kết hợp hoàn hảo 
giữa thiết kế hiện đại, công nghệ thông minh và khả năng vận hành mạnh mẽ.

[Heading 2] 🚗 Ngoại Thất Sang Trọng

[Chèn ảnh ngoại thất]

- Thiết kế khí động học
- Đèn LED ma trận thông minh
- La-zăng 20 inch đa chấu
- Kính trời toàn cảnh Panorama

[Heading 2] 🏠 Nội Thất Tiện Nghi

[Chèn ảnh nội thất]

Không gian nội thất rộng rãi với chất liệu cao cấp:
- Ghế da Nappa cao cấp
- Màn hình trung tâm 15.6 inch
- Hệ thống âm thanh 13 loa
- Sạc không dây chuẩn Qi

[Heading 2] ⚡ Thông Số Kỹ Thuật

[Tạo bảng]
+---------------------------+-------------------+
| Thông số                  | Giá trị          |
+---------------------------+-------------------+
| Động cơ                   | 2 mô-tơ điện AWD |
| Công suất                 | 300 kW (402 HP)  |
| Mô-men xoắn               | 620 Nm           |
| Pin                       | 87.7 kWh         |
| Tầm di chuyển (WLTP)      | 447 km           |
| Sạc nhanh DC              | 0-80% trong 31'  |
| Tốc độ tối đa             | 200 km/h         |
| 0-100 km/h                | 5.5 giây         |
+---------------------------+-------------------+

[Heading 2] 🛡️ An Toàn & Công Nghệ

VF 8 được trang bị hệ thống an toàn chủ động ADAS tiên tiến:

1. Cảnh báo va chạm phía trước (FCW)
2. Phanh khẩn cấp tự động (AEB)
3. Cảnh báo điểm mù (BSW)
4. Hỗ trợ giữ làn đường (LKA)
5. Kiểm soát hành trình thích ứng (ACC)
6. 11 túi khí

[Heading 2] 🎬 Video Giới Thiệu

[Nhúng YouTube video]

[Heading 2] 💰 Chính Sách Bán Hàng

✅ Bảo hành: 10 năm / 200,000 km
✅ Bảo dưỡng miễn phí: 5 năm
✅ Hỗ trợ trả góp: Lãi suất ưu đãi 0%
✅ Tặng bộ phụ kiện cao cấp
✅ Đăng ký lái thử miễn phí tại nhà
```

### C. Các Tính Năng Rich Text Editor

#### 📝 Định dạng Text (Markdown):
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`Code inline`
```

#### 🎯 Headings:
```markdown
# Heading 1
## Heading 2
### Heading 3
```

#### 📋 Lists:
```markdown
- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2
```

#### 🖼️ Chèn Hình Ảnh:
```markdown
![Alt text](image-url)
```
Hoặc click icon "Image" trên toolbar → Chọn từ Media Library

#### 🔗 Link:
```markdown
[Text hiển thị](https://example.com)
```

#### 💬 Quote:
```markdown
> Đây là quote
```

#### 💻 Code Block:
```markdown
​```javascript
const hello = "world";
​```
```

#### 🎥 Video (HTML):
Chuyển sang tab "Rich text" (nếu có), paste HTML:
```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

### D. Lưu và Publish

1. Click **Save** (góc trên bên phải)
2. Click **Publish**

---
---

## 🎨 BƯỚC 6: Tạo Nội Dung Mẫu

### Template Nội Dung Xe:

```
[H1] TỔNG QUAN {TÊN XE}

{Mô tả ngắn gọn về xe - 2-3 câu}

[H2] 🚗 Ngoại Thất

[Chèn 2-3 ảnh ngoại thất]

{Mô tả thiết kế ngoại thất}

Điểm nổi bật:
- Đặc điểm 1
- Đặc điểm 2
- Đặc điểm 3

[H2] 🏠 Nội Thất

[Chèn 2-3 ảnh nội thất]

{Mô tả không gian nội thất}

Tiện nghi:
- Tiện nghi 1
- Tiện nghi 2
- Tiện nghi 3

[H2] ⚡ Thông Số Kỹ Thuật

[Tạo bảng thông số]

[H2] 🛡️ An Toàn

[Liệt kê các tính năng an toàn]

[H2] 💰 Chính Sách

[Thông tin bảo hành, bảo dưỡng, ưu đãi]
```

---

## ✅ Checklist

### Cài đặt:
- [ ] Đã cài `@_sh/strapi-plugin-ckeditor`
- [ ] Đã tạo file `backend/config/plugins.js`
- [ ] Backend restart thành công

### Strapi Admin:
- [ ] Đã thêm field `detailedContent` vào Car
- [ ] Đã cấu hình permissions cho Public role
- [ ] Đã tạo nội dung chi tiết cho ít nhất 1 xe

### Frontend:
- [ ] Đã update `lib/api.ts` (thêm detailedContent)
- [ ] Đã update `app/xe/[slug]/page.tsx`
- [ ] Đã thêm CSS styling
- [ ] Website hiển thị đúng nội dung rich text

---

## 🚀 Workflow Thêm Xe Mới

Từ giờ khi thêm xe mới:

1. **Content Manager** → **Car** → **Create new entry**
2. Điền thông tin cơ bản:
   - name: "VF 5 Plus"
   - price: 468000000
   - description: (mô tả ngắn cho card)
   - Upload ảnh chính
3. Scroll xuống **"Detailed Content"**
4. Dùng CKEditor tạo nội dung chi tiết phong phú:
   - Heading structure
   - Nhiều ảnh với caption
   - Bảng thông số
   - Lists, highlights
   - Video (nếu có)
5. **Save** → **Publish**

---

## 🆘 Troubleshooting

### ❌ Rich Text field không hiển thị đúng

**Giải pháp:**
1. Clear cache backend: Xóa folder `backend/.cache`
2. Restart backend: `npm run develop`
3. Hard refresh trình duyệt: Ctrl+Shift+R
4. Kiểm tra đã chọn đúng type "Rich text" khi tạo field

### ❌ Ảnh trong CKEditor không hiển thị

**Giải pháp:**
1. Kiểm tra ảnh đã upload vào Strapi Media Library
2. Dùng URL đầy đủ: `http://localhost:1337/uploads/...`
3. Check CORS settings trong `backend/config/middlewares.js`

### ❌ Frontend không hiển thị nội dung

**Giải pháp:**
1. Check API có trả `detailedContent` không: `http://localhost:1337/api/cars?populate=*`
2. Check permissions: Public role có quyền `find` và `findOne`
3. Check console browser có lỗi không

---

## 📚 Tài Liệu Tham Khảo

- **CKEditor 5 Docs:** https://ckeditor.com/docs/ckeditor5/latest/
- **Strapi Plugin:** https://github.com/nshenderov/strapi-plugin-ckeditor
- **TailwindCSS Prose:** https://tailwindcss.com/docs/typography-plugin

---

**Made with ❤️ for Hùng Nguyễn - V I N F A S T**
