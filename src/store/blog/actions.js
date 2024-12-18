import axios from "axios";
export default {
    async fetchBlogs({ commit }) {
        try {
          const response = await axios.get('https://fullstack-backend-kiy9.onrender.com/api/Blogs/GetAllBlogs');
          commit('setBlogs', response.data); // Gọi mutation để lưu dữ liệu vào state
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu blogs:', error);
        }
      },
}