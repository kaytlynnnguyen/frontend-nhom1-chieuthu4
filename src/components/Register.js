import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu đăng ký lên Server
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      alert(res.data.msg); // Hiện thông báo "Đăng ký thành công!"
      navigate('/login');   // Chuyển sang trang Login để user đăng nhập
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.msg || 'Đăng ký thất bại'));
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
        <button type="submit" style={btnStyle}>Đăng ký</button>
      </form>
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