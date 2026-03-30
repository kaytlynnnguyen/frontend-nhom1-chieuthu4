import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

const FlowerDetail = () => {
  const { id } = useParams();
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlower = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://backend-nhom1-chieuthu4-1.onrender.com/flowers/${id}`);
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
  }, [id]);

  if (loading) return <div className="catalog-container">Đang tải...</div>;
  if (error) return <div className="catalog-container">{error}</div>;
  if (!flower) return <div className="catalog-container">Không tìm thấy sản phẩm.</div>;

  const getImageUrl = () => {
    if (flower.image) {
      if (flower.image.startsWith('http')) return flower.image;
      return `http://localhost:5000${flower.image}`;
    }

    if (flower.raw && flower.raw._id && flower.raw._id.$oid) {
      return `http://localhost:5000/flower_pics/${flower.raw._id.$oid}.jpg`;
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
          <button className="btn-add">Thêm vào giỏ</button>
        </div>
      </div>
    </div>
  );
};

export default FlowerDetail;
