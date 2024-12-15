import { createStore } from 'vuex';
import state from './state'
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import cart from './cart';
import users from './users';
import blog from './blog';
const store = createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {
    cart,
    users, 
    blog,   // Đăng ký module cart vào store chính
  }

});

export default store;