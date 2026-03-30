import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Cần cài: npm install react-icons
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="account-wrapper">
      {/* Phần hiển thị bên ngoài */}
      <div className="account-trigger">
        <FaUserCircle size={25} />
        <span>{token ? userName : "Tài khoản"}</span>
      </div>

      {/* Phần Menu ẩn, chỉ hiện khi Hover */}
      <div className="account-dropdown">
        {token ? (
          <div className="dropdown-box">
            <p>Chào, <b>{userName}</b></p>
            <hr />
            <Link to="/" className="menu-link">Trang chủ</Link>
            <div className="menu-link logout" onClick={handleLogout}>Đăng xuất</div>
          </div>
        ) : (
          <div className="dropdown-box">
            <p style={{ fontSize: '13px', color: '#666' }}>Chào mừng bạn!</p>
            <button className="btn-auth login" onClick={() => navigate('/login')}>Đăng nhập</button>
            <button className="btn-auth register" onClick={() => navigate('/register')}>Đăng ký</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;