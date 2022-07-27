function renderTableProduct(arrProduct) {
    var html = '';

    for (var index = 0; index < arrProduct.length; index++) {
        // mỗi lần duyệt lấy ra 1 sinh viên
        var product = arrProduct[index];

        html += `
         <tr>
           <td>${product.id}</td>
           <td><img src="${product.img}" alt=""></td>
           <td>${product.name}</td>
           <td>${product.price}</td>
           <td>${product.description}</td>
           <td>${product.type}</td>

          
           <td><button class = "btn btn-danger" onclick="xoaProduct('${product.id}')"><i class="fa-solid fa-trash-can"></i></button>
            <button  class = "btn btn-primary" onclick="chinhSua('${product.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
           </td>
        </tr>
    `;
    }
    document.querySelector('#tblProduct').innerHTML = html
    return html;
}

// ---------------------GET--------------

function layDanhSachSanPham() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET',
    });
    promise.then(function (result) {
        renderTableProduct(result.data);
    });
    promise.catch(function (err) {
        console.log(err);
    });
}
window.onload = function () {
    layDanhSachSanPham();
}

// ----------------------POST-------------------

document.querySelector('#btnCreate').onclick = function () {
    var product = new Product();
    product.id = document.querySelector('#id').value;
    product.name = document.querySelector('#name').value;
    product.price = document.querySelector('#price').value;
    product.img = document.querySelector('#image').value;
    product.type = document.querySelector('#ProductType').value;
    product.description = document.querySelector('#productDescription').value;

    var valid = true;
    valid = kiemTraRong(product.id, '#errId', 'ID')& kiemTraTatCaSo(product.id,'#err_numberId','ID')& kiemTraRong(product.name,'#errName','Product Name')&kiemTraTatCaSo(product.price,'#errNumberPrice','Price')&kiemTraRong(product.price,'#errPrice','Price')&kiemTraRong(product.img,'#errImg','Link hình ảnh')&kiemTraRong(product.description,'#errDescription','Mô tả product')

    if (!valid) {
        return;
    }
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: product,
    });

    promise.then(function (result) {
        layDanhSachSanPham();
    });
    promise.catch(function (err) {
        console.log(err);
    });
}

// ---------------------DELETE-------------------
function xoaProduct(idDelete) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + idDelete,
        method: 'DELETE',
    });
    promise.then(function (result) {
        layDanhSachSanPham();
    });
    promise.catch(function (err) {
        console.log(err);
    });
}

//---------------------UPDATE-------------------

function chinhSua(idClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + idClick,
        method: 'GET',
    });
    promise.then(function (result) {
        var product = result.data;
        document.querySelector('#id').value = product.id;
        document.querySelector('#name').value = product.name;
        document.querySelector('#price').value = product.price;
        document.querySelector('#image').value = product.img;
        document.querySelector('#ProductType').value = product.type;
        document.querySelector('#productDescription').value = product.type;

    });
    promise.catch(function (err) {
        console.log(err)
    })
}

document.querySelector('#btnUpdate').onclick = function () {
    var productUpdate = new Product();
    productUpdate.id = document.querySelector('#id').value;
    productUpdate.name = document.querySelector('#name').value;
    productUpdate.price = document.querySelector('#price').value;
    productUpdate.img = document.querySelector('#image').value;
    productUpdate.type = document.querySelector('#ProductType').value;
    productUpdate.description = document.querySelector('#productDescription').value;
    var valid = true;
    valid = kiemTraRong(productUpdate.id, '#errId', 'ID')& kiemTraTatCaSo(productUpdate.id,'#err_numberId','ID')& kiemTraRong(productUpdate.name,'#errName','Product Name')&kiemTraTatCaSo(productUpdate.price,'#errNumberPrice','Price')&kiemTraRong(productUpdate.price,'#errPrice','Price')&kiemTraRong(productUpdate.img,'#errImg','Link hình ảnh')&kiemTraRong(productUpdate.description,'#errDescription','Mô tả product')

    if (!valid) {
        return;
    }
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + productUpdate.id,
        method: 'PUT',
        data: productUpdate,
    });
    promise.then(function (result) {
        layDanhSachSanPham();
    });
    promise.catch(function (err) {
        console.log(err);
    });
}

//----------------SearchByName------------
document.querySelector('#btnSearch').onclick = function () {
    var nameValue = document.querySelector('#idSearch').value;
    var nameSearch = nameValue.toLocaleLowerCase();
    var valid = true;
    valid = kiemTraRong(nameValue, '#nameSearch', 'Name ');
    if (!valid) {
        return;
    }
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/SearchByName?name=' + nameSearch,
        method: 'GET',
    });
    promise.then(function (result) {
        renderTableProduct(result.data);

    });
    promise.catch(function (err) {
        document.querySelector('#tblProduct').innerHTML = ' Không tìm thấy sản phẩm!'
        document.querySelector('#tblProduct').style.color = 'red'
        document.querySelector('#tblProduct').style.fontSize = '20px'
    })
}