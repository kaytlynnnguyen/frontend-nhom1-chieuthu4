import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Thêm Link để chuyển sang trang đăng ký

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Khai báo điều hướng

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Gửi yêu cầu đăng nhập đến Backend
      const response = await axios.post('https://backend-nhom1-chieuthu4-1.onrender.com/api/auth/login', { 
        email, 
        password 
      });

      // 2. Lấy Token và thông tin User từ phản hồi của Server
      const { token, user } = response.data;

      // 3. Cất vào localStorage để dùng cho các lần sau
      localStorage.setItem('token', token);
      localStorage.setItem('userName', user.name); // Lưu tên để hiển thị ở trang Home

      alert('Đăng nhập thành công!');

      // 4. Chuyển hướng về trang chủ ngay lập tức
      navigate('/'); 
      
    } catch (error) {
      // Hiển thị lỗi từ server (ví dụ: "Thông tin đăng nhập không chính xác")
      alert('Lỗi: ' + (error.response?.data?.msg || 'Không thể đăng nhập'));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Đăng Nhập Cửa Hàng Hoa</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br/>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <br/>
        <div>
          <label>Mật khẩu:</label><br/>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <br/>
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Đăng nhập
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
      </p>
    </div>
  );
};

export default Login;
