// Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { API_BASE } from '../apiConfig';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import fallbackFlowers from '../data/fallbackFlowers.json';

// --- Custom arrow components ---
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#8b0000", borderRadius: '50%', padding: '10px', right: '-25px', zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#8b0000", borderRadius: '50%', padding: '10px', left: '-25px', zIndex: 1 }}
      onClick={onClick}
    />
  );
};

function Home() {
  // --- Cache localStorage helper ---
  const getCached = (key) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.warn('Không đọc được cache từ localStorage:', err);
      return null;
    }
  };

  const cachedFlowers = getCached('cachedFlowers') || fallbackFlowers;
  const cachedAllFlowers = getCached('cachedAllFlowers') || fallbackFlowers;

  const [flowers, setFlowers] = useState(cachedFlowers);
  const [allFlowers, setAllFlowers] = useState(cachedAllFlowers);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  // --- Giỏ hàng ---
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const saveFlowersCache = (flowersData, allData = null) => {
    try {
      localStorage.setItem('cachedFlowers', JSON.stringify(flowersData));
      if (allData !== null) localStorage.setItem('cachedAllFlowers', JSON.stringify(allData));
    } catch (err) {
      console.warn('Không lưu dữ liệu sản phẩm vào localStorage:', err);
    }
  };

  // --- Thêm vào giỏ hàng ---
  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    
    // Nếu user đã đăng nhập, gọi API
    if (token) {
      try {
        const response = await fetch(`${API_BASE}/api/cart/add`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            flowerId: Number(product.id),
            quantity: 1
          })
        });

        if (response.ok) {
          alert('Đã thêm vào giỏ hàng thành công!');
        } else {
          let msg = 'Không thể thêm vào giỏ hàng';
          try {
            const errJson = await response.json();
            msg = errJson.message || errJson.msg || msg;
          } catch {}
          alert(msg);
        }
      } catch (err) {
        console.error('Lỗi thêm vào giỏ hàng:', err);
        alert('Lỗi kết nối server');
      }
    } else {
      // Nếu chưa đăng nhập, chỉ lưu local
      const existing = cart.find(item => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...cart, { ...product, quantity: 1 }];
      }
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      alert('Vui lòng đăng nhập để lưu giỏ hàng trên hệ thống. Hiện giỏ hàng được lưu local.');
    }
  };

  // --- Load dữ liệu từ API ---
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/flowers`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setAllFlowers(data);
        setFlowers(data);
        saveFlowersCache(data, data);
      } catch (err) {
        console.error('Lỗi kết nối Backend, dùng cache/fallback:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  // --- Lọc sản phẩm ---
  const fetchFlowers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (priceRange === '0-399000') params.append('maxPrice', '399000');
      else if (priceRange === '400000-600000') { params.append('minPrice', '400000'); params.append('maxPrice', '600000'); }
      else if (priceRange === '600001-1000000') { params.append('minPrice', '600001'); params.append('maxPrice', '1000000'); }

      const url = `${API_BASE}/flowers?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setFlowers(data);

      // Chỉ lưu cache đầy đủ khi không lọc
      if (!type && priceRange === 'all') saveFlowersCache(data, data);
    } catch (err) {
      console.error('Lỗi kết nối Backend:', err);
      const cached = getCached('cachedFlowers');
      if (Array.isArray(cached) && cached.length > 0) setFlowers(cached);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="catalog-container">Đang tải sản phẩm...</div>;

  const featured = allFlowers.slice(0, 3);

  const getImageUrl = (flower) => {
    if (flower.image) {
      if (flower.image.startsWith('http') || flower.image.startsWith('/flower_pics/')) return flower.image;
      return `${API_BASE}${flower.image}`;
    }
    return 'https://via.placeholder.com/260x260?text=No+Image';
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="catalog-container">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>WELCOME TO F4 FLORA</h1>
          <p>“Khám phá bộ sưu tập hoa tươi ngay hôm nay”</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => {
              const products = document.querySelector('.all-product-section');
              products.scrollIntoView({ behavior: 'smooth' });
            }}>
              Khám phá ngay
            </button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="featured-section">
        <h2>Sản phẩm nổi bật</h2>
        <div className="featured-grid">
          {featured.map((flower) => (
            <div key={flower.id} className="featured-card">
              <img
                src={getImageUrl(flower)}
                alt={flower.name}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/260x260?text=No+Image'; }}
              />
              <div>
                <h3>{flower.name}</h3>
                <p>{Number(flower.price).toLocaleString()} VNĐ</p>
                <Link className="btn-detail" to={`/flowers/${flower.id}`}>Xem chi tiết</Link>
               
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All products slider */}
      <section className="all-product-section">
        <div className="all-product-header">
          <h2>Tất cả sản phẩm</h2>
          <br />
          <div className="select-row">
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">Tất cả</option>
              <option value="bohoa">Bó hoa</option>
              <option value="giohoa">Giỏ hoa</option>
              <option value="top">Top</option>
            </select>
            <br />
            <select value={priceRange} onChange={e => setPriceRange(e.target.value)}>
              <br />
              <option value="all">Sắp xếp theo giá</option>
              <option value="0-399000">Dưới 400,000</option>
              <option value="400000-600000">400,000 - 600,000</option>
              <option value="600001-1000000">Trên 600,000</option>
            </select>
          </div>
          <button onClick={fetchFlowers} className="btn-primary">Áp dụng</button>
        </div>

        <Slider {...sliderSettings}>
          {flowers.length > 0 ? flowers.map((flower) => (
            <div key={flower.id} className="product-card">
              <img
                src={getImageUrl(flower)}
                alt={flower.name}
                className="product-image"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/260x260?text=No+Image'; }}
              />
              <div className="product-info">
                <h3>{flower.name}</h3>
                <p className="product-price">{Number(flower.price).toLocaleString()} VNĐ</p>
                <Link className="btn-detail" to={`/flowers/${flower.id}`}>Xem chi tiết</Link>
               
              </div>
            </div>
          )) : (
            <p style={{ textAlign: 'center', width: '100%' }}>Không có sản phẩm nào để hiển thị.</p>
          )}
        </Slider>
      </section>
    </div>
  );
}

export default Home;