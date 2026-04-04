import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE } from '../apiConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const { firstName, lastName, email, password } = formData;

  // Hàm cập nhật dữ liệu khi user gõ phím
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, formData);
      navigate('/login');
    } catch (err) {
      const message = err.response?.data?.msg || err.response?.data?.message || err.response?.data?.error || 'Đăng ký thất bại';
      console.error('Register error:', err.response?.data || err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Đăng Ký Thành Viên</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Họ" name="lastName" value={lastName} onChange={onChange} required style={inputStyle} />
        <br />
        <input type="text" placeholder="Tên" name="firstName" value={firstName} onChange={onChange} required style={inputStyle} />
        <br />
        <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required style={inputStyle} />
        <br />
        <input type="password" placeholder="Mật khẩu" name="password" value={password} onChange={onChange} required style={inputStyle} />
        <br />
        <button type="submit" style={btnStyle} disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>
      {error && (
        <div style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

// CSS nhanh cho đẹp hơn chút
const inputStyle = { width: '100%', padding: '8px', marginBottom: '10px' };
const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' };

export default Register;