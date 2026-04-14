import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
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
      {/* ICON + TÊN */}
      <div className="account-trigger">
        <FaUserCircle size={25} />
        <span>{token ? userName : "Tài khoản"}</span>
      </div>

      {/* DROPDOWN */}
      <div className="account-dropdown">
        {token ? (
          <div className="dropdown-box">
            <p>Chào, <b>{userName}</b></p>
            <hr />

            {/* 👇 THÊM ĐỔI MẬT KHẨU Ở ĐÂY */}
            <Link to="/change-password" className="menu-link">
              🔐 Đổi mật khẩu
            </Link>

            {/* LOGOUT */}
            <div className="menu-link logout" onClick={handleLogout}>
              Đăng xuất
            </div>
          </div>
        ) : (
          <div className="dropdown-box">
            <p style={{ fontSize: '13px', color: '#666' }}>Chào mừng bạn!</p>
            <button className="btn-auth login" onClick={() => navigate('/login')}>
              Đăng nhập
            </button>
            <button className="btn-auth register" onClick={() => navigate('/register')}>
              Đăng ký
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;