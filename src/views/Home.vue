<template>
    <div>
        <section class="header_background">
            <div class="header_background_title">
                <h1>SmartShop</h1>
                <h2>Mua sắm thông minh, sống hiện đại</h2>
                <button class="btn_home"><router-link to="/san-pham">XEM SẢN PHẨM</router-link></button>
            </div>
            <div class="header_background_image">
                <img src="/assets/img/background.jpg" alt="">
            </div>
        </section>
        <section class="products_container">
         <h1>Danh Mục Sản Phẩm</h1>
     <div class="products_category">
        <div class="category_item">
            <router-link to="/san-pham"><img src="/assets/img/category1.jpg" alt=""></router-link>
            <span>Phụ Kiện</span>
        </div>
        <div class="category_item">
            <router-link to="/san-pham"><img src="/assets/img/category2.jpg" alt=""></router-link>
            <span>Máy ảnh</span>
        </div>
        <div class="category_item">
            <router-link to="/san-pham"><img src="/assets/img/category3.jpg" alt=""></router-link>
            <span>Laptop</span>
        </div>   
        <div class="category_item">
            <router-link to="/san-pham"><img src="/assets/img/category4.jpg" alt=""></router-link>
            <span>Điện Thoại</span>
        </div>
        <div class="category_item">
            <router-link to="/san-pham"><img src="/assets/img/category5.jpg" alt=""></router-link>
            <span>Chơi Game</span>
        </div>
        <div class="category_item">
            <router-link to="/san-pham"><img src="/assets/img/category6.jpg" alt=""></router-link>
            <span>Đồng Hồ</span>
        </div>
        
     </div>
       </section>
       <!-- sảm phẩm mới -->
       <ListNewProducts :productType="'new'"></ListNewProducts>
       <section class="advertisement_blog">
             <a href="#" class="blog_1"><img src="/assets/img/blog_category1.jpg" alt=""></a>
             <a href="#" class="blog_2"><img src="/assets/img/blog_category2.jpg" alt=""></a>
       </section>
         <!-- sảm phẩm giảm giá -->
         <ListNewProducts :productType="'hot'"></ListNewProducts>
         <ListNewProducts :productType="'discounted'"></ListNewProducts>
         <HomeBlog></HomeBlog>
        

    </div>
</template>

<script setup>
import ListNewProducts from '@/components/ListNewProducts.vue';
import HomeBlog from '@/components/HomeBlog.vue';

</script>

<style lang="scss" scoped>

</style>