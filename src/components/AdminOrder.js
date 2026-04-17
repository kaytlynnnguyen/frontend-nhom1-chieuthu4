import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Trash2, Eye, CheckCircle } from 'lucide-react';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const API_URL = 'https://backend-nhom1-chieuthu4-1.onrender.com/api/orders/admin'; 
    // const API_URL = 'http://localhost:5000/api/orders/admin';

    const fetchOrders = async () => {
        try {
            const currentToken = localStorage.getItem('token'); 
            
            const res = await axios.get(`${API_URL}/all`, {
                headers: { 'x-auth-token': currentToken }
            });
            
            console.log("Dữ liệu nhận được:", res.data); 
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Lỗi lấy đơn hàng:", err.response?.data || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const currentToken = localStorage.getItem('token'); 
            await axios.patch(`${API_URL}/${id}/status`, 
                { status: newStatus }, 
                { headers: { 'x-auth-token': currentToken } }
            );
            alert("Đã cập nhật trạng thái!");
            fetchOrders(); 
        } catch (err) {
            console.error(err);
            alert("Lỗi cập nhật: " + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm("Xóa đơn hàng này?")) {
            try {
                const currentToken = localStorage.getItem('token');
                await axios.delete(`${API_URL}/${id}`, {
                    headers: { 'x-auth-token': currentToken }
                });
                alert("Xóa thành công!");
                fetchOrders();
            } catch (err) {
                alert("Lỗi khi xóa");
            }
        }
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'pending': return { color: '#f39c12', fontWeight: 'bold' }; 
            case 'paid': return { color: '#2ecc71', fontWeight: 'bold' };
            case 'shipping': return { color: '#3498db', fontWeight: 'bold' };
            case 'delivered': return { color: '#27ae60', fontWeight: 'bold' };
            case 'cancelled': return { color: '#e74c3c', fontWeight: 'bold' };
            case 'cod_completed': return { color: '#8e44ad', fontWeight: 'bold' };
            default: return { color: '#7f8c8d' };
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingCart color="#e91e63" /> Quản lý đơn hàng
            </h2>

            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th style={thStyle}>Mã Đơn</th>
                            <th style={thStyle}>Khách hàng</th>
                            <th style={thStyle}>Ngày đặt</th>
                            <th style={thStyle}>Tổng tiền</th>
                            <th style={thStyle}>Trạng thái</th>
                            <th style={thStyle}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={tdStyle}>#{order._id.slice(-6).toUpperCase()}</td>
                                <td style={tdStyle}>
                                    <div><b>{order.buyerName}</b></div>
                                    <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{order.phone}</div>
                                </td>
                                <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                                <td style={{ ...tdStyle, color: '#e91e63', fontWeight: 'bold' }}>
                                    {order.totalAmount.toLocaleString()}đ
                                </td>
                                <td style={tdStyle}>
                                    <select 
                                        value={order.status} 
                                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                        style={{ ...selectStyle, ...getStatusStyle(order.status) }}
                                    >
                                        <option value="pending">Chờ xử lý (Tiền mặt)</option>
                                        <option value="paid">Đã thanh toán (Chuyển khoản)</option>
                                        <option value="shipping">Đang giao</option>
                                        <option value="delivered">Đã giao (Chuyển khoản)</option>
                                        <option value="cancelled">Đã hủy</option>
                                        <option value="cod_completed">Đã giao & Thu tiền mặt</option>
                                    </select>
                                </td>
                                <td style={tdStyle}>
                                    <button onClick={() => handleDeleteOrder(order._id)} style={actionBtn('#e74c3c')}>
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <div style={{padding: '20px', textAlign: 'center'}}>Chưa có đơn hàng nào.</div>}
            </div>
        </div>
    );
};

const thStyle = { padding: '15px', textAlign: 'left', fontSize: '14px', color: '#666' };
const tdStyle = { padding: '15px', fontSize: '14px' };
const selectStyle = { padding: '5px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' };
const actionBtn = (color) => ({ background: 'none', border: 'none', color: color, cursor: 'pointer' });

export default AdminOrder;