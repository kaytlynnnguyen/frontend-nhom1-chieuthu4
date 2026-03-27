import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Account from './components/Account/Account';
import FlowerDetail from './components/FlowerDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header style={headerStyle}>
          <div className="logo" style={logoStyle}>
            <span style={{ color: '#e91e63' }}>F4</span> FLORA
          </div>
          <Account />
        </header>

        <div className="content" style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flowers/:id" element={<FlowerDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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