import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  const [flowers, setFlowers] = useState([]);
  const [allFlowers, setAllFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  // Load toàn bộ sản phẩm lần đầu
  useEffect(() => {
    const loadAll = async () => {
      try {
        const response = await fetch('https://backend-nhom1-chieuthu4-1.onrender.com/flowers');
        const data = await response.json();
        setAllFlowers(data);
        setFlowers(data);
        setLoading(false);
      } catch (err) {
        console.error('Lỗi kết nối Backend:', err);
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const fetchFlowers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (type) params.append('type', type);

      if (priceRange === '0-399000') {
        params.append('maxPrice', '399000');
      } else if (priceRange === '400000-600000') {
        params.append('minPrice', '400000');
        params.append('maxPrice', '600000');
      } else if (priceRange === '600001-1000000') {
        params.append('minPrice', '600001');
        params.append('maxPrice', '1000000');
      }

      const url = `http://localhost:5000/flowers?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      setFlowers(data);
    } catch (err) {
      console.error('Lỗi kết nối Backend:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="catalog-container">Đang tải sản phẩm...</div>;

  // Featured luôn lấy 3 sản phẩm đầu từ allFlowers, không bị filter ảnh hưởng
  const featured = allFlowers.slice(0, 3);

  const getImageUrl = (flower) => {
    if (flower.image) {
      if (flower.image.startsWith('http')) return flower.image;
      return `http://localhost:5000${flower.image}`;
    }

    // Dựa theo _id nếu image chưa đầy đủ
    if (flower.raw && flower.raw._id && flower.raw._id.$oid) {
      return `http://localhost:5000/flower_pics/${flower.raw._id.$oid}.jpg`;
    }

    // fallback
    return 'https://via.placeholder.com/260x260?text=No+Image';
  };

  return (
    <div className="catalog-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Tươi xinh đúng vibe</h1>
          <p>Đơn giản để đặt, nổi bật để nhớ.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>Mua ngay</button>
            <button className="btn-secondary" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>Xem sản phẩm</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1518977956815-1b5e6c784316?auto=format&fit=crop&w=600&q=80" alt="Florist" />
        </div>
      </section>

      <section className="featured-section">
        <h2>Sản phẩm nổi bật</h2>
        <p>Những bó hoa đáng iu nhất</p>
        <div className="featured-grid">
          {featured.map((flower) => (
            <div key={flower.id} className="featured-card">
              <img src={getImageUrl(flower)} alt={flower.name} />
              <div>
                <h3>{flower.name}</h3>
                <p>{Number(flower.price).toLocaleString()} VNĐ</p>
                <Link className="btn-detail" to={`/flowers/${flower.id}`}>Xem chi tiết</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="all-product-section">
        <div className="all-product-header">
          <h2>Tất cả sản phẩm</h2>
          <div className="select-row">
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">Tất cả</option>
              <option value="bohoa">Bó hoa</option>
              <option value="giohoa">Giỏ hoa</option>
              <option value="top">Top</option>
            </select>
            <select value={priceRange} onChange={e => setPriceRange(e.target.value)}>
              <option value="all">Sắp xếp theo giá</option>
              <option value="0-399000">Dưới 400,000</option>
              <option value="400000-600000">400,000 - 600,000</option>
              <option value="600001-1000000">Trên 600,000</option>
            </select>
          </div>
          <button onClick={fetchFlowers} className="btn-primary">Áp dụng</button>
        </div>

        <div className="product-grid">
          {flowers.length > 0 ? (
            flowers.map((flower) => (
              <div key={flower.id} className="product-card">
                <img
                  src={getImageUrl(flower)}
                  alt={flower.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{flower.name}</h3>
                  <p className="product-price">{Number(flower.price).toLocaleString()} VNĐ</p>
                  <Link className="btn-detail" to={`/flowers/${flower.id}`}>Xem chi tiết</Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>Không có sản phẩm nào để hiển thị.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;