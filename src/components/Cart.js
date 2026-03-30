import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const API_BASE = 'https://backend-nhom1-chieuthu4-1.onrender.com';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        const errData = await response.json();
        setError(errData.message || 'Không thể tải giỏ hàng');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Lỗi tải giỏ hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (flowerId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/cart/${flowerId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      } else {
        const errData = await response.json();
        setError(errData.message || 'Không thể cập nhật số lượng');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Lỗi cập nhật số lượng:', err);
    }
  };

  const removeItem = async (flowerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/cart/${flowerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      } else {
        const errData = await response.json();
        setError(errData.message || 'Không thể xóa sản phẩm');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Lỗi xóa sản phẩm:', err);
    }
  };

  const getImageUrl = (image) => {
    if (image) {
      if (image.startsWith('http')) return image;
      return `${API_BASE}${image}`;
    }
    return 'https://via.placeholder.com/100x100?text=No+Image';
  };

  if (loading) return <div className="cart-container">Đang tải giỏ hàng...</div>;

  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <div className="cart-container">
        <h2>Giỏ hàng</h2>
        <p>Bạn cần <Link to="/login">đăng nhập</Link> để xem giỏ hàng.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>

      {error && <div className="error-message">{error}</div>}

      {cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng trống</p>
          <Link to="/" className="btn-primary">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.flowerId} className="cart-item">
                <div className="cart-item-image">
                  <img src={getImageUrl(item.image)} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">
                    {Number(item.price).toLocaleString()} VNĐ
                  </p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.flowerId, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.flowerId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  <p>{Number(item.price * item.quantity).toLocaleString()} VNĐ</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="btn-remove"
                    onClick={() => removeItem(item.flowerId)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <h3>Tổng cộng: {Number(cart.totalAmount).toLocaleString()} VNĐ</h3>
            </div>
            <div className="cart-actions">
              <Link to="/" className="btn-secondary">Tiếp tục mua sắm</Link>
              <button className="btn-primary">Thanh toán</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;