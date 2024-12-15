export default {
    listCarts:[],
    cartItems:JSON.parse(localStorage.getItem('cartItem')) ||  [], 
};