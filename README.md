# Sunset Chill Café Đà Lạt — Next.js Framework

Website chính thức của **Sunset Chill Café** (123 Hoàng Diệu, P.5, TP. Đà Lạt), được xây dựng lại trên nền tảng **Next.js 16 (App Router)** với hiệu suất cao, chuẩn SEO và tương thích tối đa với **Google Search Console**.

---

## 🚀 Các Tính Năng Đã Chuyển Đổi & Nâng Cấp

1. **Giữ nguyên 100% nội dung & cấu trúc SEO**:
   - Trang chủ (`/`)
   - Giới thiệu (`/gioi-thieu`)
   - Món nổi bật (`/mon-noi-bat`)
   - Thực đơn (`/menu`)
   - Không gian (`/khong-gian`)
   - Đặt bàn trực tuyến (`/dat-ban`)
   - Địa chỉ & bản đồ (`/dia-chi`)
   - Cẩm nang (`/blog`) cùng toàn bộ 10 bài viết SEO chuyên sâu (`/blog/[slug]`).
2. **Hệ thống giỏ hàng & Đặt bàn phản ứng tức thì (React Context)**:
   - Lưu trữ an toàn trong `localStorage` (dữ liệu giỏ hàng và thông tin đặt bàn của khách được duy trì).
   - Drawer giỏ món và Drawer thông tin bàn đặt hoạt động mượt mà.
   - Form Đặt bàn & Đặt trước món uống kiểm tra dữ liệu và lưu biên nhận trực tiếp.
3. **Chuẩn hóa SEO & Tương thích Google Search Console (GSC)**:
   - Tự động sinh `sitemap.xml` chuẩn XML chuẩn quốc tế (`app/sitemap.ts` + `public/sitemap.xml`).
   - Cấu hình `robots.txt` (`app/robots.ts` + `public/robots.txt`).
   - Tích hợp sẵn file xác minh Google Search Console (`googlebd48b11684e0e217.html`) và thẻ `<meta name="google-site-verification" ... />`.
   - Cấu hình Rewrites hỗ trợ các link đuôi `.html` cũ (Google không bao giờ bị lỗi 404 khi vào link cũ).

---

## 📍 HƯỚNG DẪN NẠP SITEMAP TRÊN GOOGLE SEARCH CONSOLE

### 1. Chuẩn bị URL chính xác
File `sitemap.xml` của bạn được cấu hình tự động nhận diện theo biến môi trường `NEXT_PUBLIC_SITE_URL` (mặc định trong `.env.local` là `https://minhhuy26.github.io/sunsetchillcoffee`).

> **Lưu ý quan trọng**: Nếu bạn triển khai trên tên miền riêng (ví dụ: `https://sunsetchill.cafe` hoặc Vercel `https://sunsetchillcoffee.vercel.app`), hãy mở file `.env.local` và sửa:
> ```env
> NEXT_PUBLIC_SITE_URL=https://tên-miền-của-bạn.com
> ```
> Sau đó chạy `npm run build` để sitemap tự động cập nhật domain mới.

---

### 2. Các bước nạp Sitemap trên Google Search Console

