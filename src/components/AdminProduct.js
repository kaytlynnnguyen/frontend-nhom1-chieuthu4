import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Plus, Trash2, Edit3, X } from 'lucide-react';

const AdminProduct = () => {
    const [flowers, setFlowers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        id: '', 
        name: '',
        price: '',
        image: '',
        type: 'bohoa' 
    });

    const API_URL = 'https://backend-nhom1-chieuthu4-1.onrender.com/flowers'; 

    const fetchFlowers = () => {
        axios.get(API_URL)
            .then(res => setFlowers(res.data))
            .catch(err => console.log("Lỗi lấy dữ liệu:", err));
    };

    useEffect(() => {
        fetchFlowers();
    }, []);

    const clearHomeCache = () => {
        localStorage.removeItem('cachedFlowers');
        localStorage.removeItem('cachedAllFlowers');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            name: formData.name,
            price: Number(formData.price),
            image: formData.image,
            category: formData.type, 
            description: formData.description, 
            meaning: formData.meaning
        };

        if (isEditing) {
            // Gửi currentId để Backend biết cần sửa hoa nào
            axios.put(`${API_URL}/${currentId}`, dataToSend)
                .then(() => {
                    alert("Cập nhật thành công!");
                    clearHomeCache(); 
                    fetchFlowers();
                    resetForm();
                })
                .catch(err => console.error(err));
        } else {
            // Khi thêm mới, Backend sẽ tự sinh ID và lưu vào cả 2 nơi
            axios.post(API_URL, dataToSend)
                .then(() => {
                    alert("Thêm hoa thành công!");
                    clearHomeCache();
                    fetchFlowers();
                    resetForm();
                })
                .catch(err => {
                    console.error("Lỗi:", err.response?.data || err.message);
                    alert("Lỗi: " + (err.response?.data?.message || err.message));
                });
        }
    };

  const handleEdit = (flowerRaw) => {
    setIsEditing(true);
    const realId = flowerRaw._id?.$oid || flowerRaw._id || flowerRaw.id; 
    setCurrentId(realId); 

    setFormData({
        id: realId,
        name: flowerRaw.name,
        price: flowerRaw.price,
        image: flowerRaw.image,
        type: flowerRaw.category || flowerRaw.type || 'bohoa',
        description: flowerRaw.description || '', 
        meaning: flowerRaw.meaning || ''       
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => { 
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                alert("Đã xóa thành công!");
                clearHomeCache();
                fetchFlowers();
            })
            .catch(err => alert("Lỗi khi xóa: " + err.message));
    }
};
    const resetForm = () => {
        setIsEditing(false);
        setCurrentId(null);
        setFormData({ id: '', name: '', price: '', image: '', type: 'bohoa' });
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Package color="#e91e63" /> Quản lý sản phẩm 
            </h2>

            <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h3 style={{ marginTop: 0, fontSize: '18px', color: '#555' }}>
                    {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                </h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        <input type="text" name="name" placeholder="Tên hoa" value={formData.name} onChange={handleChange} required style={inputStyle} />
                        <input type="number" name="price" placeholder="Giá bán" value={formData.price} onChange={handleChange} required style={inputStyle} />
                        <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                            <option value="bohoa">Bó hoa</option>
                            <option value="giohoa">Giỏ hoa</option>
                            <option value="top">Sản phẩm TOP (Bán chạy)</option>
                        </select>
                    </div>

                    <input type="text" name="image" placeholder="Link hình ảnh (URL)" value={formData.image} onChange={handleChange} required style={inputStyle} />

                    <textarea name="description" placeholder="Mô tả sản phẩm" 
                        value={formData.description} onChange={handleChange} 
                        style={{ ...inputStyle, height: '80px', resize: 'vertical' }} />

                    <textarea name="meaning" placeholder="Ý nghĩa của hoa..." 
                        value={formData.meaning} onChange={handleChange} 
                        style={{ ...inputStyle, height: '80px', resize: 'vertical' }} />
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" style={{ ...btnStyle, backgroundColor: '#2ecc71', flex: 1 }}>
                            {isEditing ? "Lưu thay đổi" : "Thêm vào kho"}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={resetForm} style={{ ...btnStyle, backgroundColor: '#95a5a6' }}>
                                Hủy
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Ảnh</th>
                            <th style={thStyle}>Tên sản phẩm</th>
                            <th style={thStyle}>Loại</th>
                            <th style={thStyle}>Giá</th>
                            <th style={thStyle}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flowers.map((f) => {
                            const mongoId = f.raw?._id?.$oid || f.raw?._id || f.id;
                            return (
                                <tr key={mongoId} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={tdStyle}>
                                        {String(mongoId).slice(-5)}
                                    </td>

                                    <td style={tdStyle}>
                                        <img 
                                            src={f.image} 
                                            alt={f.name} 
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} 
                                            onError={(e) => e.target.src='https://via.placeholder.com/50'} 
                                        />
                                    </td>

                                    <td style={{ ...tdStyle, fontWeight: 'bold', color: '#333' }}>
                                        {f.name}
                                    </td>

                                    <td style={tdStyle}>
                                        {f.category || "Chưa phân loại"}
                                    </td>

                                    <td style={tdStyle}>
                                        {f.price ? Number(f.price).toLocaleString() : 0}đ
                                    </td>

                                    <td style={tdStyle}>
                                        <button 
                                            onClick={() => handleEdit(f.raw)} 
                                            style={actionBtn('#3498db')}
                                        >
                                            <Edit3 size={16} />
                                        </button>

                                        <button 
                                            onClick={() => handleDelete(mongoId)} 
                                            style={actionBtn('#e74c3c')}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' };
const btnStyle = { padding: '10px 20px', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const thStyle = { padding: '15px', textAlign: 'left', fontSize: '14px', color: '#666' };
const tdStyle = { padding: '15px', fontSize: '14px' };
const actionBtn = (color) => ({ background: 'none', border: 'none', color: color, cursor: 'pointer', marginRight: '10px' });

export default AdminProduct;