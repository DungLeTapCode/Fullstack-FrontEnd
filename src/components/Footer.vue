<template>
    <div>
        <section>
        <div class="footer_container_contents">
            <div class="footer_contact_info">
                <h5>THÔNG TIN LIÊN HỆ</h5>
                <div class="info info_address">
                    <i class="ri-map-pin-line"></i>
                    <p>Thôn Chúc Đồng,Thụy Hương,Chương Mỹ,Hà Nội</p>
                </div>
                <div class="info info_phone">
                    <i class="ri-phone-line"></i>
                    <p>0967 204 057</p>
                </div>
                <div class="info info_email">
                    <i class="ri-mail-line"></i>
                    <p>dungle2003@gmail.com</p>
                </div>
                <div class="info_social_network">
                    <i class="ri-facebook-fill"></i>
                    <i class="ri-instagram-fill"></i>
                    <i class="ri-twitter-fill"></i>
                    <i class="ri-tiktok-fill"></i>
                </div>
            </div>
            <div class="footer_link">
                <h5>LIÊN KẾT</h5>
                <router-link to="/">Trang Chủ</router-link>
                <router-link to="/gioi-thieu">Giới Thiệu</router-link>
                <router-link to="/san-pham">Sản Phẩm</router-link>
                <router-link to="/tin-tuc">Tin Tức</router-link>
                <router-link to="/lien-he">Liên hệ</router-link>
            </div>
            <div class="footer_support">
                <h5>HỖ TRỢ</h5>
                <a href="#">Hướng dẫn mua hàng</a>
                <a href="#">Hướng dẫn thanh toán</a>
                <a href="#">Chính sách bảo hành</a>
                <a href="#">Chính sách đổi trả</a>
                <a href="#">Tư vấn khách hàng</a>
            </div>
            <div class="footer_application">
                <h5>TẢI ỨNG DỤNG TRÊN</h5>
                <p>Ứng dụng Mona Watch hiện có sẵn trên Google Play & App Store. Tải nó ngay.</p>
                <img src="/assets/img/app.jpg" width="100%" alt="">
                <img src="/assets/img/play.jpg" width="100%" alt="">
                
            </div>
        </div>
            
    </section>

    <section>
        <div class="footer_end">
            <p>© Bản quyền thuộc về . Thiết kế website <span>Dũng Lê</span></p>
            <img src="/assets/img/app.jpg" alt="">
        </div>
    </section>
    </div>
  
</template>


<script setup>
import { ref } from 'vue';

</script>


<style scoped>

</style>
