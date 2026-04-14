import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../apiConfig';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        `${API_BASE}/api/auth/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMsg(res.data.msg);
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      const message =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        'Đổi mật khẩu thất bại';

      setError(message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Đổi mật khẩu</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Đổi mật khẩu</button>
      </form>

      {msg && <p style={{ color: 'green' }}>{msg}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ChangePassword;