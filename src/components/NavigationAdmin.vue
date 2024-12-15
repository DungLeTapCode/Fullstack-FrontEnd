<template>
  <div :class="{ active: isMenuActive }" class="admin_navigation">
    <ul>
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        @mouseover="emitActiveIndex(index)"
        @click="handleMenuClick(item, index)"
        :class="{ hovered: activeIndex === index }"
      >
        <router-link :to="item.path" class="menu-link">
          <span class="admin_icon"><ion-icon :name="item.icon"></ion-icon></span>
          <span class="admin_title">{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

// Props and emits
const props = defineProps({
  activeIndex: Number, // Current active menu index
});

const emit = defineEmits(["update-active"]);

// Menu items
const menuItems = ref([
  { title: "Trang chủ", icon: "home-outline", path: "/admin-user" },
  {
    title: "Quản lý sản phẩm",
    icon: "laptop-outline",
    path: "/quan-ly-san-pham",
  },
  {
    title: "Quản lý đơn hàng",
    icon: "bag-handle-outline",
    path: "/admin-user",
  },
  { title: "Quản lý nhãn hàng", icon: "logo-apple", path: "/admin-user" },
  {
    title: "Quản lý tài khoản",
    icon: "person-circle-outline",
    path: "/quan-ly-user",
  },
  {
    title: "Quản lý bài viết",
    icon: "pencil-outline",
    path: "/quan-ly-bai-viet",
  },
  {
    title: "Quản lý mã giảm giá",
    icon: "bookmark-outline",
    path: "/admin-user",
  },
  { title: "Doanh thu", icon: "save-outline", path: "/admin-user" },
  { title: "Sign", icon: "log-out-outline", path: "/dang-ky-dang-nhap" },
]);

// Emit active index on hover
const emitActiveIndex = (index) => {
  emit("update-active", index);
};
const handleMenuClick = (item, index) => {
  // Emit active index
  emitActiveIndex(index);

  // If 'Sign' is clicked, clear userRoles from localStorage
  if (item.title === 'Sign') {
  localStorage.removeItem("userToken");
  localStorage.removeItem("cartid");
  localStorage.removeItem("cartItem");
  localStorage.removeItem("userRoles");
  localStorage.removeItem("userName");
  store.dispatch('users/fetchUserRoles')
  store.dispatch("logout"); 
  store.dispatch('cart/fetchCartItems');
  router.push("/dang-ky-dang-nhap")
  }
};
</script>

<style scoped></style>
