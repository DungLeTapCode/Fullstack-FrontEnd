// document.addEventListener("DOMContentLoaded", function() {
//     const addProductBtn = document.getElementById('admin-addProductBtn');
//     const addUserBtn = document.getElementById('admin-addUserBtn');
    
//     if (addProductBtn) {
//         addProductBtn.onclick = function() {
//             const form = document.getElementById('admin-productForm');
//             form.style.display = form.style.display === 'none' ? 'block' : 'none';
//         };
//     }

//     if (addUserBtn) {
//         addUserBtn.onclick = function() {
//             const form = document.getElementById('admin-userForm');
//             form.style.display = form.style.display === 'none' ? 'block' : 'none';
//         };
//     }
//     document.getElementById('admin-productForm').onsubmit = function(event) {
//         event.preventDefault();
//         const productId = document.getElementById('admin-productId').value;
//         const productName = document.getElementById('admin-productName').value;
//         const productQuantity = document.getElementById('admin-productQuantity').value;
//         const productImage = document.getElementById('admin-productImage').value;
//         const productPrice = document.getElementById('admin-productPrice').value;
//         const productType = document.getElementById('admin-productType').value;
//         const productColor = document.getElementById('admin-productColor').value;
//         const productDescription = document.getElementById('admin-productDescription').value;
//         const productDetail = document.getElementById('admin-productDetail').value;

//         const productRow = `<tr>
//             <td>${productId}</td>
//             <td>${productName}</td>
//             <td>${productQuantity}</td>
//             <td><img src="${productImage}" alt="${productName}" style="width: 50px;"></td>
//             <td>${productPrice} VNĐ</td>
//             <td>${productType}</td>
//             <td>${productColor}</td>
//             <td>${productDescription}</td>
//             <td class="admin-actions">
//                 <button onclick="updateProduct(this)"><i class="fas fa-edit"></i></button>
//                 <button onclick="removeProduct(this)"><i class="fas fa-trash"></i></button>
//             </td>
//         </tr>`;

//         document.getElementById('admin-productList').innerHTML += productRow;
//         document.getElementById('admin-productForm').reset();
//     };

//     document.getElementById('admin-userForm').onsubmit = function(event) {
//         event.preventDefault();
//         const userId = document.getElementById('admin-userId').value;
//         const userEmail = document.getElementById('admin-userEmail').value;
//         const userName = document.getElementById('admin-userName').value;
//         const userDate = document.getElementById('admin-userDate').value;
//         const userPassword = document.getElementById('admin-userPassword').value;

//         const userRow = `<tr>
//             <td>${userId}</td>
//             <td>${userEmail}</td>
//             <td>${userName}</td>
//             <td>${userDate}</td>
//             <td>***</td>
//             <td class="admin-actions">
//                 <button onclick="updateUser(this)"><i class="fas fa-edit"></i></button>
//                 <button onclick="removeUser(this)"><i class="fas fa-trash"></i></button>
//             </td>
//         </tr>`;

//         document.getElementById('admin-userList').innerHTML += userRow;
//         document.getElementById('admin-userForm').reset();
//     };

//     function updateProduct(button) {
//         alert("Chức năng cập nhật sản phẩm chưa được triển khai.");
//     }

//     function removeProduct(button) {
//         button.closest('tr').remove();
//     }

//     function updateUser(button) {
//         alert("Chức năng cập nhật người dùng chưa được triển khai.");
//     }

//     function removeUser(button) {
//         button.closest('tr').remove();
//     }
// });
