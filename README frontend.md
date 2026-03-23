FRONT END
1. Hướng dẫn chạy dự án (Getting Started)
Phần này giúp thành viên mới biết cách cài đặt để code chạy được trên máy họ.

Lệnh cài đặt: npm install

Lệnh chạy: npm start


2.Nếu trang nào cần bắt đăng nhập mới cho xem, hãy bọc nó trong <ProtectedRoute>.

vd : <ProtectedRoute>
        {/* <Cart /> */} 
        <div>Đây là trang Giỏ hàng (Cần Login)</div>
      </ProtectedRoute>

3.Để lấy tên user hiển thị: localStorage.getItem('userName').

4.Để lấy Token gửi lên Server: localStorage.getItem('token')."