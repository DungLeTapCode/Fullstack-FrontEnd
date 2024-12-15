export default {
  // Mutation để cập nhật danh sách sản phẩm đã lọc
  setFilteredProducts(state, products) {
    state.filteredProducts = products;
  },

  // Mutation để lưu trữ danh sách sản phẩm tìm kiếm được
  SET_SEARCH_PRODUCTS(state, products) {
    state.searchProducts = products;
  },

  // Mutation để lưu trữ từ khóa tìm kiếm
  setSearchQuery(state, query) {
    state.searchQuery = query;
  },

  SET_SEARCH_CATEGORY(state ,products){
    state.searchCategory = products
  },

    setProducts(state, products) {
      state.products = products; // Cập nhật danh sách sản phẩm trong state
    },
    SET_LOGIN_STATE(state, { isLoggedIn, userName }) {
      state.isLoggedIn = isLoggedIn;
      state.userName = userName;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.userName = "";
    }
}
