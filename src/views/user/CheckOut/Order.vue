<template>
  <div class="container">
    <router-link to="/">
      <img
        src="../../../assets/Logo/logo.png"
        alt=""
        style="width: 30%; padding-top: 50px"
      />
    </router-link>
    <div class="row" style="padding: 20px 0">
      <div class="col-8">
        <div class="delivery-address" style="padding-right: 70px">
          <h2>Thông tin giao hàng</h2>
          <form action="" method="post" @submit.prevent="addOrder">
            <div>
              <label for="hoTen">Họ và tên người nhận:</label>
              <input
                type="text"
                id="hoTen"
                name="hoTen"
                required
                v-model="dataOrder.name"
              />
            </div>

            <div>
              <label for="soDienThoai">Số điện thoại:</label>
              <input
                type="tel"
                id="soDienThoai"
                name="soDienThoai"
                required
                pattern="[0-9]{10,11}"
                v-model="dataOrder.phone"
              />
            </div>
            <div>
              <label for="soDienThoai">Gmail:</label>
              <input
                type="gmail"
                id="gmail"
                name="gmail"
                required
                v-model="dataOrder.email"
              />
            </div>
            <div>
              <label for="diaChi"
                >Địa chỉ nhận hàng (Số nhà, khu, ngõ, ngách, hẻm...):</label
              >
              <input
                type="text"
                id="diaChi"
                name="diaChi"
                required
                v-model="dataOrder.address"
              />
            </div>

            <div class="input-group">
              <div>
                <label for="tinh">Tỉnh/Thành Phố:</label>
                <select v-model="dataOrder.province" @change="provinceChanged">
                  <option value="">Chọn tỉnh/thành phố</option>
                  <option
                    v-for="province in provinces"
                    :key="province.idProvince"
                    :value="province.name"
                  >
                    {{ province.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="huyen">Quận/Huyện:</label>
                <select v-model="dataOrder.district" @change="districtsChanged">
                  <option value="">Chọn quận/huyện</option>
                  <option
                    v-for="district in filteredDistricts"
                    :key="district.idDistrict"
                    :value="district.name"
                  >
                    {{ district.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="xa">Phường/Xã:</label>
                <select v-model="dataOrder.ward">
                  <option value="">Chọn phường/xã</option>
                  <option
                    v-for="ward in filteredCommunes"
                    :key="ward.idCommune"
                    :value="ward.name"
                  >
                    {{ ward.name }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label for="ghiChu">Ghi chú:</label>
              <textarea
                id="ghiChu"
                name="ghiChu"
                rows="4"
                cols="50"
                v-model="dataOrder.note"
              ></textarea>
            </div>

            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <router-link to="/cart" class="backCart">
                <span class="btn btn-primary">Quay về trang giỏ hàng</span>
              </router-link>
              <div class="pay float-right" @click="changePay">
                <span class="btn btn-primary">
                  Chọn phương thức thanh toán
                </span>
              </div>
            </div>
            <hr />
            <div class="pay" v-if="selectedPay">
              <label class="container-pay">
                <i class="bi bi-truck" style="padding: 0 10px"></i> Thanh toán
                khi nhận hàng (COD)

                <input
                  type="radio"
                  checked="checked"
                  name="radio"
                  @click="changeTypePay('COD')"
                />
                <span class="checkmark"></span>
              </label>
              <label class="container-pay"
                ><i class="bi bi-credit-card-2-back" style="padding: 0 10px"></i
                >Chuyển khoản ngân hàng
                <input type="radio" name="radio" @click="changeTypePay('QR')" />
                <span class="checkmark"></span>
              </label>
            </div>
            <div
              class="QR"
              v-if="selectedTypePay === 'QR'"
              style="text-align: center"
            >
              <h4>QUÉT MÃ CHUYỂN KHOẢN VỚI NỘI DUNG:</h4>
              <h4><b style="color: red">KINGSHOES-SN2001</b></h4>
              <div class="confirm">
                <input
                  class="check"
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  style="
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 18px;
                  "
                  @click="changeConfirm"
                />
                <label
                  class="color-change"
                  for="vehicle1"
                  style="
                    display: inline-block;
                    vertical-align: middle;
                    padding-left: 10px;
                    font-size: 18px;
                  "
                  >Xác nhận đã thanh toán !!!</label
                ><br />
              </div>

              <img
                src="../../../assets/Logo/QR.jpg"
                alt=""
                style="width: 40%"
              />
              <p>
                (quét mã QR trên App ngân hàng của bạn để tiện dụng và chính xác
                hơn)
              </p>
            </div>
            <button
              class="btn btn-primary"
              type="submit"
              v-if="selectedPay"
              style="font-weight: bold"
            >
              HOÀN TẤT THANH TOÁN
            </button>
          </form>
          <!-- <div class="COD" v-if="selectedTypePay === 'COD'">aaaaaaaaaa</div> -->
        </div>
      </div>

      <div class="col-4">
        <h2>Thông tin đơn hàng</h2>
        <div class="order-information">
          <div
            class="row"
            v-for="item in dataShowCart"
            style="padding-bottom: 20px"
          >
            <div class="col-3">
              <div class="image">
                <img
                  :src="'http://localhost:3838/' + item.product_id.image"
                  alt=""
                  style="width: 100%"
                />
              </div>
            </div>
            <div class="col-5">
              <div class="info">
                <div class="title text-uppercase">
                  <h3>{{ item.product_id.name }}</h3>
                </div>
                <!-- Size -->
                <div class="sizes">
                  <div v-for="size in listSize" :key="size._id">
                    <div
                      v-if="
                        size._id &&
                        item.product_id &&
                        item.product_id.size_id === size._id
                      "
                    >
                      <span> Size: {{ size.name }} </span>
                    </div>
                  </div>
                </div>

                <!-- So luong -->
                <div class="quantity">
                  <p>Số lượng: {{ item.quantity }}</p>
                </div>
                <!-- Tong tien 1 san pham -->
              </div>
            </div>
            <div class="col-4">
              <div class="price">
                <p>Thành tiền:</p>
                <h5 style="color: red">
                  <b
                    v-if="item.product_id.sellingPrice && item.product_id.price"
                    >{{
                      formatPrice(
                        calculateCurrentPrice(
                          item.product_id.price,
                          item.product_id.sellingPrice
                        ) * item.quantity
                      )
                    }}</b
                  >
                  <b
                    v-if="
                      !item.product_id.sellingPrice && item.product_id.price
                    "
                    >{{
                      formatPrice(
                        calculateCurrentPrice(item.product_id.price, 0) *
                          item.quantity
                      )
                    }}</b
                  >
                </h5>
              </div>
            </div>
          </div>
          <hr />
          <!-- <div class="row-discount">

            <div class="col-12">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Button
                </button>
              </div>
            </div>
          </div> -->

          <!-- Tong tien -->
          <div class="row">
            <div class="col-6">
              <h3>Tổng tiền:</h3>
            </div>
            <div class="col-6">
              <div class="total-price text-right">
                <h3>{{ formatPrice(calculateTotalAmount()) }}</h3>
                <div class="product-details-addCart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { selectProps } from "ant-design-vue/es/select";
import axios from "axios";
import addressData from "../../../../db.json";
export default {
  props: ["data"],
  data() {
    return {
      provinces: [], // Danh sách tỉnh/thành phố
      districts: [], // Danh sách quận/huyện
      ward: [], // Danh sách phường/xã
      selectedProvince: "", // Tỉnh/thành phố được chọn
      selectedDistricts: "", // Tỉnh/thành phố được chọn
      filteredDistricts: [], // Danh sách quận/huyện được lọc theo tỉnh/thành phố
      filteredCommunes: [], // Danh sách phường/xã được lọc theo quận/huyện
      confirm: false,
      selectedPay: false,
      selectedTypePay: "",
      product: [],
      quantity: 1,
      dataShowCart: [],
      user: [],
      user_id: "",
      // dataCart: [],
      dataOrder: {
        user_id: "",
        product_data: [],
        name: "",
        email: "",
        address: "",
        ward: "",
        district: "",
        province: "",
        phone: "",
        totalPrice: "",
        note: "",
        typePay: "COD",
        statusPay: "",
        statusOder: "0",
      },
      listSize: [],
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("userData"));
    this.user_id = user._id;
    console.log("user_id in carts", this.user_id);
    this.getAllSize();
    this.getAllCart();
    console.log(addressData);
    this.provinces = addressData.province; // Lọc ra các tỉnh/thành phố
    this.districts = addressData.district; // Lọc ra các quận/huyện
    this.ward = addressData.commune; // Lọc ra các phường/xã
    console.log(this.ward, this.districts, this.provinces);
  },
  methods: {
    getAllCart() {
      // console.log("user_id", this.user_id);

      axios
        .get(`http://localhost:3838/carts?user_id=${this.user_id}`)
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.dataCart = res.data.data;
            console.log("dataCart: ", this.dataCart[0]);
            this.dataCart.forEach((cart) => {
              this.dataOrder.user_id = cart.user_id._id;
              cart.product.forEach((item) => {
                this.dataShowCart.push({
                  product_id: item.product_id,
                  quantity: item.quantity,
                });
                this.dataOrder.product_data.push({
                  product_id: item.product_id._id,
                  quantity: item.quantity,
                });
              });
            });

            console.log("Thành công Cart chưa show!!!", this.dataCart);
            console.log("Thành công Cart!!!", this.dataShowCart);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    calculateCurrentPrice(price, sellingPrice) {
      // Tính giá tiền hiện tại dựa trên giá gốc và phần trăm giảm giá
      return price - price * (sellingPrice / 100);
    },
    calculateTotalAmount() {
      let total = 0;
      let data = this.dataShowCart.forEach((item) => {
        // Chọn giá bán phù hợp: nếu có giá sale thì sử dụng giá sale, ngược lại sử dụng giá gốc
        let price = item.product_id.sellingPrice
          ? this.calculateCurrentPrice(
              item.product_id.price,
              item.product_id.sellingPrice
            ) * item.quantity
          : this.calculateCurrentPrice(item.product_id.price, "0") *
            item.quantity;

        // Tính tổng số tiền cho từng sản phẩm trong giỏ hàng
        total += price;
      });

      // Cập nhật tổng số tiền cho đơn hàng

      this.dataOrder.totalPrice = total;
      // Trả về tổng số tiền
      return total;
    },

    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    getAllSize() {
      axios
        .get("http://localhost:3838/sizes")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.listSize = res.data.data; //Gan data vao optionSize
            // this.optionsSize = res.data.data; //Gan data vao optionSize
          }
          console.log("Thành công lấy size", this.listSize);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addOrder() {
      if (this.dataOrder.typePay === "COD") {
        this.dataOrder.statusPay = "0";
      } else {
        this.dataOrder.statusPay = "1";
      }
      console.log("Check create order", this.dataOrder);
      // Xử lý khi người dùng submit

      axios.post("http://localhost:3838/oders", this.dataOrder).then((res) => {
        if (res.data.status === 200) {
          console.log("Thêm thành công !", res.data);
          // console.log(this.dataUpdate.product_type);
          // Thêm thông báo thành công
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Tạo đơn hàng thành công !",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/profile");
        } else {
          // Thêm thông báo lỗi
          console.log("Tạo thất bại !", res.data.message);
          this.$swal.fire({
            position: "center",
            icon: "error",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
    changePay() {
      this.selectedPay = !this.selectedPay;
    },
    changeTypePay(item) {
      this.selectedTypePay = item;
      this.dataOrder.typePay = item;
      console.log("this.dataOrder.typePay", this.dataOrder.typePay);
    },
    changeConfirm() {
      this.confirm = !this.confirm;
    },
    provinceChanged() {
      let datacheck = this.provinces.filter(
        (provinces) => provinces.name === this.dataOrder.province
      );
      // console.log("datacheck", datacheck);
      this.filteredDistricts = this.districts.filter(
        (district) => district.idProvince === datacheck[0].idProvince
      );
    },
    districtsChanged() {
      let datacheck = this.districts.filter(
        (districts) => districts.name === this.dataOrder.district
      );
      this.filteredCommunes = this.ward.filter(
        (ward) => ward.idDistrict === datacheck[0].idDistrict
      );
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

h2 {
  color: #333;
  padding-bottom: 40px;
}

label {
  display: block;
  margin-top: 10px;
  color: #666;
}

input[type="text"],
input[type="tel"],
input[type="gmail"],
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-group {
  display: flex;
  justify-content: space-between;
}

.input-group > div {
  flex: 1;
  margin-right: 10px;
}

input[type="submit"] {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
}

input[type="submit"]:hover {
  background-color: #0056b3;
}

/* .order-information {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
} */
.backCart .btn-primary {
  background-color: #666;
}

.pay-COD,
.pay-transfer {
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
}

.container-pay {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container-pay input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container-pay:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container-pay input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container-pay input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container-pay .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

@keyframes colorChange {
  0% {
    color: red;
  }

  25% {
    color: blue;
  }

  50% {
    color: green;
  }

  75% {
    color: yellow;
  }

  100% {
    color: red;
  }
}

.color-change {
  animation: colorChange 1s infinite;
}
.btn-primary {
  margin-top: 10px;
}
.input-group select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
>
