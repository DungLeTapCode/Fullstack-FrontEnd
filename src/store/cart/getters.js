export default {

    sumTotal: (state) => {
        let totalPrice = 0;
        // Duyệt qua từng item trong listCarts và tính tổng
        state.cartItems.forEach(item => {
          totalPrice += item.quantity * item.productPrice;
        });
        return totalPrice;
      },
      CartsItem: (state) => {
        return state.cartItems
    },
}