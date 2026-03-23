import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName'); // Lấy tên đã lưu lúc Login
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear(); // Xóa sạch "ví" (token và tên)
    navigate('/login');
  };

  if (!token) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Bạn chưa đăng nhập!</h2>
        <button onClick={() => navigate('/login')}>Đi đến trang Đăng nhập</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chào mừng {userName} đến với Shop Hoa 🌸</h1>
      <p>Đây là trang chủ dành cho thành viên.</p>
      <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>
        Đăng xuất
      </button>
    </div>
  );
};

export default Home;