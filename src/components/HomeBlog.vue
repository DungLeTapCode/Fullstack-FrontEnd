<template>
    <div>
      <section>
        <div class="new_products">
          <h1>Tin Tức</h1>
          <div class="new_list">
            <router-link to="/tin-tuc" class="news_box_one">
              <!-- Kiểm tra nếu randomBlogs[0] tồn tại -->
              <img v-if="randomBlogs[0]" :src="randomBlogs[0].imagePath" width="80%" alt="" />
              <h5 v-if="randomBlogs[0]">{{ randomBlogs[0].blogName }}</h5>
              <p v-if="randomBlogs[0]">{{ randomBlogs[0].blogDescription }}</p>
            </router-link>
  
            <div class="news_box_two">
              <router-link to="/tin-tuc" class="new_box_two_1">
                <!-- Kiểm tra nếu randomBlogs[1] tồn tại -->
                <img v-if="randomBlogs[1]" :src="randomBlogs[1].imagePath" width="80%" alt="" />
                <div class="new_box_title_two">
                  <h5 v-if="randomBlogs[1]">{{ randomBlogs[1].blogName }}</h5>
                  <p v-if="randomBlogs[1]">{{ randomBlogs[1].blogDescription }}</p>
                </div>
              </router-link>
              <router-link to="/tin-tuc" class="new_box_two_1">
                <!-- Kiểm tra nếu randomBlogs[2] tồn tại -->
                <img v-if="randomBlogs[2]" :src="randomBlogs[2].imagePath" width="80%" alt="" />
                <div class="new_box_title_two">
                  <h5 v-if="randomBlogs[2]">{{ randomBlogs[2].blogName }}</h5>
                  <p v-if="randomBlogs[2]">{{ randomBlogs[2].blogDescription }}</p>
                </div>
              </router-link>
              <router-link to="/tin-tuc" class="new_box_two_1">
                <!-- Kiểm tra nếu randomBlogs[3] tồn tại -->
                <img v-if="randomBlogs[3]" :src="randomBlogs[3].imagePath" width="80%" alt="" />
                <div class="new_box_title_two">
                  <h5 v-if="randomBlogs[3]">{{ randomBlogs[3].blogName }}</h5>
                  <p v-if="randomBlogs[3]">{{ randomBlogs[3].blogDescription }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  

  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  // Lấy 4 blog mới nhất từ Vuex
  const newBlogs = computed(() => store.getters['blog/latestBlogs']);
  
  // Lấy 4 blog ngẫu nhiên
  const randomBlogs = computed(() => {
    if (newBlogs.value.length > 0) {
      return [...newBlogs.value]
        .sort(() => 0.5 - Math.random())  // Trộn ngẫu nhiên
        .slice(0, 4);  // Lấy 4 bài viết ngẫu nhiên
    }
    return [];
  });
  </script>
  

<style>
img {
  width: 100%;           /* Giữ chiều ngang của ảnh */
  height: auto;         /* Tự động tính toán chiều cao để giữ tỷ lệ */
  object-fit: cover;    /* Cắt ảnh để vừa vặn với khung mà không bị biến dạng */
}

 .new_box_two_1 img {
  max-height: 125px;    /* Giới hạn chiều cao của ảnh, tùy chỉnh theo ý muốn */
}
.news_box_one img {
  max-height: 320px;    /* Giới hạn chiều cao của ảnh, tùy chỉnh theo ý muốn */
}

</style>