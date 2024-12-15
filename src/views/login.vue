<template>
  <div>
    <section>
      <!-- Overlay -->
      <div v-if="isPopupVisible" class="overlay"></div>

      <!-- Form Container -->
      <div v-if="isPopupVisible" class="form-container">
        <button class="close-btn" @click="togglePopup">
          <i class="ri-close-line"></i>
        </button>
        <div class="title_form_user">
          <!-- Title Login -->
          <div
            class="title_login"
            :class="{ active: isLoginActive }"
            @click="showLogin"
          >
            <p class="title">Đăng Nhập</p>
            <div class="line_login"></div>
          </div>

          <!-- Title Register -->
          <div
            class="title_register"
            :class="{ active: !isLoginActive }"
            @click="showRegister"
          >
            <p class="title">Đăng Ký</p>
            <div class="line_login"></div>
          </div>
        </div>

        <!-- Login Form -->
        <!-- Login Form -->
        <div v-show="isLoginActive" class="login-form">
          <form class="form" @submit.prevent="loginUser">
            <div class="input-group">
              <input
                type="text"
                name="email"
                id="login_email"
                v-model="loginEmail"
                placeholder="E-mail"
              />
            </div>
            <div class="input-group">
              <input
                type="password"
                name="password"
                id="login_password"
                v-model="loginPassword"
                placeholder="Password"
              />
              <div class="forgot">
                <a rel="noopener noreferrer" href="#">Quên mật khẩu ?</a>
              </div>
            </div>
            <button type="submit" class="sign">Đăng nhập</button>
          </form>
          <div class="social-message">
            <div class="line"></div>
            <p class="message">Or Log In With</p>
            <div class="line"></div>
          </div>
          <div class="social-icons">
            <button class="social-icon">
              <i class="fab fa-google"></i><span>Google</span>
            </button>
            <button class="social-icon">
              <i class="fab fa-facebook"></i><span>Facebook</span>
            </button>
          </div>
          <p class="signup">
            Bạn chưa có tài khoản?
            <a rel="noopener noreferrer" href="#" @click="showRegister"
              >Đăng Ký</a
            >
          </p>
        </div>

        <!-- Register Form -->
        <!-- Register Form -->
        <div v-show="!isLoginActive" class="register-form">
          <form class="form" @submit.prevent="registerUser">
            <div class="input-group">
              <input
                type="text"
                name="username"
                id="username_register"
                v-model="fullName"
                placeholder="FullName"
              />
            </div>
            <div class="input-group">
              <input
                type="text"
                name="email"
                id="email_register"
                v-model="email"
                placeholder="E-mail"
              />
            </div>
            <div class="input-group">
              <input
                type="password"
                name="password"
                id="password_register"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <div class="input-group">
              <input
                type="password"
                name="confirm password"
                id="confirmpassword"
                v-model="confirmPassword"
                placeholder="Confirm password"
              />
            </div>
            <button class="sign">Đăng Ký</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from "vue";
import apiClient from "@/axios";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const router = useRouter();

// Tạo các biến trạng thái cho việc hiển thị popup và chọn tab đăng nhập/đăng ký
const isPopupVisible = ref(true); // Điều khiển việc hiển thị popup
const isLoginActive = ref(true); // Điều khiển tab đăng nhập/đăng ký
const fullName = ref(""); // Lưu tên đầy đủ
const email = ref(""); // Lưu email
const password = ref(""); // Lưu mật khẩu
const confirmPassword = ref(""); // Lưu mật khẩu xác nhận
const loginEmail = ref("");
const loginPassword = ref("");

// Toggle Popup: Hiển thị hoặc ẩn form container và overlay
function togglePopup() {
  router.push("/trang-chu");
}

// Hiển thị form đăng nhập và ẩn form đăng ký
function showLogin() {
  isLoginActive.value = true;
}

// Hiển thị form đăng ký và ẩn form đăng nhập
function showRegister() {
  isLoginActive.value = false;
}
// Hàm đăng ký người dùng
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
  console.log({
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });

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
      // Có thể chuyển hướng sang trang đăng nhập hoặc thay đổi trạng thái để hiển thị form đăng nhập
      isLoginActive.value = true;
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

async function loginUser() {
  // Kiểm tra email và mật khẩu không được bỏ trống
  if (!loginEmail.value || !loginPassword.value) {
    alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
    return;
  }

  // Kiểm tra email hợp lệ
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(loginEmail.value)) {
    alert("Email không hợp lệ!");
    return;
  }

  try {
    // Gửi yêu cầu POST đến API để đăng nhập người dùng
    const response = await apiClient.post("/User/SingIn", {
      email: loginEmail.value,
      password: loginPassword.value,
    });

    if (response.status === 200) {
      const token = response.data; 
    
      
      store.dispatch("login", token); 
      
      
      if (loginEmail.value.toLowerCase() != "admin@example.com"){
        const cartResponse = await apiClient.get(`/Cart/cart-by-username/${loginEmail.value}`);
      localStorage.setItem("cartid", cartResponse.data.cartId);
      }
      store.dispatch('cart/fetchCartItems');
      localStorage.setItem("userName",loginEmail.value)
      store.dispatch("users/fetchUserRoles");
    
      if (loginEmail.value.toLowerCase() === "admin@example.com") {
      
        router.push("/admin-user");
      } else {
         togglePopup();
        router.push("/");
      }
    }
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    // Kiểm tra lỗi trả về từ API
    if (error.response) {
      if (error.response.status === 401) {
        alert("Email hoặc mật khẩu không đúng!");
      } else {
        alert("Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    } else {
      alert("Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng!");
    }
  }
}
</script>
<style scoped></style>
