import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Account from './components/Account/Account'; // Nhớ tạo file Account.js trong thư mục components

function App() {
  return (
    <Router>
      <div className="App">
        {/* --- PHẦN HEADER DÙNG CHUNG --- */}
        <header style={headerStyle}>
          <div className="logo" style={logoStyle}>
            <span style={{ color: '#e91e63' }}>F4</span> FLORA
          </div>
          
          {/* Component Account xử lý việc Hover hiện Đăng nhập/Đăng ký */}
          <Account />
        </header>

        {/* --- NỘI DUNG CÁC TRANG --- */}
        <div className="content" style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Style nhanh cho Header chuyên nghiệp hơn
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 50px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  cursor: 'pointer'
};

export default App;