<template>
    <div class="admin_product_container">
      <h1>Quản Lý Tin Tức</h1>
      <button 
        id="admin-addBlogBtn" 
        @click="toggleForm" 
        style="background: none; border: none; cursor: pointer; display: flex; align-items: center;"
      >
        <i class="fas fa-plus-circle" style="font-size: 24px; color: #28a745; margin-right: 10px;"></i>
        <span style="font-size: 18px; color: #131313;">Thêm Tin Tức</span>
      </button>
      <form 
      id="admin-blogForm" 
      v-show="isFormVisible" 
      @submit.prevent="addBlog"  
      style="display: block;"
    >
      <input type="text" v-model="newBlog.blogName" placeholder="Tiêu đề" required />
      <input type="file" @change="handleFileChange" accept="image/*" required />
      <textarea v-model="newBlog.blogDescription" id="admin-productDescription" placeholder="Nội dung" required></textarea>
      <input type="text" v-model="newBlog.author" placeholder="Tác giả" required />
      <button type="submit">Xác Nhận Thêm</button>
    </form>
    <form 
  v-show="isEditFormVisible" 
  @submit.prevent="updateBlog" 
  style="display: block;">
  <input type="text" v-model="editBlog.blogName" placeholder="Tiêu đề" required />
  <input type="file" accept="image/*" @change="handleFileChangeForEdit" />
  <textarea v-model="editBlog.blogDescription" placeholder="Nội dung" required></textarea>
  <input type="text" v-model="editBlog.author" placeholder="Tác giả" required />
  <button type="submit">Xác Nhận Sửa</button>
  <button type="button" @click="cancelEditForm">Hủy</button>  <!-- Nút hủy -->
</form>

  
      <div class="admin_product_table_container">
        <table id="admin-blogTable">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tiêu đề</th>
              <th>Hình ảnh</th>
              <th>Nội dung</th>
              <th>Ngày tháng</th>
              <th>Tác giả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="admin-productList">
            <tr v-for="blog in blogs" :key="blog.id">
              <td>{{ blog.id }}</td>
              <td>{{ blog.blogName }}</td>
              <td><img :src="blog.imagePath" :alt="blog.title" style="width: 50px;" /></td>
              <td class="content-cell">{{ blog.blogDescription }}</td>
              <td>{{formatDate(blog.dateTime) }}</td>
              <td>{{ blog.author }}</td>
              <td class="admin-actions">
                <button @click="editBlogForm(blog)">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteBlog(blog.id)"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  

  <script setup>
  import { ref } from 'vue';
  import { computed ,onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

const store = useStore();
  // Trạng thái hiển thị form
  const isFormVisible = ref(false);
  const isEditFormVisible = ref(false); 

  const newBlog = ref({
  blogName: '',
  blogDescription: '',
  author: '',
  imageFile: null,  // Thêm trường để chứa hình ảnh
});
const editBlog = ref({
  id:null,
  blogName: '',
  blogDescription: '',
  author: '',
  imageFile: null,
});
  
  // Hàm chuyển đổi trạng thái
  const toggleForm = () => {
    isFormVisible.value = !isFormVisible.value;
  };
  const editBlogForm = (blog) => {
  isEditFormVisible.value = true;
  editBlog.value = { ...blog };  // Điền giá trị cũ vào form sửa
  isFormVisible.value = false;  // Đóng form thêm
};
// Hàm xử lý khi người dùng chọn hình ảnh
const handleFileChange = (event) => {
  const file = event.target.files[0];
  // Thêm log để kiểm tra xem file đã được chọn chưa
  newBlog.value.imageFile = file; // Lưu tạm thời hình ảnh để gửi
};

// Hàm thêm bài viết mới
const addBlog = async () => {
  const formData = new FormData();
  formData.append('blogName', newBlog.value.blogName);
  formData.append('blogDescription', newBlog.value.blogDescription);
  formData.append('author', newBlog.value.author);

  if (newBlog.value.imageFile) {
    formData.append('imageFile', newBlog.value.imageFile);
  }

  try {
    const response = await axios.post('https://localhost:7075/api/Blogs/AddNewBlog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    console.log('Blog added successfully:', response.data);

    // Reset lại form về trạng thái mặc định
    newBlog.value = {
      blogName: '',
      blogDescription: '',
      author: '',
      imageFile: null,
    };

    // Lấy lại danh sách blog từ server
    store.dispatch('blog/fetchBlogs');

    // Đóng form
    toggleForm();

  } catch (error) {
    console.error('Error adding blog:', error);
  }
};

  onMounted (() => {
    store.dispatch('blog/fetchBlogs')
  })

  const blogs = computed(() => store.getters["blog/allBlogs"]);

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const handleFileChangeForEdit = (event) => {
  editBlog.value.imageFile = event.target.files[0];
};
const cancelEditForm = () => {
  isEditFormVisible.value = false;  // Đóng form sửa
};
const updateBlog = async () => {
  const formData = new FormData();
  formData.append('blogName', editBlog.value.blogName);
  formData.append('blogDescription', editBlog.value.blogDescription);
  formData.append('author', editBlog.value.author);
  if (editBlog.value.imagePath) {
    formData.append('imageFile', editBlog.value.imageFile);
  }

  try {
    await axios.put(`https://localhost:7075/api/Blogs/UpdateBlog/${parseInt(editBlog.value.id)}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    store.dispatch('blog/fetchBlogs') // Lấy lại danh sách blog sau khi cập nhật
    isEditFormVisible.value = false;  // Đóng form sửa
  } catch (error) {
    console.error('Error updating blog:', error);
  }
};
const deleteBlog = async (id) => {
  // Hiển thị hộp thoại xác nhận
  const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa blog này không?');

  if (isConfirmed) {
    try {
      await axios.delete(`https://localhost:7075/api/Blogs/DeleteBlog/${id}`);
      store.dispatch('blog/fetchBlogs'); // Lấy lại danh sách blog sau khi xóa
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  } else {
    console.log('Xóa blog bị hủy bỏ');
  }
};

 
  
  </script>
  

<style>
.content-cell {
  max-width: 250px; /* Đặt chiều rộng tối đa */
  white-space: nowrap; /* Không cho xuống dòng */
  overflow: hidden; /* Ẩn phần nội dung vượt quá */
  text-overflow: ellipsis; /* Thêm dấu ... */
}
</style>