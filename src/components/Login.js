import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gửi email và password lên server
      const response = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });

      // Nếu đúng, server trả về token. Ta cất vào "ví" localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      alert('Đăng nhập thành công! Thẻ JWT đã được lưu.');
      // Sau đây bạn có thể dùng window.location.href = '/' để về trang chủ
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || 'Không thể đăng nhập'));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Đăng Nhập Cửa Hàng Hoa</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <br/>
        <div>
          <label>Mật khẩu:</label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <br/>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;