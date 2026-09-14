# Website Văn Miếu - Quốc Tử Giám

Đây là cấu trúc website tĩnh chuẩn để có thể chạy local hoặc publish lên hosting tĩnh.

## Cấu trúc

- `index.html`: trang chính, đặt ở thư mục gốc.
- `assets/css/styles.css`: toàn bộ CSS.
- `assets/js/app.js`: toàn bộ JavaScript.
- `assets/fonts/`: font Be Vietnam Pro dùng nội bộ, không phụ thuộc Google Fonts.
- `assets/images/rooms/`: ảnh đại diện từng phòng.
- `assets/video/`: video nền sảnh bảo tàng.

## Cách xem trên máy

Có thể mở trực tiếp `index.html`. Để mô phỏng môi trường website thật, nên chạy qua local server:

```bash
python -m http.server 8000
```

Sau đó mở `http://localhost:8000`.

## Cách publish

Upload toàn bộ **nội dung bên trong thư mục này** lên web hosting, giữ nguyên cấu trúc thư mục. Hosting phải phục vụ `index.html` tại thư mục gốc. Cấu trúc này phù hợp với GitHub Pages, Netlify, Vercel static hosting và các hosting cPanel thông thường.

## Quy tắc thêm tài nguyên

- Ảnh: đặt trong `assets/images/` hoặc thư mục con tương ứng.
- Video: đặt trong `assets/video/`.
- Font: đặt trong `assets/fonts/` và khai báo bằng `@font-face` trong CSS.
- Không đổi tên/move file mà không đồng thời cập nhật đường dẫn trong HTML/CSS/JS.
