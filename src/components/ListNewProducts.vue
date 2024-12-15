<template>
  <div>
    <section class="new_products" v-if="productType === 'new'">
      <h1>Sản Phẩm Mới</h1>
      <div class="new_products_list">
        <ProductItem
          v-for="item in limitedNewProducts"
          :key="item.id"
          :products="item"
        />
      </div>
    </section>
    <section class="new_products" v-if="productType === 'discounted'">
      <h1>Sản Phẩm Sale</h1>
      <div class="new_products_list">
        <ProductItem
          v-for="item in limitedDiscountedProducts"
          :key="item.id"
          :products="item"
        />
      </div>
    </section>
    <section class="new_products" v-if="productType === 'hot'">
      <h1>Sản Phẩm Bán Chạy Nhất</h1>
      <div class="new_products_list">
        <ProductItem
          v-for="item in limitedHotProducts"
          :key="item.id"
          :products="item"
        />
      </div>
    </section>
    <section class="new_products" v-if="productType === 'related'">
      <h1>Sản Phẩm Liên Quan</h1>
      <button
          class="pagination-button prev"
          :disabled="currentPage === 1"
          @click="goToPreviousPage"
        >
          &lt; </button >
      <div class="new_products_list">
        <!-- Nút Previous -->
    
        <ProductItem
          v-for="item in limitedCategoryProducts"
          :key="item.id"
          :products="item"
        />
      </div>
      <button
          class="pagination-button next"
          :disabled="currentPage === totalPages"
          @click="goToNextPage"
        >
           &gt;
        </button>
    </section>
  </div>
</template>

<script setup>
import ProductItem from "./ProductItem.vue";
import { useStore } from "vuex";
import { computed, defineProps } from "vue";
import { ref } from "vue";

const props = defineProps({
  productType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const store = useStore();
const newProducts = computed(() => store.getters.newProducts);
const discountedProducts = computed(() => store.getters.discountedProducts);
const hotProducts = computed(() => store.getters.hotProducts);
const categoryProducts = computed(() =>
  store.getters.categoryProducts(props.category)
);

const limitedNewProducts = computed(() => newProducts.value.slice(0, 12));
const limitedHotProducts = computed(() => hotProducts.value.slice(0, 12));
const limitedDiscountedProducts = computed(() =>
  discountedProducts.value.slice(0, 12)
);
const currentPage = ref(1);

// Tổng số trang (số sản phẩm chia cho số sản phẩm mỗi trang)
const productsPerPage = 4;
const totalPages = computed(() =>
  Math.ceil(categoryProducts.value.length / productsPerPage)
);

// Danh sách sản phẩm hiển thị cho trang hiện tại
const limitedCategoryProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  return categoryProducts.value.slice(startIndex, endIndex);
});
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Hàm chuyển trang về sau
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style>
.pagination-button {
  padding: 0;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f4f4f4;
  transition: background-color 0.3s ease;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  position: absolute; 
  margin-top: 50px /* Đặt chiều rộng cố định cho các nút */
 
}
/* Khi rê chuột vào nút */
.pagination-button:hover {
  background-color: #e2e2e2;
}

/* Khi nút bị disabled */
.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.pagination-button.prev{
    left: 85px;
}
.pagination-button.next{
    right: 85px;
}


/* Canh chỉnh các nút: Previous nằm ở đầu và Next ở cuối */

</style>
