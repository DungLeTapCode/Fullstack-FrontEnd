import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import chitietsanpham from './views/chitietsanpham.vue';
import chitiettintuc from './views/chitiettintuc.vue';
import gioithieu from './views/gioithieu.vue';
import lienhe from './views/lienhe.vue';
import quanlysanpham from './views/quanlysanpham.vue';
import quanlyuser from './views/quanlyuser.vue';
import quanlytintuc from './views/quanlytintuc.vue';
import rohang from './views/rohang.vue';
import sanpham from './views/sanpham.vue';
import tintuc from './views/tintuc.vue';
import trangchuadmin from './views/trangchuadmin.vue';
import login from './views/login.vue';
import store from './store'; // Import Vuex store trực tiếp

const routes = [

  {
    path: "/trang-chu",
    component: Home,
    alias: "/", // Alias để xử lý đường dẫn mặc định
  },
  { path: '/chi-tiet-san-pham/:id', props: true, component: chitietsanpham },
  { path: '/chi-tiet-tin-tuc/:id', component: chitiettintuc },
  { path: '/gioi-thieu', component: gioithieu },
  { path: '/lien-he', component: lienhe },
  { path: '/quan-ly-san-pham', component: quanlysanpham },
  { path: '/quan-ly-user', component: quanlyuser },
  { path: '/ro-hang', component: rohang },
  { path: '/san-pham', component: sanpham },
  { path: '/tin-tuc', component: tintuc },
  { path: '/dang-ky-dang-nhap', component: login },
  { path: '/admin-user', component: trangchuadmin },
  { path: '/quan-ly-bai-viet' , component:quanlytintuc}

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // Quay lại vị trí trước đó
    } else {
      return { top: 0 }; // Tự động cuộn lên đầu trang
    }
  },
});



export default router;
