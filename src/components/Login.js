import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE } from '../apiConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);

      const displayName = [user.firstName, user.lastName]
        .filter(Boolean)
        .join(' ')
        .trim();

      localStorage.setItem('userName', displayName || user.email || '');

      const userEmail = user.email ? user.email.toLowerCase() : '';
      const userRole = user.role ? user.role.toLowerCase() : '';

      if (userRole === 'admin' || userEmail === 'adminf4@gmail.com') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        localStorage.setItem('isAdmin', 'false');
        navigate('/');
      }

    } catch (error) {
      const message =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Không thể đăng nhập';

      console.error('Login error:', error.response?.data || error);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Đăng Nhập Cửa Hàng Hoa</h2>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div style={groupStyle}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* PASSWORD */}
          <div style={groupStyle}>
            <label>Mật khẩu:</label>

            <div style={passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={passwordInput}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={eyeStyle}
              >
                {showPassword ? '🙈' : '👁'}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={btnStyle}
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* ERROR */}
        {error && <div style={errorStyle}>{error}</div>}

        {/* REGISTER */}
        <p style={registerStyle}>
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};

/* ===== STYLE FIX CHUẨN ===== */

const wrapperStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f5f5f5'
};

const containerStyle = {
  width: '400px',
  padding: '30px',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px'
};

const groupStyle = {
  marginBottom: '15px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  boxSizing: 'border-box' // 🔥 FIX CHÍNH
};

const passwordWrapper = {
  position: 'relative',
  width: '100%'
};

const passwordInput = {
  width: '100%',
  padding: '10px',
  paddingRight: '40px',
  marginTop: '5px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  boxSizing: 'border-box' // 🔥 FIX CHÍNH
};

const eyeStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  fontSize: '18px'
};

const btnStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#e91e63',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '10px',
  fontWeight: 'bold'
};

const errorStyle = {
  color: 'red',
  marginTop: '15px',
  textAlign: 'center'
};

const registerStyle = {
  marginTop: '15px',
  textAlign: 'center'
};

export default Login;