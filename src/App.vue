<template>
  <div id="app">
    <!-- Hiển thị Layout theo userRoles -->
    <LayoutDefaut v-if="layout === 'Custommer'" />  
    <LayoutAdmin v-else-if="layout === 'Administrator'" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import LayoutDefaut from './LayoutDefaut.vue';
import LayoutAdmin from './LayoutAdmin.vue';
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('users/fetchUserRoles')

// Sử dụng computed để lấy userRoles từ Vuex store
const userRoles = computed(() => store.getters['users/getUserRoles']);

store.dispatch('cart/fetchCartItems');
// Sử dụng computed để xác định layout dựa trên userRoles
const layout = computed(() => {
  if (!userRoles.value || userRoles.value.length === 0) {
    return 'Custommer'; 
  }
  if (userRoles.value.includes('Administrator')) {
    return 'Administrator'; 
  }
  return 'Custommer'; 
});
// App.vue


</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
