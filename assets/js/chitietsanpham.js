const MainImg =  document.getElementById("MainImg");
const Smallimg = document.getElementsByClassName("small_img");

Smallimg[0].onclick = function(){
    MainImg.src = Smallimg[0].src;
}
Smallimg[1].onclick = function(){
    MainImg.src = Smallimg[1].src;
}
Smallimg[2].onclick = function(){
    MainImg.src = Smallimg[2].src;
}
Smallimg[3].onclick = function(){
    MainImg.src = Smallimg[3].src;
}
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tab_mota = $$('.mo_ta');
const details_content = $$('.details_content');
const tab_star = $$('.star_star');

tab_mota.forEach((tab,index) => {
    const details = details_content[index];
    tab.onclick = function(){
        $('.mo_ta.active_details').classList.remove('active_details');
        $('.details_content.active_details').classList.remove('active_details');
        this.classList.add('active_details');
    details.classList.add('active_details');
        
    }
});
 
tab_star.forEach((tab,index) => {
     tab.onclick = function(){
       
       $('.star_star.active_star').classList.remove('active_star');
        this.classList.add('active_star');
        console.log(this);
     }

} );
console.log(MainImg);
document.querySelector('.show-more').addEventListener('click', function() {
    const technicalInfo = document.querySelector('.technical-info');
    if (technicalInfo.style.display === 'none') {
        technicalInfo.style.display = 'block';
        this.textContent = 'Ẩn bớt'; // Đổi tên nút thành "Ẩn bớt" khi hiện thông số
    } else {
        technicalInfo.style.display = 'none';
        this.textContent = 'Xem thêm'; // Đổi tên nút trở lại
    }
});
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.style.borderColor = 'rgba(0, 0, 0, 0.1)'); // Xóa viền của các ô
        option.style.borderColor = 'blue'; // Đổi màu viền ô đã chọn
        // Xử lý thêm nếu cần, ví dụ: lưu màu đã chọn
        console.log(`Bạn đã chọn màu: ${option.dataset.color}`);
    });
});


// document.addEventListener("DOMContentLoaded", function() {
//     var swiper = new Swiper(".mySwiper", {
//         slidesPerView: 4,
//         spaceBetween: 10,
//         cssMode: true,
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//         pagination: {
//             el: ".swiper-pagination",
//         },
//         mousewheel: true,
//         keyboard: true,
//         breakpoints: {
//             // Khi chiều rộng <= 500px
//             500: {
//                 slidesPerView: 1, // Hiển thị 1 slide
                
//             },
//             // Khi chiều rộng <= 768px
//             768: {
//                 slidesPerView: 2, // Hiển thị 2 slide
               
//             },
//             // Khi chiều rộng <= 965px
//             965: {
//                 slidesPerView: 3, // Hiển thị 3 slide
              
//             },
            
//         },
       
//     });
// });


