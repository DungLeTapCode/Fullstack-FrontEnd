<template>
  <div class="admin_product_container">
    <h1>Quản Lý Sản Phẩm</h1>

    <!-- Nút thêm sản phẩm -->
    <button
      @click="toggleProductForm"
      style="
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
      "
    >
      <i
        class="fas fa-plus-circle"
        style="font-size: 24px; color: #28a745; margin-right: 10px"
      ></i>
      <span style="font-size: 18px; color: #131313">Thêm Sản Phẩm</span>
    </button>

    <!-- Form thêm sản phẩm -->
    <form
      v-show="isFormVisible"
      @submit.prevent="submitProductForm"
      style="display: flex; flex-direction: column; gap: 10px"
    >
      <!-- Tên sản phẩm -->
      <input
        type="text"
        v-model="newProduct.name"
        placeholder="Tên sản phẩm"
        required
      />

      <!-- Mô tả sản phẩm -->
      <textarea
        v-model="newProduct.description"
        placeholder="Mô tả"
        required
      ></textarea>

      <!-- Mô tả chi tiết sản phẩm -->
      <textarea
        v-model="newProduct.detailDesc"
        placeholder="Mô tả chi tiết"
        required
      ></textarea>

      <!-- Số lượng sản phẩm -->
      <input
        type="number"
        v-model="newProduct.quantity"
        placeholder="Số lượng"
        required
      />

      <!-- Giá sản phẩm -->
      <input
        type="number"
        v-model="newProduct.unitPrice"
        placeholder="Giá"
        required
      />

      <!-- Hình ảnh sản phẩm -->
      <input
        type="file"
        @change="handleImageChange"
        accept="image/*"
        required
      />

      <!-- Loại sản phẩm -->
      <select v-model="newProduct.categoryName" required>
        <option value="" disabled selected>Chọn loại sản phẩm</option>
        <option value="Điện thoại">Điện thoại</option>
        <option value="Đồng hồ">Đồng hồ</option>
        <option value="Phụ kiện">Phụ kiện</option>
        <option value="Máy ảnh">Máy ảnh</option>
        <option value="Laptop">Laptop</option>
        <option value="Chơi game">Chơi game</option>
      </select>

      <button type="submit">Xác Nhận Thêm</button>
    </form>
    <!-- Form sửa sản phẩm -->
    <form
      v-show="isEditFormVisible"
      @submit.prevent="confirmEditProduct"
      style="display: flex; flex-direction: column; gap: 10px"
    >
      <h3>Sửa Sản Phẩm</h3>
      <input
        type="text"
        v-model="editedProduct.name"
        placeholder="Tên sản phẩm"
        required
      />
      <textarea
        v-model="editedProduct.description"
        placeholder="Mô tả"
        required
      ></textarea>
      <textarea
        v-model="editedProduct.detailDesc"
        placeholder="Mô tả chi tiết"
        required
      ></textarea>
      <input
        type="number"
        v-model="editedProduct.quantity"
        placeholder="Số lượng"
        required
      />
      <input
        type="number"
        v-model="editedProduct.unitPrice"
        placeholder="Giá"
        required
      />
      <input type="file" @change="handleEditImageChange" accept="image/*" />
      <select v-model="editedProduct.categoryName" required>
        <option value="" disabled selected>Chọn loại sản phẩm</option>
        <option value="Điện thoại">Điện thoại</option>
        <option value="Đồng hồ">Đồng hồ</option>
        <option value="Phụ kiện">Phụ kiện</option>
        <option value="Máy ảnh">Máy ảnh</option>
        <option value="Laptop">Laptop</option>
        <option value="Chơi game">Chơi game</option>
      </select>
      <div style="display: flex; gap: 10px">
        <button type="submit">Xác Nhận Sửa</button>
        <button type="button" @click="cancelEdit">Hủy</button>
      </div>
    </form>

    <!-- Bảng sản phẩm -->
    <div class="admin_product_table_container">
      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên</th>
            <th>Số lượng</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Loại</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.quantity }}</td>
            <td>
              <img
                :src="product.imagePath"
                alt="Hình ảnh"
                style="width: 50px"
              />
            </td>
            <td>{{ product.unitPrice.toLocaleString("vi-VN") }} VNĐ</td>
            <td>{{ product.categoryName }}</td>
            <td>{{ product.description }}</td>
            <td>
              <button @click="updateProduct(product)">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="removeProduct(product.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