1. **Truy cập Google Search Console**:
   - Mở [https://search.google.com/search-console/](https://search.google.com/search-console/).
2. **Chọn đúng Thuộc tính (Property)**:
   - Hãy chắc chắn bạn đang chọn đúng thuộc tính website đã thêm (ví dụ `https://minhhuy26.github.io/sunsetchillcoffee/` hoặc domain của bạn).
3. **Xác minh quyền sở hữu (nếu chưa xác minh)**:
   - Google Search Console cung cấp file xác minh: `googlebd48b11684e0e217.html` hoặc Thẻ HTML (HTML tag).
   - Cả 2 phương thức này **đều đã được tích hợp sẵn** trong thư mục `public/` và file layout của website. Bạn chỉ cần bấm nút **"Xác minh" (Verify)** trên GSC là thành công 100%.
4. **Gửi Sơ đồ trang web (Sitemap)**:
   - Ở thanh menu bên trái, chọn mục **"Sơ đồ trang web" (Sitemaps)** (dưới phần Lập chỉ mục / Indexing).
   - Trong ô **"Thêm sơ đồ trang web mới" (Add a new sitemap)**, bạn sẽ thấy tiền tố URL website của bạn đã hiển thị sẵn (ví dụ: `https://minhhuy26.github.io/sunsetchillcoffee/`).
   - Tại ô nhập liệu phía sau dấu gạch chéo `/`, bạn chỉ cần gõ đúng chữ:
     ```
     sitemap.xml
     ```
   - Bấm nút **Gửi (Submit)**.

---

### ⚠️ Lưu Ý Tránh Các Lỗi Thường Gặp Khi Nạp Sitemap:

- **Lỗi "Không thể tìm nạp" (Couldn't fetch)**:
  - *Nguyên nhân 1*: Gõ lặp lại toàn bộ URL trong ô nhập (ví dụ gõ `https://domain.com/sitemap.xml` thay vì chỉ gõ `sitemap.xml`).
  - *Nguyên nhân 2*: Trang web vừa deploy chưa có hiệu lực trên internet. Hãy mở thử URL `https://your-domain/sitemap.xml` trên trình duyệt xem file XML có tải lên được hay không.
  - *Nguyên nhân 3*: Đôi khi Google Search Console hiển thị trạng thái *"Không thể tìm nạp"* tạm thời trong 1 vài phút đầu do bot Google chưa kịp ping. Bạn chỉ cần chờ vài giờ hoặc bấm vào sitemap kiểm tra lại, trạng thái sẽ chuyển sang màu xanh: **"Thành công" (Success)**.
- **Lỗi "URL không được phép" (URL not allowed)**:
  - Xảy ra khi domain trong thuộc tính GSC không trùng với domain khai báo trong thẻ `<loc>` của sitemap. Hãy kiểm tra biến `NEXT_PUBLIC_SITE_URL` để đảm bảo đồng nhất.

---

## 🛠️ CÁC LỆNH CHẠY DỰ ÁN

```bash
# 1. Chạy môi trường phát triển (Development)
npm run dev

# 2. Xây dựng bản phát hành sản phẩm (Build Production)
npm run build

# 3. Khởi động server production
npm run start
```

---

## 📂 Cấu trúc thư mục

```
├── .env.example              # Mẫu cấu hình môi trường
├── .env.local                # Cấu hình domain hiện tại
├── next.config.mjs           # Cấu hình Next.js & Rewrites cho URL cũ
├── package.json              # Khai báo dependencies & scripts
├── public/
│   ├── favicon.svg           # Icon website
│   ├── googlebd48b11684e0e217.html # File xác minh Google Search Console
│   ├── robots.txt            # File chỉ dẫn cho bot tìm kiếm
│   └── sitemap.xml           # Sơ đồ trang web tĩnh
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Layout chung (Metadata, Schema JSON-LD, GA4)
│   │   ├── page.tsx          # Trang chủ
│   │   ├── sitemap.ts        # Next.js Metadata Route tự động sinh sitemap
│   │   ├── robots.ts         # Next.js Metadata Route tự động sinh robots
│   │   ├── gioi-thieu/page.tsx
│   │   ├── mon-noi-bat/page.tsx
│   │   ├── menu/page.tsx
│   │   ├── khong-gian/page.tsx
│   │   ├── dat-ban/page.tsx  # Trang đặt bàn tương tác
│   │   ├── dia-chi/page.tsx
│   │   ├── cam-nang/page.tsx # Chuyển hướng về /blog
│   │   └── blog/
│   │       ├── page.tsx      # Danh sách chuyên mục cẩm nang
│   │       └── [slug]/page.tsx # 10 bài viết chi tiết chuẩn SEO (SSG)
│   ├── components/
│   │   ├── Header.tsx        # Thanh điều hướng, giỏ hàng, bàn đặt
│   │   ├── Footer.tsx        # Chân trang đầy đủ liên kết & mạng xã hội
│   │   ├── CartDrawer.tsx    # Ngăn kéo giỏ hàng & xem bàn đặt
│   │   ├── PreorderModal.tsx # Popup đặt bàn & đặt trước món
│   │   ├── Toast.tsx         # Thông báo nổi
│   │   ├── MobileQuickActions.tsx # Thanh gọi & đặt bàn nhanh mobile
│   │   └── BackToTop.tsx     # Nút cuộn lên đầu trang
│   ├── context/
│   │   └── CartBookingContext.tsx # Quản lý trạng thái toàn cục
│   └── data/
│       └── blogPosts.ts      # Dữ liệu 10 bài viết cẩm nang
└── legacy_backup/            # Bản sao lưu toàn bộ code tĩnh ban đầu
```
