<template>
  <div class="admin_user_container" style="margin-top: 40px">
    <h1>Quản Lý Người Dùng</h1>
    <button
      @click="toggleAddUserForm"
      id="admin-addUserBtn"
      style="
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
      "
       v-show="showIconUser"
    >
      <i
        class="fas fa-plus-circle"
        style="font-size: 24px; color: #28a745; margin-right: 10px"
       
      ></i>
      <span style="font-size: 18px; color: #0a0a0a">Thêm Người Dùng</span>
    </button>
    <form
      v-show="showAddUserForm"
      class="admin-userForm"
      @submit.prevent="registerUser"
    >
      <input type="text" placeholder="Tên" v-model="fullName" required />
      <input type="email" placeholder="Email" v-model="email" required />
      <input
        type="password"
        placeholder="Mật khẩu"
        v-model="password"
        required
      />
      <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        v-model="confirmPassword"
        required
      />
      <button type="submit">Xác Nhận Thêm</button>
    </form>

  
    <form
      v-show="showUpdateUserForm"
      class="admin-userForm"
      @submit.prevent="updateUser"
    >
   
      <input
        type="text"
        placeholder="Tên"
        v-model="updatedUser.fullName"
        required
      />
      <input
        type="text"
        placeholder="Điện thoại"
        v-model="updatedUser.phoneNumber"
      />
      <input type="text" placeholder="Địa chỉ" v-model="updatedUser.address" />
      <button type="submit">Xác Nhận Cập Nhật</button>
      <button type="button" @click="cancelUpdate">Hủy</button>
    </form>

    <div class="admin_user_table_container">
      <table id="admin-userTable">
        <thead>
          <tr>
            <th>Email</th>
            <th>Tên</th>
            <th>Điện Thoại</th>
            <th>Địa Chỉ</th>
            <th>Ngày Tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="admin-userList">
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.email }}</td>
            <td>{{ user.fullName }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.address }}</td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td class="admin-actions">
                <button @click="showUpdateForm(user)">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteUser(user.id)">
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
import apiClient from "@/axios";
import { onMounted, computed } from "vue";
import { useStore, Store } from "vuex";

const store = useStore();
const fullName = ref(""); // Lưu tên đầy đủ
const email = ref(""); // Lưu email
const password = ref(""); // Lưu mật khẩu
const confirmPassword = ref(""); // Lưu mật khẩu xác nhận

// Trạng thái ẩn/hiện của form thêm người dùng
const showAddUserForm = ref(false);
const showIconUser = ref(true)
// Gọi action để lấy dữ liệu
onMounted(() => {
  // Gọi action để lấy dữ liệu người dùng từ API khi component được mount
  store.dispatch('users/fetchUsers');
});
const users = computed(() => store.getters["users/allUsers"]);

// Hàm format ngày
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
// Toggle hiển thị form
const toggleAddUserForm = () => {
  showAddUserForm.value = !showAddUserForm.value;
};

async function registerUser() {
  // Kiểm tra mật khẩu xác nhận có khớp không
  if (password.value !== confirmPassword.value) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  // Kiểm tra email hợp lệ
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    alert("Email không hợp lệ!");
    return;
  }

  // Kiểm tra các trường bắt buộc
  if (!fullName.value || !email.value || !password.value) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  // Hiển thị trạng thái đang đăng ký

  try {
    // Gửi yêu cầu POST đến API để đăng ký người dùng
    const response = await apiClient.post("/User/SignUp", {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    // Nếu đăng ký thành công, bạn có thể điều hướng hoặc hiển thị thông báo
    if (response.status === 200) {
      alert("Đăng ký thành công");
      store.dispatch("users/fetchUsers");
      showAddUserForm.value = false; // Ẩn form
      fullName.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
    }
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);

    // Kiểm tra lỗi trả về từ API
    if (error.response) {
      // API trả về lỗi
      if (error.response.status === 400) {
        alert("Thông tin không hợp lệ!");
      } else if (error.response.status === 409) {
        alert("Email đã tồn tại");
      } else {
        alert("Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    } else {
      // Lỗi mạng hoặc lỗi khác
      alert("Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng!");
    }
  }
}

async function deleteUser(userId) {
  if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
    try {
      // Gửi yêu cầu DELETE đến API
      const response = await apiClient.delete(`/User/DeleteUser/${userId}`);

      if (response.status === 200) {
        alert("Xóa người dùng thành công!");
        store.dispatch("users/fetchUsers"); // Cập nhật danh sách người dùng
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);

      // Xử lý lỗi trả về từ API
      if (error.response) {
        if (error.response.status === 404) {
          alert("Không tìm thấy người dùng!");
        } else {
          alert("Đã xảy ra lỗi. Vui lòng thử lại!");
        }
      } else {
        alert("Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng!");
      }
    }
  }
}

// Biến lưu trạng thái hiển thị form cập nhật
const showUpdateUserForm = ref(false);

// Biến lưu thông tin người dùng cần cập nhật
const updatedUser = ref({
  id: "",
  fullName: "",
  phoneNumber: "",
  address: "",
});

// Hiển thị form cập nhật và điền thông tin ban đầu
const showUpdateForm = (user) => {
  updatedUser.value.id = user.id; // Gán ID
  updatedUser.value.fullName = user.fullName; // Gán FullName
  updatedUser.value.phoneNumber = user.phoneNumber; // Gán PhoneNumber
  updatedUser.value.address = user.address; // Gán Address

  console.log(updatedUser.value); // Debug thông tin người dùng sau khi gán
  showUpdateUserForm.value = true;
  showIconUser.value = false;
};

// Hủy cập nhật
const cancelUpdate = () => {
  updatedUser.value = { id: "", fullName: "", phoneNumber: "", address: "" };
  showUpdateUserForm.value = false;
  showIconUser.value = true;
};

// Gửi yêu cầu cập nhật thông tin người dùng
const updateUser = async () => {
  try {
    const response = await apiClient.put(`/User/UpdateUserInfo/${updatedUser.value.id}`, {
      userId: updatedUser.value.id,
      fullName: updatedUser.value.fullName,
      phoneNumber: updatedUser.value.phoneNumber,
      address: updatedUser.value.address,
    });

    if (response.status === 200) {
      alert("Cập nhật thông tin thành công!");
      store.dispatch("users/fetchUsers"); // Cập nhật danh sách người dùng
      cancelUpdate(); // Đóng form
    }
  } catch (error) {
    console.error("Cập nhập thất bại", error);
  }
};

</script>

<style lang="scss" scoped></style>
