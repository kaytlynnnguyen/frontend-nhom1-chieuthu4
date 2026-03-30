import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { API_BASE } from '../apiConfig';

const FlowerDetail = () => {
  const { id: routeFlowerId } = useParams();
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const fetchFlower = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/flowers/${routeFlowerId}`);
        if (!res.ok) throw new Error('Không tìm thấy sản phẩm');
        const data = await res.json();
        setFlower(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlower();
  }, [routeFlowerId]);

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartMessage('Vui lòng đăng nhập để thêm vào giỏ hàng');
      return;
    }

    setAddingToCart(true);
    setCartMessage('');

    try {
      const response = await fetch(`${API_BASE}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          flowerId: Number(flower.id ?? routeFlowerId),
          quantity: 1
        })
      });

      if (response.ok) {
        await response.json();
        setCartMessage('Đã thêm vào giỏ hàng thành công!');
      } else {
        let msg = 'Không thể thêm vào giỏ hàng';
        try {
          const errJson = await response.json();
          msg = errJson.message || errJson.msg || msg;
        } catch {
          /* response không phải JSON */
        }
        setCartMessage(msg);
      }
    } catch (err) {
      setCartMessage('Lỗi kết nối server');
      console.error('Lỗi thêm vào giỏ hàng:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="catalog-container">Đang tải...</div>;
  if (error) return <div className="catalog-container">{error}</div>;
  if (!flower) return <div className="catalog-container">Không tìm thấy sản phẩm.</div>;

  const getImageUrl = () => {
    if (flower.image) {
      if (flower.image.startsWith('http')) return flower.image;
      return `${API_BASE}${flower.image}`;
    }

    if (flower.raw && flower.raw._id && flower.raw._id.$oid) {
      return `${API_BASE}/flower_pics/${flower.raw._id.$oid}.jpg`;
    }

    return 'https://via.placeholder.com/640x480?text=No+Image';
  };

  return (
    <div className="product-detail-container">
      <Link to="/" className="btn-back">← Trở về danh sách</Link>
      <div className="product-detail-card">
        <div className="product-detail-image-wrap">
          <img
            className="product-detail-image"
            src={getImageUrl()}
            alt={flower.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/640x480?text=No+Image';
            }}
          />
        </div>
        <div className="product-detail-info">
          <h2>{flower.name}</h2>
          <p className="product-price">{Number(flower.price).toLocaleString()} VNĐ</p>
          <p><strong>Loại hoa:</strong> {flower.category}</p>
          <p><strong>Mô tả:</strong> {flower.description}</p>
          <p><strong>Ý nghĩa:</strong> {flower.meaning}</p>
          <button
            className="btn-add"
            onClick={addToCart}
            disabled={addingToCart}
          >
            {addingToCart ? 'Đang thêm...' : 'Thêm vào giỏ'}
          </button>
          {cartMessage && (
            <p style={{
              marginTop: '10px',
              color: cartMessage.includes('thành công') ? '#4CAF50' : '#f44336',
              fontWeight: 'bold'
            }}>
              {cartMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowerDetail;
