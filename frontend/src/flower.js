import React, { useEffect, useState } from 'react';

function App() {
  const [flowers, setFlowers] = useState([]); // Nơi lưu trữ danh sách hoa lấy từ Backend
  const [loading, setLoading] = useState(true);

  // Hàm gọi API từ Backend
  const fetchFlowers = async () => {
    try {
      const response = await fetch('http://localhost:5000/flowers');
      const data = await response.json();
      setFlowers(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trang Sản Phẩm (Flower Catalog)</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {flowers.map((flower) => (
          <div key={flower.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            {/* Giả sử file JSON của bạn có các trường: name, price, image */}
            <img src={flower.image} alt={flower.name} style={{ width: '100%' }} />
            <h3>{flower.name}</h3>
            <p>Giá: {flower.price.toLocaleString()} VNĐ</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;