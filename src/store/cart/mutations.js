export default {
    
    CHANGE_QUANTITY: (state, { index,quantity }) =>{
        state.listCarts[index].quantity += quantity
    },
    BUY_ITEM: (state, data) =>{
        state.listCarts.push(data);
    },
    REMOVE_ITEM(state, productId) {
        state.listCarts = state.listCarts.filter(item => item.actItem.id !== productId);
      },
      SET_CART_ITEMS(state, items) {
        state.cartItems = items;
      },
        
}