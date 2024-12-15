<template>
  <div class="admin_container">
    <!-- Navigation -->
    <NavigationAdmin
      :active-index="activeIndex"
      @update-active="updateActiveIndex"
    />

    <div :class="{ active: isMenuActive }" class="admin_main">
      <div class="admin_topbar">
        <div class="admin_toggle" @click="toggleMenu">
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <div class="admin_search">
          <label>
            <input type="text" placeholder="Tìm kiếm" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>
        <div class="admin_user">
          <img src="/assets/img/user.jpg" alt="User" />
        </div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavigationAdmin from "./components/NavigationAdmin.vue";


// State for menu toggle
const isMenuActive = ref(false);
const activeIndex = ref(null);

// Toggle menu state
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

// Update active index when a menu item is hovered
const updateActiveIndex = (index) => {
  activeIndex.value = index;
};
</script>

<style scoped>
.admin_toggle {
  display: block;
}
</style>