// Lấy store Vuex
const store = useStore();

// Tạo getter để lấy danh sách sản phẩm từ store

// Quản lý trạng thái form và danh sách sản phẩm
const isFormVisible = ref(false);
const newProduct = ref({
  name: "",
  description: "",
  detailDesc: "",
  quantity: "",
  unitPrice: "",
  categoryName: "",
  imageFile: null, // Lưu trữ file hình ảnh
});
const isEditFormVisible = ref(false);
const editedProduct = ref({
  id: null,
  name: "",
  description: "",
  detailDesc: "",
  quantity: "",
  unitPrice: "",
  categoryName: "",
  imageFile: null, // Lưu trữ file hình ảnh
});

// Quản lý danh sách sản phẩm

// Toggle visibility of product form
const toggleProductForm = () => {
  isFormVisible.value = !isFormVisible.value;
};

// Xử lý thay đổi tệp hình ảnh
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    newProduct.value.imageFile = file;
  }
};

// Hàm thêm sản phẩm
const submitProductForm = async () => {
  const formData = new FormData();
  formData.append("name", newProduct.value.name);
  formData.append("description", newProduct.value.description);
  formData.append("detailDesc", newProduct.value.detailDesc);
  formData.append("quantity", newProduct.value.quantity);
  formData.append("unitPrice", newProduct.value.unitPrice);
  formData.append("categoryName", newProduct.value.categoryName);

  // Kiểm tra và thêm hình ảnh vào formData nếu có
  if (newProduct.value.imageFile) {
    formData.append("imageFile", newProduct.value.imageFile);
  }

  try {
    // Sử dụng axios với header multipart/form-data
    const response = await axios.post(
      "https://localhost:7075/api/products/AddNewProduct",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    store.dispatch("fetchProducts");
    console.log("Sản phẩm đã được thêm:", response.data);
    // Reset form sau khi thêm thành công
    resetForm();
    // Cập nhật danh sách sản phẩm
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
  }
};

// Reset form
const resetForm = () => {
  newProduct.value = {
    name: "",
    description: "",
    detailDesc: "",
    quantity: "",
    unitPrice: "",
    categoryName: "",
    imageFile: null, // Reset tệp ảnh
  };
};

// Hàm lấy danh sách sản phẩm (có thể gọi API khi cần)
const products = computed(() => store.getters.AllProducts);

// Lấy danh sách sản phẩm từ API và lưu vào store
onMounted(() => {
  store.dispatch("fetchProducts");
});
const updateProduct = (product) => {
  editedProduct.value = { ...product };
  editedProduct.value.imageFile = null; // Đảm bảo không mang theo file cũ
  isEditFormVisible.value = true;
};

// Xử lý thay đổi tệp hình ảnh trong form sửa
const handleEditImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    editedProduct.value.imageFile = file;
  }
};

// Xác nhận sửa sản phẩm
const confirmEditProduct = async () => {
  const formData = new FormData();
  formData.append("name", editedProduct.value.name);
  formData.append("description", editedProduct.value.description);
  formData.append("detailDesc", editedProduct.value.detailDesc);
  formData.append("quantity", editedProduct.value.quantity);
  formData.append("unitPrice", editedProduct.value.unitPrice);
  formData.append("categoryName", editedProduct.value.categoryName);

  // Thêm file hình ảnh nếu có
  if (editedProduct.value.imageFile) {
    formData.append("imageFile", editedProduct.value.imageFile);
  }

  try {
    const response = await axios.put(
      `https://localhost:7075/api/products/UpdateProducts/${editedProduct.value.id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("Sản phẩm đã được cập nhật:", response.data);

    // Cập nhật danh sách sản phẩm từ store
    store.dispatch("fetchProducts");
    isEditFormVisible.value = false; // Đóng form sửa
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
  }
};

// Hủy sửa sản phẩm
const cancelEdit = () => {
  isEditFormVisible.value = false;
}; // Import axios từ thư viện
// Hàm xóa sản phẩm
const removeProduct = async (productId) => {
  // Hiển thị hộp thoại xác nhận trước khi xóa
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    return;
  }

  try {
    // Gửi yêu cầu xóa sản phẩm tới API
    const response = await axios.delete(
      `https://localhost:7075/api/products/DeleteProducts/${productId}`
    );
    console.log("Sản phẩm đã được xóa:", response.data);

    // Cập nhật danh sách sản phẩm từ store
    store.dispatch("fetchProducts");
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
