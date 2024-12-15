<template>
  <section class="header_container">
    <div class="header_logo">
      <router-link to="/trang-chu">
        <img src="/assets/img/logo.jpg" alt="" />
      </router-link>
    </div>
    <div class="header_nav_meu" :class="{ active: isMenuOpen }">
      <ul class="nav_list">
        <li class="nav_item">
          <router-link
            to="/trang-chu"
            class="nav_links"
            active-class="active-link"
          >
            TRANG CHỦ
          </router-link>
        </li>
        <li class="nav_item">
          <router-link
            to="/gioi-thieu"
            class="nav_links"
            active-class="active-link"
          >
            GIỚI THIỆU
          </router-link>
        </li>
        <li class="nav_item">
          <router-link
            to="/san-pham"
            class="nav_links"
            active-class="active-link"
          >
            SẢN PHẨM
          </router-link>
        </li>
        <li class="nav_item">
          <router-link
            to="/tin-tuc"
            class="nav_links"
            active-class="active-link"
          >
            TIN TỨC
          </router-link>
        </li>
        <li class="nav_item">
          <router-link
            to="/lien-he"
            class="nav_links"
            active-class="active-link"
          >
            LIÊN HỆ
          </router-link>
        </li>
      </ul>
    </div>
    <div class="header_search">
      <label>
        <input type="text" placeholder="Tìm kiếm" />
        <ion-icon name="search-outline"></ion-icon>
      </label>
    </div>
    <div class="header_user_shopcart">
      <router-link to="/ro-hang" class="header_cart" >
        <i class="ri-shopping-bag-line " active-class="active-link"></i>
      </router-link>
      <div class="header_user">
        <template v-if="isLoggedIn">
          <i class="ri-account-pin-circle-line" @click="toggleDropdown"></i>
          <div v-if="showDropdown" class="user_dropdown">
            <p>Xin chào</p>
            <i class="ri-account-pin-circle-line"></i>
            <span class="userNameName">{{ userName }}</span>
            <button class="dropdown_item" @click="logout">Đăng xuất</button>
          </div>
        </template>
        <template v-else>
          <router-link to="/dang-ky-dang-nhap">
            <i class="ri-user-line"></i>
          </router-link>
        </template>
      </div>
      <button class="menu_btn" @click="toggleMenu()">
        <i class="ri-menu-line"></i>
      </button>
    </div>
  </section>
</template>


<script setup>
import { ref, watch } from "vue";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
const router = useRouter();
const store = useStore();
 // Giải mã token JWT

// Biến theo dõi trạng thái đăng nhập và thông tin người dùng
 // Lưu trữ tên người dùng
const showDropdown = ref(false);





// Kiểm tra trạng thái đăng nhập
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const userName = computed(() => store.getters.userName);


// Xử lý đăng xuất
function logout() {
  
  showDropdown.value = false; // Đóng dropdown
  localStorage.removeItem("userToken");
  localStorage.removeItem("cartid");
  localStorage.removeItem("cartItem,userRoles");
  localStorage.removeItem("userRoles");
  localStorage.removeItem("userName");
  store.dispatch("logout"); 
  store.dispatch('cart/fetchCartItems');
  router.push("/dang-ky-dang-nhap")
}

// Kiểm tra trạng thái đăng nhập khi component được tạo


// Biến theo dõi trạng thái mở/đóng của menu
const isMenuOpen = ref(false);

// Hàm để toggle (mở/đóng) menu
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// Hàm để toggle (mở/đóng) dropdown
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

</script>

<style scoped>
.header_user {
  position: relative;
  cursor: pointer;
}

.user_dropdown {
  position: absolute;
  top: 40px;
  right: -10px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 100;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
  padding: 30px 30px;
}

.dropdown_item {
  padding: 10px 15px;
  text-align: left;
  color: #333;
  display: block;
  text-decoration: none;
}

.dropdown_item:hover {
  background-color: #f5f5f5;
  color: #141714;
}
.user_dropdown i{
    font-size: 50px;
}
.user_dropdown span{
    font-size: 12px;
}
.nav_links.active-link {
  color: #1b861b; /* Màu chữ khi link được kích hoạt */
 
  border-bottom: 1.5px solid #1b861b; /* Đường gạch chân */
  
}
</style>
