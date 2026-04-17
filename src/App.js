import React from 'react';
import './App.css';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Account from './components/Account/Account';
import FlowerDetail from './components/FlowerDetail';
import Cart from './components/Cart';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import AdminProduct from './components/AdminProduct';
import AdminOrder from './components/AdminOrder';
import { Navigate } from 'react-router-dom';
import ChangePassword from './components/ChangePassword';
const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('token');

  // Nếu không có token hoặc không phải admin, đá về trang login
  if (!token || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <header style={headerStyle}>
          <div className="logo" style={logoStyle}>
            <span style={{ color: '#e91e63' }}>F4</span> FLORA
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/cart" style={{ color: '#333', textDecoration: 'none', fontSize: '18px' }}>
              🛒 Giỏ hàng
            </Link>
            <Account />
          </div>
        </header>

        <div className="content" style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flowers/:id" element={<FlowerDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProduct />} />
              <Route path="orders" element={<AdminOrder />} />
            </Route>
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