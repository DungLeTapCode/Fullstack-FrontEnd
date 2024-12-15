<template>
  <div>
    <section>
      <div id="prodetails" class="section_p1">
        <div class="single_pro_image">
          <img :src="itemProduct.imagePath" width="100%" id="MainImg" alt="" />
          <div class="small_img_group">
  <div
    v-for="(image, index) in images"
    :key="index"
    class="small_img_col"
    @click="changeMainImage(image)"
  >
    <img :src="image" width="100%" class="small_img" alt="" />
  </div>
</div>
        </div>
        <div class="single_pro_details">
          <h6>SẢN PHẨM</h6>
          <h5>{{ itemProduct.name }}</h5>
          <div class="gia">
            <p>GIÁ:</p>
            <del class="sale">
              <h5>7.900.000</h5>
              <p>VNĐ</p>
            </del>
            <h2>{{ formattedPrice }}</h2>
          </div>
          <div class="select_container">
            <div class="select_1">
              <label for="color-select">Chọn Màu:</label>
              <ul class="color-options">
                <li
                  data-color="red"
                  class="color-option"
                  style="background-color: red"
                ></li>
                <li
                  data-color="blue"
                  class="color-option"
                  style="background-color: white"
                ></li>
                <li
                  data-color="black"
                  class="color-option"
                  style="background-color: black"
                ></li>
              </ul>
            </div>
           
          </div>
          <div>
            <input v-model="quantity" type="number" value="1" />
            <router-link to="/ro-hang"><button @click="addToCart">THÊM VÀO RỎ</button></router-link>
          </div>
          <span>
           {{  itemProduct.description }}</span
          >
          <div>
            <div class="remaining_quantity">Số Lượng:<span>10</span></div>
          </div>
        </div>
      </div>
      <div class="product_details_content">
        <div class="details_content active_details">
          <div class="details_title">
            <h5>MÔ TẢ SẢN PHẨM</h5>
          </div>
          <div class="content_detail">
            <p>
              {{  itemProduct.detailDesc }}
            </p>
            <div class="button-container">
              <button
                v-if="!showTechnicalInfo"
                class="show-more"
                @click="toggleTechnicalInfo"
              >
                Xem thêm
              </button>
              <button
                v-if="showTechnicalInfo"
                class="hide-more"
                @click="toggleTechnicalInfo"
              >
                Ẩn bớt
              </button>
            </div>

            <!-- Hiển thị thông số kỹ thuật khi showTechnicalInfo là true -->
            <div v-if="showTechnicalInfo" class="technical-info">
              <p v-for="(value, key) in technicalSpecs" :key="key">
                ✔ {{ key }}: {{ value }}
              </p>
            </div>
          </div>

          <div class="details_content">
            <h3>Đánh giá</h3>
            <p>Chưa có đánh giá nào</p>
            <div class="form_judge">
              <h5>Đánh giá của bạn</h5>
              <div class="star_judge">
                <div
                  v-for="n in 5"
                  :key="n"
                  :class="['star_star', { active_star: stars[n - 1] }]"
                  @click="toggleStar(n)"
                >
                  <i class="ri-star-fill"></i>
                </div>
              </div>
              <p>Nhận xết của bạn</p>
              <label for="avatar">Chọn hình ảnh:</label>
              <input type="file" id="avatar" accept="image/png,image/jpg" />
              <textarea
                name="comment"
                id="comment"
                cols="1"
                rows="10"
              ></textarea>
              <button>GỬI ĐI</button>
            </div>
          </div>
        </div>
      </div>

      <ListNewProducts
        v-if="itemProduct && itemProduct.category"
        :productType="'related'"
        :category="itemProduct.category"
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router"; // để lấy tham số từ route
import { useStore } from "vuex";
import { onMounted } from "vue";
import ListNewProducts from "@/components/ListNewProducts.vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import apiClient from "@/axios";
const route = useRoute();
const store = useStore();
const router = useRouter();

// Dùng computed để lấy sản phẩm theo id

const stars = ref([false, false, false, false, false]);
const quantity = ref(1); 
const showTechnicalInfo = ref(false);

const selectedImage = ref("");



const images = computed(() => {
  // Nếu itemProduct có giá trị, sử dụng ảnh chính lặp 4 lần, nếu không thì dùng mảng rỗng
  return itemProduct.value
    ? Array(4).fill(itemProduct.value.imagePath)
    : [];
});


// Lưu trữ lựa chọn của người dùng cho từng sản phẩm
const selectedStorage = ref({
  "Điện thoại": "",
  "Máy tính": "",
  Laptop: "",
  "Đồng hồ": "",
  "Máy ảnh": "",
});
onMounted(async () => {
  // Kiểm tra nếu sản phẩm chưa được tải
  if (!store.state.products || store.state.products.length === 0) {
    // Gọi action để lấy sản phẩm từ API
    await store.dispatch("fetchProducts");
  }
});


// Khởi tạo với hình ảnh đầu tiên trong mảng

// Hàm thay đổi ảnh chính khi nhấn vào ảnh nhỏ
const changeMainImage = (image) => {
  selectedImage.value = image;
};

// Hàm toggle để thay đổi trạng thái hiển thị thông số kỹ thuật
const toggleTechnicalInfo = () => {
  showTechnicalInfo.value = !showTechnicalInfo.value;
};

// Hàm xử lý khi click vào sao
const toggleStar = (index) => {
  // Chuyển đổi trạng thái sao khi click
  stars.value[index - 1] = !stars.value[index - 1];
};



const itemProduct = computed(() => {
  return store.getters.getProductById(route.params.id)
});

const formattedPrice = computed(() => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(itemProduct.value.unitPrice);
});

async function addToCart() {
  const cartId = localStorage.getItem("cartid");

  if (!cartId) {
  Swal.fire({
    title: "Thông báo",
    text: "Không tìm thấy giỏ hàng. Vui lòng đăng nhập.",
    icon: "warning",
    confirmButtonText: "OK"
  }).then(() => {
    router.push("/dang-ky-dang-nhap"); // Chuyển hướng sau khi người dùng nhấn "OK"
  });
  return;
}

  if (!itemProduct.value) {
    alert("Không tìm thấy sản phẩm.");
    return;
  }

  const data = {
    cartId: parseInt(cartId, 10),
    productId: itemProduct.value.id,
    quantity: quantity.value,
    productName: "", // Gửi giá trị trống
    productPrice: 0, // Mặc định giá trị 0
    imagePath: "", // Gửi chuỗi trống
  };

  try {
    const response = await apiClient.post("/CartItem/AddCarts", data);

    if (response.status === 200) {
      
      store.dispatch('cart/fetchCartItems');
    } else {
      console.error("Lỗi thêm vào giỏ hàng:", response.data);
      alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    }
  } catch (error) {
    console.error("Chi tiết lỗi:", error.response.data || error.message);
    alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
  }
}



</script>

<style>
.details_content {
  max-width: 100%;
  margin: 0px;
}
.star_judge {
  display: flex;
  align-items: center;
}

.star_star {
  color: lightgray;
  margin-right: 5px;
}

.star_star.active_star {
  color: gold;
}
</style>
