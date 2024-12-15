import axios from "axios";
import { jwtDecode } from 'jwt-decode';
export default {
     initializeFilteredProducts({ commit, state }) {
     commit('setFilteredProducts', [...state.products] );  
     commit('SET_SEARCH_PRODUCTS', [...state.products] );  
    },
    filterProducts({ commit, state }, sortOption) {
     
      let filtered ;
    if(state.searchCategory.length > 0)
    {
       filtered = state.searchCategory
    }
    else{
     filtered = state.searchQuery ? [...state.searchProducts] : [...state.products];
    }
    
    if (sortOption === 'Mới') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortOption === 'Đang giảm giá') {
      filtered = filtered.sort(() => Math.random() - 0.5);
    } else if (sortOption === 'Từ thấp đến cao') {
      filtered.sort((a, b) => a.unitPrice - b.unitPrice);
    } else if (sortOption === 'Cao đến thấp') {
      filtered.sort((a, b) => b.unitPrice - a.unitPrice);
    }
  
    // Khi chọn "Tất cả", không cần lọc gì cả, khôi phục lại danh sách đầy đủ
    if (sortOption === 'Tất cả') {
      
      filtered = state.searchQuery ? [...state.searchProducts] : [...state.products];
    }
  
        commit('setFilteredProducts', filtered);
      },


    searchProducts({ commit, state }, query) {
        commit('setSearchQuery', query);
        
        // Kiểm tra nếu có query, và tìm kiếm trong filteredProducts nếu có
        let filtered = [...state.products];
        if (query) {
          // Lọc sản phẩm theo tên trong filteredProducts (sản phẩm đã lọc trước đó)
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          commit('SET_SEARCH_PRODUCTS', filtered);
          commit('setFilteredProducts', filtered);
        }
        else{
          commit('setFilteredProducts', state.products);
          commit('SET_SEARCH_PRODUCTS',  state.products);
        }
        // Cập nhật searchProducts và filteredProducts sau khi tìm kiếm
     
      },
      filterByCategory({ commit, state }, category) {
        if (category  !== "Tất cả") {
          // Lọc sản phẩm theo danh mục
          const filtered = state.products.filter(product => product.categoryName === category);
          commit('setFilteredProducts', filtered);
          commit('SET_SEARCH_CATEGORY', filtered);
        } else {
          // Nếu không có lựa chọn hoặc chọn "tất cả", hiển thị tất cả sản phẩm
          commit('setFilteredProducts', state.products);
        }
      },
      

  async fetchProducts({ commit }) {
    try {
      const response = await axios.get('https://localhost:7075/api/products/GetAllProduct');
      
      // Lưu vào Vuex state
      commit('setProducts', response.data);
      
      // Lưu vào localStorage
      localStorage.setItem('products', JSON.stringify(response.data));
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  },
  updateProducts({ commit, state }) {
    // Cập nhật localStorage khi state.products thay đổi
    localStorage.setItem('products', JSON.stringify(state.products));
  },
  login({ commit }, token) {
    try {
      const decoded = jwtDecode(token);
      const userName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
      commit("SET_LOGIN_STATE", { isLoggedIn: true, userName });
      localStorage.setItem("userToken", token);
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
    }
  },
  logout({ commit }) {
    localStorage.removeItem("userToken");
    commit("LOGOUT");
  },
    
  initializeLoginState({ commit }) {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        commit("SET_LOGIN_STATE", { isLoggedIn: true, userName });
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }
    else{
      commit("LOGOUT");
      
    }
  }
}