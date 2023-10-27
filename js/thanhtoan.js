/*xử lý quay lại khi chọn phương thức thanh toán */
function goBackChose() {
    var paymentBox = document.querySelector('.payment-box');
    paymentBox.classList.toggle("hidden");
    var overlay = document.querySelector('#overlay');
    overlay.classList.toggle("hidden");
    var listSp = document.querySelector('.listSanPham');
    listSp.classList.toggle("hidden")
}
/*xử lý khi chọn phương thức thanh toán */
function handleClick(event) {
    var isChecked = checkPaymentMethod().isChecked;
    var id_Checked = checkPaymentMethod().id_Checked;
    if (isChecked) {
        var infoThanhToan = document.querySelector('.infoThanhToan');
        infoThanhToan.classList.toggle('hidden');

        switch (id_Checked) {

            case 'cash':
                var s = `<form id="payment-form">
                    <div class="form-group">
                        <label for="address">
                            Địa chỉ giao hàng<span class="req">*</span>
                        </label>
                        <input type="text" id="address" name="address" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">
                            Số điện thoại<span class="req">*</span>
                        </label>
                        <input type="text" id="phone" name="phone" required>
                    </div>
                    <div class="btn-container">
                    <button class='Btn' type="button" onclick="goBack()">Quay lại</button>
                    <button class='Btn' type="submit" onclick='setTimeout(handleSubmit(),5000)'>Thanh toán</button>
                    </div>
                </form>`
                infoThanhToan.innerHTML += s;
                var paymentBox = document.querySelector('.payment-box');
                paymentBox.classList.toggle("hidden");

                var address = document.querySelector('#address');
                address.value = getCurrentUser().address;

                var phone = document.querySelector('#phone');
                phone.value = getCurrentUser().phone
                break;
            case 'bank-transfer':
                var s = `<form id="payment-form">
                    <div class="form-group">
                        <label for="card-type">
                            Loại thẻ ngân hàng<span class="req">*</span>
                        </label>
                        <input type="text" id="card-type" name="card-type" required>
                    <div class="form-group">
                    </div>
                        <label for="card-number">
                            Số thẻ<span class="req">*</span>
                        </label>
                        <input type="text" id="card-number" name="card-number" required>
                    </div>
                    <div class="form-group">
                        <label for="address">
                            Địa chỉ giao hàng<span class="req">*</span>
                        </label>
                        <input type="text" id="address" name="address" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">
                            Số điện thoại<span class="req">*</span>
                        </label>
                        <input type="text" id="phone" name="phone" required>
                    </div>
                    <div class="btn-container">
                    <button class='Btn' type="button" onclick="goBack()">Quay lại</button>
                    <button class='Btn' type="submit" onclick='setTimeout(handleSubmit(),5000)'>Thanh toán</button>
                    </div>
                </form>`
                infoThanhToan.innerHTML += s;
                var paymentBox = document.querySelector('.payment-box');
                paymentBox.classList.toggle("hidden");

                var address = document.querySelector('#address');
                address.value = getCurrentUser().address;

                var phone = document.querySelector('#phone');
                phone.value = getCurrentUser().phone
                break;
            default:
                break;

        }
        event.preventDefault();
    } else {
        event.preventDefault();
        addAlertBox('Bạn cần phải chọn phương thức thanh toán', '#17c671', '#fff', 4000)
    }
}
/*Xử lý quay lại khi điền thông tin thanh toán */
function goBack() {
    var infoThanhToan = document.querySelector('.infoThanhToan');
    infoThanhToan.classList.toggle("hidden");
    infoThanhToan.innerHTML = '';
    var paymentBox = document.querySelector('.payment-box');
    paymentBox.classList.toggle("hidden");
}
/*Xử lý đơn hàng khi điền thông tin thanh toán */
function handleSubmit() {
    var formGroup = document.querySelector('.form-group')
    var inputs = formGroup.querySelectorAll('input[required]');
    var inputValue = true;
    inputs.forEach(function (input) {
        if (input.value.trim() === '') {
            inputValue = false;
        }
    });
    if (inputValue) {
        var diaChi = document.querySelector('#address');
        console.log(diaChi);
        currentuser.donhang.push({
            "sp": currentuser.products,
            "ngaymua": new Date(),
            'maDH': generateRandomString(10),
            'diaChi': diaChi.value,
            "tinhTrang": 'Đang chờ xử lý'
        });
        currentuser.products = [];
        capNhatMoiThu();
        // Hiển thị thông báo "Thanh toán thành công"
        alert('Thanh toán thành công!');
    }
}
function generateRandomString(length) {
    var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
/*Kiểm tra xem khách hàng đã chọn phương thức thannh toán chưa*/
function checkPaymentMethod() {
    var paymentMethods = document.getElementsByName("payment-method");
    var isChecked = false;
    var id_Checked;

    for (var i = 0; i < paymentMethods.length; i++) {
        if (paymentMethods[i].checked) {
            isChecked = true;
            id_Checked = paymentMethods[i].id;
            break;
        }
    }
    return { isChecked, id_Checked };
}
addContainTaiKhoan();