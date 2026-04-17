import React from 'react';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const revenueData = [
    { name: 'Tháng 1', revenue: 4000 }, { name: 'Tháng 2', revenue: 3000 },
    { name: 'Tháng 3', revenue: 5000 }, { name: 'Tháng 4', revenue: 2780 }
];

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div onClick={() => navigate('/admin/products')} style={cardStyle('#3498db')}>
                    <Package size={30} />
                    <h3>Danh sách sản phẩm</h3>
                </div>
                <div onClick={() => navigate('/admin/orders')} style={cardStyle('#2ecc71')}>
                    <ShoppingCart size={30} />
                    <h3>Quản lý đơn hàng</h3>
                </div>
                <div onClick={() => navigate('/admin/users')} style={cardStyle('#9b59b6')}>
                    <Users size={30} />
                    <h3>Quản lý tài khoản</h3>
                </div>
                <div style={cardStyle('#e67e22')}>
                    <TrendingUp size={30} />
                    <h3>Tổng doanh thu</h3>
                </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '20px' }}>Sơ đồ doanh thu sản phẩm</h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="revenue" stroke="#3498db" fill="#3498db" fillOpacity={0.2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const cardStyle = (color) => ({
    backgroundColor: '#fff', padding: '20px', borderRadius: '12px', color: '#333',
    borderBottom: `5px solid ${color}`, cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
});

export default AdminDashboard;