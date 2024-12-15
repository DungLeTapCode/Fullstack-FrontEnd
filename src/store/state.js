export default {
   products: JSON.parse(localStorage.getItem('products')) || [],
  
    filteredProducts: [],
    searchQuery:[],
    searchProducts:[],
    searchCategory:[],
    isLoggedIn: false,
    userName: "",
    
    
  };
  