import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://backend-nhom1-chieuthu4-1.onrender.com/users")
      .then(res => {
        setUsers(res.data);
      });
  }, []);

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Danh sách Users</h1>

      <table style={styles.table}>

        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id} style={styles.row}>
              <td style={styles.td}>{user.id}</td>
              <td style={styles.td}>{user.name}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

const styles = {

  container:{
    minHeight:"100vh",
    background:"linear-gradient(135deg,#74ebd5,#ACB6E5)",
    paddingTop:"60px",
    fontFamily:"Arial"
  },

  title:{
    textAlign:"center",
    marginBottom:"40px",
    color:"#333"
  },

  table:{
    width:"50%",
    margin:"auto",
    borderCollapse:"collapse",
    background:"white",
    borderRadius:"10px",
    overflow:"hidden",
    boxShadow:"0 8px 20px rgba(0,0,0,0.2)"
  },

  headerRow:{
    background:"#4CAF50",
    color:"white"
  },

  th:{
    padding:"15px",
    fontSize:"18px"
  },

  row:{
    textAlign:"center"
  },

  td:{
    padding:"12px",
    borderBottom:"1px solid #eee"
  }

};

export default Users;