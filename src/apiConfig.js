/** Một URL backend cho toàn app — mặc định local khi phát triển, có thể ghi đè bằng REACT_APP_API_URL. */
export const API_BASE =
  process.env.REACT_APP_API_URL || 'https://backend-nhom1-chieuthu4-1.onrender.com';
  // process.env.REACT_APP_API_URL || 'http://localhost:3000/';

