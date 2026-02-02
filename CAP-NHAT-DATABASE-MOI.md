# 🔄 CẬP NHẬT DATABASE MỚI

## 🎯 THAY ĐỔI

### 1. **Đổi tên: "Đăng ký lái thử" → "Nhận báo giá xe"**
### 2. **Cấu trúc bảng Car mới (11 trường)**

---

## 📋 BƯỚC 1: XÓA DỮ LIỆU CŨ (QUAN TRỌNG!)

⚠️ **Backup trước khi xóa!**

### Xóa Content Type "Car" Cũ:

1. Vào **http://localhost:1337/admin**
2. **Content-Type Builder** → Click **Car**
3. Click nút **⋮** (3 chấm) → **Delete**
4. Xác nhận xóa

### Xóa Content Type "Test Drive":

1. **Content-Type Builder** → Click **Test Drive**
2. Click **⋮** → **Delete**
3. Xác nhận xóa

---

## 🚀 BƯỚC 2: TẠO CONTENT TYPE MỚI

### A. Tạo "Car" (Xe) - MỚI

1. **Content-Type Builder** → **Create new collection type**
2. **Display name**: `Car`
3. Click **Continue**

### Thêm 11 Fields:

#### **Field 1: Phân loại** (category)
- **Type**: Text
- **Name**: `category`
- **Advanced Settings**:
  - ✅ Required field

#### **Field 2: Tên xe** (name)
- **Type**: Text
- **Name**: `name`
- **Advanced Settings**:
  - ✅ Required field

#### **Field 3: Slug** (auto)
- **Type**: UID
- **Name**: `slug`
- **Attached field**: `name`
- **Advanced Settings**:
  - ✅ Required field

#### **Field 4: Giá chỉ từ** (priceFrom)
- **Type**: Number
- **Name**: `priceFrom`
- **Number format**: integer
- **Advanced Settings**:
  - ✅ Required field

#### **Field 5: Ưu đãi ngắn** (shortPromo)
- **Type**: Text (long text)
- **Name**: `shortPromo`
- **Advanced Settings**:
  - ⬜ Required field (không bắt buộc)

#### **Field 6: Ảnh** (images)
- **Type**: Media
- **Name**: `images`
- **Type**: Multiple media
- **Advanced Settings**:
  - ✅ Required field

#### **Field 7: Giá bán** (price)
- **Type**: Number
- **Name**: `price`
- **Number format**: integer
- **Advanced Settings**:
  - ✅ Required field

#### **Field 8: Giá gốc** (originalPrice)
- **Type**: Number
- **Name**: `originalPrice`
- **Number format**: integer
- **Advanced Settings**:
  - ⬜ Required field (không bắt buộc)

#### **Field 9: Khuyến mại** (discount)
- **Type**: Number
- **Name**: `discount`
- **Number format**: integer
- **Advanced Settings**:
  - ⬜ Required field (không bắt buộc)

#### **Field 10: Ưu đãi chi tiết** (detailedPromo)
- **Type**: Rich text (Markdown)
- **Name**: `detailedPromo`
- **Advanced Settings**:
  - ⬜ Required field (không bắt buộc)

#### **Field 11: Chi tiết** (detailedContent)
- **Type**: Rich text (Markdown)
- **Name**: `detailedContent`
- **Advanced Settings**:
  - ⬜ Required field (không bắt buộc)

4. Click **Save** → **Server sẽ restart**

---

### B. Đổi tên "Test Drive" → "Price Quote" (Báo giá)

1. **Content-Type Builder** → **Create new collection type**
2. **Display name**: `Price Quote`
3. Click **Continue**

#### Thêm Fields:

**Field 1: Họ tên**
- **Type**: Text
- **Name**: `name`
- ✅ Required

**Field 2: Số điện thoại**
- **Type**: Text
- **Name**: `phone`
- ✅ Required

**Field 3: Địa chỉ**
- **Type**: Text
- **Name**: `address`
- ✅ Required

**Field 4: Ghi chú**
- **Type**: Text (long text)
- **Name**: `notes`

