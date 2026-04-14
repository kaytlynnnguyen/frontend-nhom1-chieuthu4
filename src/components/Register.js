import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE } from '../apiConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Mật khẩu xác nhận không khớp');
    }

    setLoading(true);

    try {
      await axios.post(`${API_BASE}/api/auth/register`, {
        firstName,
        lastName,
        email,
        password
      });

      navigate('/login');
    } catch (err) {
      const message =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Đăng ký thất bại';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Đăng Ký Thành Viên</h2>

        <form onSubmit={handleRegister}>
          {/* HỌ */}
          <input
            type="text"
            placeholder="Họ"
            name="lastName"
            value={lastName}
            onChange={onChange}
            required
            style={inputStyle}
          />

          {/* TÊN */}
          <input
            type="text"
            placeholder="Tên"
            name="firstName"
            value={firstName}
            onChange={onChange}
            required
            style={inputStyle}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
            style={inputStyle}
          />

          {/* PASSWORD */}
          <div style={passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              name="password"
              value={password}
              onChange={onChange}
              required
              style={passwordInput}
            />
            <span onClick={() => setShowPassword(!showPassword)} style={eyeStyle}>
              {showPassword ? '🙈' : '👁'}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div style={passwordWrapper}>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Xác nhận mật khẩu"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              style={passwordInput}
            />
            <span onClick={() => setShowConfirm(!showConfirm)} style={eyeStyle}>
              {showConfirm ? '🙈' : '👁'}
            </span>
          </div>

          {/* BUTTON */}
          <button type="submit" style={btnStyle} disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        {/* ERROR */}
        {error && <div style={errorStyle}>{error}</div>}

        {/* LOGIN */}
        <p style={loginStyle}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

/* ===== STYLE FIX FULL ===== */

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

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  boxSizing: 'border-box' // 🔥 FIX QUAN TRỌNG
};

const passwordWrapper = {
  position: 'relative',
  width: '100%',
  marginBottom: '12px'
};

const passwordInput = {
  width: '100%',
  padding: '10px',
  paddingRight: '40px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  boxSizing: 'border-box' // 🔥 FIX QUAN TRỌNG
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
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '10px'
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
  textAlign: 'center'
};

const loginStyle = {
  marginTop: '15px',
  textAlign: 'center'
};

export default Register;