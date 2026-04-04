import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Thêm Link để chuyển sang trang đăng ký
import { API_BASE } from '../apiConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Khai báo điều hướng

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
      const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
      localStorage.setItem('userName', displayName || user.email || '');

      navigate('/');
    } catch (error) {
      const message = error.response?.data?.msg || error.response?.data?.message || error.response?.data?.error || 'Không thể đăng nhập';
      console.error('Login error:', error.response?.data || error);
      setError(message);
    } finally {
      setLoading(false);
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
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', cursor: loading ? 'not-allowed' : 'pointer' }}
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
      </p>
    </div>
  );
};

export default Login;
