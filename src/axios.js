import axios from "axios";

// Đặt URL API trực tiếp
const apiClient = axios.create({
  baseURL: "https://fullstack-backend-2-kr3d.onrender.com/api", // Địa chỉ API sản xuất
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