**Field 5: Relation với Car**
- **Type**: Relation
- **Name**: `car`
- **Relation**: Car has many Price Quotes

4. Click **Save** → **Server restart**

---

## 🔓 BƯỚC 3: CẤU HÌNH PERMISSIONS

### Cho "Car":

1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. **Permissions** → **Car**:
   - ✅ `find` (xem danh sách)
   - ✅ `findOne` (xem chi tiết)
3. Click **Save**

### Cho "Price Quote":

1. **Permissions** → **Price Quote**:
   - ✅ `create` (tạo báo giá)
2. Click **Save**

### Cho "Comment" & "Gallery" (giữ nguyên):

1. **Comment**:
   - ✅ `find`
   - ✅ `create`
2. **Gallery**:
   - ✅ `find`
3. Click **Save**

---

## 📝 BƯỚC 4: THÊM DỮ LIỆU MẪU

### Thêm xe VF3:

1. **Content Manager** → **Car** → **Create new entry**

2. Điền thông tin:
   - **category**: `Các dòng xe VinFast`
   - **name**: `VinFast VF3`
   - **slug**: `vf-3` (tự động)
   - **priceFrom**: `278000000`
   - **shortPromo**: `Giảm tiền mặt + phụ kiện cực hót khi liên hệ`
   - **images**: Upload ảnh xe
   - **price**: `281060000`
   - **originalPrice**: `299000000`
   - **discount**: `17940000`
   - **detailedPromo**:
```markdown
SỐC: VF3 CHỈ 45 TRIỆU, THỜI GIAN VAY 96 THÁNG - MIỄN PHÍ SẠC ĐẾN 2027, SỞ HỮU NGAY!

Đặc biệt nhiều ưu đãi cho bác tài thời điểm này như:

👉 Trả góp hàng tháng chỉ từ 4 triệu/tháng, cam kết bao đậu hồ sơ vay

👉 Tặng 2 Năm Bảo Hiểm Thân Vỏ

👉 HT Giảm Lãi Suất 3% Cố Định 3 Năm

👉 Tích 6.000.000 VNĐ vào app VinClub

👉 VF3 - Xe điện thông minh, quãng đường 210km, bảo hành pin 8 năm!

👉 Tặng bộ phụ kiện chính hãng VinFast trị giá 20 triệu: thảm lót sàn, camera hành trình,...

* Chỉ 50 suất đầu tiên, "Nhận thêm quà khi đặt cọc hôm nay"

**MIỄN THUẾ 100% THUẾ TRƯỚC BẠ**

**ĐIỀU CHỈNH MỨC GIÁ NIÊM YẾT MỚI: ƯU ĐÃI GIẢM 6% GIÁ XE**
```

   - **detailedContent**: Copy từ file `VF8-MARKDOWN-TEMPLATE.md` và chỉnh sửa

3. Click **Save** → **Publish**

---

## ✅ BƯỚC 5: KIỂM TRA

### Test API:

Mở trình duyệt, vào:

```
http://localhost:1337/api/cars?populate=*
```

**Kết quả mong đợi:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "category": "Các dòng xe VinFast",
        "name": "VinFast VF3",
        "slug": "vf-3",
        "priceFrom": 278000000,
        "shortPromo": "Giảm tiền mặt + phụ kiện...",
        "price": 281060000,
        "originalPrice": 299000000,
        "discount": 17940000,
        "detailedPromo": "...",
        "detailedContent": "...",
        "images": {
          "data": [...]
        }
      }
    }
  ]
}
```

---

## 🎯 HOÀN TẤT!

Giờ database đã sẵn sàng. Tiếp theo:
1. Cập nhật code frontend (file `lib/api.ts`, components...)
2. Test trên web

---

## 📞 HỖ TRỢ

Nếu gặp lỗi:
- Kiểm tra server đã restart chưa
- Kiểm tra Permissions đã bật chưa
- Xem terminal có báo lỗi không

**Quan trọng:** Sau khi tạo xong, **KHÔNG XÓA** các field cũ nếu chưa backup!
