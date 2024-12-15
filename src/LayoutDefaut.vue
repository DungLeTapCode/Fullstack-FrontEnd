<template>
    <div>
      <Navigation></Navigation>
      <router-view></router-view>
      
    <Footer></Footer>
     </div>
   
  
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  import Navigation from './components/Navigation.vue';
  import Footer from './components/Footer.vue';
  import Home from './views/Home.vue';
  import chitietsanpham from './views/chitietsanpham.vue';
  import chitiettintuc from './views/chitiettintuc.vue';
  import gioithieu from './views/gioithieu.vue';
  import lienhe from './views/lienhe.vue';
  import quanlysanpham from './views/quanlysanpham.vue';
  import quanlyuser from './views/quanlyuser.vue';
  import rohang from './views/rohang.vue';
  import tintuc from './views/tintuc.vue';
  
  import sanpham from './views/sanpham.vue';
  </script>
  
  
  <style scoped>
  html{
    scroll-behavior: smooth; 
  }
  
  </style>
  