
import apiClient from "@/axios";
export default {
    async fetchUsers({ commit }) {
        try {
          const response = await apiClient.get(`/User/GetAllUser`)
          commit('SET_USERS', response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      async fetchUserRoles({ commit }) {
        try {
          // Mã hóa userName nếu cần thiết
          const userName = localStorage.getItem('userName')
          const encodedUserName = encodeURIComponent(userName);
  
          // Gửi yêu cầu GET để lấy roles từ API
          const response = await apiClient.get(`/User/roles/${encodedUserName}`);
          localStorage.setItem("userRoles",response.data)
  
          // Nếu lấy thành công, gọi mutation để lưu roles vào state
          if (response.status === 200) {
            commit('setUserRoles', response.data);
          }
        } catch (error) {
          console.error("Lỗi xảy ra khi gọi API:", error);
        }
      },
    
    
     
}