import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://backend-nhom1-chieuthu4-1.onrender.com/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi kết nối Backend:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{textAlign: 'center'}}>Đang tải dữ liệu...</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Danh sách Thành viên</h1>

      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Họ và Tên</th>
            <th style={styles.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} style={styles.row}>
               <td style={styles.td}>{user._id.substring(0, 8)}...</td>
               {/* Hiển thị firstName + lastName nếu có, nếu không thì hiện name */}
               <td style={styles.td}>
                 {user.firstName ? `${user.firstName} ${user.lastName}` : user.name}
               </td>
               <td style={styles.td}>{user.email || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#74ebd5,#ACB6E5)",
    paddingTop: "60px",
    fontFamily: "Arial"
  },
  title: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#333"
  },
  table: {
    width: "70%", // Tăng độ rộng để chứa email
    margin: "auto",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  },
  headerRow: {
    background: "#4CAF50",
    color: "white"
  },
  th: {
    padding: "15px",
    fontSize: "18px"
  },
  row: {
    textAlign: "center"
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    color: "#555"
  }
};

export default Users;