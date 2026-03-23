import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Đường dẫn mặc định là trang chủ */}
          <Route path="/" element={<Home />} />
          
          {/* Đường dẫn đến trang đăng nhập */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;