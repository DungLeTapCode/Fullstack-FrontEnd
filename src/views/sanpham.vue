<template>
  <section class="products_container_product">
    <div class="product_category" :class="{ active: isMenuActive }">
      <div class="contents_categoty">
        <div class="title_category">
          <h5>Các danh mục</h5>
          <div class="line_category"></div>
        </div>
        <div
          class="name_category"
          v-for="(item, index) in categories"
          :key="index"
        >
        <input 
            type="radio" 
            name="radio" 
            :value="item" 
            v-model="selectedCategory" 
            @change="onCategoryChange"
          />
          <h5>{{ item }}</h5>
        </div>
      </div>
     
    </div>
    <div class="product_producs">
      <div class="product_header_logic">
        <div class="admin_toggle" @click="toggleMenu">
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <div class="dropdown_container" @click="toggleDropdown">
    <div class="header_category">
      <span>{{ selectedSort }}</span> <!-- Sử dụng biến này để hiển thị tiêu đề -->
      <div class="arrow"></div>
    </div>
    <ul class="dropdown-list" v-show="isDropdownVisible">
      <li v-for="(option, index) in sortOptions" :key="index" @click.stop="selectSort(option)">
        {{ option }} <!-- Hiển thị các mục sắp xếp -->
      </li>
    </ul>
  </div>
        <div class="header_search search_2">
          <label>
            <input type="text" v-model="searchQuery" @input="onSearch" placeholder="Tìm kiếm" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>
      </div>
      <div class="new_products_list">
        <ProductItem 
          v-for="item in paginatedProducts"
          :key="item.id"
          :products="item"
        />
            </div>

      <div class="navigation-buttons">
        <button class="button" @click="goBack" :disabled="currentPage === 1">Quay lại</button>
        <span class="page-number" :class="{ active: currentPage === page }" v-for="page in totalPages" :key="page">
          {{ page }}
        </span>
        <button class="button" @click="goForward" :disabled="currentPage === totalPages">Tiếp</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import ProductItem from "@/components/ProductItem.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { onMounted } from "vue";
import { watch } from "vue";
const categories = [
  "Tất cả",
  "Đồng hồ",
  "Điện thoại",
  "Phụ kiện",
  "Máy ảnh",
  "Laptop",
  "Chơi game",
];

const store = useStore();
const isDropdownVisible = ref(false);
const isMenuActive = ref(false); 
const currentPage = ref(1);
const itemsPerPage = 8;
const selectedSort = ref('Sắp xếp'); // Biến để lưu tiêu đề hiện tại
const sortOptions = ['Tất cả','Từ thấp đến cao', 'Cao đến thấp', 'Mới', 'Đang giảm giá'];
const searchQuery = ref('');
// Biến để kiểm soát trạng thái menu
const selectedCategory = ref(null);

// Gọi action khi người dùng thay đổi danh mục
function onCategoryChange() {
  store.dispatch('filterByCategory', selectedCategory.value);
}

function toggleDropdown() {
  isDropdownVisible.value = !isDropdownVisible.value;
}

function toggleMenu() {
  isMenuActive.value = !isMenuActive.value; // Đảo ngược trạng thái menu
}

const products = computed(() => store.getters.filteredProducts);

function selectSort(option) {
  selectedSort.value = option;
  isDropdownVisible.value = false;
  store.dispatch('filterProducts', option);// Gọi action để lọc sản phẩm
}


const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return products.value.slice(start, start + itemsPerPage);
});
function goBack() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
onMounted(() => {
      store.dispatch('initializeFilteredProducts');
  
 
    });

    function onSearch() {
  if (searchQuery.value) {
    store.dispatch('searchProducts', searchQuery.value); // Gọi action tìm kiếm với từ khóa mới
  } else {
    store.dispatch('searchProducts', ''); // Nếu không có từ khóa, trả về tất cả sản phẩm
  }
}// Gọi action tìm kiếm khi người dùng nhập từ khóa

watch(searchQuery, (newQuery) => {
  onSearch(); 
});


function goForward() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

</script>

<style>
.navigation-buttons {
  display: flex;
  align-items: center;
}

.page-number {
  margin: 0; /* Thêm khoảng cách giữa các số trang */
  cursor: pointer;
  font-size: 12px /* Thay đổi con trỏ để chỉ ra rằng đây là một mục có thể nhấp */
}

.page-number.active {
  color: rgb(8, 241, 117); /* Màu xanh cho trang hiện tại */
  font-weight: bold; /* Đậm hơn cho trang hiện tại */
}
.header_category span{
    width: 130px;
    height: auto;
}
</style>
