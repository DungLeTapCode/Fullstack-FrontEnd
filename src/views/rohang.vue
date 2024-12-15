<template>
  <div>
    <section>
      <div class="section_cart">
        <table width="100%">
          <thead>
            <tr>
              <td>Xóa</td>
              <td>Hình ảnh</td>
              <td>Sản phẩm</td>
              <td>Giá</td>
              <td>Số lượng</td>
              <td>Tổng tiền</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cartItem, index) in ListCarts" :key="index">
              <td>
                <a href="#" @click.prevent="removeItemFromCart(cartItem)">
                  <i class="ri-close-circle-line"></i>
                </a>
              </td>
              <td>
                <img :src="cartItem.imagePath" alt="product-image" />
              </td>
              <td>{{ cartItem.productName }}</td>
              <td>{{ formatCurrency(cartItem.productPrice) }}</td>
              <td>
                <input
                  type="number"
                  v-model="cartItem.quantity"
                  :min="1"
                  @change="updateQuantity(cartItem)"
                />
              </td>
              <td>
                {{ formatCurrency(cartItem.productPrice * cartItem.quantity) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <div class="cart-add">
        <div class="coupon">
          <h3>Áp dụng mã giảm giá</h3>
          <div>
            <input type="text" placeholder="Nhập mã giảm giá" />
            <button class="normal">Áp dụng</button>
          </div>
        </div>

        <div class="subtotal">
          <h3>Tổng tiền thanh toán</h3>
          <table>
            <tr>
              <td>Tổng tiền</td>
              <td>{{formatCurrency(totalPrice)}}</td>
            </tr>
            <tr>
              <td>Phí Ship</td>
              <td>0đ</td>
            </tr>
            <tr>
              <td><strong>Tổng</strong></td>
              <td>{{formatCurrency(totalPrice)}}   </td>
            </tr>
          </table>
          <button>Thanh toán</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import apiClient from "@/axios";
const store = useStore();

// Gọi getter từ module cart
const ListCarts = computed(() => store.getters["cart/CartsItem"]);
const totalPrice = computed(() => store.getters['cart/sumTotal']);


const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};
const removeItemFromCart = async (cartItem) => {
  try {
    const id = parseInt(cartItem.cartItemId, 10); // Lấy id của sản phẩm cần xóa

    // Gửi yêu cầu API để xóa sản phẩm khỏi giỏ hàng
    const response = await apiClient.delete(`/CartItem/RemoveCarts/${id}`);

    // Kiểm tra kết quả từ API
    if (response.status === 200) {
      store.dispatch('cart/fetchCartItems');
      // Nếu muốn cập nhật lại trạng thái giỏ hàng trong store, bạn có thể dispatch lại một action hoặc thực hiện thao tác gì đó.
    }
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    alert("Xóa sản phẩm thất bại. Vui lòng thử lại!");
  }
};


// Hàm để cập nhật số lượng sản phẩm


const updateQuantity = async (cartItem) => {
  try {
    const id = parseInt(cartItem.cartItemId, 10); // Ép kiểu cartItem.id thành số nguyên

    // Kiểm tra nếu id không hợp lệ
    const response = await apiClient.put(
      `/CartItem/UpdateCarts/${id}`,
      null, // Không truyền body nếu API yêu cầu query string
      {
        params: {
          quantity: cartItem.quantity, // Truyền số lượng qua query string
        },
      }
    );

   
    store.dispatch('cart/fetchCartItems');
   
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng:", error);
    alert("Cập nhật số lượng thất bại. Vui lòng thử lại!");
  }
};


</script>

<style lang="scss" scoped></style>
