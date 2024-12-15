<template>
    <section>
      <div class="section_blog_container">
        <div class="blog_title">
          <h2>Tin tức</h2>
        </div>
        <div class="blog_content">
          <!-- Danh sách bài viết chính -->
          <div class="blog_content_main">
            <div
              class="content_main_box"
              v-for="(blog, index) in paginatedBlogs"
              :key="blog.id || index"
            >
              <div class="box_main_img">
                <img :src="blog.imagePath" alt="Blog Image" />
              </div>
              <div class="box_main_text">
                <h5>{{ blog.blogName }}</h5>
                <span>{{ formatDate(blog.dateTime) }}</span>
                <p>{{ blog.blogDescription }}</p>
              </div>
            </div>
          </div>
  
          <!-- Danh sách bài viết phụ -->
          <div class="blog_content_small_list">
            <!-- Bài viết gần đây -->
            <div class="blog_content_small">
              <div class="blog_small_title">
                <h5>Bài viết gần đây</h5>
              </div>
              <div
                class="blog_small_box"
                v-for="(blog, index) in recentBlogs"
                :key="blog.id || index"
              >
                <div class="box_small_img">
                  <img :src="blog.imagePath" alt="Small Blog Image" />
                </div>
                <div class="box_small_text">
                  <p>{{ blog.blogName }}</p>
                  <span>{{ blog.dateTime }}</span>
                  
                </div>
              </div>
            </div>
  
            <!-- Bài viết xem nhiều nhất -->
            <div class="blog_content_small">
              <div class="blog_small_title">
                <h5>Bài viết xem nhiều nhất</h5>
              </div>
              <div
                class="blog_small_box"
                v-for="(blog, index) in mostViewedBlogs"
                :key="blog.id || index"
              >
                <div class="box_small_img">
                  <img :src="blog.imagePath" alt="Most Viewed Blog Image" />
                </div>
                <div class="box_small_text">
                    <p>{{ blog.blogName }}</p>
                  <span>{{blog.dateTime }}</span>
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  

  <script setup>
  import { useStore } from 'vuex';
  import { computed, onMounted, ref } from 'vue';
  
  const store = useStore();

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
  
  // Fetch blogs khi component được mount
  onMounted(() => {
    store.dispatch('blog/fetchBlogs');
  });
  
  // Lấy toàn bộ bài viết
  const blogs = computed(() => store.getters['blog/allBlogs']);
  const newblogs = computed(() => store.getters['blog/latestBlogs']);
  
  // Phân trang bài viết chính: Tối đa 8 bài
  const pageSize = 8;
  const currentPage = ref(1);
  const paginatedBlogs = computed(() =>
    blogs.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
  );
  
  // Lấy bài viết gần đây: Lấy 4 bài đầu tiên
  const recentBlogs = computed(() => newblogs.value.slice(0, 4));
  
  // Lấy bài viết xem nhiều nhất: Giả sử dựa vào `views` (thêm logic nếu cần)
  const mostViewedBlogs = computed(() =>
  newblogs.value.slice(-4).reverse()
);

  </script>
  

<style>

</style>