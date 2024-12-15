import axios from 'axios';

export default {
    actBuyItem({ commit, state },data){
        
        const index = state.listCarts.findIndex(function(cart)
        {
           return cart.actItem.id === data.actItem.id
        }
 );
         if(index === -1){
            commit('BUY_ITEM',data)
         }
        else{
            let quantity = data.quantity
            commit('CHANGE_QUANTITY',{ index,quantity })
        }
    },
    updateQuantity({ commit, state }, { productId, quantity }) {
        // Tìm sản phẩm trong giỏ hàng dựa trên productId
        const item = state.listCarts.find(item => item.actItem.id === productId);
    
        // Nếu tìm thấy sản phẩm trong giỏ, cập nhật số lượng
        if (item) {
          // Gọi mutation để cập nhật số lượng
          commit('CHANGE_QUANTITY', { productId, quantity });
        }
      },
    
      // Action để xử lý việc xóa sản phẩm trong giỏ (nếu cần)
      removeItem({ commit }, productId) {
        commit('REMOVE_ITEM', productId);
      },

      async fetchCartItems({ commit }) {
        try {
          const cartId = localStorage.getItem("cartid");
          
          if (!cartId) {
            console.log('Không tìm thấy cartId trong localStorage. Giỏ hàng sẽ trống.');
            localStorage.setItem('cartItem', JSON.stringify([])); // Cập nhật localStorage với mảng trống
            commit('SET_CART_ITEMS', []); // Cập nhật state giỏ hàng trong Vuex
            return;
          }
          
          const response = await axios.get(`https://localhost:7075/api/CartItem/GetCarts/${cartId}`);
          localStorage.setItem('cartItem', JSON.stringify(response.data));
          commit('SET_CART_ITEMS', response.data); // Lưu dữ liệu vào state
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
        }
      },
}