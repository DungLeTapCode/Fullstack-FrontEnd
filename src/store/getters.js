

export default {
  newProducts: (state) => {
    return state.products
      .sort((a, b) => b.id - a.id); // Sắp xếp theo ID giảm dần
  },
  
  discountedProducts: (state) => {
    return state.products// Lọc sản phẩm giảm giá
      .sort((a, b) => a.unitPrice - b.unitPrice); // Sắp xếp theo giá tăng dần
  },
  hotProducts: (state) => {
    return state.products
      .sort((a, b) => a.quantity - b.quantity); // Sắp xếp theo số lượng tăng dần
  },
  
  
    filteredProducts: (state) => {
        return state.filteredProducts
    },
    searchQuery: (state) => { return state.searchQuery },

    getProductById: (state) => (id) => {
      const numericId = Number(id); // Ép kiểu id thành số
      return state.products.find(product => product.id === numericId);
    },
    
    
    categoryProducts: (state) => (category) => {
      return state.products.filter(product => product.category === category)
    },
    AllProducts: (state) => {
      return state.products;
    },
    isLoggedIn: (state) => { return state.isLoggedIn;},
    userName: (state) => { return state.userName;}
  }
  