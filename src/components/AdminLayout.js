import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail') || "adminf4@gmail.com";

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
            <div style={{ width: '280px', backgroundColor: '#2c3e50', color: '#ecf0f1', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' }}>
                <div style={{ padding: '30px 20px', textAlign: 'center', borderBottom: '1px solid #34495e' }}>
                    <h2 style={{ fontSize: '22px', margin: 0 }}><span style={{ color: '#e91e63' }}>F4</span> FLORA ADMIN</h2>
                </div>
                <nav style={{ flex: 1, padding: '20px 0' }}>
                    <Link to="/admin/dashboard" style={menuItemStyle}>🏠 Dashboard</Link>
                    <Link to="/admin/products" style={menuItemStyle}>🌸 Danh sách sản phẩm</Link>
                    <Link to="/admin/orders" style={menuItemStyle}>🛒 Quản lý đơn hàng</Link>
                    <Link to="/admin/users" style={menuItemStyle}>👥 Quản lý tài khoản</Link>
                    <div style={{ margin: '20px', borderTop: '1px solid #34495e' }}></div>
                    <Link to="/" style={menuItemStyle}>⬅️ Quay lại trang chủ</Link>
                </nav>
            </div>

            <div style={{ flex: 1, marginLeft: '280px', display: 'flex', flexDirection: 'column' }}>
                <header style={{ height: '70px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 35px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontWeight: '600', color: '#555' }}>Hệ thống quản trị</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span>Xin chào, <b style={{ color: '#2c3e50' }}>{userEmail}</b></span>
                        <button onClick={handleLogout} style={logoutBtnStyle}>Đăng xuất 🚪</button>
                    </div>
                </header>
                <main style={{ padding: '35px' }}>
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
};

const menuItemStyle = { display: 'block', padding: '14px 30px', color: '#bdc3c7', textDecoration: 'none' };
const logoutBtnStyle = { padding: '8px 15px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' };

export default AdminLayout;